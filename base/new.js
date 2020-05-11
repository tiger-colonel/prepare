function _new() {
    let obj = {};
    let [constructor, ...args] = [...arguments];
    obj.__proto__ = constructor.prototype;
    let result = constructor.apply(obj, args);
    if (result && (typeof result === 'object' || typeof result === 'function') {
        return result;
    }
    return obj;
}

function new() {
    let object = {};
    let Con = [].shift().call(...arguments);
    obj.__proto__ = Con.prototype;
    let result = Con.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}

