// 数组的交集 350
// 1. 哈希
function intersect(nums1, nums2) {
    let res = [];
    let nums1Map = nums1.reduce((map, v) => (map.set(v, (map.get(v) || 0) + 1), map), new Map());
    nums2.forEach(item => {
        let val = nums1Map.get(item);
        if (val) {
            res.push(item);
            nums1Map.set(item, val - 1);
        }
    });
    return res;
}
// 2. 双指针
function intersect1(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    let res = [];
    let p1 = 0;
    let p2 = 0;
    while(p1 < nums1.length && p2 < nums2.length) {
        if (nums1[p1] < nums2[p2]) {
            p1++;
        } else if (nums1[p1] > nums2[p2]) {
            p2++;
        } else if (nums1[p1] === nums2[p2]) {
            res.push(nums1[p1]);
            p1++;
            p2++
        }
    }
    return res;
}

console.log('-----jiaoji-----', intersect1([1,2,2,2,2,2], [1,1,1,1,1,2,2,2,3,4,4,3]));
