
function fn1() {
    // console.log('-----fn1-----');
}

fn1();
// console.log('-----data-----', data);

let fn2 = () => {
    // console.log('-----fn2-----');
}
fn2();

setTimeout(() => {
    // import('./data.js').then(res => {
    //     // console.log('-----res-----', res);
    // })
}, 1000);

// var counter = require('./a');

// counter.increment();
// console.log(counter.counter); // 1

import * as counterImport from '../../counter';

console.log(counterImport.counter); // 1
counterImport.increment();
console.log(counterImport.counter); // 2

