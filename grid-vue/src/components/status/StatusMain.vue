<template>
  <div id="status-main">
    <status-main-search :statusTime="statusTime"></status-main-search>
    <status-main-board :statusData="statusData"
                       :statusFlag="statusFlag"
                       :statusCurrent="statusCurrent"
                       :statusCurrentData="statusCurrentData"
                       :statusCurrentFlag="statusCurrentFlag">
    </status-main-board>
    <status-main-dialog :statusDialogFlag="statusDialogFlag" :statusDialogData="statusDialogData"></status-main-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StatusMainSearch from './components/StatusMainSearch.vue'
  import StatusMainBoard from './components/StatusMainBoard.vue'
  import StatusMainDialog from './components/StatusMainDialog.vue'
  export default{
    created(){
      this.$store.commit('resetStatusFlag')
    },
    components:{
      StatusMainSearch,
      StatusMainBoard,
      StatusMainDialog
    },
    computed:mapGetters({
      statusTime:'statusTime',
      statusFlag:'statusFlag',
      statusData:'statusData',
      statusCurrent:'statusCurrent',
      statusCurrentData:'statusCurrentData',
      statusCurrentFlag:'statusCurrentFlag',
      statusDialogFlag:'statusDialogFlag',
      statusDialogData:'statusDialogData',
    })
  }
</script>

<style>
  #status-main{
    width: 1857px;
    height: 898px;
    margin: 0 auto;
    font-size: 14px;
  }
  #status-main .el-progress-bar__outer{
    background: #666;
  }
  #status-main .el-progress-bar__inner{
    background: #ffff00;
  }
  #status-main .el-dialog{
    width: 1012px;
    height: 813px;
  }
  #status-main .el-dialog__headerbtn{
    margin: 8px 10px 0 0;
  }
</style>
