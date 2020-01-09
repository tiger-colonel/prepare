export default (arr) => {
    let result = [];
    let reg = /1{2,}/g;
    arr = arr.map((item) => {
        let str = item.join(',');
        let r = reg.exec(str);
        let rs = [];
        while (r) {
            rs.push([r.index, r.index + r[0].length - 1]);
            r = reg.exec(str)
        }
        return rs;
    })

    // 通过递归计算相邻的矩阵
    let maxRect = (arr, result, n = 1) => {
        let top = arr.pop();
        let next = arr.pop();
        // 记录第一行的每一行的起始点和界址点
        let tt;
        let nn;
        // 记录交叉的起始索引
        let start;
        let end;
        let width = 1;
        let maxWidth = 1;
        n++
        for (let i = 0, il = top.length; i < il; i++) {
            tt = top[i];
            for (let j = 0, jl = next.length; j < jl; j++) {
                nn = next[j];
                width = Math.min(tt[1], nn[1]) - Math.max(tt[0], nn[0]);
                if (width > maxWidth) {
                    maxWidth = width;
                    start = Math.max(tt[0], nn[0]);
                    end = Math.min(tt[1], nn[1]);
                }
            }
        }
        if (!start || !end) {
            if (n < 3) {
                return false;
            } else {
                width = top[0][1] - top[0][0] + 1;
                if (width > 1) {
                    result.push((n - 1) * width)
                }
            }
        } else {
            arr.push([[start, end]]);
            maxRect(arr, result, n++);
        }
    }
}
