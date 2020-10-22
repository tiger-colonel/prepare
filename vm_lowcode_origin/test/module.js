const path = require('path');
const fs = require('fs-extra');
const Vm = require('../index');
const mOutput = require('./module_output.json');

const test = async() => {
    let vm = new Vm({appId: 1});
    let mod = {
        sourceCode: fs.readFileSync(path.join(__dirname, './module_code.vue'), {encoding: 'utf-8'}),
        mOutput,
    };
    const resp = await vm.render(mod, 'module');
    console.log(resp);
}

test();
