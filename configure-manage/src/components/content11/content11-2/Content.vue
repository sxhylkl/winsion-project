<template>
  <div id="content11-2">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :area="area" :user="user"></content-info>
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
      this.$store.dispatch(types.CONTENT11_2_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT11_2_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo
    },
    computed: mapGetters({
      dialogFormVisible:'content11_2_dialogFormVisible',
      status:'content11_2_status',
      tableData:'content11_2_tableData',
      form:'content11_2_form',
      area:'content11_2_area',
      user:'content11_2_user',
    })
  }
</script>

<style>
  #content11-2{
    padding: 30px 50px;
  }
</style>
