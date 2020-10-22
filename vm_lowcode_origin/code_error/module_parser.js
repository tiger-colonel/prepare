const _ = require('lodash');
const LintError = require('./parse/LintError');
const ParseModuleJsError = require('./parse/ParseModuleJsError');
const ParseModuleCssError = require('./parse/ParseModuleCssError');

class ModuleError {
    constructor(parseList) {
        this.parseList = parseList;
    }
    handle({errObj}) {
        const {errs} = errObj;
        if (Array.isArray(errs)) {
            let parseClient = null;
            _.some(this.parseList, (OneParse) => {
                parseClient = new OneParse(errs);
                return parseClient.isMyError();
            });
            if (parseClient) {
                return parseClient.parse();
            }
            return {
                code: 'STACK_TYPE_PARSE_ERROR',
                title: 'STACK 解析 errType 错误',
                message: err.join('\n'),
            };
        }
        return {
            code: 'CATALYST_UNKNOWN_ERROR',
            title: '未捕获错误',
        };
    }
}

const moduleError = new ModuleError([
    LintError,
    ParseModuleCssError,
    ParseModuleJsError,
]);

module.exports = (...args) => moduleError.handle(...args);
