// 最长前缀 14
function longestCommonrefix(strs) {
    if (!strs.length) {
        return '';
    }
    let ans = strs[0];
    for(let i = 1; i < strs.length; i++) {
        let j = 0;
        'flow'
        for (; j < ans.length && j < strs[i].length; j++) {
            // break 的作用
            if (ans[j] !== strs[i][j]) break;
        }
        ans = ans.substr(0, j);
    }
    return ans;
}

console.log('-----longestCommonrefix-----', longestCommonrefix(['flower', 'flow', 'flabc']));
