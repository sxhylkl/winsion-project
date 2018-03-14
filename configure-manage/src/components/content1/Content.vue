<template>
  <div id="content1">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :classify="classify" :area="area" :team="team"></content-info>
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
      this.$store.dispatch(types.CONTENT1_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT1_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content1_dialogFormVisible',
      status:'content1_status',
      tableData:'content1_tableData',
      form:'content1_form',
      classify:'content1_classify',
      area:'content1_area',
      team:'content1_team',
    })
  }
</script>

<style>
  #content1{
    padding: 30px 50px;
  }
</style>
