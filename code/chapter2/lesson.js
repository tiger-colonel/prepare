function searchSubArray(str) {
    let arr = [];
    function match(str) {
        let j = str.match(/^(0+|1+)/g)[0];
        
        let o = (j[0] ^ 1).toString().repeat(j.length);
        let reg = new RegExp(`^(${j}${o})`);
        return reg.test(str) ? RegExp.$1 : '';
    }
    for(let i = 0, len = str.length; i < len; i++) {
        let result = match(str.slice(i));
        if (result) arr.push(result);
    }
    return arr;
}

let a = '11001100';
console.log('----------', searchSubArray(a));

function reverseStr(str) {
    return str.split(' ').map((item) => {
        return item.split('').reverse().join('');
    }).join(' ');
}

let testreverseStr = 'let\'s learn leecode everyday';
console.log('----------', reverseStr(testreverseStr));
