<template>
  <div id="content11-1">
    <content-header></content-header>
    <content-table :tableData="tableData"></content-table>
    <content-info :form="form" :visible="dialogFormVisible" :status="status" :organization="organization"
                  :post="post" :team="team" :area="area" :role="role" :flag1="flag1" :flag2="flag2"></content-info>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import ContentHeader from './ContentHeader.vue'
  import ContentTable from './ContentTable.vue'
  import ContentInfo from './ContentInfo.vue'
  import {mapGetters} from 'vuex'
  export default{
    created(){
      this.$store.dispatch(types.CONTENT11_1_GET_INFO_ACTION)
      this.$store.dispatch(types.CONTENT11_1_GET_OTHER_INFO_ACTION)
    },
    components: {
      ContentHeader,
      ContentTable,
      ContentInfo,
    },
    computed: mapGetters({
      dialogFormVisible: 'content11_1_dialogFormVisible',
      status: 'content11_1_status',
      tableData: 'content11_1_tableData',
      form: 'content11_1_form',
      area: 'content11_1_area',
      organization: 'content11_1_organization',
      post: 'content11_1_post',
      team: 'content11_1_team',
      role: 'content11_1_role',
      flag1: 'content11_1_flag1',
      flag2: 'content11_1_flag2',
    })
  }
</script>

<style>
  #content11-1 {
    padding: 30px 50px;
  }
</style>
