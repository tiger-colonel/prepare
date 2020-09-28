function maxSubArray(nums) {
    let res = nums[0];
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (sum + nums[i] > nums[i]) {
            sum += nums[i]
        } else {
            sum = nums[i]
        }
        res = Math.max(sum, res)
    }
    return res;
}
console.log('----------', maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));

/*
 * @description: 并发限制
 * @param {number} 允许同时并发的数量
 * @param {array} promise 数组
 * @param {fn}} callback
 */
function limit(count, array, iterateFunc) {
    const tasks = [];
    const executing = [];
    let i = 0;
    const enqueue = () => {
        // 1. 边界条件，array为空，或者promise全都达到resolve状态
        if (i === array.length) {
            return Promise.resolve();
        }
        // 2. 生成一个promise实例，并在then方法中的onFulfilled函数里返回实际要执行的promise
        const task = Promise.resolve().then(() => iterateFunc(array[i++], array));
        tasks.push(task);
        // 4. 将执行完毕的promise移除
        const doing = task.then(() => executing.splice(executing.indexOf(doing), 1));
        // 3. 将正在执行的promise插入executing数组
        executing.push(doing);
        // 如果正在执行的promise达到了limit，使用Promise.race让已经执行好的promise先出去，新的promise再进来
        let res = Promise.resolve();
        if (executing.length >= count) res = Promise.race(executing);
        // 5. 递归执行enqueue，直至满足1
        return res.then(() => enqueue());
    }
    return enqueue().then(() => Promise.all(tasks))
}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)
})

