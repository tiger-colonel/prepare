/* eslint-disable no-undef */
/*
 * @description: 常用文件路径
 */
let path = require('path');

const srcPath = path.join(__dirname, '..', 'src');
const distPath = path.join(__dirname, '..', 'dist');

module.exports = {
    srcPath,
    distPath,
}
