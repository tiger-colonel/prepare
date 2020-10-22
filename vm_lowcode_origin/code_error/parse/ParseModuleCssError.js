const Base = require('./ParseModuleBase');
const _ = require('lodash');

class ParseModuleCSSError extends Base {
    constructor(errList) {
        const errLines = errList[0].split(/\r?\n/);
        super({
            errLines,
            code: 'CATALYST_MODULE_CSS_PARSE_ERROR',
            title: '模块 CSS 语法错误',
        });
    }
    isMyError() {
        const line = this.errLines[0];
        if (line.indexOf('&type=style&') > -1) {
            return true;
        }
        return false;
    }
    async parse() {
        // eslint-disable-next-line max-len
        // eg: ERROR in /Users/dylan/work/console/console_lemo/tmp/vm/1582114173494/module/0_0.0.vue?vue&type=style&index=0&lang=less& (/Users/dylan/work/console/console_lemo/node_modules/extract-text-webpack-plugin/dist/loader.js??ref--3-0!/Users/dylan/work/console/console_lemo/node_modules/css-loader??ref--3-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!/Users/dylan/work/console/console_lemo/node_modules/less-loader/dist/cjs.js!./lib/ast/ast-css.js??ref--3-3!./node_modules/vue-loader/lib??vue-loader-options!/Users/dylan/work/console/console_lemo/tmp/vm/1582114173494/module/0_0.0.vue?vue&type=style&index=0&lang=less&)
        const {errLines} = this;
        const filename = await this.parseFilename();
        if (!filename) {
            return {
                code: 'MODULE_CSS_FILE_NOT_FOUND_ERROR',
                title: `${this.title}，但找不到报错文件`,
                message: errLines.join('\n'),
            };
        }
        const infoLine = _.find(errLines, (line) => {
            let s1 = line.indexOf('Error: {') === 0;
            return s1;
        });
        if (!infoLine) {
            return {
                code: 'MODULE_CSS_LINE_NOT_FOUND_ERROR',
                title: '找不到模块 css 错误行',
                message: errLines.join('\n'),
            };
        }
        let errInfo = null;
        try {
            const index = 'Error: '.length;
            errInfo = JSON.parse(infoLine.slice(index));
        } catch (error) {
            return {
                code: 'MODULE_CSS_JSON_ERROR',
                title: '解析模块 css 错误行出错',
                message: errLines.join('\n'),
            };
        }
        let {
            line,
            column,
            source,
        } = errInfo;
        const errMsg = errInfo.message || errInfo.reason;
        return this.formatOutput({
            filename,
            fileContent: source,
            line,
            column,
            errMsg: `Error: ${errMsg}`,
        });
    }
}

module.exports = ParseModuleCSSError;
