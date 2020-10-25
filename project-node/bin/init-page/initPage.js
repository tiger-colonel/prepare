const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const copydir = require('copy-dir');
const inquirer = require('inquirer');
const chalk = require('chalk');
// ast 解析器
const parse = require('babylon').parse;
const traverse = require('babel-traverse').default;
const t = require('babel-types');
const template = require('babel-template');
const generate = require('babel-generator').default;
const {exec, execSync} = require('child_process');
const ora = require('ora');
const {isExist, success, warn, error, toCamel} = require('./util');

const loading = ora('eslint fixing ...');
const templatePath = path.resolve(__dirname, './template');
const projectRootPath = path.resolve(__dirname, '../../');

const initPage = (path, fileName) => {

}

module.exports = initPage;
