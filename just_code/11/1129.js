// 最长不连续的子序列
function getMaxSubLength(str) {
    let res = '';
    let temp = str[0];
    for (let i = 0; i < str.length; i++) {
        let j = temp.indexOf(str[i])
        if (j === -1) {
            temp += str[i]
        } else {
            if (temp.length > res.length) {
                res = temp;
            }
            temp = temp.substr(j + 1);
            temp += str[i];
        }
    }
    return res;
}
// console.log('-----getMaxSubLength()-----', getMaxSubLength('abcbefgfe'));

// 对称二叉树
// class TreeNode() {
//     constructor(val) {
//         this.val = val;
//         this.left = this.right = null;
//     }
// }
function isSymmetric(root) {
    const isMirror = (left, right) => {
        if (!left && !right) return true;
        if (!left || !right) return false;
        return (left.val === right.val) && isMirror(left.left, right.right) && isMirror(left.right, right.left)
    }
    return !root || isMirror(root.left, root.right)
}
function isSymmetric1(root) {
    let q = [root, root];
    while (q.length > 0) {
        let l = q.shift();
        let r = q.shift();
        if (!l && !r) continue;
        if (!l || !r) return false;
        if (l.val !== r.val) return false;
        q.push(l.left);
        q.push(r.right);
        q.push(l.right);
        q.push(r.left);
    }
    return true;
}

// 树的深度和宽度
function maxDeep(root) {
    // return Math.max(maxDeep(root.left), maxDeep(root.right)) + 1;
    if (!root) return 0;
    let q = [root];
    let res = 0;
    while (q.length) {
        let tmp = [];
        for (let i = 0; i < q.length; i++) {
            if (q[i].left) tmp.push(q[i].left);
            if (q[i].right) tmp.push(q[i].right);
        }
        res += 1;
        q = tmp;
    }
    return res;
}
