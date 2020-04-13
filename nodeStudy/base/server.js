const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    console.time();
    // fs.readFileSync('./big.file');
    // console.log('----------', fs.readFileSync('./big.file'));
    const src = fs.createReadStream('./big.file');
    src.pipe(res);

    console.timeEnd();
});

server.listen(8000);

// 流的分割，是平均
// end事件 
// 断点续传    
// 应用场景和解决问题
// 流是不是以二进制为基础

