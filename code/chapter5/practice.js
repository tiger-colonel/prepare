// 冒泡
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

// 选择
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

// 按奇数偶数排序 LeetCode：922
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

// k个最大元素 leetcode：215
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

// quickSort
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
// in-place
function inPlace(arr) {
    
}



// let a = bubbleSort([4,1,36,2,61,3]);
// let a = selectSort([4,1,36,2,61,3]);
// let a = OddSort([4,2,5,7])
let a = quickSort([4,1,36,2,61,3]);
console.log(a);
