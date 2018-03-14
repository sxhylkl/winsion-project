<template>
  <div id="content14-2">
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
      this.$store.dispatch(types.CONTENT14_2_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT14_2_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content14_2_dialogFormVisible',
      status:'content14_2_status',
      tableData:'content14_2_tableData',
      form:'content14_2_form',
      area:'content14_2_area'
    })
  }
</script>

<style>
  #content14-2{
    padding: 30px 50px;
  }
</style>
