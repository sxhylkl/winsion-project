<template>
  <div id="record-main">
    <record-main-search :recordCondition="recordCondition"
                        :commonOrganization="commonOrganization"
                        :recordPost="recordPost" :recordTeam="recordTeam"></record-main-search>
    <div id="record-main-content" v-if="recordTableDataCount.all">
      <div id="record-main-content-info">巡视记录概况：共 {{recordTableDataCount.all}} 条巡视记录</div>
      <record-main-pie :pieData="recordPieData"></record-main-pie>
      <record-main-table :tableData="recordTableData.data"
                         :range="recordTableDataRange"
                         :tableCount="recordTableDataCount"
                         :currentIndex="recordTableInfoDataIndex"
                         :currentInfo="recordTableInfoData" :tableDataSelect="recordTableDataSelect"></record-main-table>
      <record-main-page :page="recordTableData.page"></record-main-page>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import RecordMainSearch from './components/RecordMainSearch.vue'
  import RecordMainPie from './components/RecordMainPie.vue'
  import RecordMainTable from './components/RecordMainTable.vue'
  import RecordMainPage from './components/RecordMainPage.vue'
  export default{
    created(){
      this.$store.commit('saveRecordTableInfoDataIndex',-1)
    },
    components:{
      RecordMainSearch,
      RecordMainPie,
      RecordMainTable,
      RecordMainPage
    },
    computed:mapGetters({
      commonOrganization:'commonOrganization',
      recordPost:'recordPost',
      recordTeam:'recordTeam',
      recordCondition:'recordCondition',
      recordPieData:'recordPieData',
      recordTableDataCount:'recordTableDataCount',
      recordTableData:'recordTableData',
      recordTableDataRange:'recordTableDataRange',
      recordTableInfoDataIndex:'recordTableInfoDataIndex',
      recordTableInfoData:'recordTableInfoData',
      recordTableDataSelect:'recordTableDataSelect',
    })
  }
</script>

<style>
  #record-main{
    width: 1857px;
    height: 898px;
    margin: 0 auto;
    font-size: 14px;
  }
  #record-main-content{
    position: relative;
    width: 1834px;
    height: 780px;
    margin: 10px auto 0;
    font-size: 14px;
    background: rgba(0,0,0,.3);
  }
  #record-main-content-info{
    position: absolute;
    left: 20px;
    top: 15px;
    width: 224px;
    height: 39px;
    line-height: 32px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
    color: #d5d5d5;
    font-size: 14px;
    background: url("../../assets/bg.png") no-repeat;
  }
  #record-main .el-pagination{
    float: right;
  }
  #record-main .el-pagination button{
    background: #2E4466;
    border: 1px solid #263b5d;
    color: #d5d5d5;
  }
  #record-main .el-pagination li{
    background: #2E4466;
    border: 1px solid #263b5d;
    color: #d5d5d5;
  }
</style>
