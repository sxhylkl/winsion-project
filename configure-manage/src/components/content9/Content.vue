<template>
  <div id="content9">
    <el-row :gutter="20">
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <content-table :tableData="tableData"></content-table>
          <content-table-details :tableSelectData="tableSelectData" :tableStatus="tableStatus" :tableShow="tableShow" :tableForm="tableForm"></content-table-details>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple">
          <content-list :listData="listData"></content-list>
          <content-list-details :listStatus="listStatus" :listShow="listShow" :listForm="listForm" :tableData="tableData"></content-list-details>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import ContentList from './ContentList.vue'
  import ContentListDetails from './ContentListDetails.vue'
  import ContentTable from './ContentTable.vue'
  import ContentTableDetails from './ContentTableDetails.vue'
  import { mapGetters } from 'vuex'
  export default{
    created(){
      this.$store.dispatch(types.CONTENT9_GET_OTHER_INFO_ACTION,this)
      this.$store.dispatch(types.CONTENT9_GET_TABLE_INFO_ACTION,this)
      this.$store.dispatch(types.CONTENT9_GET_LIST_INFO_ACTION,this)
    },
    components: {
      ContentList,
      ContentListDetails,
      ContentTable,
      ContentTableDetails
    },
    computed: mapGetters({
      tableData:'content9_tableData',
      tableSelectData:'content9_tableSelectData',
      tableStatus:'content9_tableStatus',
      tableShow:'content9_tableShow',
      tableForm:'content9_tableForm',
      listData:'content9_listData',
      listStatus:'content9_listStatus',
      listShow:'content9_listShow',
      listForm:'content9_listForm',
    })
  }
</script>

<style>
  #content9 {
    padding: 20px;
  }
</style>
