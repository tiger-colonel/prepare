// 删除链表的倒数第n个节点 19，自己画图
// 双指针，间隔为n，因为是删除快节点前面的那个，所以要n
var removeNthFromEnd = function(head, n) {
    let beforeHead = new ListNode(0);
    beforeHead.next = head;
    let p = beforeHead;
    let q = beforeHead;
    let offset = n + 1;
    while (offset > 0) {
        q = q.next;
        offset--;
    }
    while(q.next) {
        p = p.next;
        q = q.next;
    }
    p.next = p.next.next;
    return beforeHead.next;
}


