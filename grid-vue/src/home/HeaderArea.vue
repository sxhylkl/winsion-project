<template>
  <div id="grid-home">
    <div :class="{'change-background':activeIndex=='status'}" @click="changeRouter('status')">巡视状况</div>
    <div :class="{'change-background':activeIndex=='record'}" @click="changeRouter('record')">巡视记录</div>
    <div :class="{'change-background':activeIndex=='manage'}" @click="changeRouter('manage')">问题管理</div>
  </div>
</template>

<script>
  let flag = window.location.href.split('/#/')[1]
  export default {
    data() {
      return {
        activeIndex: flag?flag:'status'
      }
    },
    methods:{
      changeRouter(path){
        this.$router.push({path})
        this.activeIndex = path
      }
    }
  }
</script>

<style scoped>
  #grid-home{
    height: 30px;
    width: 1857px;
    margin: 5px auto;
    color: #fff;
    overflow: hidden;
  }
  #grid-home>div{
    float: left;
    width: 85px;
    line-height: 30px;
    padding-left: 35px;
    margin-right: 10px;
    cursor: pointer;
    background: url("../assets/navSmall.png") right no-repeat;
  }
  .change-background{
    background: url("../assets/nav.png") no-repeat !important;
  }
</style>
