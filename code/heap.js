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
                Heap.maxhHeapify(iArr, i, n);
            }
            for (let j = 0; j < n; j++) {
                Heap.swap(iArr, 0, n - 1 - j);
                Heap.mexHeapify(iArr, 0, n - 1 - j - 1);
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
