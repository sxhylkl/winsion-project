<template>
  <div id="status-search">
    <img id="search-back" src="../../../assets/shadow.png" />
    <div id="search-back-content">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="status-search-font">巡检日期 : </div>
        </el-col>
        <el-col :span="4">
          <div class="status-search-style">
            <el-date-picker
              v-model="value"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchData">查询</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {messageAlert} from '../../../api'
  export default{
    props:['statusTime'],
    data(){
      return {
        value:this.statusTime
      }
    },
    methods:{
      searchData(){
        const currentTime = this.value
        if(!currentTime){
          messageAlert(this,'请选择时间', '提示')
          return
        }
        this.$store.dispatch('getStatusDate',{currentTime})
      }
    }
  }
</script>

<style scoped>
  #status-search{
    position: relative;
    padding-top: 18px;
  }
  #search-back{
    position: absolute;
    width: 1834px;
    height: 24px;
    left: 11px;
    top: 5px;
  }
  #search-back-content{
    width: 1834px;
    margin: 0 auto;
    background: rgba(0,0,0,.3);
    padding: 20px 0;
  }
  .status-search-font{
    line-height: 36px;
    text-align: center;
    color: #fff;
  }
</style>
