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


function myBind(context, args) {
    let self = this;
    return function F() {
        if (this instanceof F) {
            return new self(...args, ...arguments)
        }
        return self.call(context, ...args, ...arguments)
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
function throttle(fn, wait) {
    let flag = true;
    return function() {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, ...arguments);
            flag = true;
        }, wait);
    }
}

function throttle(fn, wait) {
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.call(this, ...arguments);
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


// 10. new
function factory(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new Error('Type Error')
    }
    const obj = Object.create(ctor.prototype);
    const res = ctor.call(obj, ...args);
    return typeof res === 'object' ? res : obj;
}

// 11. instanceof
function myInstanceOf(left, right) {
    if (typeof left !== 'object' || typeof left === null) {
        return false;
    }
    let proto = left.__proto__;
    let prototype = right.prototype;
    while(true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = proto.__proto__;
    }
}

// 12.组合寄生继承
function extend(parent, child) {
    let prototype = Object.create(parent);
    prototype.contructor = child;
    child.prototype = prototype;
}

// Object.create()
function create(proto) {
    function F() {};
    F.prototype = proto;
    return new F();
}

// deepclone
function deepclone(target, map = new Map()) {
    if (typeof target !== 'object' || typeof !== 'function') {
        return target;
    }
    
    if (map.has(target)) return map.get(target);

    let cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (const key in target) {
        cloneTarget[key] = deepclone(target[key], map)
    }
    return cloneTarget;
}

