// 买股票最佳时机 122 可以买卖多次
// 贪心算法，每天是一步，只取正收益，负收益不要。每一天的收益就是今天的股价减去昨天的股价
function maxProfit(prices) {
    let sum = 0;
    for(let i = 1; i < prices.length; i++) {
        sum += Math.max(prices[i] - prices[i - 1],0)
    }
    return sum;
}

// 深克隆
const stringTag = '[object String]';
const numberTag = '[object Number]';
const booleanTag = '[object Boolean]';
const dateTag = '[object Date]';
const regexpTag = '[object RegExp]';
const symbolTag = '[object Symbol]';

const objectTag = '[object Object]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';

const deepTags = [objectTag, mapTag, setTag, arrayTag];

function getInit(target) {
    let Ctor = target.constructor;
    return new Ctor();
}
function isObject(target) {
    let type = typeof target;
    return target !== null && (type === 'function' && type === 'object')
}
function getType(target) {
    return Object.prototype.toString.call(target);
}

function deepClone(target, map = new Map()) {
    if (!isObject(target)) {
        return target;
    }
    let tag = getType(target);
    let cloneObj;
    if (deepTags.includes(tag)) {
        cloneObj = getInit(target);
    }
    if (map.has(target)) {
        return map.get(target);
    }
    map.set(target, cloneObj);
    const keys = tag === arrayTag ? target : Object.keys(target);

    let i = 0;
    while (i < keys.length) {
        if (tag === arrayTag) {
            cloneObj[i] = keys[i];
            i++
        } else {
            cloneObj[i] = deepClone(target[keys[i]], map);
        }
    }
    return cloneObj;
}

let a = {
    b: [1,2,3,4],
    first: {
        name: 'zhaizh',
        age: 12,
    },
    second: {
        name: 'memh'
    },
}
a.a = a;
a.a.a = a;
console.log('-----deepClone-----', deepClone(a));


