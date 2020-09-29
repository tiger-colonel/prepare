// 22 ，返回倒数第n个节点
function getKthFromEnd(head, k) {
    let ans = [];
    let stack = [];
    while (head) {
        stack.push(head.next);
        head = head.next;
    }
    while (k > 0) {
        ans = stack.pop();
        k--;
    }
    return ans;
}

function getKthFromEnd1(head, k) {
    let p = head;
    let q = head;
    let i = 0;
    while (q.next) {
        if (i >= k) {
            p = p.next;
        }
        q = q.next;
        i++;
    }
    return p;
}
