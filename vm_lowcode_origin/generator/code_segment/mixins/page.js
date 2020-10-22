((page) => {
    return {
        methods: {
            getByAid(aid) {
                let foundMod = this.modList.find((mod) => {
                    return +aid === mod.aid;
                });
                if (!foundMod) {
                    return null;
                }
                let modComponent = this.$refs[foundMod.ref];
                let {apiDesc} = foundMod;
                let {publicMethods} = apiDesc;
                let publicMethodNames = (publicMethods || []).map((method) => method.name.replace(/(\w+).*/, '$1'));
                publicMethodNames.push('on');
                return new Proxy(modComponent, {
                    get(target, prop) {
                        if (publicMethodNames.indexOf(prop) > -1) {
                            if (prop in target) {
                                return target[prop];
                            } else if (prop === 'on') {
                                return target.$on;
                            }
                        }
                        return undefined;
                    },
                });
            },
        },
    };
})(page);