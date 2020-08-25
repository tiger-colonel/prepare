function searchIp(str) {
    let r = [];
    let search = (current, sub) => {
        if (current.length === 4 && current.join('') ===  str) {
            r.push(current.join('.'))
        } else {
            for(let i = 0, tmp=''; i < Math.min(3, sub.length); i++) {
                tmp = sub.substr(0, i + 1);
                if (tmp.length > 1 && tmp.substr(0,1) == 0) {
                    return;
                }
                if (tmp < 256) {
                    search(current.concat(tmp), sub.substr(i + 1));
                }
            }
        }
    }
    search([], str);
    return r;
}

// console.log('-----findIp-----', searchIp('101023'));

// 链表排序
class Node {
    constructor(val) {
        this.val = val;
        this.next = undefined;
    }
}

class NodeList {
    constructor(arr) {
        let head = new Node(arr.shift());
        let next = head;
        arr.forEach(item => {
            next.next = new Node(item);
            next = next.next;
        });
        return head;
    }
}

let partion = (start, end) => {
    let val = start.val;
    let p = start;
    let q = p.next;
    while (q !== end) {
        if (q.val < val) {
            p = p.next;
            [p.val, q.val] = [q.val, p.val];
        }
        q = q.next
    }
    [start.val, p.val] = [p.val, start.val];
    return p;
}

function sort(start, end) {
    if (start !== end) {
        let part = partion(start, end);
        sort(start, part);
        sort(part.next, end);
    }
}

let head = new NodeList([4,1,2,9,5,3,6]);
sort(head);
let r = [];
while(head) {
    r.push(head.val);
    head = head.next;
}
// console.log('-----r-----', r);

// 快排
function quickSort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    console.log('-----arr-----', arr);
    let left = [];
    let right = [];
    let flag = arr[0];
    for(let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] < flag) {
            left.push(arr[i])
        }
        if (arr[i] > flag) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(flag, quickSort(right));
}
// 数组内部变动
function inPlace(arr) {
    let swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]
    let findCenter = (arr, left, right) => {
        let idx = left + 1;
        for (let i = left; i <= right; i++) {
            if (arr[i] < arr[left]) {
                swap(arr, i, idx);
                idx++;
            }
        }
        swap(arr, left, idx - 1);
        return idx;
    }
    let sort = (arr, left, right) => {
        if (left < right) {
            let center = findCenter(arr, left, right);
            sort(arr, left, center - 1);
            sort(arr, center, right);
        }
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
// console.log('----------', inPlace([34,31,45,89,6,9]));

// 缺失的第一个正数
function firstPosi(nums) {
    for (let i = 1; ;i++) {
        if (!nums.includes(i)) {
            return i;
        }
    }
}


function firstPostBySelectSort(arr) {
    let len = arr.length;
    arr = arr.filter(item => item > 0);
    if (!arr.length) return 1;
    let min = 0;
    for (let i = 0; i < len; i++) {
        min = arr[i];
        console.log('-----arr-----',i, arr);
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                [arr[j], min] = [min, arr[j]]
            }
            arr[i] = min;
        }
        // if (i > 0) {
        //     if (arr[i] - arr[i - 1] > 1) {
        //         return arr[i - 1] + 1
        //     }
        // }
    }
    // return arr.pop() + 1;
}

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len - 1; i > 0; i--) {
        console.log('-----arr-----',i, arr);
        for (let j = 0; j < i; j++) {
            if (arr[j+1] < arr[j]) {
                [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
            }
        }
    }
    return arr;
}
// console.log('-----bubbleSort-----', firstPostBySelectSort([41,21,32,43,5,7]));
// 最大区间
function maxRange(arr) {
    let min = 0;
    let max = 0;
    for (let i = 1; i < arr.length; i++) {
        min = arr[i];
        for (let j = i + 1; j< arr.length; j++) {
            if (arr[j] < min) {
                [arr[j], min] = [min, arr[j]]
            }
            arr[i] = min;
        }
        if (arr[i] - arr[i-1] > max) {
            max = arr[i] - arr[i-1];
        }
    }
    return max;
}
// let a = maxK([4,6,1,93,7,34], 2);
// console.log('-----a-----', a);

// 第k个最大元素
function maxK(arr, k) {
    let len = arr.length - 1;
    for (let i = len; i > k; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j+1], arr[j]] = [arr[j], arr[j+1]]
            }
        }
    }
    return arr;
}

// 格雷编码
function grayCode(k) {
    if (k === 0) {
        return [0];
    } else if (k === 1) {
        return [0, 1];
    } else {
        let prev = grayCode(k - 1);
        let r = [];
        let max = Math.pow(2, k) - 1;
        for (let i = 0; i < prev.length; i++) {
            r[i] = `0${prev[i]}`;
            r[max - i] = `1${prev[i]}`;
        }
        return r;
    }
}

// console.log('-----grayCode-----', grayCode(3).map(item => parseInt(item, 2)));

function leastInterval(tasks, n) {
    let timeObj = tasks.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t),{});
    let values = Object.values(timeObj).sort((a, b) => b - a);
    let maxNum = values[0];
    let res = (maxNum - 1) * (n + 1) + 1;
    let i = 1;
    while (i < values.length && values[i] === maxNum) {
        res++;
        i++;
    }
    return Math.max(tasks.length, res);
}

console.log('----------',leastInterval(["A","A","A","B","B","B"]));


