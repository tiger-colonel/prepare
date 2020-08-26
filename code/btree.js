class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = undefined;
    }
}

class Tree {
    
}

function isSymmetric(root) {
    function _isMirror(t1, t2) {
        console.log('-----t1, t2-----', t1, t2);
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1.val === t2.val) && _isMirror(t1.left, t2.right) && _isMirror(t1.right, t2.left);
    }
    return !root || _isMirror(root.left, root.right);
}

console.log('-----isSymmetric-----', isSymmetric([1,2,2,3,4,4,3]));
