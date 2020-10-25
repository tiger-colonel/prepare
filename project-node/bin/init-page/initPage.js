const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const inquirer = require('inquirer');
const chalk = require('chalk');
// ast 解析器
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

const addController = (fileName) => new Promise((resolve, reject) => {
    const nameArr = fileName.split('/');
    const name = nameArr[0];
    const controllerName = toCamel(fileName);
    const controller = path.resolve(projectRootPath, 'app/controllers', `${name}.js`);
    isExist(controller).then(exist => {
        controllerExist = exist;
        if (exist) {
            fs.readFile(controller, 'utf8', (err, data) => {
                if (err) throw err;
                const ast = parse(data);
                traverse(ast, {
                    ExpressionStatement(path) {
                        const operatePath = path;
                        // console.log('-----path-----', path);
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
                                        lastChild.insertAfter(
                                            t.objectProperty(
                                                t.identifier(controllerName),
                                                t.identifier(controllerName),
                                                false,
                                                true,
                                            )
                                        )
                                    }
                                }
                                path.skip();
                            }
                        });
                        path.skip();
                    }
                });
                const output = generate(ast, {}, data);
                fs.writeFile(controller, output.code, err => {
                    if (err) throw err;
                    success(`${name}.js 已配置`);
                    resolve();
                });
            });
        } else {
            fs.writeFile(controller, newControllerFile(fileName), err => {
                if (err) throw err;
                success(`${name}.js 已配置`);
                resolve();
            })
        }
    })
})

const initPage = (path, fileName) => {
    isExist(path).then(exist => {
        if (exist) {
            error(`指定目录已经存在, 请检查src ${fileName}`);
            process.exit(0);
        } else {
            addController(fileName);
        }
    })
}

module.exports = initPage;
