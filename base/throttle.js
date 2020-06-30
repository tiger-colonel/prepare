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

