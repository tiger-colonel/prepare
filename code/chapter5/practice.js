// 1.冒泡
function bubbleSort(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        console.log('-----arr[i]-----', arr[i]);
        for (let j = 0; j < i; j++) {
            console.log('-----arr[j]-----', arr[j]);
            if (arr[j] < arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
            console.log('-----arr-----', arr);
        }
    }
    return arr;
}

// 2.选择
function selectSort(arr) {
    for(let i = 0, len = arr.length, min; i < len; i++) {
        min = arr[i];
        for(let j = i; j < len; j++) {
            if (min > arr[j]) {
                [arr[j], min] = [min, arr[j]]
            }
        }
        arr[i] = min;
    }
    return arr;
}

// 3.按奇数偶数排序 LeetCode：922
function OddSort(arr) {
    arr = arr.sort((a, b) => a - b);
    let odd = 1; // 奇数
    let even = 0; // 偶数
    let r = [];
    arr.forEach((item) => {
        if (item % 2 === 1) {
            r[odd] = item;
            odd += 2;
        }
        if (item % 2 === 0) {
            r[even] = item;
            even += 2;
        }
    });
    return r;
}

// 4. k个最大元素 leetcode：215
function kMax(arr, k) {
    // return arr.sort((a, b) => b - a)[k-1];
    let len = arr.length;
    for(let i = len - 1; i > k; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    }
    return arr[len-k];
}

// 5. 最大区间
function maxRange(arr) {
    let max = 0;
    let len = arr.length;
    if (len < 2) {
        return 0
    }
    for (let i = len - 1, tmp; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
        if (i < len - 1) {
            tmp = arr[i + 1] - arr[i];
            max = max > tmp ? max : tmp
        }
    }
    return Math.max(max, arr[1] - arr[0])
}

// 6. 缺失的第一个正数



// 7. quickSort
function quickSort(arr) {
    console.log('-----arr-----', arr);
    if (arr.length < 2) {
        return arr;
    }
    let flag = arr[0];
    let left = [];
    let right = [];
    for(let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] < flag) {
            left.push(arr[i])
        }
        if (arr[i] > flag) {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(flag, quickSort(right));
}
// 8. in-place
function inPlace(arr) {
    const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];
    const findCenter = (arr, left, right) => {
        let idx = left + 1;
        for (let i = left; i <= right; i++) {
            if (arr[i] < arr[left]) {
                swap(arr, i, idx);
                idx++
            }
        }
        swap(arr, left, idx - 1)
        return idx;
    }

    const sort = (arr, left, right) => {
        if (left < right) {
            let center = findCenter(arr, left, right);
            sort(arr, left, center - 1)
            sort(arr, center, right)
        }
        return arr;
    }
    sort(arr, 0, arr.length - 1)
    return arr;
}



// let a = bubbleSort([4,1,36,2,61,3]);
// let a = selectSort([4,1,36,2,61,3]);
// let a = OddSort([4,2,5,7])
// let a = quickSort([4,1,36,2,61,3]);
// let a = inPlace([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
let a = maxRange([3,6,8,1,18]);
console.log(a);
