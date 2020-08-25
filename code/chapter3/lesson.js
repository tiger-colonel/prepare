/*
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-08-18 10:22:21
 * @LastEditTime: 2020-08-25 14:54:02
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
// console.log('----------', letterCombinations1('2345'));

// function getSubArr(array) {
//     return array.reduce((t, v) => {
//         return t.concat(t.map(i => i.concat(v)))
//         // return t.push(t.map(i => v.concat(i)))
//     }, [[]])
// }
// console.log('----------', letterCombinations1('243'));

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


let code = (k) => {
    if (k === 0) {
        return ['0']
    } else if (k === 1) {
        return ['0', '1']
    } else {
        let prev = code(k - 1);
        let result = [];
        let max = Math.pow(2, k) - 1;
        for (let i = 0; i < prev.length; i++) {
            result[i] = `0${prev[i]}`;
            result[max-i] = `1${prev[i]}`;
        }
        return result;
    }
}

// 格雷编码
function greenCode(k) {
    let arr = code(k);
    // console.log('-----arr-----', arr);
    return arr.map(item => parseInt(item, 2));
}

// console.log('-----greenCode-----', greenCode(3));

function group(deck) {
    function gcd(num1, num2) {
        return num2 === 0 ? num1 : gcd(num2, num1%num2)
    }
    let timeObj = deck.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
    let timeArray = Object.values(timeObj)
    let g = timeArray[0]
    timeArray.forEach(item => g = gcd(item, g));
    return g >= 2;
}

var canPlaceFlowers = function(flowerbed, n) {
    let max = 0;
    flowerbed.unshift(0);
    flowerbed.push(0);
    for(let i = 1; i < flowerbed.length; i++) {
        if (flowerbed[i] == 0) {
            if (flowerbed[i-1] == 0 && flowerbed[i+1] == 0) {
                flowerbed[i] = 1;
                max++;
                i++;
            }
            if (max >= n) {
                return true;
            }
        }
    }
    return false;
};

// console.log('-----canPlaceFlowers-----', canPlaceFlowers([1,0,1,0,1,0,1], 0));

