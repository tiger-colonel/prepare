// 返回最后一次请求的值
function lastPromise(promiseFn) {
    let resetReturn;
    return function() {
        let cancel = false;
        if (resetReturn) resetReturn();
        let p = new Promise(resolve => {
          promiseFn().then(res => !cancel && resolve(res))
        })
        resetReturn = () => cancel = true;
        return p;
    }
}
let count = 1;
let promiseFn = () => new Promise(rs => setTimeout(() => {
  rs(count++)
}));
let lastFn = lastPromise(promiseFn);
lastFn().then(console.log)
lastFn().then(console.log)
lastFn().then(console.log)
