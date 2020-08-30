
// 乘法口诀
let multiple = [...new Array(9).keys()].reduce((t, v, i) => t + [...new Array(i + 1).keys()].reduce((u,w,j) => `${u}${i + 1} x ${j + 1} = ${(i + 1) * (j + 1)} `, '').trim() + '\n', '\n');
// console.log(multiple);

// ，求数组全部子集, 有两层concat
// let b = [1,2,3,4,5,6].reduce((t, item) => t.concat(t.map(v => v.concat(item))), [[]])
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

function runPromiseBySerial(arr, input) {
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

// runPromiseInSequence(promiseArr, 2).then(res => console.log(res, '1'));


// 25个reduce用法
let a = [1,2,3,4]
// 1. 求和
function add(arr) {
  return arr.reduce((t,v) => (t += v, t));
}
// console.log('----------', add(a));
// 2. reverse
function reverse(arr) {
  return arr.reduceRight((t,v) => (t.push(v), t),[])
}
// console.log('----------', reverse(a));
// 3. map
function map(arr) {
  return arr.reduce((t, v) => [...t, v * 2], []);
}
function filter(arr) {
  return arr.reduce((t, v) => v > 1 ? [...t, v] : t, [])
}
// console.log('-----map(a)-----', filter(a));
// 数组分割
function chunk(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i+=size) {
    let tmp = [];
    for (let j = i; j < i + size; j++) {
      arr[j] && tmp.push(arr[j]);
    }
    result.push(tmp);
  }
  return result;
}

function chunkByReduce(arr, size) {
  return arr.reduce((t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t), [[]])
}

// console.log('-----result-----', chunkByReduce([1,3,4,5,2,6,7,8,9,10], 3));
function flat(arr) {
  let result;

  arr.forEach(item => {
    result.concat(Array.isArray(item) ? flat(item) : item)
  })
}
function flat1(arr) {
  return arr.reduce( (t, v) => t.concat(Array.isArray(v) ? flat1(v) : v), []);
}
// console.log('----------', flat1([1,[1,2,[4,5,[123], 5,32]]]));
function uniq(arr) {
  return arr.reduce((t, v) => t.includes(v) ? t : [...t, v], [])
}
// console.log('-----1-----', uniq([1,2,3,1,2,3,3,3,2]));
function count(arr) {
  return arr.reduce((t, v) => {
    t[v] = (t[v] || 0) + 1;
    return t;
  }, {})
}
// console.log('-----count-----', count([1,2,3,1,2,3,3,3,2]));
function position(arr, val) {
  return arr.reduce((t, v, i) => {
    v === val ? t.push(i): t;
    return t;
  }, [])
}
// console.log('-----position-----', position([1,2,3,1,2,3,3,3,2], 3));
function reverseStr(str) {
  return str.split('').reduceRight((t, v) => t + v, '');
}
// console.log('-----reverseStr-----', reverseStr(`let's us study js`));

// 千分位
function thousandNum(num = 0) {
  const str = (+num).toString().split('.');

  const integer = nums => nums.split('').reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), '').replace(/^,|,$/g, '');
  const fraction = nums => nums.split('').reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), '').replace(/^,|,$/g, '');
  return str.length > 0 ? `${integer(str[0])}.${fraction(str[1])}` : integer(str[0]);
}
// console.log('-----cal-----', thousandNum(12345.12345));

// 斐波那锲数列
function fibonaci(num) {
  let arr = [...new Array(num).keys()];
  return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [0, 1])
}
console.log('-----cal-----', fibonaci(10));





