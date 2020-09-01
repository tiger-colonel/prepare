class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = undefined;
    }
}

class Tree {
    constructor(data) {
        let nodeList = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let node = new TreeNode(data[i]);
            nodeList.push(node);
            if (i > 0) {
                // 当前节点属于哪一层？
                let n = Math.floor(Math.sqrt(i + 1));
                // 当前层的起点
                let currentStart = Math.pow(2, n) - 1;
                // 上一层的起点
                let topStart = Math.pow(2, n - 1) -1;
                // 当前节点的父节点
                let parent = nodeList[topStart + Math.floor((i - currentStart) / 2)];
                if (parent.left) {
                    parent.right = node;
                } else {
                    parent.left = node;
                }
            }
        }
        let root = nodeList.shift();
        nodeList.length = 0;
        return root;
    }
}

function isSymmetric(root) {
    root = new Tree(root);
    function _isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1.val === t2.val) && _isMirror(t1.left, t2.right) && _isMirror(t1.right, t2.left);
    }
    return !root || _isMirror(root.left, root.right);
}

// console.log('-----isSymmetric-----', isSymmetric([1,2,2,3,4,4,3]));

class SearchTree {
    constructor(data) {
        let root = new TreeNode(data.shift());
        data.forEach(item => {
            this.insert(root, item)
        })
        return root;
    }
    insert(node, item) {
        if (item > node.val) {
            if (node.right === undefined) {
                node.right = new TreeNode(item);
            } else {
                this.insert(node.right, item)
            }
        } else {
            if (node.left === undefined) {
                node.left = new TreeNode(item);
            } else {
                this.insert(node.left, item)
            }
        }
    }
    static walk(root) {
        if (!root) {
            return true;
        }
        if (!root.left && !root.right) {
            return true;
        } else if ((root.left && root.left > root.val) || (root.right && root.right < root.val)) {
            return false;
        } else {
            return this.walk(root.left) && this.walk(root.right)
        }
    }
}

let root = new SearchTree([5,1,4,null,null,3,6]);
let res = SearchTree.walk(root)
console.log('-----root-----',root, res);


class Tree1 {
    constructor(data) {
        let nodeList = [];
        for (let i = 0; i < data.length; i++) {
            nodeList.push(new TreeNode(data[i]));
            if (i > 0) {
                // 节点所在的层数，从0开始算
                let n = Math.sqrt(i + 1, 2);
                // 节点所在行的起始点的索引
                let currentStart = Math.pow(2, n) - 1;
                let topStart = Math.pow(2, n - 1) - 1;
                let parent = nodeList[Math.floor((i - currentStart) / 2) + topStart];
                if (parent.left) {
                    parent.left = nodeList[i]
                } else {
                    parent.right = nodeList[i];
                }
            }
        }
        let root = nodeList.shift();
        nodeList.length = 0;
        return root;
    }
}

class SearchTree1 {
    constructor(data) {
        let root = new TreeNode(data[0]);
        data.forEach(item => {
            this.insert(root, item)
        });
        return root;
    }
    insert(node, item) {
        if (item > node.val) {
            if (node.right === undefined) {
                node.right = new TreeNode(item)
            } else {
                this.insert(node.right, item)
            }
        } else {
            if (node.left === undefined) {
                node.left = new TreeNode(item)
            } else {
                this.insert(node.left, item)
            }
        }
    }
    walk(root) {
        if (!root.left && !root.right) {
            return true
        } else if ((root.right && root.right < root.val) || (root.left && root.left > root.val)) {
            return false;
        } else {
            this.walk(root.right) && this.walk(root.left)
        }
    }
}
