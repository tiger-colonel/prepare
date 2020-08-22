const all = (promises) => {
    return new Promise((resolve, reject) => {
        let arr = [];
        let len = promises.length;
        let count = 0;
        for (let i = 0; i < len; i++) {
            promises[i].then((res) => {
                arr[i] = res;
                count++;
                count === promises.length && resolve(arr);
            }, err => {
                reject(err)
            })
        }
    })
}

function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        reject(new Error('sb'))
    }
    if (typeof promise2 !== null && (typeof promise2 === 'function' || typeof promise2 === 'object')) {
        if (typeof x.then === 'function') {
            x.then(() => {
                resolvePromise(promise2, x, resolve, reject)
            })
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}
class Promise {
    constructor(exec) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.fulfilledCallbacks = [];
        this.rejectedCallbacks = [];

        let resolve = (value) => {
            this.state = 'fulfilled';
            this.value = value;
            this.fulfilledCallbacks.forEach(fn => fn());
        }
        let reject = (reason) => {
            this.state = 'rejected';
            this.reason = reason;
            this.rejectedCallbacks.forEach(fn => fn());
        }
        try {
            exec(resolve, reject)
        } catch (error) {
            reject(error)
        }
        
    }
    then(onFulfilledFn, onRejectedFn) {
        let promise2 = new Promise((resolve, reject) =>{
            if (this.state === 'fulfilled') {
                try {
                    setTimeout(() => {
                        let x = onFulfilledFn(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    });
                } catch (error) {
                    reject(error)
                }
            }
            if (this.state === 'rejected') {
                try {
                    setTimeout(() => {
                        let x = onRejectedFn(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    });
                } catch (error) {
                    reject(error)
                }
            }
            if (this.state === 'pending') {
                try {
                    this.fulfilledCallbacks.push(() => {
                        setTimeout(() => {
                            let x = onFulfilledFn(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        });
                    })
                    this.rejectedCallbacks.push(() => {
                        setTimeout(() => {
                            let x = onRejectedFn(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        });
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
        return promise2;
    }
}
