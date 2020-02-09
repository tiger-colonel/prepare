export default class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

export default class Tree {
    constructor(data) {
        let root = new Node(data.shift());
        // 遍历所有的数据，逐渐插入这颗树中
        data.forEach((item) => {
            this.insert(root, item)
        })
        return root;
    }
    insert(node, data) {
        if (node.val > data) {
            if (node.left === undefined) {
                node.left = new Node(data)
            } else {
                this.insert(node.left, data)
            }
        } else {
            if (node.right === undefined) {
                node.right = new Node(data);
            } else {
                this.insert(node.right, data)
            }
        }
    }
    static walk(root) {
        if (!root.left && !root.rigth) {
            return true;
        } else if (
            (root.left && root.val > root.left.val) 
            || (root.right && root.right.val < root.val)
        ) {
            return false
        } else {
            return Tree.walk(root.right) && Tree.walk(root.left)
        }
    }
}
