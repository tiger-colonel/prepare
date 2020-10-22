const path = require('path');
const fs = require('fs-extra');
const {localSrcPath} = require('../../config');

class Scaffold {
    constructor(options) {
        this.options = options || {};
        this.generateProjectDir();
        this.addEntryFile();
    }
    generateProjectDir() {
        if (!fs.existsSync(localSrcPath)) {
            fs.mkdirsSync(localSrcPath);
        }
        if (!fs.existsSync(this.options.codeDir)) {
            fs.mkdirSync(this.options.codeDir);
        }
    }
    addEntryFile() {
        this.entryFile = path.join(this.options.codeDir, 'index.js');
        fs.copyFileSync(path.join(__dirname, './template/index.js'), this.entryFile);
    }
}

module.exports = Scaffold;
