// 1. new promise 一旦创建 立即执行
// 2. 使用 Promise.resolve().then() 可以把任务加到微任务队列，防止立即执行迭代方法
// 3. 微任务处理过程中，产生新的微任务，会在同一时间循环内，加到微任务队列里
// 4. 使用race在某个任务完成时继续添加任务，保持任务按照最大并发数执行
// 5. 任务完成后，需要从executingTasks中移除
function limit(count, array, iterateFunc) {
    const tasks = [];
    const executingTasks = [];
    let i = 0;
    const execute = () => {
        if (i === array.length) {
            return Promise.resolve();
        }
        const task = Promise.resolve().then(() => iterateFunc(array[i++]))
        tasks.push(task);

        const executing = task.then(() => executingTasks.splice(executingTasks.indexOf(executing), 1));
        executingTasks.push(executing)

        const res = executingTasks.length >= count ? Promise.race(executingTasks) : Promise.resolve();
        return res.then(execute)
    }
    return execute().then(() => Promise.all(tasks))
}
