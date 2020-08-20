/*
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-08-18 10:22:21
 * @LastEditTime: 2020-08-18 23:07:54
 * @LastEditors: zhaocheng.zhai
 */
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
// console.log('----------', letterCombinations1());

// function getSubArr(array) {
//     return array.reduce((t, v) => {
//         return t.concat(t.map(i => i.concat(v)))
//         // return t.push(t.map(i => v.concat(i)))
//     }, [[]])
// }
// console.log('----------', getSubArr([1,2,3]));

function hasGroupSizeX(deck) {
    function gcd(num1, num2) {
        return num2 === 0 ? num1 : gcd(num2, num1 % num2)
    }
    let timeMap = new Map();
    deck.forEach(num => {
        timeMap.set(num, timeMap.has(num) ? timeMap.get(num) + 1 : 1)
    })

    let timeArray = [...timeMap.values()];
    let g = timeArray[0];
    timeArray.forEach(time => {
        g = gcd(time, g);
    })
    return g >= 2;
}

console.log('----------', hasGroupSizeX([1,2,3,4,4,3,2,1]));

