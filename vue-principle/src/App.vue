<!--
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-04-20 18:47:41
 * @LastEditTime: 2020-11-14 13:55:29
 * @LastEditors: zhaocheng.zhai
--> 
<template>
  <div id="app">
    <sparrow />
    <!-- <MonacoEditor
      width="800"
      height="500"
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor> -->
    <!-- <Monaco></Monaco> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="msg"/>
    <div class="msg" ref="msg">{{msg}}</div>
    <br/>
    <div>-</div>
    <div @click="handleChangePage">点击改变页面message</div>
    <div @click="handleDestoryPage">销毁子组件</div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
// import Monaco from './components/monaco';
import Sparrow from '@sparrow-vue/develop-ui';
// import MonacoEditor from 'monaco-editor-vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // MonacoEditor,
    // Monaco,
    Sparrow,
  },
  data: () => ({
    options: {},
    msg: 'Learn Vue priniple',
    count: 1,
    destoryComponent: true,
  }),
  // beforeCreate () {
  //   console.log('-----parent beforeCreate-----', );
  // },
  // created () {
  //   console.log('-----parent crated-----');
  // },
  beforeUpdate () {
    console.log('------parent beforeUpdate----', );
  },
  updated () {
    console.log('-----parent updated-----', );
  },
  // beforeDestroy () {
  //   console.log('-----parent beforeDestroy-----', );
  // },
  // destroyed () {
  //   console.log('-----parent destroyed-----');
  // },
  methods: {
    handleChangePage() {
      this.count = 4;
      this.msg = this.count + 1;
      this.$nextTick(() => {
        console.log('-----in-----', this.$refs.msg.innerHTML);
      })
      console.log('----------', this.$refs.msg.innerHTML);
    },
    handleDestoryPage() {
      this.destoryComponent = !this.destoryComponent;
    },
    onChange(value) {
      console.log('-----value-----', value);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
