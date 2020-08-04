const getData = () => new Promise(resolve => setTimeout(() => resolve("data"), 1000))
  
function* testG() {
      // await被编译成了yield
      console.log('-----1-----', 1);
      const data = yield getData();
      
      console.log('data: ', data);
      const data2 = yield getData()
      console.log('data2: ', data2);
      return 'success'
}

var gen = testG();
var dataPromise = gen.next();
gen.next('这个参数才会被赋给data变量');

function asyncToGenerator(generatorFunc) {
    // 返回一个函数
    return function() {
        // 把传进来的函数编程迭代器，对应 line 14
        const gen = generatorFunc.apply(this, arguments);
        // 返回promise， 外部调用使用的是then，let result = await ajax().then();
        return new Promise((resolve, reject) => {
            // 内部定义一个step函数， 用于一步一步的调用 yield函数
            // key 有 next 和throw  两种取值，对应的是gen.next()和gen.throw()
            function step(key, arg) {
                let generatorResult;
                try {
                    generatorResult = gen[key](key, arg)
                } catch (error) {
                    reject(error)
                }
                // gen.next() 得到的是 {value, done}的结构
                const { value, done } = generatorResult;
                if (done) {
                    resolve(value)
                } else {
                    return Promise.resolve(value).then(res => step('next', val), err =>step('throw'))
                }
            }
            step('next')
        })
    }
}
