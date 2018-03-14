<template>
  <div id="content7">
    <content-header :section="sectionSearch"></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :area="area" :section="section"></content-info>
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
      this.$store.dispatch(types.CONTENT7_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT7_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content7_dialogFormVisible',
      status:'content7_status',
      tableData:'content7_tableData',
      form:'content7_form',
      area:'content7_area',
      section:'content7_section',
      sectionSearch:'content7_sectionSearch',
    })
  }
</script>

<style>
  #content7{
    padding: 30px 50px;
  }
</style>
