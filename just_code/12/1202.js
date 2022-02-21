// ["abc","def","ghi"] -> ["adg","beh","cfi"]
function reverse(arr) {
    let res = [];
    let tmp = [];
    arr.forEach(item => {
        tmp.push(item.split(''));
    });
    let totalArray = [];
    for (let i = 0; i < tmp[0].length; i++) {
        totalArray[i] = [];
    }
    for (let i = 0; i < tmp.length; i++) {
        for (let j = 0; j < tmp[i].length; j++) {
            totalArray[j][i] = tmp[i][j];
        }
    }
    totalArray.forEach(item => res.push(item.join('')));
    return res;
}
console.log('-----reverse(["abc","def","ghi"] )-----', reverse(["abc","def","ghi"] ));
