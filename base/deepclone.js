// 0811 
// 基础版本
function deepclone(target) {
    let cloneObj = {};
    Object.keys(target).forEach((item) => {
        cloneObj[key] = target[key]
    });
    return cloneObj;
}
// 1.0版本 考虑数组
function deepclone1(target) {
    let isArray = [].isArray.call(target);
    let cloneObj = isArray ? [] : {};
    for (const key in target) {
        cloneObj[key] = target[key]
    }
    return cloneObj;
}

// 2.0 考虑递归
function deepclone2(target) {
    let isArray = [].isArray.call(target);
    let cloneObj = isArray ? [] : {};
    for(const key in target) {
        cloneObj[key] = typeof target[key] === 'object' ? deepclone2(target[key]) : target[key];
    }
    return cloneObj;
}

// 3.0 考虑循环引用
function deepclone3(target, map = new Map()) {
    let isArray = Array.isArray(target);
    let cloneObj = isArray ? [] : {};
    for (const key in target) {
        if (map.has(target)) {
            return map.get(target);
        }
        map.set(target, cloneObj);
        cloneObj[key] = typeof target[key] === 'object' ? deepclone2(target[key]) : target[key];
    }
    return cloneObj;
}

// 4.0 考虑性能
function deepclone4(target, map = new Map()) {
    if (typeof target === 'object') {
        let isArray = Array.isArray(target);
        let cloneObj = isArray ? [] : {};
        if (map.has(target)) {
            return map.get(target)
        }
        map.set(target, cloneObj);
        function forEach(array, cb) {
            let i = -1;
            while (++i < array.length) {
                cb(i, array[i]);
            }
            return array;
        }
        let keys = isArray ? target : Object.keys(target);
        forEach(keys, (key, value) => {
            if (keys) {
                key = value;
            }
            cloneObj[key] = deepclone4(target[key], map);
        });

        return cloneObj;
    } else {
        return target;
    }
}
