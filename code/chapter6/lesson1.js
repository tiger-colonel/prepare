// ip地址

export default (str) => {
    // 保存所有符合条件的ip
    let r = [];
    // 递归函数
    let search = (cur, sub) => {
        if (cur.length === 4 && cur.join('') === str) {
            r.push(cur.join('.'));
        } else {
            for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
                tmp = sub.substr(0, i + 1);
                if (tmp < 256) {
                    search(cur.concat([tmp]), sub.substr(i+1));
                }
            }
        }
    }
    search([], str);
    return r;
}
