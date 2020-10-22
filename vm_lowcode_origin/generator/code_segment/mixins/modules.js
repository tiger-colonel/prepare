((page) => {
    return {
        computed: {
            showError() {
                const {errMessage} = this;
                if (!errMessage) {
                    return false;
                }
                return true;
            },
        },
        mounted() {
            ajax({
                url: `${page.mOutputJSON}`,
                type: 'GET',
                xhrFields: false,
                success: (res) => {
                    this.initModules(res);
                },
                error: () => {
                    this.initModules([]);
                },
            });
        },
        methods: {
            initModules(data) {
                this.modList.forEach((mod) => {
                    const {ref, aid} = mod;
                    const modComponent = this.$refs[ref];
                    const modData = data[aid];
                    mod.mOutput = modData;
                    this.loadModule(modComponent, mod);
                });
            },
            // data: 包括模块基本信息（aid, ref, ..）和模块API数据
            loadModule(moduleComponent, mod) {
                let {aid, mOutput} = mod;
                try {
                    moduleComponent.init({
                        modData: {
                            aid,
                            mOutput,
                        },
                    });
                } catch (e) {
                    this.errMessage = [
                        '<以下信息，仅在预览报错时展示>',
                        '',
                        '模块运行报错，请联系开发者',
                        '',
                        '模块ID：' + mod.moduleId + '@' + mod.versionString,
                        '模块位置：位置' + mod.position + '，编号' + mod.aid,
                        e.stack.split(/\r?\n/)
                            .map((str) => str.replace('http://h5apps.beicdn.com/hms3/', ''))
                            .slice(0, 2)
                            .join('\n'),
                    ].join('\n');
                }
            },
        },
    };
})(page);