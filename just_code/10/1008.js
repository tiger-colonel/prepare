// 继承
1. 原型继承，但是原型链的方法会被所有实例共享，并且不能向parent传参
2. 构造函数继承，每次都会调用父函数，都会调用父函数中定义的方法
3. 组合继承，结合上述两种继承，child原型指向parent的实例
4. 原型式继承
function createObj(o) {
    function F() {};
    F.prototype = o;
    return new F();
}
5. 寄生继承
function jssheng(o) {
    let clone = Object.create(o);
    return clone;
}
6. 寄生组合
function contact(child, parent) {
    let prototype = Object.create(parent);
    prototype.constructor = child;
    child.prototype = prototype;
}

