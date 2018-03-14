<template>
  <div id="content13">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :area="area" :team="team"></content-info>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import ContentHeader from './ContentHeader.vue'
  import ContentTable from './ContentTable.vue'
  import ContentInfo from './ContentInfo.vue'
  import { mapGetters } from 'vuex'
  export default{
    created(){
      //获取列表，相关下拉框信息，设置mq
      this.$store.dispatch(types.CONTENT13_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT13_GET_OTHER_INFO_ACTION)
      this.$store.dispatch(types.CONTENT13_SET_MQ_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content13_dialogFormVisible',
      tableData:'content13_tableData',
      form:'content13_form',
      area:'content13_area',
      team:'content13_team',
    })
  }
</script>

<style>
  #content13{
    padding: 30px 50px;
  }
  #content13 .cell{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  #content13 .el-date-editor.el-input{
    width: 350px;
  }
</style>
