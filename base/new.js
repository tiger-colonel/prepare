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
    let obj = {};
    let Con = [].shift().call(...arguments);
    obj.__proto__ = Con.prototype;
    let result = Con.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}

function new1 () {
    let obj = Object.create(null);
    let Con = [].shift().call(arguments);
    obj.__proto__ = Con.prototype;
    let result = Con.apply(obj, arguments)
    return typeof result === 'object' ? result : obj;
}

