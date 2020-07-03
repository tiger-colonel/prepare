async function async1() {
    await async2();
    console.log('async1 end')
}

async function async2() {
    console.log('async1 end')
}

async1()

setTimeout(() => {
    console.log('-----setTimeout-----');
});

new Promise((resolve, reject) => {
    console.log('-----Promise-----');
    resolve()
}).then(() => {
    console.log('-----promise1-----');
}).then(() => {
    console.log('-----promise2-----');
})
