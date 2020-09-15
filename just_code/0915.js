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

// 节流， 给事件加锁，监听页面滚动事件，提高性能
function throttle(fn, wait) {
    let timer;
    if (timer) return;
    timer = setTimeout(() => {
        fn();
        clearTimeout(timer);
    }, wait);
}
// 防抖， 事件清零
function debounce(fn, wait) {
    let timer;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        fn();
    }, wait);
}

// bind 
function myBind(context, args) {
    
}
