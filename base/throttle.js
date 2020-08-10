// 节流
function throttle1(fn, delay) {
    let prev = Date.now();
    return function() {
        let context = this;
        let args = arguments;

        let now = Date.now();
        if (now-prev >= delay) {
            fn.apply(context, args);
            prev = Date.now();
        }
    }
}

function throttle2(fn, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            fn.apply(context, args);
        }
    }
}

function throttle3(fn, delay) {
    let timer, result;
    let previous = 0;

    let later = function() {
        previous = Date.now();
        timer = null;
        fn();
    } 

    let throttle = function() {
        let now = Date.now();
        let context = this;
        let args = arguments;
        // 距离下一次触发还有多久
        let remaining = delay - (now - previous);
        if (remaining < 0 || remaining > delay) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            fn.apply(context, args);
        } else if (!timer) {
            timer = setTimeout(later, remaining);
        }
    }
    return throttle;
}

function throttle4(fn, delay, flag) {

}

function throttle5(fn, delay) {
    let timer;
    let last = Date.now();
    return function() {
        let context = this;
        let args = arguments;

        let now = Date.now();
        if (now - last < delay) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(context, args)
            }, delay);
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}

// 面试版本
// 节流
let throttle = (fn, wait) => {
    let timer;
    return (...args) => {
        if (timer) return;
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, wait);
    }
}
// 防抖
let debounce = (fn, wait) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        setTimeout(() => {
            fn(...args);
        }, wait);
    }
}
// settimeout 实现 setInterval
function mysetInterval(fn, time) {
    function exec() {
        setTimeout(() => {
            fn();
            exec();
        }, time);
    }
    exec();
}

let timerWorker = {};
function mysetInterval1(fn, time) {
    let key = Symbol();
    function exec(fn, time) {
        timerWorker[key] = setTimeout(() => {
            fn();
            exec(f n, time);
        }, time);
    }
    exec(fn ,time)
}

function myClearInterval(key) {
    if (key in timerWorker) {
        clearTimeout(timerWorker[key]);
        delete timerWorker[key]
    }
}

function log() {
    console.log(1)
}
mysetInterval(log, 1000);

