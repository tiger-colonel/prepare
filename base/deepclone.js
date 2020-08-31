const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const stringTag = '[object String]';
const numberTag = '[object Number]';
const booleanTag = '[object Boolean]';
const dateTag = '[object Date]';
const regexpTag = '[object RegExp]';
const symbolTag = '[object Symbol]';
// const funcTag = '[object Function]';
const errorTag = '[object Error]';

const deepTags = [mapTag, setTag, objectTag, arrayTag];

// 完全版
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}
function getType(target) {
    return Object.prototype.toString.call(target);
}
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}
function cloneReg(target) {
    const reFlags = /\s*$/;
    const result = new target.constructor(target.source, reFlags.exec(target));
    result.lastIndex = target.lastIndex;
    return result;
}
function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.vall(target));
}
function cloneOtherType(target, type) {
    const Ctor = target.constructor;
    switch (type) {
        case booleanTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target)
        case regexpTag:
            return cloneReg(target)
        case symbolTag:
            return cloneSymbol(target)
        default:
            return null;
    }
}
function forEach(array, cb) {
    let i = -1;
    while (++i < array.length) {
        cb(i, array[i])
    }
    return array;
}

function deepClone(target, map = new Map()) {
    if (!isObject(target)) {
        return target;
    }

    let type = getType(target);
    let cloneTarget;
    if (deepTags.includes(type)) {
        cloneTarget = getInit(target, type);
    } else {
        return cloneOtherType(target, type);
    }

    if (map.has(target)) {
        return map.get(target)
    }
    map.set(target, cloneTarget);

    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(deepClone(value))
        });
        return cloneTarget;
    }

    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value))
        });
        return cloneTarget;
    }

    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = deepClone(target[key], map)
    })
    return cloneTarget;
}
