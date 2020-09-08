// 完全二叉树 222
function countNodes(root) {
    if (!root) return 0;
    let left = countLevel(root.left);
    let right = countLevel(root.right);
    if (left === right) {
        return countNodes(root.right) + Math.pow(2, left)
    } else {
        return countNodes(root.left) + Math.pow(2, right)
    }
}

function countLevel(root) {
    let level = 0;
    while (root.left) {
        level++;
        root = root.left;
    }
    return level;
}

// 删除二叉树 450
function deleteNode(root, key) {
    if (!root) return;
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
        return root;
    }
    if (key > root.val) {
        root.right = deleteNode(root.right, key);
        return root;
    }
    if (!root.right) {
        return root.left
    }
    if (!root.left) {
        return root.right;
    }

    let minNode = root.riglt;
    while(minNode.left) {
        minNode = minNode.left;
    }
    root.val = minNode.val;
    root.right = deleteMinNode(root.right);
    return root;
}

function deleteMinNode(root) {
    if (!root) {
        
    }
}
