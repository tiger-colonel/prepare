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
console.log('----------', test(tree));

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


