<template>
  <div id="judge">
    <div class="judge-container" v-for="judgeDetail in judgeDetailData">
      <el-row>
        <el-col :span="24">
          <el-input type="textarea" readonly v-model="judgeDetail.rateContent"
                    resize="none"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">服务评分</el-col>
        <el-col :span="18">
          <el-rate v-model="judgeDetail.starLevel" disabled></el-rate>
        </el-col>
      </el-row>
      <el-row v-if="judgeDetail.starLevel>0">
        <el-col :span="24">
          <span v-for="(item,index) in judgeDetail.tagName"
                :key="index+item" :class="{'judge-active':item.show}">{{item.rate}}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.MANAGE__JUDGE_DETAIL__GET_RATE_DETAIL,this)
    },
    computed: mapGetters({
      judgeDetailData: 'manage_judgeDetail_judgeDetailData'
    }),
  }
</script>
<style>
  #judge footer {
    border: none;
    background-color: #e4e5e7;
  }

  #judge textarea {
    height: 2.6rem;
    box-sizing: border-box;
    border: none;
    padding: 0.4rem 0.3rem;
    border-bottom: 1px solid #cccccc;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    font-size: 0.3rem;
  }

  #judge .el-row {
    margin-bottom: 0.2rem;
  }

  #judge .el-row:nth-of-type(2), #judge .el-row:nth-of-type(3) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  #judge .el-row:nth-of-type(2) {
    padding: 0.2rem;
    margin-bottom: 0;
  }

  #judge .el-row:nth-of-type(3) {
    padding: 0.3rem;
  }

  #judge .el-row:nth-of-type(3) span {
    float: left;
    margin: 0 0.2rem 0.2rem 0;
    padding: 0.1rem 0.24rem;
    border: 1px solid #cccccc;
    font-size: 0.28rem;
    -webkit-border-radius: 30px;
    -moz-border-radius: 30px;
    border-radius: 30px;
  }

  #judge .el-button {
    padding: 0.2rem 0;
    font-size: 0.32rem;
  }

  .judge-container {
    margin-bottom: 0.1rem;
    background-color: #fff;
  }

  .judge-active {
    background-color: #ecb22a;
    border-color: #ecb22a !important;
    color: #fff;
  }
</style>
