class Heap {
    constructor(data) {
        this.data = data;
    }
    static swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    sort() {
        let iArr = this.data;
        let n = iArr.length;
        if (n <= 1) {
            return iArr;
        } else {
            for (let i = Math.floor(n / 2); i >= 0; i--) {
                Heap.maxHeapify(iArr, i, n);
            }
            for (let j = 0; j < n; j++) {
                Heap.swap(iArr, 0, n - 1 - j);
                Heap.maxHeapify(iArr, 0, n - 1 - j - 1);
            }
            return iArr;
        }

    }
    static maxHeapify(Arr, i, size) {
        // 左节点索引
        let l = i * 2 + 1;
        // 右节点索引
        let r = i * 2 + 2;
        let largest = i;
        // 父节点i 和 左节点l作比较
        if (l < size && Arr[l] > Arr[largest]) {
            largest = l;
        }
        // 右节点r 和 最大值 largest 做比较
        if (r < size && Arr[r] > Arr[largest]) {
            largest = r;
        }
        if (largest !== i) {
            Heap.swap(Arr, largest, i);
            Heap.maxHeapify(Arr, largest, size)
        }
    }
}

let heap = new Heap([1, 10, 9, 5, 3, 11]);
let a = heap.sort();
// console.log('-----a-----', a);


var frequencySort = function(s) {
    let arr = s.split('');
    let timeObj = arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
    let tmp = [];
    for (let key in timeObj) {
        tmp.push({key, value: timeObj[key]})
    }
    tmp = tmp.sort((a, b) => b.value - a.value);
    return tmp.reduce((t, v) => ((t += v.key.repeat(v.value)),t), '');
};

console.log('-----frequencySort-----', frequencySort('caaabb'));

