const Base = require('../../../repository/oss/base');
const oss = new Base('h5-apps', 'lowcode');

const uploadFile = async (filename, content) => {
    await oss.connect();
    return await oss.upload(filename, content);
}

module.exports = {
    uploadFile,
};
