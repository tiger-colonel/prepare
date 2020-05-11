function clonebase (target) {
    let cloneObj = {};
    for(let i in target) {
        cloneObj[i] = target[i];
    }
    return cloneObj;
}

function cloneDeep(target) {
    if (typeof target === 'object') {
        let cloneObj = {};
        for (let i in target) {
            cloneObj[i] = cloneDeep(target[i]);
        }
        return cloneObj;
    } else {
        return target;
    }
}

const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
};
// console.log(cloneDeep(target));

function cloneArray (target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (let key in target) {
            cloneTarget[key] = cloneArray(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

const targetArray = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
targetArray.targetArray = targetArray;


// console.log(cloneDeep(targetArray))
// console.log(cloneArray(targetArray), 'array');

function cloneMap (target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        for (let key in target) {
            cloneTarget[key] = cloneMap(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

console.log('----------', cloneMap(targetArray));


