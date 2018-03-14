<template>
  <div id="content3">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status"></content-info>
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
      this.$store.dispatch(types.CONTENT3_GET_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content3_dialogFormVisible',
      status:'content3_status',
      tableData:'content3_tableData',
      form:'content3_form'
    })
  }
</script>

<style>
  #content3{
    padding: 30px 50px;
  }
</style>
