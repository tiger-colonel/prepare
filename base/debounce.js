function debounce1(fn, wait) {
    let timer;
    return function() {
        clearTimeout(timer)
        timer = setTimeout(fn, wait);
    }
}

function debounce2(fn, wait) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(fn, args)
        }, wait);
    }
}

function debounce3(fn, wait, flag) {
    let timer, result;
    return function() {
        let context = this;
        let args = arguments;

        if (timer) clearTimeout(timer)
        if (flag) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callNow) {
                result = fn.call(context, args)
            }
            return result;
        } else {
            timer = setTimeout(() => {
                fn.call(context, args)
            }, wait);
        }
    }
 }

function debounce4(fn, wait, flag) {
    let timer, result, debounce;
    
    debounce = function() {
        let context = this;
        let args = arguments;
        
        if (timer) clearTimeout(timer)
        if (flag) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null
            }, wait);
            if (callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait);
        }
        return result;
    }

    return debounce;
}
