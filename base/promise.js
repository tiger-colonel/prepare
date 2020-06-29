class MyPromise {
    constructor(executor) {
        let status = 'pending';
        let value;
        let reason;
        let resolvedFnArray = [];
        let rejectFnArray = [];
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'fulfilled';
                this.value = value;
                this.resolvedFnArray.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.rejectFnArray.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(resolvedFn, rejectFn) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === 'pending') {
                this.resolvedFnArray.push(() => {
                    let x = resolvedFn(this.value);
                    resolvePromise(promise2, x, resolve, reject)
                })
                this.rejectFnArray.push(() => {
                    let x = rejectFn(this.reason);
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
            if (this.status === 'fulfilled') {
                let x = resolvedFn(this.value);
                resolvePromise(promise2, x, resolve, reject)
            }
            if (this.status === 'rejected') {
                let x = rejectFn(this.reason)
                resolvePromise(promise2, x, resolve, reject)
            }
        })
        return promise2;
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('循环引用'))
        }
        // 防止多次调用
        let called;
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, err => {
                        if (called) return;
                        called = true;
                        reject(err)
                    })
                } else {
                    resolve(x)
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e)
            }
        } else {
            resolve(x)
        }
    }

    all(promises) {
        let arr = [];
        let i = 0;
        let len = promises.length;
        let processData = (index, data) => {
            arr[index] = data;
            i += 1 ;
            if (i === len) {
                resolve(arr)
            }
        }
        return new Promise((resolve, reject) => {
            for (let j - 0; j < len; j++) {
                promises[j].then((resp) => {
                    processData(j, resp)
                }, reject)
            }
        })
        race(promises) {
            return new Promise((resolve, reject) => {
                for (let i = 0, len = promises.length; i < len; i ++) {
                    promises[i].then(resolve, reject);
                }
            })
        }
    }
}


let a = new Promise((resolve, reject) => {
    resolve(1);
});
a.then((res) => {
    console.log('-----res-----', res);
}, error => {
    console.log('-----error-----', error);
}).then((res1) => {
    console.log('-----res1-----', res1);
})
