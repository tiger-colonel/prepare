// 24 两两交换其中相邻的节点
// 递归
function swapPairs(head) {
    if (!head || !head.next) {
        return head;
    }
    let next = head.next;
    [head.next, next.next] = [swapPairs(next.next), head];
    return next;
}
// 常规
function swapPairs1(head) {
    let prev = new ListNode(0);
    prev.next = head;
    let tmp = prev;
    while (tmp.next && tmp.next.next) {
        let start = tmp.next;
        let end = tmp.next.next;
        tmp.next = end;
        start.next = end.next;
        end.next = start;
        tmp = start;
    }
    return prev.next;
}

// 手写代码 事件总线
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(name, fn) {
        if (this.events[name]) {
            this.events[name].push(fn)
        } else {
            this.events[name] = [fn]
        }
    }
    emit(name) {
        if (this.events[name]) {
            let tasks = this.events[name].slice();
            tasks.forEach(fn => fn())
        }
    }
    off(name, fn) {
        let tasks = this.events[name];
        if (tasks) {
            let idx = tasks.findIndex(f => f === fn || f.callback === fn);
            tasks.splice(idx, 1)
        }
    }
    once(name, once = false) {
        if (this.events[name]) {
            let tasks = this.events[name];
            if (tasks) {
                tasks.forEach(fn => fn())
            }
            if (once) {
                delete this.events[name]
            }
        }
    }
}


function quchong(arr) {
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (!stack.includes(arr[i])) {
            stack.push(arr[i])
        }
    }
    return stack;
}
// console.log('-----quchong-----', quchong([1,2,2,2,2,2]));

function removeDuplicateLetters(str) {
    let stack = [];
    let boolStack = {};
    let arr = str.split('');
    // 计算每个字符出现的次数
    let countMap = arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1),t), {});

    for (let i = 0; i < arr.length; i++) {
        let tmp = arr[i];
        countMap[tmp]--;
        if (boolStack[tmp]) continue;
        console.log('-----tmp-----', tmp);

        while(stack.length && stack[0] > tmp) {
            if (countMap[stack[0]] === 0) break;
            let c = stack.pop();
            boolStack[c] = false;
        }
        stack.push(tmp);
        boolStack[tmp] = true;
    }
    return stack.join('');
}
console.log('-----removeDuplicateLetters-----', removeDuplicateLetters('bcabc'));
