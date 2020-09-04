// 递归和迭代
function faci(n) {
    let arr = [...new Array(n).keys()];
    return arr.reduce((t, v, i) => (i > 1 && t.push(t[i-1] + t[i-2]),t), [0, 1])
}

const tree = {
    name: 'root',
    children: [
        {
            name: 'c1',
            children: [
                {
                        name: 'c11',
                    children: []        
                    },
                    {
                        name: 'c12',
                    children: []        
                }
            ]
        },
        {
            name: 'c2',
            children: [
                {
                        name: 'c21',
                    children: []        
                    },
                    {
                        name: 'c22',
                    children: []        
                }
            ]
        }
    ]
}
function test(root) {
    let arr = []
    const dfs = (root) => {
        if (root) {
            arr.push(root.name);
            dfs(root.children[0]);
            dfs(root.children[1]);
        }
        return arr;
    }
    return dfs(root);
    // return arr;
}
// console.log('----------', test(tree));

function solve(root) {
    let stack = [];
    let result = [];
    if (!root) return [];
    stack.push(root);
    while (stack.length) {
        let node = stack.pop();
        if (!node) continue;
        result.push(node.name);
        for (let i = node.children.length - 1; i >= 0; i--) {
            // 这里就是面试的重点,应该从后面的节点压入栈中
            stack.push(node.children[i]);
        }
    }
    return result;
}

function isBst(root) {
    let pre = -Infinity
    function helper (root) {
        if (root === null) {
            return true
        }
        if(!helper(root.left)) {
            return false
        }
        if (root.val <= pre) {
            return false
        }
        pre = root.val

        return helper(root.right)
    }
    let res = helper(root)
    return res
}

function maxDeepByBSF(root) {
    if (!root) return 0;
    let queue = [root];
    let res = 0;
    while(queue.length) {
        let tmp = [];
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].left) tmp.push(queue[i].left);
            if (queue[i].right) tmp.push(queue[i].right);
        }
        res += 1;
        queue = tmp;
    }
    return res;
}

function minDeepByBSF(root) {
    if (!root)  return 0;
    if (!root.right && !root.left) return 1;
    let qq = [];
    let ans = 0;
    while(qq.length) {
        let tmp = [];
        ans++;
        for (let i = 0; i< qq.length; i++) {
            if (!qq[i].left && !qq[i].right) return ans;
            if (qq[i].left) tmp.push(qq[i].left)
            if (qq[i].right) tmp.push(qq[i].right)
        }
        qq = tmp;
    }
    return ans;
}

function isMirror(root) {
    const mirror = (left, right) => {
        if (!left && !right) return true;
        if (left && right) {
            return left.val === right.val && mirror(left.left, mirror.right) && mirror(right.left, right.right)
        }
        return false;
    }
    if (!root) {
        return true;
    } else {
        return mirror(root.left, root.right)
    }
}
function isMirrorBSF(root) {
    if (!root) return;
    let qu = [root.left, root.right];
    while(qu.length) {
        for (let i = 0; i < qu.length; i+=2) {
            let ll = qu.shift();
            let rr = qu.shift();
            if ((!ll && rr) || (ll && !rr) || (ll.val !== rr.val)) {
                return false
            }
            if (ll && rr) {
                qu.push(ll.left, rr.right);
                qu.push(ll.right, rr.left);
            }
        }
    }
    return true;
}

function isMirrorByStack(root) {
    if (!root) return true;
    let leftStack = [], rightStack = [];
    let curLeft = root.left;
    let curRight = root.right;
    while (curLeft || curRight || leftStack || rightStack) {
        while (curLeft) {
            leftStack.push(curLeft);
            curLeft = curLeft.left;
        }
        while (curRight) {
            leftStack.push(curRight);
            curRight = curRight.left;
        }
        if (leftStack.length !== rightStack.length) return false;

        curLeft = leftStack.pop();
        curRight = rightStack.pop();

        if (curLeft.val !== curRight.val) return false;

        curLeft = curLeft.right;
        curRight = curRight.left;
    }
    return true;
}

function reverseChain(head) {
    let [prev, cur] = [null, head];
    while(cur) {
        [cur.next, prev, cur] = [prev, cur, cur.next];
        // let tmp = cur.next;
        // cur.next = prev;
        // prev = cur;
        // cur = tmp;
    }
    return cur;
}
function arrayByBSF(root) {
    if (!root) {
        return []
    }
    let qu = [root];
    let res = [];
    let row = 0; // 记录行数
    while (qu.length) {
        row++;
        let arr = [];
        let tmp = [];
        for (let i = 0; i < qu.length; i++) {
            arr.push(qu[i].val);
            tmp.push(qu[i].left, qu[i].right);
        }
        if (row % 2 !== 0) {
            res.concat(arr.reverse())
        } else {
            res.concat(arr);
        }
    }
    return res;
}



