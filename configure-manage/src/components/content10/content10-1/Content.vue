<template>
  <div id="content10-1">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :area="area"></content-info>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import ContentHeader from './ContentHeader.vue'
  import ContentTable from './ContentTable.vue'
  import ContentInfo from './ContentInfo.vue'
  import { mapGetters } from 'vuex'
  export default{
    created(){
      this.$store.dispatch(types.CONTENT10_1_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT10_1_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content10_1_dialogFormVisible',
      status:'content10_1_status',
      tableData:'content10_1_tableData',
      form:'content10_1_form',
      area:'content10_1_area'
    })
  }
</script>

<style>
  #content10-1{
    padding: 30px 50px;
  }
</style>
