const template = require('./code_segment/template');
const script = require('./code_segment/script');
const style = require('./code_segment/style');

module.exports = (page) => {
    return `
        <template>${template(page)}</template>
        <script>${script(page)}</script>
        <style lang="less">${style()}</style>
    `;
};
