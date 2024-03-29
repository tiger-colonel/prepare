// 1. 数组扁平化
function flat(arr) {
    return arr.reduce((t, v) => t.concat(Array.isArray(v) ? flat(v) : v), []);
}
// console.log('-----flat-----', flat([1,2,[3,4,5, [6,7]]]));
// 2. 数组去重
function unique(arr) {
    return arr.myReduce((t,v) => (t.includes(v) ? t : t.push(v) , t), []);
}
// console.log('-----unique-----', unique([1,2,2,2,2,3]));
// 3. reduce
Array.prototype.myReduce = function(callback, initialValue) {
    const ctx = this;
    const len = ctx.length;
    let i = 0;
    let accumulator = initialValue || ctx[0];
    while (i < len) {
        accumulator = callback.call(null, accumulator, ctx[i], i, ctx);
        i++;
    }
    return accumulator;
}


// 4. call
Function.prototype.myCall = function(context = window, args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...args);
    delete context[fn];
    return res;
}

// 5. apply
Function.prototype.myApply = function(context = window, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    const fn = Symbol('fn');
    context[fn] = this;
    let res = context[fn](...args)
    delete context[fn];
    return res;
}

// 6. bind
Function.prototype.myBind = function(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('Type Error')
    }
    let self = this;
    return function F() {
        if (this instanceof F) {
            return new self(...args, ...arguments)
        }
        return self.apply(context, [...args, ...arguments])
    }
}


function myBind(context, args) {
    let self = this;
    return function F() {
        if (this instanceof F) {
            return new self(...args, ...arguments)
        }
        return self.call(context, ...args, ...arguments)
    }
}

// 7. 防抖, 是清零
function debounce(fn, wait) {
    let timer;
    return function() {
        cleanTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, ...arguments)
        }, wait);
    }
}

// 8. 节流 是加锁
function throttle(fn, wait) {
    let flag = true;
    return function() {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, ...arguments);
            flag = true;
        }, wait);
    }
}

// 9. 函数柯里化
function add() {
    const _args = [...arguments];
    function fn() {
        _args.push(...arguments);
        return fn;
    }
    fn.valueOf = function() {
        return _args.reduce((t,v) => t + v)
    }
    return fn;
}

// console.log('-----add(1)(2)(3)(4)-----', add(1)(1,2,3)(2).valueOf());


// 10. new
function factory(ctor, ...args) {
    if (typeof ctor !== 'function') {
        throw new Error('Type Error')
    }
    const obj = Object.create(ctor.prototype);
    const res = ctor.call(obj, ...args);
    return typeof res === 'object' ? res : obj;
}

// 11. instanceof
function myInstanceOf(left, right) {
    if (typeof left !== 'object' || typeof left === null) {
        return false;
    }
    let proto = left.__proto__;
    let prototype = right.prototype;
    while(true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = proto.__proto__;
    }
}

// 12.组合寄生继承
function extend(parent, child) {
    let prototype = Object.create(parent);
    prototype.contructor = child;
    child.prototype = prototype;
}

// Object.create()
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

// 13. deepclone
function deepclone(target, map = new Map()) {
    if (typeof target !== 'object' || typeof target !== 'function') {
        return target;
    }
    const isArray = Array.isArray(target);
    if (map.has(target)) return map.get(target);

    let cloneTarget = isArray ? [] : {};
    map.set(target, cloneTarget);
    const arr = isArray ? target : Object.keys(target);
    const len = arr.length;
    let i = 0;
    while (i < len) {
        cloneTarget[arr[i]] = deepclone(target[arr[i]], map);
        i++;
    }
    return cloneTarget;
}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};
target.target = target;
// console.log('-----deepclone-----', deepclone(target));

// 14. promise 并行限制
// function limit(max, array, callback) {
//     let allTasks = [];
//     let maxTasks = [];
//     let i = 0;
//     let promise = Promise.resolve();
//     let run = () => {
//         if (i === array.length) {
//             return promise;
//         }

//         const task = promise.then(() => callback(array[i++]));
//         allTasks.push(task);
//         console.log('-----allTasks-----', allTasks);

//         let executing = task.then(() => maxTasks.splice(maxTasks.indexOf(executing), 1));
//         maxTasks.push(executing);
        
//         let r = promise;
//         if (maxTasks.length >= max) {
//             r = Promise.race(maxTasks)
//         }
//         return r.then(() => run());
//     }
//     return run().then(() => Promise.all(allTasks))
// }

