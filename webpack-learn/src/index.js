import data from './data';

import css from './style.css';
require('./a.css');

function fn1() {
    console.log('-----fn1-----');
}

fn1();
console.log('-----data-----', data);

let fn2 = () => {
    console.log('-----fn2-----');
}
fn2();
