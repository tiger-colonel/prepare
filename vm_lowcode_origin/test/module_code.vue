<template>
    <div class="highlight">
        测试： {{name}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
            };
        },
        methods: {
            init(data) {
                let {
                    modData,
                } = data;
                this.name = modData.mOutput.name;
            },
        },
    };
</script>

<style>
.highlight {
    color: #00f;
}
</style>
