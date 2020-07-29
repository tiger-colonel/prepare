// 原型链继承

function GithubUser(username, password) {
    // private属性
    let _password = password 
    // public属性
    this.username = username 
    // public方法
    GithubUser.prototype.login = function () {
        console.log(this.username + '要登录Github，密码是' + _password)
    }
}

function JuejinUser(username, password) {
    this.articles = 3;
    const prototype = new GithubUser(username, password);
    prototype.readArticle = function() {
        console.log('-----read article-----');
    }
    this.__proto__ = prototype;
}

var juejinUser2 = new JuejinUser('ulivz', 'xxx', 3)
console.log(juejinUser1)


function extend(child, parent) {
    let prototype = Object.create(parent);
    prototype.constructor = child;
    child.prototype = prototype;
}
