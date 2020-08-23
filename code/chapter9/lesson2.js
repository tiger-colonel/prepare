// 环形链表
class Node {
    constructor(val) {
        this.value = val;
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
        })
        return head;
    }
}

function hasChain1(head) {
    console.log('-----head-----', head);
    if (!head || !head.next) {
        return false;
    }
    while(head) {
        if (head.tag) return true;
        head.tag = true;
        head = head.next;
    }
    console.log('-----12-----', 12);
    return false;
}
function hasChain2(head) {
    if (!head || !head.next) {
        return false;
    }
    let slow = head;
    let fast = head.next;
    while (fast) {
        if (!fast || !fast.next) return false;
        if (fast === slow) {
            return true;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
}
let head = new NodeList([1,2,3,4,5,6,2,3,4,5]);
console.log('----------', hasChain1(head));
