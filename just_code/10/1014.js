function limit(count, array, callback) {
    const tasks = [];
    const executing = [];
    let i = 0;
    let promise = Promise.resolve();
    const enqueue = () => {
        // 1. 边界条件，array为空，或者promise全都达到resolve状态
        if (i === array.length) {
            return promise;
        }
        // 2. 生成一个promise实例，并在then方法中的onFulfilled函数里返回实际要执行的promise
        const task = promise.then(() => callback(array[i++]));
        tasks.push(task);
        console.log('-----tasks-----', tasks);
        // 4. 将执行完毕的promise移除
        const doing = task.then(() => executing.splice(executing.indexOf(doing), 1));
        // 3. 将正在执行的promise插入executing数组
        executing.push(doing);
        console.log('-----executing-----', executing);
        // 如果正在执行的promise达到了limit，使用Promise.race让已经执行好的promise先出去，新的promise再进来
        let res = promise;
        if (executing.length >= count) {
            res = Promise.race(executing)
        }
        // 5. 递归执行enqueue，直至满足1
        return res.then(() => enqueue());
    }
    return enqueue().then(() => Promise.all(tasks))
}

// test
// var timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
// limit(2, [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007], timeout).then((res) => {
//   console.log(res)
// });
