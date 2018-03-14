<template>
  <div id="manage-main">
    <div v-if="manageFlag">
      <manage-main-search :manageCondition="manageCondition"
                          :commonOrganization="commonOrganization"
                          :managePost="managePost"
                          :manageTeam="manageTeam"
                          :manageGrid="manageGrid" :manageQuestion="manageQuestion"></manage-main-search>
      <div id="manage-main-content" v-if="manageTableDataTotal">
        <div id="manage-main-content-info">巡视记录概况：共 {{manageTableDataTotal}} 条巡视记录</div>
        <manage-main-pie :pieData="managePieData"></manage-main-pie>
        <manage-main-table :tableData="manageTableDataList" :range="manageTableRange"></manage-main-table>
        <manage-main-page :page="manageTableDataPage"></manage-main-page>
      </div>
    </div>
    <div v-if="!manageFlag">
      <manage-main-info :flag="manageInfoFlag"
                        :currentData="manageCurrentTableData"
                        :imgList="manageInfoImg"
                        :maintainList="manageInfoMaintainList" :maintainData="manageInfoMaintainData"></manage-main-info>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ManageMainSearch from './components/ManageMainSearch.vue'
  import ManageMainPage from './components/ManageMainPage.vue'
  import ManageMainPie from './components/ManageMainPie.vue'
  import ManageMainTable from './components/ManageMainTable.vue'
  import ManageMainInfo from './components/ManageMainInfo.vue'
  export default{
    created(){
      //重置样式
      this.$store.commit('updateManageFlag',true)
      //获取数据
      this.$store.dispatch('getManageGridAndQuestionData')
    },
    components:{
      ManageMainSearch,
      ManageMainPie,
      ManageMainTable,
      ManageMainPage,
      ManageMainInfo
    },
    computed:mapGetters({
      commonOrganization:'commonOrganization',
      manageTeam:'manageTeam',
      managePost:'managePost',
      manageGrid:'manageGrid',
      manageQuestion:'manageQuestion',
      manageCondition:'manageCondition',
      managePieData:'managePieData',
      manageTableDataList:'manageTableDataList',
      manageTableDataTotal:'manageTableDataTotal',
      manageTableDataPage:'manageTableDataPage',
      manageTableRange:'manageTableRange',
      manageFlag:'manageFlag',
      manageInfoFlag:'manageInfoFlag',
      manageCurrentTableData:'manageCurrentTableData',
      manageInfoImg:'manageInfoImg',
      manageInfoMaintainList:'manageInfoMaintainList',
      manageInfoMaintainData:'manageInfoMaintainData',
    })
  }
</script>

<style>
  #manage-main{
    width: 1857px;
    height: 898px;
    margin: 0 auto;
    font-size: 14px;
  }
  #manage-main-content{
    position: relative;
    width: 1834px;
    height: 724px;
    margin: 10px auto 0;
    font-size: 14px;
    background: rgba(0,0,0,.3);
  }
  #manage-main-content-info{
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
  #manage-main .el-pagination{
    float: right;
  }
  #manage-main .el-pagination button{
    background: #2E4466;
    border: 1px solid #263b5d;
    color: #d5d5d5;
  }
  #manage-main .el-pagination li{
    background: #2E4466;
    border: 1px solid #263b5d;
    color: #d5d5d5;
  }
  #manage-main .el-input.is-disabled .el-input__inner{
    color: #333;
  }
</style>
