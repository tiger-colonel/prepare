const path = require('path');
const fs = require('fs-extra');
const timeUtil = require('../../utils/time');
const {localSrcPath} = require('./config');

class Page {
    constructor() {
        this.pid = 0;
        this.moduleIndex = 0;
        this.modules = [];
        this.codeSegment = '{}';
    }
    async addModule(module) {
        let index = ++this.moduleIndex;
        await module.saveSourceCode();
        module.addAttr(Object.assign({
            postion: index,
            ref: `mod-${index}`,
            // z_index: z_index,
        }, module.getMetaAttr()));
        this.modules.push(module);
    }
    async saveSourceCode(code) {
        const ts = timeUtil.getCurrentTimestamp();
        const buffer = Buffer.from(code, 'utf8');
        this.codeDirId = `${String(ts)}_${this.pid}`;
        this.codeDir = path.join(localSrcPath, this.codeDirId);
        this.codePath= path.join(this.codeDir, 'index.vue');
        await fs.ensureFile(this.codePath);
        await fs.writeFile(this.codePath, buffer);
        return this.codePath;
    }
    addAttr(attr) {
        Object.assign(this, attr);
    }
};

module.exports = Page;
