const test2 = async function (ctx, next) {
    await ctx.render('test2', {
        title: '页面标题',
        path: 'test2'
    });
    return next();
};

module.exports = {
    test2,
};
