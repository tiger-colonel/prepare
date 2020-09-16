// 旋转数组 189
function reverseArray(arr, k) {
    let len = arr.length;
    k = k % len;
    inplace(0, len - 1);
    inplace(0, k - 1);
    inplace(k, len - 1)
    function inplace(left, right) {
        while(left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            right--;
            left++;
        }
    }
}

// 数组删除重复项 26
function deleteCommon(nums) {
    if (!nums || !nums.length) return 0;
    let p = 0, q = 1;
    while (q < nums.length) {
        if (nums[p] !== nums[q]) {
            nums[p + 1] = nums[q];
            p++;
        }
        q++
    }
    return p + 1;
        let len = nums.len;
    if (len < 1) return nums;
    let i = 0;
    let j = 1;
    while (j < len) {
        if (nums[i] !== nums[j]) {
            nums[i + 1] = nums[j];
            i++;
        }
        j++;
    }
    return i + 1;
}

console.log('-----reverseArray-----', reverseArray([1,2,3,4,5,6,7], 3));
function inPlace(arr) {
    function findCenter(arr, left, right) {
        let idx = left + 1;
        for (let i = left; i <= right; i++) {
            if (arr[i] < arr[left]) {
                [arr[i], arr[idx]] = [arr[idx], arr[i]]
                idx++;
            }
        }
        [arr[left], arr[idx - 1]] = [arr[idx - 1], arr[left]]
        return idx;
    }
    function sort(arr, left, right) {
        if (left < right) {
            let center = findCenter(arr, left, right);
            sort(arr, 0, center - 1);
            sort(arr, center, right)
        }
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}

// console.log('-----inPlace-----', inPlace([18,27,3,25,12,9,35]));
