// 1. 电话号码组合
// dfs
function letterCombinations(digits) {
    if (!digits.length) return [];
    const res = [];
    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    const dfs = (ctr, i) => {
        if (i > digits.length - 1) {
            res.push(ctr);
            return;
        }
        let letters = map[digits[i]];
        console.log('-----letters-----', letters);
        for (const le of letters) {
            dfs(ctr + le, i + 1)
        }
    }
    dfs('', 0);
    return res;
}
// bfs
function letterCombinations1(digits) {
    if (!digits.length) return [];
    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    const queue = [''];
    for (let i = 0; i < digits.length; i++) {
        let levelSize = queue.length;
        for (let j = 0; j < levelSize; j++) {
            const cur = queue.shift();
            const letter = map[digits[i]];
            for (let le of letter) {
                queue.push(cur + le);
            }
        }
    }
    return queue;
}

console.log('-----letterCombinations-----', letterCombinations1('23'));
