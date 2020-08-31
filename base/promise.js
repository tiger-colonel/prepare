const all = (promises) => {
    if (Array.isArray(promises)) {
        throw new Error('请传数组')
    }
    let count = 0;
    let arr = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promise[i].then(res => {
                arr[i] = res;
                count++;
                if (count === promises.length) {
                    resolve(arr);
                }
            }, err => {
                reject(err)
            })
        }
    })
}


function isObject(target) {
    return typeof !== null && (typeof target === 'object' || typeof target === 'function');
}
function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        return reject(new Error('循环引用'))
    }
    // 防止多次调用
    let called;
    if (isObject(x)) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(x, promise2, resolve, reject)
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err)
                })
            } else {
                if (called) return;
                called = true;
                resolve(x)
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
    } else {
        resolve(x);
    }
}
class Promise {
    constructor(exec) {
        let state = 'pending';
        let value;
        let reason;
        let resolvedFnCallbacks = [];
        let rejectedFnCallbacks = [];
        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.resolvedFnCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.rejectedFnCallbacks.forEach(fn => fn())
            }
        }
        try {
            exec(resolve, reject);
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilledFn, onRejectedFn) {
        onFulfilledFn = typeof onFulfilledFn !== 'function' ? value => value : onFulfilledFn;
        onRejectedFn = typeof onRejectedFn !== 'function' ? err => { throw err }: onRejectedFn;
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilledFn(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejectedFn(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            if (this.state === 'pending') {
                this.resolvedFnCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilledFn(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    });
                });
                this.rejectedFnCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejectedFn(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    });
                });
            }
        })
        return promise2;
    }
}
