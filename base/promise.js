function resolvePromise(promise2, x, resolve, reject) {

}

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(cb => cb())
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilledFn, onRejectedFn) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                let x = onFulfilledFn(this.value);
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'rejected') {
                let x = onRejectedFn(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            }
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    let x = onFulfilledFn(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                this.onRejectedCallbacks.push(() => {
                    let x = onRejectedFn(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        })
        return promise2;
    }
}


let fn = () => new Promise((resolve, reject) => {
    resolve(123);
})


fn().then(res => {
    console.log('-----res1-----', res);
    return res
}).then(res2 => {
    console.log('-----res2-----', res2);
    return res2
}).then(res3 => {
    console.log('-----3-----', res3);
})
