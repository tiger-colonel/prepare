function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) {
        throw new Error('circle ')
    }
    let called;
    if (typeof promise2 !== null && (typeof promise2 !== 'object' && typeof promise2 === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then(value => {
                    if (called) return ;
                    called = true;
                    resolvePromise(value, promise2, resolve, reject)
                }, err => {
                    if (called) return ;
                    called = true;
                    reject(err)
                })
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return ;
            called = true;
            reject(console.error(123))
        }
    } else {
        resolve(x);
    }
}
class MyPromise {
    constructor(exectutor) {
        this.state = 'pending';
        this.value = '';
        this.reason = '';
        this.resolvedFnCallbacks = [];
        this.rejectedFnCallbacks = [];
        let resolve = (value) => {
            this.state = 'fulfilled';
            this.value = value;
            this.resolvedFnCallbacks.forEach(cb => cb())
        }
        let reject = (reason) => {
            this.state = 'rejected';
            this.reason = reason;
            this.rejectedFnCallbacks.forEach(cb => cb())
        }
        try {
            exectutor(resolve, reject)
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'pending') {
                this.resolvedFnCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve,reject)
                    });
                })
                this.rejectedFnCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject)
                    });
                })
            }
            if (this.state === 'fulfilled') {
                this.resolvedFnCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve,reject)
                    });
                })
            }
            if (this.state === 'rejected') {
                this.rejectedFnCallbacks.push(() => {
                    setTimeout(() => {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject)
                    });
                })
            }
        })
        return promise2;
    }
    all(promises) {
        let arr = [];
        return new Promise((resolve, reject) => {
            for(let i = 0, len = promises.length; i < len; i++) {
                promises[i].then(data => {
                    arr.push(data);
                })
                if (arr.length === len) {
                    resolve(arr);
                }
            }
        })
    }
    all1(promises) {
        let arr = [];
        let i = 0;
        function processData(index, data, resolve) {
            arr[i] = data;
            i++
            if (i === promises.length) {
                resolve(arr)
            }
        }
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(data => {
                    processData(i, data, resolve)
                }, reject)
            }
        })
    }
}

function resolvePromise1(x, promise2, resolve, reject) {
    if (x === promise2) {
        reject('circle')
    }
    let called;
    if (typeof != null && (typeof promise2 === 'object' || typeof promise2 === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then(value=> {
                    if (called) return;
                    called = true;
                    resolvePromise1(value, promise2, resolve, reject)
                }, reason => {
                    if (called) return;
                    called = true;
                    reject(reason)
                })
            } else {
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error)
        }
        
    } else {
        resolve(x)
    }
}

class MyPromise1 {
    constructor(exectutor) {
        this.state = 'pending';
        this.value = '';
        this.reason = '';
        this.onFulfilledCbs = [];
        this.onRejectedCbs = [];
        let resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCbs.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCbs.forEach(fn => fn())
            }
        }
        try {
            exectutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : value => value;
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'pending') {
                this.onFulfilledCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise1(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
                this.onRejectedCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise1(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    });
                })
            }
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise1(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value);
                        resolvePromise1(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                });
            }
        })
        return promise2;
    }
}
