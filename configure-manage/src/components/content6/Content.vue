<template>
  <div id="content6">
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
      this.$store.dispatch(types.CONTENT6_GET_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content6_dialogFormVisible',
      status:'content6_status',
      tableData:'content6_tableData',
      form:'content6_form',
    })
  }
</script>

<style>
  #content6{
    padding: 30px 50px;
  }
</style>