function limit(count, array, callback) {
  const tasks = [];
  const executing = [];
  let i = 0;
  let promise = Promise.resolve();
  const enqueue = () => {
      // 1. 边界条件，array为空，或者promise全都达到resolve状态
      if (i === array.length) {
          return promise;
      }
      // 2. 生成一个promise实例，并在then方法中的onFulfilled函数里返回实际要执行的promise
      const task = promise.then(() => callback(array[i++], array));
      tasks.push(task);
      console.log('-----tasks-----', tasks);
      // 4. 将执行完毕的promise移除
      const doing = task.then(() => executing.splice(executing.indexOf(doing), 1));
      // 3. 将正在执行的promise插入executing数组
      executing.push(doing);
      console.log('----------', executing);
      // 如果正在执行的promise达到了limit，使用Promise.race让已经执行好的promise先出去，新的promise再进来
      let res = promise;
      if (executing.length >= count) {
          res = Promise.race(executing)
      }
      // 5. 递归执行enqueue，直至满足1
      return res.then(() => enqueue());
  }
  return enqueue().then(() => Promise.all(tasks))
}

// test
const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000], timeout).then((res) => {
console.log(res)
})
let allpromises = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000].map(item => timeout(item))
Promise.all(allpromises).then(res1 => {
  console.log('-----res1-----', res1);
})

// 15. jsonp
const jsonp = ({url, params, callbackName}) => {
    const generateUrl = () => {
        let url = '';
        url = Object.keys(params).reduce((t, v) => (t += `${v}=${params[v]}&`, t), '');
        return url.substr(0, url.length - 1);
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script');
        scriptEle.src = generateUrl();
        document.body.appendChild(scriptEle);
        window[callbackName] = data => {
            resolve(data);
            document.removeChild(scriptEle)
        }
    })
}

// 16. ajax
function ajax(url, method) {
    return new Promise(resolve => {
        let xhr = new XMLHTMLRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function() {
            const {readyState, status} = xhr;
            if (readyState === 4 && (xhr.status === 200 || xhr.status === 404)) {
                resolve(xhr.response)
            }
        }
        xhr.send();
    })
}

// 17. events模块
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(type, cb) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(cb)
    }
    emit(type, params = {}) {
        if (this.events[type]) {
            this.events[type].forEach(fn => fn(...params))
        }
    }
    off(type, cb) {
        if (this.events[type]) {
            this.events[type].fliter(item => item !== cb);
        }
    }
    once(type, cb) {
        const self = this;
        function one() {
            cb.call(self, arguments);
            self.off(type, one)
        }
        this.on(type, one)
    }
}

// 18. settimeout实现setInterval
let timeWorker = {};
function mySetInterval(fn, wait) {
    let key = Symbol();
    const execu = (fn, wait) => {
        timeWorker[key] = setTimeout(() => {
            fn();
            execu(fn, wait)
        }, wait);
    }
    execu(fn, wait);
    return key;
}
let a = mySetInterval(() => console.log('1'), 3000);

function myClearInterval(key) {
    if (key in timeWorker) {
        clearTimeout(timeWorker[key]);
        delete timeWorker[key]
    }
}

setTimeout(() => {
    myClearInterval(a);
}, 4000);

// 19. 渲染几万条数据页面不卡顿， 使用requestAnimationFrame
setTimeout(() => {
    const total = 100000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    // 添加数据的方法
    function add() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
            const li = document.createElement('li');
            li.innerText = Math.random() * total;
            fragment.appendChild(li)
        }
        ul.appendChild(fragment)
        countOfRender++;
        loop();
    }
    function loop() {
        if (countOfRender < loopCount) {
            window.requestAnimationFrame(add)
        }
    }
    loop();
}, 0);

// 20. koa中间件 compose原理
function compose(middleware) {
    // 检验middleware为array，校验每个中间件函数必须为函数
    return function(ctx, next) {
        let index = -1;
        return dispatch(0);
        function dispatch(i) {
            // i 是即将执行中间件的索引, index 是已经执行的中间件的索引
            if (i <= index) {
                return Promise.reject(new Error('next() 调用多次'))
            }
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                const next = dispatch.bind(null, i + 1);
                const fnResult = fn(context, next);
                return Promise.resolve(fnResult);
                // return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

// function compose(middlewares) {
//     return function(ctx, next) {
//         let index = -1;
//         function dispatch(i) {
//             if (i <= index) {
//                 throw new Error('重复执行')
//             }
//             index = i
//             let fn = middlewares[i];
//             if (i === middlewares.length) fn = next;
//             if (!fn) return Promise.resolve()
//             try {
//                 const next = dispatch.call(null, i + 1)
//                 const fnResult = fn(context, next);
//                 return Promise.resolve(fnResult)
//             } catch (err) {
//                 return Promise.reject(err)
//             }
//         }
//         return dispatch(0);
//     }
    
// }


