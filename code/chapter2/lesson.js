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
// console.log('----------', searchSubArray(a));

function reverseStr(str) {
    return str.split(' ').map((item) => {
        return item.split('').reverse().join('');
    }).join(' ');
}

// let testreverseStr = 'let\'s learn leecode everyday';
// console.log('----------', reverseStr(testreverseStr));

function phone(nums) {
    const numMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jki',
        6: 'mno',
        7: 'prqs',
        8: 'tuv',
        9: 'wxyz'
    }
    console.log('-----nums-----', nums);
    let d = nums.split('');
    d = d.map(num => {
        return numMap[num].split('');
    });
    let arr = [];
    
    let help = (arr1, arr2) => {
        // console.log('-----arr1,arr2-----', arr1,arr2);
        arr1.forEach(i => {
            arr2.forEach(j => {
                arr.push(`${i}${j}`)
            })
        })
        d.splice(0, 2, arr);
        
        if (d.length < 1) {
            arr = [];
            help(d[0], d[1])
        }
    }
    help(d[0], d[1])
    
    return arr;
}

console.log('-----phone(23)-----', phone('23'));
