<template>
  <div id="manage-page">
    <el-pagination
      @current-change="selectCurrentPage"
      layout="prev, pager, next"
      :page-count="page">
    </el-pagination>
  </div>
</template>

<script>
  export default{
    props:['page'],
    methods:{
      selectCurrentPage(currentPage){
        this.$store.dispatch('getManageTableData',{currentPage})
      }
    }
  }
</script>

<style scoped>
  #manage-page{
    margin-top: 15px;
    height: 35px;
    padding-right: 30px;
  }
</style>
