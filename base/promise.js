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
        if (this.state === 'fulfilled') {
            onFulfilledFn(this.value)
        }
        if (this.state === 'rejected') {
            onRejectedFn(this.reason)
        }
        if (this.state === 'pending') {
            this.onResolvedCallbacks.push(() => {
                onFulfilledFn(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejectedFn(this.reason);
            })
        }
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
