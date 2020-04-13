function call(context) {
    if (typeof this !== 'function') {
        throw new Error('error')
    }

    const context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}
