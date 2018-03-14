<template>
  <div id="content2">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :area="area"></content-info>
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
      this.$store.dispatch(types.CONTENT2_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT2_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content2_dialogFormVisible',
      status:'content2_status',
      tableData:'content2_tableData',
      form:'content2_form',
      area:'content2_area'
    })
  }
</script>

<style>
  #content2{
    padding: 30px 50px;
  }
</style>
