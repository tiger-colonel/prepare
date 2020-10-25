const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const inquirer = require('inquirer');
const chalk = require('chalk');
const parse = require('babylon').parse;
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const template = require('babel-template');
const generate = require('babel-generator').default;
const {exec, execSync} = require('child_process');
const ora = require('ora');
const {isExist, success, warn, error, toCamel} = require('./util');

const loading = ora('eslint fixing ...');
const templatePath = path.resolve(__dirname, './template');
const projectRootPath = path.resolve(__dirname, '../../');

let controllerExist;
const html = (relativePath) => `{{extend ("${relativePath}")}}
{{#block ("body")}}
<div id="app"></div>
<script type="text/javascript" src="{{vueLib()}}"></script>
{{/block}}
`;

const controllerTmpl = template(`
const CONTROLLER_NAME = async function (ctx, next) {
    await ctx.render(PATH, {
        title: '页面标题',
        path: PATH,
    });
    return next();
};
`);

const newControllerFile = (fileName) =>
`const ${toCamel(fileName)} = async function (ctx, next) {
    await ctx.render('${fileName}', {
        title: '页面标题',
        path: '${fileName}',
    });
    return next();
};

module.exports = {
    ${toCamel(fileName)},
};
`;

const routeRequireTmpl = template(`const NAME = require(PATH_NAME);`);

const copyTemplate = (targetPath) => new Promise((resolve, reject) => {
    const copy = () => {
        copydir(templatePath, targetPath, {
            utimes: true,
            mode: true,
            cover: true,
        }, (err) => {
            if (err) throw err;
            success(`目录已生成：${path.relative(projectRootPath, targetPath)}`);
            resolve();
        });
    };
    isExist(targetPath).then((exist) => {
        if (exist) {
            copy();
        } else {
            mkdirp(targetPath, () => {
                copy();
            });
        }
    });
});

const addHtml = (fileName) => new Promise((resolve, reject) => {
    const viewPath = path.resolve(projectRootPath, 'app/views');
    const targetPath = path.resolve(viewPath, `${fileName}.html`);
    const targetDir = path.resolve(targetPath, '..');
    const layoutPath = path.relative(targetDir, path.resolve(projectRootPath, 'app/views/layout/default.html'));
    isExist(targetDir).then((exist) => {
        if (!exist) {
            mkdirp(targetDir, (err) => {
                if (err) throw err;
                fs.writeFile(targetPath, html(layoutPath), (e) => {
                    if (e) throw e;
                    success(`文件已生成：${path.relative(projectRootPath, targetPath)}`);
                    resolve();
                });
            });
        } else {
            fs.writeFile(targetPath, html(layoutPath), (e) => {
                if (e) throw e;
                success(`文件已生成：${path.relative(projectRootPath, targetPath)}`);
                resolve();
            });
        }
    });
});

const addController = (fileName) => new Promise((resolve, reject) => {
    const nameArr = fileName.split('/');
    const name = nameArr[0];
    const controllerName = toCamel(fileName);
    const controller = path.resolve(projectRootPath, 'app/controllers', `${name}.js`);
    isExist(controller).then((exist) => {
        controllerExist = exist;
        if (exist) {
            fs.readFile(controller, 'utf8', (err, data) => {
                if (err) throw err;
                const ast = parse(data);
                traverse(ast, {
                    ExpressionStatement(path) {
                        const operatePath = path;
                        path.traverse({
                            MemberExpression(path) {
                                if (path.get('object').isIdentifier({name: 'module'})) {
                                    // 添加控制器
                                    const ast = controllerTmpl({
                                        CONTROLLER_NAME: t.identifier(controllerName),
                                        PATH: t.stringLiteral(fileName),
                                    });
                                    operatePath.insertBefore(ast);
                                    // 添加导出的属性
                                    const rightPath = path.parentPath.get('right');
                                    if (rightPath) {
                                        const propertiesPath = rightPath.get('properties');
                                        const lastChild = propertiesPath[propertiesPath.length - 1];
                                        lastChild.insertAfter(t.objectProperty(t.identifier(controllerName), t.identifier(controllerName), false, true));
                                    }
                                }
                                path.skip();
                            },
                        });
                        path.skip();
                    },
                });
                const output = generate(ast, {}, data);
                fs.writeFile(controller, output.code, (err) => {
                    if (err) throw err;
                    success(`${name}.js 已配置`);
                    resolve();
                });
            });
        } else {
            fs.writeFile(controller, newControllerFile(fileName), (err) => {
                if (err) throw err;
                success(`${name}.js 已配置`);
                resolve();
            });
        }
    });
});

