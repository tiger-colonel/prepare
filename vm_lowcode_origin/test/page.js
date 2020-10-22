const path = require('path');
const fs = require('fs-extra');
const Vm = require('../index');
const mOutput = require('./module_output.json');
const apiDesc = {
    events: [{
        name: 'click',
        desc: '',
        paramDesc: '',
    }],
    publicMethods: [{
        name: 'setFormData',
        desc: '',
        paramDesc: '',
    }],
};
const test = async() => {
    let vm = new Vm({appId: 1});
    let page = {
        sourceCode: `{
            mounted() {
                console.log('------page code -----', page);
                let mod = this.getModuleByAid(3);
                console.log(mod.on, mod.$on, mod);
                ajax({
                    url: 'http://h5apps.beicdn.com/lowcode_dev/output_1599550671324.json',
                    success(resp) {
                        console.log('----ajax response ----', resp);
                    }
                })
            },
        }`,
        modules: [{
            aid: 1,
            mvid: 44,
            mid: 1,
            versionString: '0.1',
            mOutput,
            apiDesc,
        },{
            aid: 2,
            mvid: 46,
            mid: 1,
            versionString: '0.1',
            mOutput,
            apiDesc,
        },{
            aid: 3,
            mvid: 44,
            mid: 1,
            versionString: '0.1',
            mOutput: {name: 'same-1'},
            apiDesc,
        }],
    };
    const resp = await vm.render(page, 'page');
    console.log(resp);
}

test();