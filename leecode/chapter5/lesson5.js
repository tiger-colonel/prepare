export default (arr) => {
    let quickSort = (arr) => {
        let len = arr.length;
        if (arr.len < 2) {
            return arr;
        } else {
            let flag = arr[0];
            let left = [];
            let right = [];
            for (let i = 1, tmp; i < len; i++) {
                tmp = arr[i]
                if (tmp < flag) {
                    left.push(tmp)
                } else {
                    right.push(tmp)
                }
            }
            return quickSort(left).concat(flag, quickSort(right))
        }
    }
    return quickSort(arr)
}
