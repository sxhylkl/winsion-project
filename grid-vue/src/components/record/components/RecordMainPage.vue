<template>
  <div id="record-page">
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
        this.$store.commit('saveRecordTableDataRange',currentPage-1)
      }
    }
  }
</script>

<style scoped>
  #record-page{
    margin-top: 20px;
    height: 35px;
    padding-right: 30px;
  }
</style>
