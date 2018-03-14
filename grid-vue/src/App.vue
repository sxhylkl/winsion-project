<template>
  <div id="app">
    <header-area></header-area>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeaderArea from './home/HeaderArea.vue'
  export default {
    name: 'app',
    created(){
      this.$store.dispatch('getCommonList')
    },
    components:{
      HeaderArea
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100%;
    overflow: auto;
  }
  #app .el-button--primary{
    background: #1F5AB7;
    border: 1px solid #1F5AB7;
  }
</style>
