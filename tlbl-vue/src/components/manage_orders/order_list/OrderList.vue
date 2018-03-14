<template>
  <div id="orderList">
    <el-tabs v-model="activeName" @tab-click="routerTo">
      <el-tab-pane label="全部订单" name="all"></el-tab-pane>
      <el-tab-pane label="当前订单" name="current"></el-tab-pane>
      <el-tab-pane label="历史订单" name="history"></el-tab-pane>
    </el-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      this._getCurrentNav()
      setLocalStorage(this)
    },
    data(){
      return {
        activeName: ''
      }
    },
    methods: {
      routerTo(){
        this.$store.commit(types.MANAGE__ORDER_LIST__SET_ORDER_TYPE,this.activeName)
        this.$router.replace({path:`/orderList/${this.activeName}`});
      },
      _getCurrentNav() {
        let arr = window.location.href.split('orderList')
        if (!arr[1]) {
          this.activeName = 'all'
        }else {
          this.activeName = arr[1].substring(1)
        }
      }
    }
  }
</script>
<style>
  #orderList{
    position: relative;
  }

  #orderList .el-tabs__nav {
    width: 100%;
  }

  #orderList .el-tabs__header {
    background-color: #fff;
    border-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10000;
  }

  #orderList .el-tabs__item {
    width: 33.33%;
    text-align: center;
    /*border-right:1px solid #ccc;*/
  }

  #orderList .el-tabs__item.is-active {
    color: #2c6ab3;
  }

  #orderList .el-tabs__active-bar {
    height: 2px;
    background-color: #2c6ab3;
  }

  .el-tabs__header {
    margin: 0 0 0.1rem;
  }

  .el-tabs__content {
    margin: 0 0.1rem;
    padding-top: 47px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
  }

  .el-tabs__content > div > div > div {
    margin-bottom: 0.1rem;
  }
</style>
