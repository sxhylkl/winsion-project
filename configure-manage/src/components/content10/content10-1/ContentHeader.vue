<template>
  <div id="wrapper">
    <div style="text-align: center;margin-bottom: 20px">
      <h3>基本信息列表</h3>
    </div>
    <div style="text-align: right;padding-right: 30px">
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  export default{
    methods:{
      add(){
        this.$store.dispatch(types.CONTENT10_1_ADD_INFO_ACTION)
      }
    }
  }
</script>

<style scoped>
  #wrapper{
    margin-bottom: 20px;
  }
</style>
