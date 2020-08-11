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

var LFUCache = function (capacity) {
    this.limit = capacity;
    this.map = {};
    this.freqMap = {};
};

LFUCache.prototype.get = function (key) {
    let r = -1;
    if (typeof this.map[key] != "undefined") {
        let o = this.map[key];
        r = o.value;
        //更新频率记录
        this.updateL(key, o);
    }
    return r;
};

LFUCache.prototype.updateL = function (key, obj) {
    let freq = obj.freq;
    let arr = this.freqMap[freq];
    // 删除原频率记录
    this.freqMap[freq].splice(arr.indexOf(key), 1);
    // 清理
    if (this.freqMap[freq].length == 0) delete this.freqMap[freq];
    // 跟新频率
    freq = obj.freq = obj.freq + 1;
    if (!this.freqMap[freq]) this.freqMap[freq] = [];
    this.freqMap[freq].push(key);
};

LFUCache.prototype.set = function (key, value) {
    if (this.limit <= 0) return;
    if(typeof key=="undefined"||typeof value=="undefined") throw new Error('key or value is undefined');
    // 存在则直接更新
    if (typeof this.map[key] == "undefined") {
        // 获取频率 key
        // 判断容量是否满
        if (Object.keys(this.map).length == this.limit) {
            let fkeys = Object.keys(this.freqMap);
            let freq = fkeys[0];
            // 获取key集合
            let keys = this.freqMap[freq];
            // 淘汰首位
            delete this.map[keys.shift()]; 
            // 清理
            if (this.freqMap[freq].length == 0) delete this.freqMap[freq];
        }
        // 频率记录是否存在
        if (!this.freqMap[1]) this.freqMap[1] = [];
        // 插入新值
        this.freqMap[1].push(key);
        this.map[key] = {
            value: value,
            freq: 1 // 默认的频率
        };
    } else {
        this.map[key].value = value;
        //更新频率记录
        this.updateL(key, this.map[key]);
    }
};

let a = new LFUCache(3);

a.set(1,1);
a.set(2,2);
a.set(3,3);

a.get(1);
a.get(1);
a.get(2);
a.get(3);
a.get(2);
a.set(4,4);
console.log('-----a-----', a);


