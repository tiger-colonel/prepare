<!--
 * @Description: 
 * @Author: zhaocheng.zhai
 * @Date: 2020-04-20 18:47:41
 * @LastEditTime: 2020-07-24 15:13:53
 * @LastEditors: zhaocheng.zhai
--> 
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['msg'],
  // beforeCreate () {
  //   console.log('-----child beforeCreate-----', );
  // },
  // created () {
  //   console.log('-----child crated-----');
  // },
  beforeUpdate () {
    console.log('------child beforeUpdate----', );
  },
  updated () {
    console.log('-----child updated-----', );
  },
  // beforeDestroy () {
  //   console.log('-----child beforeDestroy-----', );
  // },
  // destroyed () {
  //   console.log('-----child destroyed-----');
  // }

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
