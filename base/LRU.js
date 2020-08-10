// FIFO 、LRU、LFU缓存淘汰算法

// FIFO先进先出，设置缓存上限，达到后按照先进先出的原则进行淘汰
// // 0810
// class FIFO {
//     constructor(limit = 10) {
//         this.limit = limit;
//         this.map = new Map();
//         this.keys = [];
//     }
//     set(key, value) {
//         if (this.keys.length >= this.limit) {
//             let i = this.keys.indexOf(key);
//             if (i > -1) {
//                 this.keys.split(i, 1)
//             } else {
//                 this.map.delete(this.keys.shift())
//             }
//         }
//         this.keys.push(key);
//         this.map.set(key, value)
//     }
//     get(key) {
//         this.map.get(key)
//     }
// }

// // LRU算法，如果数据最近被访问过，那么未来被访问的几率也很高，按照时间维度
// class LRU {
//     constructor(limit = 3) {
//         this.limit = limit;
//         this.map = new Map();
//     }
//     get(key) {
//         let cache = this.map;
//         if (cache.has(key)) {
//             cache.delete(key);
//             cache.set(key, value);
//             return cache.get(key);
//         } else {
//             return -1
//         }
//     }
//     put(key, value) {
//         let cache = this.map;
//         if (cache.has(key)) {
//             cache.delete(key)
//         } else if (cache.size === this.limit) {
//             cache.delete(cache.keys().next().value);
//         }
//         cache.set(key, value)
//     }
// }

// LFU算法，当空间满时，通过访问次数，淘汰问次数最小的数据。按照频率维度
class LFU {

}

let a = new LFU(3);

a.set(1,1);
a.set(2,2);
a.set(3,3);
console.log('-----a-----', a);
a.get(1);
a.get(1);
a.get(2);
a.get(3);
console.log('-----a-----', a);


