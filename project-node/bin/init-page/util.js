const fs = require('fs');
const chalk = require('chalk');
const symbol = require('log-symbols');

const isExist = (path) => new Promise((resolve, reject) => {
    fs.access(path, (err) => {
        reject(!err)
    })
})

const success = msg => {
    console.log(symbol.success, chalk.green(msg));
}

const error = msg => {
    console.log(symbol.error, chalk.red(msg));
}

const warn = msg => {
    console.log(symbol.warn, chalk.yellow(msg));
}

// 转驼峰
const toCamel = (string) => string.replace(/[_|/]([a-z]|[A-Z])/g, (match, p1) => {
    return p1.toUpperCase();
});

module.exports = {
    isExist,
    success,
    error,
    warn,
    toCamel,
}
