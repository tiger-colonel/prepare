<!--
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-04-20 18:47:41
 * @LastEditTime: 2020-09-01 19:15:07
 * @LastEditors: zhaocheng.zhai
--> 
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <el-tabs v-model="activeName" @tab-click="hangleTabChange">
        <el-tab-pane label="用户管理" name="first">
          <el-input v-model="firstValue"></el-input>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <el-input v-model="secondValue"></el-input>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <el-input v-model="thirdValue"></el-input>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  beforeUpdate () {
    console.log('------child beforeUpdate----', );
  },
  updated () {
    console.log('-----child updated-----', );
  },
  data: () => ({
      activeName: 'first',
      firstValue: '',
      secondValue: 'q234234',
      thirdValue: '',
  }),
  methods: {
      hangleTabChange() {
        this.secondValue = '11111'
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ship-wrap {
    width: 200px;
    height: 100px;
    background: #ccc;
    color: red;
    margin: 20px auto;
  }
  .ship-wrapper-selected {
    color: #ccc;
    background: red;
  }
</style>
