const _ = require('lodash');
const moduleParsers = require('./module_parser');
const userService = require('../../user');

class CodeError {
    constructor() {
        this.errorTypeMap = {
            0: {
                parser: 'moduleParser',
            },
            1: {
                parser: 'jsParser',
            },
        };
    }
    unknownError(err) {
        const code = 'VM_UNKNOWN_ERROR';
        const msgList = [
            '渲染错误',
            `Code: ${code}`,
            `报错信息: ${err.message}`,
            err.stack.replace(/\/data\/webroot\/console_lemo\/app\/service/gm, ''),
        ]
        return {
            code,
            message: msgList.join('\n\n'),
        };
    }
    async throwWebError({
        pid,
        errList,
    }) {
        const err = _.last(errList) || {};
        const {type} = err; // constant.js 0, 1, ...
        if (typeof type === 'undefined') {
            err.message = '未知错误类型, 缺少type参数';
            this.throwParamsError({
                pid,
                err,
            });
        }
        let errorType = this.errorTypeMap[type];
        if (!errorType || typeof this[errorType.parser] !== 'function') {
            err.message = `type=${type}-${errorType.parser}未做错误处理`;
            this.throwParamsError({
                pid,
                err,
            });
        }
        let parserResult = await this[errorType.parser]({err});
        const message = Object.assign(
            {
                filename: '',
                message: '',
                pid,
            },
            parserResult,
        )
        this.throwError(message);
    }
    throwParamsError({
        pid,
        err,
    }) {
        this.throwError({
            pid,
            title: '返回值错误',
            code: 'RETURN_ERROR',
            err,
        });
    }
    throwError({
        title,
        pid,
        code,
        filename,
        message,
    }) {
        const messages = [
            title,
            `Code: ${code}`,
            `Pid: ${pid}`,
            `位置: ${filename}`,
        ];
        const msg = [
            messages.join('\n'),
            '*********** 详细信息 **********',
            message,
        ].join('\n\n');
        const err = new Error(msg);
        err.code = code;
        throw err;
    }
    moduleParser({err}) {
        return moduleParsers({errObj: err});
    }
    jsParser(err) {

    }
    throwMultiVersionError({
        pid,
        mid,
        mList,
        record,
        params,
    }) {
        let mutiStr = _.map(mList, (one) => {
            const {
                position,
                aid,
                versionString,
            } = one;
            return `  * 版本${versionString}(编号${aid}，位置${position})`;
        }).join('\n');

        this._throwError({
            title: `多版本：[${record.title}]模块(id=${mid})存在多版本`,
            pid,
            mid,
            code: 'VM_MULTI_VERSION_ERROR',
            message: `\n${mutiStr}`,
            params,
        });
    }
    throwMidNotFoundError({
        pid,
        mid,
        aid,
        position,
        params,
    }) {
        this._throwError({
            title: `DB：未找到模块(id=${mid})`,
            pid,
            aid,
            position,
            code: 'VM_DB_MID_NOT_FOUND_ERROR',
            params,
        });
    }
    async throwRenderForbinError({
        pid,
        mid,
        aid,
        position,
        params,
        record,
    }) {
        let {
            title,
            change_log,
            author_user_id,
            ctime,
        } = record;
        const userQuery = await userService.getQuery();
        const user = await userQuery
            .where({
                id: author_user_id,
            })
            .selectOne();
        this._throwError({
            title: `禁止渲染：[${title}]模块(id=${mid})`,
            pid,
            aid,
            position,
            code: 'VM_RENDER_FORBIN_ERROR',
            message: [
                '',
                `  * 修改者：${user.name}`,
                `  * 时间：${dateFns.format(ctime * 1000, 'YYYY-MM-DD HH:mm')}`,
                `  * 备注：${change_log}`,
            ].join('\n'),
            params,
        });
    }
}

module.exports = new CodeError();
