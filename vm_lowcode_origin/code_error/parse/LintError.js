const Base = require('./ParseModuleBase');
const _ = require('lodash');

class LintErrorParse extends Base {
    constructor(errList) {
        let errors = [];
        try {
            const firstErrors = JSON.parse(errList[0]);
            errors = firstErrors.errors;
        } catch (e) {}
        super({
            errLines: errors,
            code: 'WEB_LINT_ERROR',
            title: '模块 LINT 错误',
        });
    }
    isMyError() {
        const line = this.errLines[0];
        try {
            const {
                file,
                result,
            } = line;
            const {
                script,
                style,
                template,
            } = result;
            if (typeof file !== 'string') {
                return false;
            }
            if (Array.isArray(script) && Array.isArray(style) && Array.isArray(template)) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }
    parse() {
        const firstFileError = this.errLines[0];
        const {
            file: filename,
            result,
        } = firstFileError;
        const {
            script,
            style,
            template,
        } = result;
        const firstLintError = script[0] || style[0] || template[0];
        /**
            ruleId: "catalyst/script/document-not-supported"
            severity: 2
            message: "由于输出端的限制，不支持将 document 作为全局变量."
            line: 229
            column: 32
            nodeType: "MemberExpression"
            source: "                const script = document.createElement('script');"
            messageId: "memExpr"
            endLine: 229
            endColumn: 54
            text: "由于输出端的限制，不支持将 document 作为全局变量."
            rule: "catalyst/script/document-not-supported"
        */
        const allLineError = [...script, ...style, ...template];
        const errLines = allLineError.map((one) => `line ${one.line}: ${one.text}`);
        let errMsg = `Error: ${firstLintError.text}\nRule: ${firstLintError.rule}`;
        if (errLines.length > 1) {
            errMsg = [
                `Current Error: ${firstLintError.text}`,
                `Other Errors:`,
                ..._.map(errLines.slice(1), (one) => `  * ${one}`),
            ].join('\n');
        }
        return this.formatOutput({
            filename,
            line: firstLintError.line,
            column: firstLintError.column || 0,
            errMsg,
        });
    }
}

module.exports = LintErrorParse;
