const test = (arr) => {
    let result = [];
    let reg = /1{2,}/g;
    arr = arr.map((item) => {
        let str = item.join('');
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
        // 记录第一行的每一行的起始点和终止点
        let tt;
        let nn;
        // 记录交叉的起始索引
        let start;
        let end;
        let width = 1;
        let maxWidth = 1;
        n++;
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
        // console.log('-----start-----', start);
        if (start === undefined || end === undefined) {
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
    while(arr.length > 1) {
        maxRect([].concat(arr), result)
        arr.pop();
    }
    console.log('-----result-----', result);
    let max = 0;
    let item = result.pop();
    while(item) {
        if (item > max) {
            max = item;
        }
        item = result.pop();
    }
    return max > 0 ? max : 1;
}

const exect = (arr) => {
    let result = [];
    // 查找到二维数组中每个元素中连续1存在的索引位置
    let reg = /1{2,}/g;
    arr = arr.map((item) => {
        let str = item.join('');
        let r = reg.exec(str);
        let rs = [];
        while (r) {
            rs.push([r.index, r.index + r[0].length - 1]);
            r = reg.exec(str);
        }
        return rs;
    });
    // console.log('-----arr-----', arr);
    let maxRect = (arr, result, n = 1) => {
        // 取出栈内的前两个元素找出相交的位置
        let top = arr.pop();
        let next = arr.pop();
        // 每个元素的
        let tt;
        let nn;
        // 
        let start
        let end
        let width;
        let maxWidth = 1;
        n++;
        for (let i = 0, ilen = top.length; i < ilen; i++) {
            tt = top[i]; // [ 5, 7 ] 
            for (let j = 0, jlen = next.length; j < jlen; j++) {
                nn = next[j]; // [6,8]
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
    while(arr.length > 1) {
        maxRect([].concat(arr), result)
        arr.pop();
    }
    // let max = 0;
    // let item = result.pop();
    // while(item) {
    //     if (item > max) {
    //         max = item;
    //     }
    //     item = result.pop();
    // }
    // return max > 0 ? max : 1;
    return Math.max(result);
}

let a = [
    ["1","0","1","1","0",'1','1','1','0'],
    ["1","0","1","1","1",'0','1','1','1'],
    ["1","1","1","1","1",'0','1','1','0'],
    ["1","0","0","1","0",'1','1','0','1']
]
console.log('-----a-----', exect(a));
