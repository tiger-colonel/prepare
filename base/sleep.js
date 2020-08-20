// const tasks = [];
// const output = (i) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('-----i-----', i);
//         resolve()
//     }, i * 1000);
// })

// for(var i = 0; i < 5; i++) {
//     tasks.push(output(i))
// }

// Promise.all(tasks).then(() => {
//     setTimeout(() => {
//         console.log('-----i-----', i);
//     }, 1000);
// })

function sort(arr) {
    let max = arr.length;
    for(let j = 0; j < max - 1; j++) {
        // console.log('-----j-----', j, arr[j]);
        let min = arr[j];
        for(let i = j + 1; i < max; i++) {
            if (min > arr[i]) {
                let tmp = arr[i];
                arr[i] = min;
                min = tmp;
            }
        }
        arr[j] = min;
    }
    return arr;
}
let a = sort([4,1,36,2,61,3]);
console.log(a);
