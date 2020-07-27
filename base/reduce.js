function Difference(arr = [], oarr = []) {
    return arr.reduce((t, v) => (!oarr.includes(v) && t.push(v), t), []);
}

// const arr1 = [1, 2, 3, 4, 5];
// const arr2 = [2, 3, 6];
// Difference(arr1, arr2); // [1, 4, 5]

// 乘法口诀
let a = [...new Array(9).keys()].reduce((t, v, i) => t + [...new Array(i + 1).keys()].reduce((u,w,j) => `${u}${i + 1} x ${j + 1} = ${(i + 1) * (j + 1)} `, '').trim() + '\n', '\n');
// console.log(a);

// ，求数组全部子集, 有两层concat
let b = [1,2,3,4,5,6].reduce((t, item) => t.concat(t.map(v => v.concat(item))), [[]])
// console.log(b);
// function allChildren(arr) {
//     return arr.reduce((t, item) => {
//         return t.concat(
//             t.map(
//                 v => v.concat(item);
//             )
//         )
//     }, [[]])
// }

// 按顺序运行promise
function runPromiseInSequence(arr, input) {
    return arr.reduce((promiseChain, currentPromise) => promiseChain.then(currentPromise), Promise.resolve(input))
}
function p1(a) {
  return new Promise((resolve, reject) => resolve(a * 5));
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => resolve(a * 2));
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
 return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => resolve(a * 4));
}

const promiseArr = [p1, p2, f3, p4];

runPromiseInSequence(promiseArr, 2).then(res => console.log(res, '1'));



// 手写自己的reduce

function myreduce(cb) {
    // 拿到调用的数组
    let arr = this, len = arr.length;
    // 初始值
    let k = 0;
    // 
    let value;
    // 取到初始值
    if (arguments.length > 1) {
        value = arguments[1];
    } else {
        while (k < len && !(k in o)) {
          k++; 
        }
        if (k > len) {
            // 报错，Reduce of empty array with no initial value
        }
        value = this[k++];
    }
    // 计算
    while (k < len) {
        if (k in this) {
            value = cb.call(null, value, this[k], k, this)
        }
        k++
    }

    return value;
}


