// 最长前缀 14
function longestCommonrefix(strs) {
    if (!strs.length) {
        return '';
    }
    let ans = strs[0];
    for(let i = 1; i < strs.length; i++) {
        let j = 0;
        'flow'
        for (; j < ans.length && j < strs[i].length; j++) {
            // break 的作用
            if (ans[j] !== strs[i][j]) break;
        }
        ans = ans.substr(0, j);
    }
    return ans;
}

console.log('-----longestCommonrefix-----', longestCommonrefix(['flower', 'flow', 'flabc']));

const all = (promises) => {
    let data = [];
    let count = 0;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(res => {
                count++;
                data[i] = res;
                if (count === promises.length) {
                    resolve(data);
                }
            }, reject)
        }
    });
}

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        throw new Error('重复引用')
    }
    let called;
    if (x !== null && typeof x === 'function' && typeof === 'object') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.called(y, () => {
                    if (called) return;
                    called = true;
                    resolvePromise(y, promise2, resolve, reject)
                }, err => {
                    if (called) return;
                    called = true;
                    reject(x);
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(x)
        }
    } else {
        resolve(x)
    }
}

class Promise {
    constructor(exec) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn(value));
            }
        }
        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn(reason))
            }
        }
        try {
            exec(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(resolvedFn, rejectedFn) {
        resolvedFn = typeof resolvedFn === 'function' ? resolvedFn : val => val;
        rejectedFn = typeof rejectedFn === 'function' ? rejectedFn : val => val;
        let promise2 = (resolve, reject) => {
            if (this.state === 'resolved') {
                setTimeout(() => {
                    try {
                        let x = resolvedFn(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                });
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = rejectedFn(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                });
            }
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = resolvedFn(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = rejectedFn(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    });
                })
            }
        }
        return promise2;
    }
}
