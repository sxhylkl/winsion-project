<template>
  <div id="content12">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :visible="dialogFormVisible" :team="team"
                  :status="status" :schedulingPlan="schedulingPlan" :schedulingWay="schedulingWay"
                  :schedulingSpecificWay="schedulingSpecificWay" :schedulingSpecificList="schedulingSpecificList"></content-info>
    <content-details :visible="detailsVisible" :schedulingSpecificList="schedulingSpecificList"></content-details>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import ContentHeader from './ContentHeader.vue'
  import ContentTable from './ContentTable.vue'
  import ContentInfo from './ContentInfo.vue'
  import ContentDetails from './ContentDetails.vue'
  import { mapGetters } from 'vuex'
  export default{
    created(){
      this.$store.dispatch(types.CONTENT12_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT12_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo,
      ContentDetails
    },
    computed: mapGetters({
      dialogFormVisible:'content12_dialogFormVisible',
      detailsVisible:'content12_detailsVisible',
      status:'content12_status',
      tableData:'content12_tableData',
      team:'content12_team',
      schedulingPlan:'content12_schedulingPlan',
      schedulingWay:'content12_schedulingWay',
      schedulingSpecificWay:'content12_schedulingSpecificWay',
      schedulingSpecificList:'content12_schedulingSpecificList',
    })
  }
</script>

<style>
  #content12{
    padding: 30px 50px;
  }
  #content12 .el-dialog--large{
    width: 73%;
  }
  #content12 .el-input-number{
    width: 192px;
  }
  #content12 .el-select{
    width: 845px;
  }
</style>
