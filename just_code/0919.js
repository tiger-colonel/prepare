function getCount(str, strcount) {
    let arr = str.split('');
    let res = {};
    res = arr.reduce((t, v) => {
        t[v] = (t[v] || 0) + 1;
        return t;
    }, {});
    return res[strcount];
}
// console.log(getCount('aaaaacnb', 'a'));
function test(str) {
    let arr = str.split('').reverse();
    arr = [...new Set(arr)];
    console.log(arr.join(''))
}

console.log('-----test()-----', test('9876673'));
