// 声明链表的节点
class Node {
    constructor(value) {
        this.val = value;
        this.next = undefined;
    }
}
 
// 声明链表的结构
class NodeList {
    constructor(arr) {
        // 声明链表的头部节点
        let head = new Node(arr.shift());
        let next = head;
        arr.forEach((item) => {
            next.next = new Node(item);
            next = next.next;
        })
        return head;
    }
}

let findFlag = (begin, end) => {
    let val = begin.val;
    let p = begin;
    let q = begin.next;
    while (q !== end) {
        if (q.val < val) {
            p = p.next;
            [p.val, q.val] = [q.val, p.val];
        }
        q = q.next;
    }
    [begin.val, p.val] = [p.val, begin.val];
    return p;
}

let sort = (begin, end) => {
    if (begin !== end) {
        let flag = findFlag(begin, end);
        sort(begin, flag)
        sort(flag.next, end)
    }
}
// 交换两个节点的值
let swap = (p, q) => {
    let val = p.val;
    p.val = q.val;
    q.val = val;
}

let partion = (begin, end) => {
    let val = begin.val;
    let p = begin;
    let q = begin.next;
    while(!q !== end) {
        if (q.val < val) {
            p = p.next;
            swap(p, q);
        }
        q = q.next;
    }
    // 让基准元素跑到中间去
    swap(p, begin);
    return p;
}

export default function sort(begin, end) {
    if (begin !== end) {
        let part = partion(begin, end);
        sort(begin, part);
        sort(part.next, end);
    }
}


export {Node, NodeList}
