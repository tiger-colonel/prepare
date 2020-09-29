function reverseBetween(head, m, n) {
    let sentryHead = new ListNode(0);
    sentryHead.next = head;
    let tmp = sentryHead;
    for (let i = 0; i < m - 1; i++) {
        tmp = tmp.next;
    }
    let [prev, cur] = [null, tmp.next]
    for (let i = 0; i<= n; i++) {
        let next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
    tmp.next.next = cur;
    tmp.next = prev;
    return sentryHead.next;
}
