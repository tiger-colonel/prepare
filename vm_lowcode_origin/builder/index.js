const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const logger = require('../utils/logger');
const WebpackConfigManager = require('./webpack_config_manager');
const Scaffold = require('./scaffold');
const {ERROR} = require('../constant');
const {
    tempFilePath,
    localDistPath,
} = require('../config');

class Builder {
    constructor() {
    }
    async run(option = {}) {
        this.option = option || {};
        const webpackConfigManager = new WebpackConfigManager();
        const scaffold = new Scaffold(option);
        webpackConfigManager.updateConfig({
            entry: scaffold.entryFile,
            dirId: option.codeDirId,
            basePath: tempFilePath,
        });

        const webpackConfig = webpackConfigManager.getConfig();
        return await new Promise((resolve) => {
            const compiler = webpack(webpackConfig);
            compiler.run((err, stats) => {
                resolve({
                    result: this.getResourceContent({err, stats}), // {html: xxx, js: xxx, css: xx}
                    err: this.formatError(stats), // [{type: xxx, errs: []}]
                });
            });
        });
    }
    getResourceContent(compilerResult) {
        let result = {};
        if (!compilerResult.stats.hasErrors()) {
            result = {
                js: fs.readFileSync(this.getFileAbsPath('index.js')).toString(),
                html: fs.readFileSync(this.getFileAbsPath('index.html')).toString(),
            };
            const cssFilePath = this.getFileAbsPath('index.css');
            if (fs.existsSync(cssFilePath)) {
                result.css = fs.readFileSync(cssFilePath).toString();
            }
        } else {
            this.printError(compilerResult);
        }
        return result;
    }
    getFileAbsPath(filename) {
        return path.join(localDistPath, this.option.codeDirId, filename);
    }
    formatError(stats) {
        let result = [];
        if (stats.hasErrors()) {
            result = [
                {
                    type: ERROR.UNKNOWN,
                    errs: stats.toJson().errors,
                },
            ];
        }
        return result;
    }
    printError(compilerResult) {
        const {stats, err} = compilerResult;
        const result = {
            toString: () => stats.toString({
                warning: false,
                version: false,
                hash: false,
                assets: true,
                modules: false,
                chunkModules: false,
                chunkOrigins: false,
                children: false,
                chunks: false,
                colors: true,
            }),
        };
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
        }
        if (stats.hasErrors()) {
            logger.error('编译失败， 进程退出');
            logger.error(stats.toJson().errors);
        } else {
            logger.success('编译成功');
            console.log('编译结果：\n', result.toString());
        }
        console.log('');
    }
}

module.exports = Builder;
