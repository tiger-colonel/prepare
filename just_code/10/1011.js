// 1. 数组扁平化
function flat(arr) {
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? flat(v) : v), []);
}
// console.log('-----flat-----', flat([1,2,[3,4,5, [6,7]]]));
// 2. 数组去重
function unique(arr) {
    return arr.myReduce((t,v) => (t.includes(v) ? t : t.push(v) , t), []);
}
// console.log('-----unique-----', unique([1,2,2,2,2,3]));
// 3. reduce
Array.prototype.myReduce = function(callback, initialValue) {
    const ctx = this;
    const len = ctx.length;
    let i = 0;
    let accumulator = initialValue || ctx[0];
    while (i < len) {
        accumulator = callback.call(null, accumulator, ctx[i], i, ctx);
        i++;
    }
    return accumulator;
}

// 4. call
Function.prototype.myCall = function(context = window, args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...args)
    delete context[fn];
    return res;
}

// 5. apply
Function.prototype.myCall = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...args)
    delete context[fn];
    return res;
}

// 6. bind
Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    let self = this;
    return function F() {
        if (this instanceof F) {
            return new self(...args, ...arguments)
        }
        return self.apply(context, [...args, ...arguments])
    }
}

// 7. 防抖, 是清零
function debounce(fn, wait) {
    let timer;
    return function() {
        cleanTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, ...arguments)
        }, wait);
    }
}

// 8. 节流 是加锁
function debounce(fn, wait) {
    let flag = true;
    return function() {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(fn, ...arguments);
            flag = true;
        }, wait);
    }
}

// 9. 函数柯里化
function add() {
    const _args = [...arguments];
    function fn() {
        _args.push(...arguments);
        return fn;
    }
    fn.valueOf = function() {
        return _args.reduce((t,v) => t + v)
    }
    return fn;
}
console.log('-----add(1)(2)(3)(4)-----', add(1)(1,2,3)(2).valueOf());

