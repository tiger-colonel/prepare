// export default (arr) => {
//     let quickSort = (arr) => {
//         let len = arr.length;
//         if (arr.len < 2) {
//             return arr;
//         } else {
//             let flag = arr[0];
//             let left = [];
//             let right = [];
//             for (let i = 1, tmp; i < len; i++) {
//                 tmp = arr[i]
//                 if (tmp < flag) {
//                     left.push(tmp)
//                 } else {
//                     right.push(tmp)
//                 }
//             }
//             return quickSort(left).concat(flag, quickSort(right))
//         }
//     }
//     return quickSort(arr)
// }

// 划分交换排序
export default (arr) => {
    // 数组制定两个位置进行值交换
    let swap = (arr, i, j) => {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    // 完成一次划分交换，分为两部分
    let findCenter = (arr, left, right) => {
        let flag = arr[left];
        let idx = left + 1;
        for (let i = idx; i <= right; i++) {
            if (arr[i] < flag) {
                swap(arr, idx, i);
                idx++;
            }
        }
        swap(arr, left, idx - 1);
        return idx;
    }
    // 递归排序
    let sort = (arr, left, right) => {
        if (left < right) {
            let center = findCenter(arr, left, right);
            sort(arr, left, center - 1);
            sort(arr, center, right)
        }
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
