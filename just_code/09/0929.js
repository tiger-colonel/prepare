var firstUniqChar = function(s) {
    let arr = s.split('');
    let countObj = arr.reduce((t, v) => {
        t[v] = (t[v] || 0) + 1;
        return t;
    }, {});
    let firstKey;
    for (let item in countObj) {
        if (item === 1) {
            firstKey = item;
            break;
        }
    }
    return arr[firstKey];
};
