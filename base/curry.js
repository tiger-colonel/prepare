function curry1(fn) {
    let args = [].slice.call(arguments, 1);
    return function() {
        let newArgs = [...arguments].concat(args);
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


let arrowCurry = fn => 
    judge = (...args) => args.length === fn.length 
        ? fn(...args) 
        : (arg) => judge(...args, arg)

function add(a, b, c, d, e ) {
    return a + b + c + d + e;
}

// let test = curry(add);
// test(1);

// Add(1)(2)(3).sumOf(); // 6
// Add(1,2)(3)(4).sumOf(); // 10
// Add(1,2,...)(3)(4)(...).sumOf();

function add1() {
    let x = [...arguments];
    return function() {
        x.push(...arguments);
        return function() {
            x.push(...arguments)
            return x.reduce((t, v) => t + v)
        }
    }
}
function Add() {
    if (!Add.nums) Add.nums = [];
    Add.nums.push(...arguments);
    return Add;
}
Add.sumOf = () => {
    return Add.nums.reduce((t, v) => t + v)
}

// let add2 = x => y => z => x + y + z;

let a = Add(1, 2)(3)(9).sumOf();
console.log('-----a-----', a);




