function call(context) {
    if (typeof this !== 'function') {
        throw new Error('error')
    }

    const context = context || window;
    // 指向被调用的方法
    context.fn = this;
    // 获取传参
    const args = [...arguments].slice(1);
    // 得到执行结果
    const result = context.fn(...args);
    // 删除添加的方法
    delete context.fn;
    return result;
}

function myapply(context) {
    if (typeof this !== 'function') {
        throw new Error('error');
    }

    const context = context || window;
    context.fn = this;
    let args = arguments[1];
    let result = context.fn(args);
    delete context.fn;
    return result;
}
