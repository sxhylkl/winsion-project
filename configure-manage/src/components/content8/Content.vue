<template>
  <div id="content8">
    <content-header :section="sectionSearch" :group="groupSearch"></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :area="area" :group="group" ></content-info>
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
      this.$store.dispatch(types.CONTENT8_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT8_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content8_dialogFormVisible',
      status:'content8_status',
      tableData:'content8_tableData',
      form:'content8_form',
      area:'content8_area',
      group:'content8_group',
      sectionSearch:'content8_sectionSearch',
      groupSearch:'content8_groupSearch',
    })
  }
</script>

<style>
  #content8{
    padding: 30px 50px;
  }
</style>
