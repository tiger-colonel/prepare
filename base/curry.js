function curry1(fn) {
    let args = [].slice.call(arguments, 1);
    return function() {
        let newArgs = [..arguments].concat(args);
        fn.apply(this, newArgs);
    }
}

function progressCurry(fn, args1) {
    let self = this;
    let len = fn.length;
    let args = args1 || [];

    return function() {
        let newArgs = args.concat([...arguments].slice());
        if (newArgs.length < len) {
            return progressCurry.call(self, fn, newArgs)
        }
        return fn.apply(self, newArgs);
    }
}

function curry2(fn, ...args) {
    if (fn.length <= args.length) {
        return fn(...args)
    }
    return function(...args2) {
        return curry2(fn, ...args, ...args2);
    }
}


var curry = fn => judge = (...args) => args.length === fn.length
            ? fn(...args)
            : (arg) => judge(...args, arg)
let arrowCurry = fn => 
    judge = (...args) => args.length === fn.length 
        ? fn(...args) 
        : (arg) => judge(...args, arg)

function add(a, b, c, d, e ) {
    return a + b + c + d + e;
}

let test = curry(add);
test(1);



