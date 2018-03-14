<template>
  <div id="judge">
    <div class="judge-container" v-for="placeholder in placeholderData">
      <judge-part :placeholder="placeholder"></judge-part>
    </div>
    <footer class="judge-orders-footer">
      <el-button slot="footer" @click="submitJudge">发表评价</el-button>
    </footer>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import JudgePart from './parts/JudgePart.vue'
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.MANAGE__JUDGE__GET_STAFF_LIST,this)
    },
    computed: mapGetters({
      placeholderData : 'manage_judge_placeholderData',
    }),
    components: {JudgePart},
    methods: {
      submitJudge(){
        this.$store.dispatch(types.MANAGE__JUDGE__SUBMIT,this)
      }
    }
  }
</script>
<style>

  #judge{
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding-bottom: 1.5rem;
  }

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
