function initData(vm) {
    observe(data, true);

}

function observe(value, asRootData) {
    // 返回观察者对象
    return new Observer(value)
}

class Observer {
    constructor(value) {
        this.value = value;

        // ① 对象添加、删除属性
        // ② 数组执行了变异方法，导致数组增加、删除元素、重排序
        this.dep = new Dep();
        // 数据劫持
        this.walk(value)
    }

    // 遍历对象的每一个key-value，为紫属性添加响应式处理
    walk(obj) {
        const keys = Object.keys(obj);
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        });
    }

    // 对每个key-value属性处理的闭包函数
    defineReactive(obj, key, value) {
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get: () => {
                if (Dep.target) {
                    // 依赖收集
                    //   - 该属性值的闭包dep将当前Dep.target作为订阅者
                    //   - 当前Dep.target将该属性值的闭包dep作为依赖
                    dep.depend();
                }
            },
            set: () => {
                dep.notify();
            }
        })
    }
}
