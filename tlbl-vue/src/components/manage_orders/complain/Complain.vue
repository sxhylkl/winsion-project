<template>
  <div class="complain-container" id="complainContainer">
    <div class="complain-message">
      <el-input type="textarea" placeholder="请输入您的投诉信息..." v-model="content" resize="none"
                :maxlength="400" @change="handleContentChange"></el-input>
      <span class="complain-number">{{maxLength}}</span>
    </div>
    <div class="complain-single">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">订单编号:</el-col>
        <el-col :span="14">
          <el-input v-model="complainData.serialNumber"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="complain-single">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">姓&#12288&#12288名:</el-col>
        <el-col :span="14">
          <el-input v-model="complainData.contact"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="complain-single">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">联系电话:</el-col>
        <el-col :span="14">
          <el-input v-model="complainData.mobile"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="complain-btn">
      <el-button id="submit" @click="submitComplain">提交</el-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
    },
    data(){
      return {
        complainData:this.$store.state.complain.complainData,
        maxLength:400,
        content:''
      }
    },
    methods: {
      handleContentChange(content){
        this.maxLength = 400 - content.length
      },
      submitComplain(){
        this.$store.dispatch(types.MANAGE__COMPLAIN__SUBMIT_COMPLAIN,{content:this.content,complainData:this.complainData,_this:this})
      }
    }
  }
</script>
<style>
  .complain-message {
    position: relative;
  }

  .complain-message textarea {
    height: 3.4rem;
    padding: 0 !important;
    border: none;
  }

  .complain-number {
    position: absolute;
    bottom: 0.1rem;
    right: 0.2rem;
    font-size: 0.28rem;
    font-style: italic;
    color: #9b9b9b;
  }

  .complain-container > div {
    margin-bottom: 0.2rem;
    background-color: #fff;
  }

  .complain-container > div:nth-of-type(1) {
    padding: 0.4rem 0.3rem;
  }

  .complain-btn {
    margin: 0.3rem;
  }

  .complain-btn button {
    width: 100%;
    padding: 0.2rem 0;
    font-size: 0.34rem;
  }

  .complain-single {
    height: 1rem;
    line-height: 1rem;
    border: 1px solid #cccccc;
    border-left: 0;
    border-right: 0;
  }

  .complain-single > div {
    color: #999999;
  }

  .complain-single label, .complain-single input {
    box-sizing: border-box;
    width: 25%;
    display: inline-block;
    vertical-align: middle;
  }

  .complain-single input {
    width: 75%;
    border: none;
    color: #343434;
    padding-left: 0.1rem;
    /*height: 0.5rem;*/
    font-size: 0.32rem;
  }

  #complainContainer textarea {
    height: 3.4rem;
  }

  #complainContainer .el-button:focus, .el-button:hover {
    color: #fff;
  }

</style>
