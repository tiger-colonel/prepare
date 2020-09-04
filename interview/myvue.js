class Compiler {
    constructor(el ,vm) {
        this.el = this._isElementNode(el) ? el : document.querySelector(el);
        let fragment = this.node2fragment(this.el);
    }
    _isElementNode(node) {
        return node.nodeType === 1;
    }
    _isDeirective(name) {
        return true;
    }
    // 编译元素的
    compileElement (node) {
        let attributes = node.attributes;
        [...attributes].forEach(attr => {
            let {name, value} = attr;
            // 判断是不是指令
            if (this._isDeirective(name)) {
                console.log('-----element-----', node);
            }
        });
    }
    /*
     * @description: 编译文本的，判断当前节点中是否含有 {{aaa}}
     * @param {type} 
     * @return {type} 
     */
    compileText(node) { // 
        let content = node.textContent;
        if (/\{\{(.+)\}\}/.test(content)) {
            console.log('-----text-----', content);
        }
    }
    compile(node) {
        let childNodes = node.childNodes;
        [...childNodes].forEach(child => {
            if (this.isElementNode(child)) {
                this.compileElement(child);
                // 如果是元素的话 需要把自己传进去 再去遍历子节点
                this.compile(child)
            } else {

            }
        })
    }
}
class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        if (this.$el) {
            new Compiler(this.$el, this);
        }
    }
    
}
