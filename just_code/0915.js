// 股票最大收益 121  只能买卖一次
function maxProfix(prices) {
    let min = prices[0];
    let sum = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
            // continue;
        }
        sum = Math.max(min - prices[i], sum)
    }
    return sum;
}

// 节流， 给事件加锁，1. 监听页面滚动事件，2 input 实时搜索
function throttle(fn, wait) {
    let timer;
    return function(...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, wait);
    }
}
// 防抖， 事件清零，1. 发短信，2. 调整浏览器窗口大小，
function debounce(fn, wait) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    }
}

// bind 
function myBind(context, ...args) {
    return (...newArgs) => {
        context.apply(context, ...args.concat(...newArgs))
    }
}
