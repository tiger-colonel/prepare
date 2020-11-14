const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const parse = require('babylon').parse;
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const generate = require('babel-generator').default;
const template = require('babel-template')

let controllersPath = path.resolve(__dirname, './controllers/test2.js');

const controllerTmpl = template(`
const CONTROLLER_NAME = async function (ctx, next) {
    await ctx.render(PATH, {
        title: '页面标题',
        path: PATH,
    });
    return next();
};
`);

let depth = 0;
fs.readFile(controllersPath, 'utf8', (err, res) => {
    let code = parse(res);
    traverse(code, {
        ExpressionStatement(path) {
            let operateStatement = path;
            operateStatement.traverse({
                MemberExpression(path) {
                    let a = path.get('object').isIdentifier({name: 'module'});
                    if (a) {
                        const ast = controllerTmpl({
                            CONTROLLER_NAME: t.identifier('test1'),
                            PATH: t.stringLiteral('/test1'),
                        });
                        operateStatement.insertBefore(ast);
                    }
                    path.skip();
                }
            });
            path.skip();
        },
    });
    const output = generate(code, {}, res);
    fs.writeFile(controllersPath, output.code, (err, res) => {
        console.log(res)
    })
})


