// 二叉树剪枝 814
function pruneTree(root) {
    if (!root) return root;
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    if (!root.left && !root.right && !root.val) {
        return null;
    }
    return root;
}
