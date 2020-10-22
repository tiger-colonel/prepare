const path = require('path');
const tempFilePath = path.resolve('tmp/vm_lowcode');
const localSrcPath = path.join(tempFilePath, 'src');
const localDistPath = path.join(tempFilePath, 'dist');

module.exports = {
    tempFilePath,
    localSrcPath,
    localDistPath,
};
