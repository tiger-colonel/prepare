
const path = require('path');
const fs = require('fs-extra');
const mixinConfig = require('./mixins/config');
const camelize = (name) => name.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase());
const substitute = (str, obj) => str.replace(/\{\{(.*?)\}\}/g, (all, key) => obj[key] || '');
const readFile = (file) => {
    return fs.readFileSync(file, {encoding: 'utf-8'});
};

const importPageModules = (page) => {
    let components = [];
    let imports = [];
    page.modules.forEach((mod) => {
        let {aid, codePath} = mod;
        let componentName = `Mod${aid}`;
        imports.push(`import ${componentName} from '${codePath}'`);
        components.push(componentName);
    });
    return {
        importComponents: imports.join('\n'),
        components: components.join(',\n'),
    };
};

const getMixins = (page) => {
    let keys = [];
    let vars = [];
    mixinConfig.forEach((name) => {
        let mixinFile = path.join(__dirname, `./mixins/${name}.js`);
        let key = `${camelize(name)}Mixin`;
        let content = readFile(mixinFile);
        keys.push(key);
        vars.push(`const ${key} = ${substitute(content, page)}`);
    });
    return {
        mixinVars: vars.join('\n'),
        mixins: keys.join(',\n'),
    };
}


const getScript = (page) => {
    const {importComponents, components} = importPageModules(page);
    const {mixinVars, mixins} = getMixins(page);
    return `
        const page = ${JSON.stringify(page, null, 4)};
        const modList = page.modules || [];
        ${readFile(path.join(__dirname, './import_npms.js'))}
        ${importComponents}
        ${mixinVars}
        export default {
            mixins: [${mixins}],
            components: {${components}},
            data() {
                return {
                    pageData: {
                        pid: ${page.pid},
                    },
                    modList,
                };
            },
            methods: {

            },
        };
    `
}

module.exports = getScript;
