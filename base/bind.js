const baseBind = (context, ...args) => {
    return (...newArgs) => {
        return this.apply(context, ...args.concat(...newArgs))
    }
}


Function.prototype.mybind = function(context) {
    if (typeof this !== 'function') {
        throw new Error('Bind must be called on a function')
    }

    let self = this;
    let args = [...arguments].slice(1);
    // 空函数保存原函数的原型 prototype
    let noop = function() {};
    // 绑定的函数
    let bound = function() {
        console.log('-----2-----', this);
        let bindArgs = [...arguments].slice();
        return self.apply(
            // this instanceof noop 判断是否
            this instanceof noop ? this : context, 
            args.concat(bindArgs)
        )
    }
    // 箭头函数没有 prototype 箭头函数this指向定义他时所在的作用域
    if (this.prototype) {
        noop.prototype = this.prototype;
    }
    // console.log('-----1-----', 1);
    // 修改绑定函数的原型指向
    bound.prototype = new noop();
    return bound;
}
const bar = function() {
  console.log(this.name, arguments);
};

bar.prototype.name = 'bar';

const foo = {
  name: 'foo'
};

const bound = bar.mybind(foo, 22, 33, 44);
// new bound(); // bar, [22, 33, 44]
// bound();



var name = 'window'

var person1 = {
  name: 'person1',
  show3: function () {
    return function () {
        debugger;
      console.log(this.name)
    }
  },
  show4: function () {
      debugger;
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show3()()
person1.show3().call(person2)
person1.show3.call(person2)()

person1.show4()()
person1.show4().call(person2)
person1.show4.call(person2)()

function neww() {
    let obj = {};
    let Ctor = [].shift.call(arguments);
    obj.__proto__ = Ctor.prototype;
    let result = Ctor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj
}
