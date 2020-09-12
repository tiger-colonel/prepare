// 数组的交集 350
function jiaoji(nums1, nums2) {
    // if (arr1.length < arr2.length) {
    //     return arr1.reduce((t, v) => (arr2.includes(v) ? t.push(v) : t, t), []);
    // } else {
    //     return arr2.reduce((t, v) => (arr1.includes(v) ? t.push(v) : t, t), []);
    // }
    let result = [];
    let map = new Map();
    nums1.forEach(item => {
        map.set(item, item);
    });
    nums2.forEach(item => {
        if (map.has(item)) {
            result.push(item)
        }
    });
    return result;
}

console.log('-----jiaoji-----', jiaoji([1,2], [1,1]));
