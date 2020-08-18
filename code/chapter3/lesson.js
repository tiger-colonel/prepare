// function letterCombinations(str) {
//     let numMap = ['', '1', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
//     if (!str) {
//         return [];
//     }
//     let num = str.split('');
//     let code = [];
//     num.forEach(val => {
//         if (numMap[val]) {
//             code.push(numMap[val]);
//         }
//     });
//     let comb = (arr) => {
//         let tmp = [];
//         for (let i = 0, il = arr[0].length; i < il; i++) {
//             for(let j = 0, jl = arr[1].length; j < jl; j++) {
//                 tmp.push(`${arr[0][i]}${arr[1][j]}`);
//             }
//         }
//         arr.splice(0, 2, tmp);
//         if (arr.length > 1) {
//             comb(arr);
//         } else {
//             return tmp;
//         }
//         return arr[0];
//     }
//     if (!code.length) {
//         return str;
//     }
//     if (code.length === 1) {
//         return numMap[str].split('');
//     }
//     if (code.length > 1) {
//         return comb(code);
//     }
// }

function letterCombinations1(digits) {
    let numMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    if (!digits) return [];
    if (digits.length === 1) return numMap[digits].split('');
    
    let d = digits.split('');
    d = d.map(num => {
        return numMap[num].split('')
    })
    
    let arr = []

    help(d[0], d[1])

    function help(arr1, arr2) {
        arr1.forEach(a1 => {
             arr2.forEach(a2 => {
                 arr.push(`${a1}${a2}`)
            })
        })
        d.splice(0, 2, arr);
        if (d.length > 1) {
            arr = []
            help(d[0], d[1])
        }
    }

    return arr
}
console.log('----------', letterCombinations1());

// function getSubArr(array) {
//     return array.reduce((t, v) => {
//         return t.concat(t.map(i => i.concat(v)))
//         // return t.push(t.map(i => v.concat(i)))
//     }, [[]])
// }
// console.log('----------', getSubArr([1,2,3]));

function aaa(str) {
    let numMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }
    if (!str) return str;
    if (str.length === 1) return numMap[str].split('');
    let d = str.split('');
    d = d.map(num => {
        return numMap[num].split('')
    });
    let arr = [];
    help(d[0], d[1]);
    function help(arr1, arr2) {
        arr1.forEach(item1 => {
            arr2.forEach(item2 => {
                arr.push(`${item1}${item2}`)
            })
        });
        d.splice(0, 2, arr);
        if (d.length > 1) {
            arr = [];
            help(d[0], d[1]);
        }
    }
    return arr;
}

console.log('-----aaa-----', aaa('3'));
