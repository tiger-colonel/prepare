// 387. 字符串中的第一个唯一字符
var firstUniqChar = function(s) {
    let arr = s.split('');
    let countMap = arr.reduce((t, v) => {
        t.set(v, (t.get(v) || 0) + 1);
        return t;
    }, new Map());
    let firstKey;
    try {
        countMap.forEach((key, value) => {
            if (key === 1) {
                firstKey = value;
                throw new Error('break')
            }
        })
    } catch (error) {}

    return arr.indexOf(firstKey);
};

function firstUniqChar(s) {
    for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) ===  s.lastIndexOf(s[i])) {
            return i;
        }
    }
    return -1;
}
// console.log('----------', firstUniqChar('loveleetcode'));

// 239. 滑动窗口最大值
// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
function maxSlidingWindow(arr, k) {
    let res = [];
    for (let i = 0; i <= arr.length - k; i++) {
        let tmp = [];
        for (let j = i; j < i + k; j++) {
            tmp.push(arr[j])
        }
        res.push(Math.max(...tmp))
    }
    return res;
}
console.log('----------', maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));

