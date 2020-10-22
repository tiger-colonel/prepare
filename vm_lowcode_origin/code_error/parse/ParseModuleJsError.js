const _ = require('lodash');
const Base = require('./ParseModuleBase');

/* eslint-disable max-len */
class ParseModuleJsError extends Base {
    constructor(errList) {
        const errLines = errList[0].split(/\r?\n/);
        super({
            errLines,
            code: 'CATALYST_MODULE_JS_PARSE_ERROR',
            title: '模块 JS 语法错误',
        });
    }
    isMyError() {
        const line = this.errLines[0];
        if (line.indexOf('&type=script&') > -1) {
            return true;
        }
        return false;
    }
    parseInfoLine() {
        const {errLines} = this;
        const infoLine = _.find(errLines, (line) => {
            let s1 = line.indexOf('Error: ') === 0;
            return s1;
        });
        if (!infoLine) {
            return null;
        }
        let [
            line,
            column,
        ] = infoLine.replace(/.*\((\d+):(\d+)\)$/, '$1:$2').split(':');
        if (!line) {
            return null;
        }
        return {
            infoLine,
            line: +line,
            column: +column,
        };
    }
    async parse() {
        const {errLines} = this;
        const filename = await this.parseFilename();
        if (!filename) {
            return {
                code: 'MODULE_JS_FILE_NOT_FOUND_ERROR',
                title: `${this.title}，但找不到报错文件`,
                message: errLines.join('\n'),
            };
        }
        const errInfo = this.parseInfoLine();
        if (!errInfo) {
            return {
                code: 'MODULE_JS_LINE_NOT_FOUND_ERROR',
                title: `${this.title}，但找不到报错行`,
                message: errLines.join('\n'),
            };
        }

        let {line} = errInfo;
        const contextData = await this.getFileContextContent({
            filename,
            lineNumber: line,
        });

        return this.formatOutput({
            filename,
            line,
            column: errInfo.column,
            errMsg: errInfo.infoLine,
            preLines: contextData.preLines,
            contextLine: contextData.contextLine,
            postLines: contextData.postLines,
        });
    }
}

module.exports = ParseModuleJsError;
