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
        // 遍历左子树
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        // 遍历右子树
        root.right = deleteNode(root.right, key);
    } else { // 找到了
        // 左右节点都没有，则为叶子节点，直接删除即可
        if (!root.right && !root.left) {
            root = null;
        }
        // 左节点没有，删除后，删除的节点为该节点的右节点
        else if (!root.left && root.right) {
            root = root.right;
        }
        // 右节点没有，删除后，删除的节点为该节点的左节点
        else if (!root.right && root.left) {
            root = root.left
        }
        // 左右都有，需要找到前驱（左子树最大的节点）  或者  后继（右子树上最小的节点）
        else if (root.left && root.right) {
            let prevNode = root.left;
            while (prevNode.right) {
                prevNode = prevNode.right;
            }
            [root.val, prevNode.val] = [prevNode.val, root.val];
            root.left = deleteNode(root.left, prevNode.val)
        }
    }
    return root;
}
// 第二种解法，
// ①删除的是叶子节点，
// ②删除的不是叶子节点，只有左子树、只有右子树、左右子树都有的情况放在一起
function deleteNode1(root, key) {
    if (!root) return root;
    if (key < root.val) {
        deleteNode1(root.left)
    } else if (key > root.val) {
        deleteNode1(root.right)
    } else {
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            let node = root.left;
            while(node.right) {
                node = root.right;
            }
            root.val = node.val;
            this.deleteNode1(root.left, node.val);
        } else {
            let node = root.right;
            while (node.left) {
                node = node.left;
            }
            root.val = node.val;
            deleteNode1(root.right, node.val)
        }
    }
    return root;
}

