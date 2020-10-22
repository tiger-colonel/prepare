/* eslint-disable max-len */
const readline = require('readline');
const fs = require('fs-extra');
const _ = require('lodash');

class ParseModuleBase {
    constructor({
        errLines,
        code,
        title,
    }) {
        this.errLines = errLines;
        this.code = code;
        this.title = title;
        this.contextLines = 6;
    }
    isMyError() {
        const line = this.errLines[0];
        if (line.indexOf('&type=script&') > -1) {
            return true;
        }
        return false;
    }
    removeFilenameSensitiveStr(filename) {
        return filename.replace(/.*\/console_lemo\//, '');
    }
    /**
     * eg:
     * ERROR in /Users/dylan/work/console/console_lemo/tmp/vm/1582122292362/module/0_0.0.vue?vue&type=script&lang=js& (/Users/dylan/work/console/console_lemo/node_modules/babel-loader/lib!./lib/ast/ast-js.js??ref--1-1!./node_modules/vue-loader/lib??vue-loader-options!/Users/dylan/work/console/console_lemo/tmp/vm/1582122292362/module/0_0.0.vue?vue&type=script&lang=js&)
Module build failed (from ./lib/ast/ast-js.js):
Error: SyntaxError: Unexpected token, expected "," (17:9)
     */
    async parseFilename() {
        const {errLines} = this;
        const fileLine = errLines[0].replace('ERROR in ', '');
        let [name] = fileLine.split('?');
        name = name.trim();
        const isExit = await fs.exists(name);
        if (isExit) {
            return name;
        }
        return '';
    }
    _handelOneLine({
        cxtLineNum,
        curLineNum,
        contextLines,
        line,
        lineData,
    }) {
        const preStart = cxtLineNum - contextLines;
        const preEnd = cxtLineNum - 1;
        const postStart = cxtLineNum + 1;
        const postEnd = cxtLineNum + contextLines;
        const isNotBegin = curLineNum < preStart;
        const isPreLine = (curLineNum >= preStart && curLineNum <= preEnd);
        const isCurLine = curLineNum === cxtLineNum;
        const isPostLine = (curLineNum >= postStart && curLineNum <= postEnd);

        if (isNotBegin) {
            return;
        }
        if (isPreLine) {
            lineData.preLines.push(line);
            return;
        }
        if (isCurLine) {
            lineData.contextLine = line;
            return;
        }
        if (isPostLine) {
            lineData.postLines.push(line);
            return;
        }

        // eslint-disable-next-line consistent-return
        return true;
    }
    async getFileContextContentFromFilename({
        filename,
        lineNumber,
    }) {
        const result = await new Promise((resolve) => {
            const rl = readline.createInterface({
                input: fs.createReadStream(filename),
                output: process.stdout,
                terminal: false,
            });
            let lineData = {
                preLines: [],
                contextLine: '',
                postLines: [],
            };
            let curLineNum = 0;
            rl.on('line', (line) => {
                curLineNum = curLineNum + 1;
                const isEnd = this._handelOneLine({
                    cxtLineNum: lineNumber,
                    curLineNum,
                    contextLines: this.contextLines,
                    line,
                    lineData,
                });

                isEnd && rl.close();
            });
            rl.on('close', () => {
                resolve(lineData);
            });
        });

        return result;
    }
    getFileContextContentFromContent({
        fileContent,
        lineNumber: LINE_NUMBER,
    }) {
        let lineData = {
            preLines: [],
            contextLine: '',
            postLines: [],
        };
        _.some(fileContent.split(/\r?\n/), (line, index) => {
            const curLineNum = index + 1;
            const isEnd =  this._handelOneLine({
                cxtLineNum: LINE_NUMBER,
                curLineNum,
                contextLines: this.contextLines,
                line,
                lineData,
            });
            return isEnd;
        });
        return lineData;
    }
    getFileContextContent({
        fileContent,
        filename,
        lineNumber,
    }) {
        if (fileContent) {
            return this.getFileContextContentFromContent({
                fileContent,
                lineNumber,
            });
        }
        return this.getFileContextContentFromFilename({
            filename,
            lineNumber,
        });
    }
    async formatOutput(data) {
        const {
            filename,
            fileContent,
            line: LINE_NUMBER,
            column,
            errMsg,
        } = data;
        const {
            preLines,
            contextLine,
            postLines,
        } = await this.getFileContextContent({
            fileContent,
            filename,
            lineNumber: LINE_NUMBER,
        });
        const uiFilename = this.removeFilenameSensitiveStr(data.filename);

        const contextLines = [
            ...preLines,
            contextLine,
            ...postLines,
        ];
        const errTitle = errMsg;
        const START_LINE_NUMBER = LINE_NUMBER - preLines.length;
        const errCode = _.map(contextLines, (line, index) => {
            const num = index + START_LINE_NUMBER;
            let withNumber = `${num}  ${line}`;
            if (num === LINE_NUMBER) {
                withNumber = `> ${withNumber}`;
            }
            return withNumber;
        });
        const message = [
            errTitle,
            '',
            ...errCode,
        ].join('\n');

        return {
            code: this.code,
            title: this.title,
            filename: `${uiFilename} at (${LINE_NUMBER}:${column})`,
            message,
        };
    }
}

module.exports = ParseModuleBase;
