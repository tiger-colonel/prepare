function test1(str) {
    let len = str.length;
    for (let i = 0; i < Math.ceil(len / 2); i++) {
        if (str.charAt(i) !== str.charAt(len-i-1)) {
            return false;
        } else {
            return true;
        }
    }
}

function removeNthChain(head, n) {
    let preHead = new ListNode(0);
    preHead.next = head;
    let fast = preHead;
    let slow = preHead;
    while(n--) {
        fast = fast.next;
    }
    while(fast && fast.next) {
        fast = fast.next;
        slow = slow.next;
    }
    slow.next = slow.next.next;
    return preHead.next;
}
