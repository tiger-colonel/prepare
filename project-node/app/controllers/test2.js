const withdrawRule = async function (ctx, next) {
    await ctx.render('xretail/withdraw_rule', {
        title: '税率细则',
        path: 'xretail/withdraw_rule'
    });
    return next();
};

const test1 = async function (ctx, next) {
    await ctx.render('/test1', {
        title: '页面标题',
        path: '/test1'
    });
    return next();
};

module.exports = {
    withdrawRule
};