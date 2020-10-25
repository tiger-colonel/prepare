const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');  // 终端工具问答使用
const initPage = require('./initPage');
const {warn, error} = require('./util');

// 校验参数
const argv = JSON.parse(process.env.npm_config_argv).original;

let fileName = argv.filter(item => item.indexOf('--') === 0)[0].replace('--', '');

if (/[^\w-/]/g.test(fileName)) {
    error(`请输入正确的文件路径！${fileName}`);
    process.exit(0);
}

const bizDirPath = path.resolve(__dirname, '../../', 'src');

let bizDir = fs.readdirSync(bizDirPath); // 拿到目标目录下的文件名称
bizDir = bizDir.filter(item => item.indexOf('.') < 0); // 去掉同一层级的代码文件

if (!bizDir.includes(fileName.split('/')[0])) {
    warn(`src 下没有该目录: ${fileName.split('/')[0]}\n`);
    inquirer.prompt([
        {
            name: 'useDefault',
            message: '是否加在 src 目录下？(Y/n)',
        }
    ]).then(({useDefault}) => {
        let targetDirPath;
        if (useDefault === '' || useDefault === 'Y' || useDefault === 'y') {
            targetDirPath = path.resolve(bizDirPath, 'testInitPage', fileName);
        } else {
            targetDirPath = path.resolve(bizDirPath, fileName)
        }
        initPage(targetDirPath, fileName);
    })
} else {
    const targetDirPath = path.resolve(bizDirPath, fileName);
    initPage(targetDirPath, fileName)
}



 
