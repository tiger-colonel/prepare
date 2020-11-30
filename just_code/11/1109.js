// for (var i = 0; i < 4; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, i * 1000);
// }

// for (var i = 0; i < 4; i++) {
//     (function(i) {
//         setTimeout(() => {
//             console.log(i)
//         }, i * 1000);
//     })(i)
// }

// for (var i = 0; i < 4; i++) {
//     setTimeout((j) => {
//         console.log(j)
//     }, 1000 * i, i);
// }

// const tasks = [];
// for (var i = 0; i < 4; i++) {
//     ((j) => {
//         tasks.push(new Promise(resolve => {
//             setTimeout(() => {
//                 console.log(j);
//                 resolve();
//             }, 1000 * j);
//         }))
//     })(i)
// }
// Promise.all(tasks).then(() => {
//     setTimeout(() => {
//         console.log(i)
//     }, 1000);
// })

// const sleep = (wait) => new Promise(resolve => {
//     setTimeout(resolve, wait);
// });
// (async () => {
//     for (let i = 0; i < 5; i++) {
//         await sleep(i * 1000)
//         console.log(i)
//     }
// })()

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

