const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    console.log('-----123-----', 123);
    const src = fs.createReadStream('../big.file');
    src.pipe(res);
    // fs.readFile('../big.file', (err, data) => {
    //     if (err) {
    //         throw err
    //     }
    //     res.end(data)
    // });
});

server.listen(8000);
