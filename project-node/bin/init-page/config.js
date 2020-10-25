
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

module.exports = {
    html,
    controllerTmpl,
    newControllerFile,
}
