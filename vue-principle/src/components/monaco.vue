<!--
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-10-27 13:09:31
 * @LastEditTime: 2020-10-27 18:55:54
 * @LastEditors: zhaocheng.zhai
-->
<template>
  <div ref="monaco" style="height: 1000px; width: 1000px"></div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

export default {
    data () {
        return {
            editor: null,
        }
    },
    mounted () {
        this.editor = monaco.editor.createDiffEditor(
            this.$refs.monaco, {
                value:`console.log("hello,world")`,
                original: '12323',
                language:"javascript",
                automaticLayout: true,
                theme: 'vs-dark'
        });
        console.log('----------', this.editor)
    },
    destroyed () {
        // monacoInstance.dispose();
    }
}
</script>

<style>

</style>
