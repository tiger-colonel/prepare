// export default (str) => {
//     let arr = str.split(' ');
//     let result = arr.map((item) => {
//         return item.split('').reverse().join('');
//     });
//     return result;
// }

export default (str) => {
    return str.split(' ').map((item) => {
        return item.split('').reverse().join('');
    }).join(' ');
}

export default (str) => {
    return str.split(/\s/g).map((item) => {
        return item.split('').reverse().join('');
    }).join(' ');
}
