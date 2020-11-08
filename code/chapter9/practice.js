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
function partion(begin, end) {
    let val = begin.val;
    let p = begin;
    let q = begin.next;
    while(q !== end) {
        if (q.val < val) {
            p = p.next;
            [p.val, q.val] = [q.val, p.val]
        }
        q = q.next;
    }
    [p.val, begin.val] = [begin.val, p.val];
    return p;
}
function partion(begin, end) {
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
    [p.val, begin.val] = [begin.val, p.val];
    return p;
}
function sort(begin, end) {
    if (begin !== end) {
        let part = partion(begin, end);
        sort(begin, part);
        sort(part.next, end);
    }
}

let head = new NodeList([4,1,3,2,7,9,12,10]);
sort(head)
let res = [];
let next = head;
while(next) {
    res.push(next.val);
    next = next.next;
}
console.log('-----res-----', res);

