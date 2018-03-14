<template>
  <div id="content5">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :classify="classify"></content-info>
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
      this.$store.dispatch(types.CONTENT5_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT5_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content5_dialogFormVisible',
      status:'content5_status',
      tableData:'content5_tableData',
      form:'content5_form',
      classify:'content5_classify'
    })
  }
</script>

<style>
  #content5{
    padding: 30px 50px;
  }
</style>
