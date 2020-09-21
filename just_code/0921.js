function quchong(arr) {
    let stack = [];
    for(let i = 0; i < arr.length; i++) {
        if (!stack.includes(arr[i])) {
            stack.push(arr[i])
        }
    }
    return stack;
}
console.log('-----quchong-----', quchong([1,2,2,2,2,2]));
