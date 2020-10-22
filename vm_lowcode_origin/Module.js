const path = require('path');
const fs = require('fs-extra');
const {axios} = require('@console/base');
const edUtil = require('../../utils/encodeDecode');
const timeUtil = require('../../utils/time');
const moduleVersionService = require('../lowcode/module_version');
const config = require('./config');
const vmError = require('./code_error');
const {localSrcPath} = config;
const defaultAttr = {
    moduleId: 0,
    versionString: '0.0',
    apiDesc: '',
    postition: 1,
    aid: 1,
    sourceCode: '',
    mOutput: '',
    ref: '',
    z_index: '',
    codePath: '',
};
class Module {
    constructor(data) {
        Object.assign(this, defaultAttr, data);
    }
    // 返回模块代码的本地存储路径
    async saveSourceCode() {
        let {
            moduleId,
            sourceCode: code,
            versionString,
            codePath,
        } = this;
        if (codePath) { // 数据表中已保存过源码(远程)
            // let resp = await axios({url: codePath});
            // code = resp.data;
            return Promise.resolve(codePath);
        }
        if (!code) {
            // todo: throw error
            code = '';
        }
        const md5 = edUtil.md5(code, 6);
        const filename = `${moduleId}_${versionString}-${md5}.vue`;
        return this.saveFile(code, filename);
    }
    async saveFile(code, filename) {
        const ts = timeUtil.getCurrentTimestamp();
        const filePath = path.join(localSrcPath, 'modules', String(ts), filename);
        const buffer = Buffer.from(code, 'utf8');
        this.codePath = filePath;
        await fs.ensureFile(filePath);
        await fs.writeFile(filePath, buffer);
        return filePath;
    }
    addAttr(attr) {
        Object.assign(this, attr);
    }
    // 前台页面展示的模块数据
    getFrontAttr() {
        let {
            moduleId,
            versionString,
            apiDesc,
            position,
            aid,
            mOutput,
            mNote,
            ref,
            z_index,
            codePath,
        } = this;
        return {
            moduleId,
            versionString,
            apiDesc,
            position,
            aid,
            mOutput,
            mNote,
            ref,
            z_index,
            codePath,
        };
    }
    getMetaAttr() {
        let {
            aid,
            moduleId,
            versionString,
            mOutput,
            codePath,
        } = this;
        return {
            aid,
            moduleId,
            versionString,
            mOutput,
            codePath,
        };
    }
};

const downloadToLocal = async (mod, code) => {
    const {mid: moduleId, versionString} = mod;
    const md5 = edUtil.md5(code, 6);
    const filename = `${moduleId}_${versionString}-${md5}.vue`;
    const ts = timeUtil.getCurrentTimestamp();
    const filePath = path.join(localSrcPath, 'modules', String(ts), filename);
    const buffer = Buffer.from(code, 'utf8');
    await fs.ensureFile(filePath);
    await fs.writeFile(filePath, buffer);
    return {
        codePath: filePath,
        mod,
    };
};

const request = async (mod) => {
    let resp = await axios({url: mod.codePath});
    return {
        code: resp.data,
        mod,
    };
};

/**
 * 入参：
 * modules: [{aid, mvid, mOutput, mNote, versionString}, ...]
 */
Module.findByAttrs = async (modules) => {
    let vIdMap = {};
    let result = [];

    // 取出模块（版本模块）的源码路径
    const versionIds = modules.map((mod) => mod.mvid);
    const records = await moduleVersionService.findByIds(versionIds) || [];
    records.forEach((record) => {
        let {
            source_files: sourceFiles,
            output_api_json: apiJson,
            version_x: mainVer,
            version_y: minorVer,
            module_id: mid,
        } = record;
        let codePath = '';
        let apiDesc = {};
        try {
            codePath = JSON.parse(sourceFiles || '{}').main;
            apiDesc = JSON.parse(apiJson || '{}');
        } catch(e) {};
        vIdMap[record.id] = {
            codePath,
            apiDesc,
            mid,
            versionString: `${mainVer}.${minorVer}`,
        };
    });

    // 添加模块属性：codePath
    modules.forEach((mod) => {
        let {
            mvid,
            aid,
            mOutput,
            mNote='',
            position,
        } = mod;
        let record = vIdMap[mvid];
        // if (!record) {
        //     vmError.throwMidNotFoundError({
        //         pid: record.pid,
        //         mid,
        //         aid,
        //         position,
        //         params: mod,
        //     });
        // }
        // let sameVersion = {};
        // let key = `${mid}-${mainVer}-${minorVer}`;
        // if (sameVersion[key]) {
        //     vmError.throwMultiVersionError({
        //         pid: record.pid,
        //         mid,
        //         mList: mod.versions,
        //         record,
        //         params: mod.versions,
        //     });
        // } else {
        //     sameVersion[key] = 1;
        // }
        // if (record.disabled) {
        //     vmError.throwRenderForbinError({
        //         pid: record.pid,
        //         mid,
        //         aid,
        //         position,
        //         record,
        //     });
        // }
        result.push(Object.assign({}, {
            mvid,
            aid,
            mOutput,
            mNote,
        }, record));
    });

    const resp = await Promise.all(result.map((mod) => request(mod)))
        .catch((e) => {
            throw new Error(`获取模块代码失败:${e.message || ''}`);
        });
    const resp2 = await Promise.all(resp.map((data) => downloadToLocal(data.mod, data.code)))
        .catch((e) => {
            throw new Error(`下载模块代码失败:${e.message || ''}`);
        });
    let mods = [];
    resp2.forEach((data) => {
        let {codePath, mod} = data;
        mod.codePath = codePath;
        mods.push(mod);
    });
    return mods;
};

module.exports = Module;
