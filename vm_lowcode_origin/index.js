/* eslint-disable */
const edUtil = require('../../utils/encodeDecode');
const timeUtil = require('../../utils/time');
const error = require('./code_error');
const Module = require('./Module');
const Builder = require('./builder');
const generator = require('./generator');
const Page = require('./Page');
const {uploadFile} = require('./remote_manger');

// Vm (virtual machine)
class Vm {
    constructor(obj) {
        // let {appId} = obj;
        // appId = appId || 1;
        this.builder = new Builder();
        this.page = new Page();
    }
    // 流程：组织页面和模块关系->生成页面代码->保存到本地->构建打包->上传到远程->保存文件路径到数据库（不在这做）
    async render(obj, type) {
        let {page, builder} = this;
        let {modules} = obj;
        let mOutputs = {};
        let moduleAttrs = [];
        if (type === 'module') {
            modules = [obj];
        }
        if (type === 'page') {
            let {sourceCode} = obj;
            page.addAttr({
                codeSegment: sourceCode || '{}',
            });
            modules = await Module.findByAttrs(modules);
            console.log('-------------modules data-------', modules);
        }
        try {
            await Promise.all((modules || []).map(async (mod) => {
                let module = new Module(mod);
                mOutputs[mod.aid || 1] = mod.mOutput;
                await page.addModule(module);
                moduleAttrs.push(module.getFrontAttr());
            }));
            page.addAttr({
                mOutputJSON: await uploadFile(`output_${Date.now()}.json`, JSON.stringify(mOutputs)),
            });
            const pageSourceCode = generator(Object.assign({}, page, {
                modules: moduleAttrs,
            }));
            page.addAttr({
                sourceCode: pageSourceCode,
            });
            page.saveSourceCode(pageSourceCode);
            const resp = await builder.run(page);
            const {result, err} = resp;
            if (err.length) {
                await error.throwWebError({
                    pid: this.page.pid,
                    errList: err,
                });
            }
            const resources = await this.uploadToRemote(result);
            return this.renderSuccess(resources);
        } catch (e) {
            return this.renderFail(e);
        }
    }
    async uploadToRemote(resources) {
        const {
            html, js, css,
        } = resources;
        const now = String(timeUtil.getCurrentTimestamp());
        const jsUrl = await this.uploadResource(now, js, 'js');
        let cssUrl = '';
        let htmlDocContent = html.replace('src="{{js}}"', `src="${this.removeProcotol(jsUrl)}"`);
        if (css) {
            cssUrl = await this.uploadResource(now, css, 'css');
            htmlDocContent = htmlDocContent.replace('href="{{css}}"', `href="${this.removeProcotol(cssUrl)}"`);
        }
        const htmlUrl = await this.uploadResource(now, htmlDocContent, 'html');
        return {
            html: htmlUrl,
            js: [jsUrl],
            css: [cssUrl],
        };
    }
    uploadResource(timestamp, content, extname) {
        let filename = `${this.page.pid}/${timestamp}_${edUtil.md5(content, 8)}.${extname}`;
        return uploadFile(filename, content);
    }
    removeProcotol(url) {
        if (!url) {
            return '';
        }
        return url.replace(/^http(s)?:/, '');
    }
    renderSuccess(resp) {
        console.log('------- preview url: ', resp);
        return {
            success: true,
            data: resp,
        };
    }
    renderFail(e) {
        console.error('-------- error: ', e);
        if (!e.code) {
            Object.assign(e, error.unknownError(e));
        }
        return {
            success: false,
            code: e.code,
            message: e.message,
        };
    }
}

module.exports = Vm;
