const getModuleTemplates = (page) => {
    const {modules} = page;
    let templates = modules.map((mod) => {
        return `<mod${mod.aid} ref="${mod.ref}"></mod${mod.aid}>`
    });
    return templates.join('\n');
};

const getTemplate = (page) => {
    return `
        <div class="content">
            ${getModuleTemplates(page)}
        </div>
    `;
};

module.exports = getTemplate;
