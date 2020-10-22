/* eslint-disable id-length */
/* eslint-disable no-console */
const signale = require('signale');
const Vm = require('../index');
const vm = new Vm({});
const testList = [];
const test = async (msg, asyncFn) => {
    if (testList.length > 0 && testList.indexOf(msg) === -1) {
        return;
    }
    const log = (boolean) => {
        if (boolean) {
            signale.success(msg);
            return;
        }
        signale.fatal(msg);
    };
    const t = {
        true(input) {
            log(input === true);
        },
        is: (a, b) => log(a === b),
    };
    await asyncFn(t);
};

// test('Error: MODULE_JS_PARSE_ERROR', async (t) => {
//     const resp = await vm.render({
//         appId: 1,
//         sourceCode: `
//             <template>
//                 <div class="module-test">
//                     <div ref="block1" class="block1" @click.stop="log">
//                         {{ test }}
//                     </div>
//                 </div>
//             </template>
//             <script>
//                 export default {
//                     data() {
//                         return {
//                             test: 'hello cmp2',
//                         };
//                     },
//                     methods: {
//                     a    init(data) {},
//                     },
//                 };
//             </script>
//             <style  lang="less">
//             @color: #698b00;
//             .module-test {
//                 height: 100px;
//                 width: 100%;
//             }
//             </style>
//         `,
//         mOutput: {
//             haha: 1,
//             hehe: 2,
//             arr: [1, 3],
//         },
//     }, 'module');
//     t.true(resp.code === 'MODULE_JS_PARSE_ERROR');
// });


test('Error: MODULE_CSS_PARSE_ERROR', async (t) => {
    const resp = await vm.render({
        appId: 1,
        sourceCode: `
            <template>
                <div class="module-test">
                    <div ref="block1" class="block1" @click.stop="log">
                        {{ test }}
                    </div>
                </div>
            </template>
            <script>
                export default {
                    data() {
                        return {
                            test: 'hello cmp2',
                        };
                    },
                    methods: {
                       init(data) {},
                    },
                };
            </script>
            <style  lang="less">
            @color: #698b00;
            .t {
                co
            }
            .module-test {
                height: 100px;
                width: 100%;
            }
            </style>
        `,
        mOutput: {
            haha: 1,
            hehe: 2,
            arr: [1, 3],
        },
    }, 'module');
    t.true(resp.code === 'MODULE_CSS_PARSE_ERROR');
});