const addRouter = (fileName) => new Promise((resolve, reject) => {
    const nameArr = fileName.split('/');
    const name = nameArr[0];
    const router = path.resolve(projectRootPath, 'app/route/route.js');
    const controllerName = toCamel(fileName);
    fs.readFile(router, 'utf8', (err, data) => {
        if (err) throw err;
        const ast = parse(data);
        traverse(ast, {
            MemberExpression(path) {
                if (path.get('object').isIdentifier({name: 'module'})) {
                    const rootPath = path.parentPath.parentPath;
                    const rightPath = path.parentPath.get('right');
                    if (rightPath) {
                        // 添加导出属性
                        const propertiesPath = rightPath.get('properties');
                        const lastChild = propertiesPath[propertiesPath.length - 1];
                        lastChild.insertAfter(t.objectProperty(
                            t.stringLiteral(`/${fileName}`),
                            t.memberExpression(t.identifier(name), t.identifier(controllerName)),
                        ));
                        // 添加require引入
                        if (!controllerExist) {
                            const ast = routeRequireTmpl({
                                NAME: t.identifier(name),
                                PATH_NAME: t.stringLiteral(`../controllers/${name}`),
                            })
                            rootPath.insertBefore(ast);
                        }
                    }
                }
            },
        });
        const output = generate(ast, {}, data);
        fs.writeFile(router, output.code, (err) => {
            if (err) throw err;
            success(`route.js 已配置`);
            resolve();
        });
    });
});

const eslintFix = () => new Promise((resolve, reject) => {
    loading.start();
    exec('./node_modules/.bin/eslint --ext .js --fix app/controllers/** app/route/**', {
        cwd: projectRootPath,
    }, (err, stdout, stderr) => {
        if (err) {
            loading.fail();
            error(err);
            resolve();
            return;
        }
        loading.succeed();
        success('eslint fix 已完成');
        resolve();
    });
});

const ifDockerRuning = () => new Promise((resolve, reject) => {
    exec('docker ps', {
        cwd: projectRootPath,
        stdio: 'inherit',
    }, (err, stdout, stderr) => {
        if (err) throw err;
        resolve(stdout.includes('airjs-images'));
    });
});

const ifStartNow = (runing, fileName) => {
    inquirer
        .prompt([
            {
                name: 'startNow',
                message: '是否立即启动项目？(Y/n)',
            },
        ])
        .then((answer) => {
            if (answer.startNow === '' || answer.startNow === 'Y' || answer.startNow === 'y') {
                if (runing) {
                    console.log('\n正在进入容器...');
                    execSync(`docker exec -it airjs-container bash -c "npm run dev --${fileName}"`, {
                        cwd: projectRootPath,
                        stdio: 'inherit',
                    });
                } else {
                    console.log('\n正在启动容器：npm start ...');
                    console.log(`稍后请输入监听页面${fileName}`);
                    execSync('npm start', {
                        cwd: projectRootPath,
                        stdio: 'inherit',
                    });
                }
            } else {
                console.log(`\n稍后启动容器执行 ${chalk.bold.blue(`npm run dev --${fileName}`)} 查看页面～`);
            }
        });
};

const initPage = (path, fileName) => {
    isExist(path).then((exist) => {
        if (exist) {
            error(`指定目录已存在，请检查：src/biz/${fileName}`);
            process.exit(0);
        } else {
            addController(fileName)
                .then(() => addRouter(fileName))
                .then(() => addHtml(fileName))
                .then(() => copyTemplate(path))
                .then(eslintFix)
                // .then(ifDockerRuning)
                // .then((runing) => ifStartNow(runing, fileName))
                .catch(error);
        }
    });
};

module.exports = initPage;
