const getVal = (obj, ...props) => {
    if (!props || !props.length) {
        return obj;
    }
    return getVal(obj[props.shift()], ...props)
}
const test = {
    a: {
        b: 1,
    },
}
console.log(getVal(test, 'a', 'b')) // 1
