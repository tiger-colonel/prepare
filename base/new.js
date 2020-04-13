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

function spawn(genF) {
    return new Promise((resolve, reject) => {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (error) {
                return reject(error)
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then()
        }
    })
}
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e);
                    });
                }
            );
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}
