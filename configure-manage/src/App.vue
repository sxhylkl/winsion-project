<template>
  <div id="app">
    <header-area></header-area>
    <content-area></content-area>
  </div>
</template>

<script>
  import HeaderArea from './components/header/HeaderArea.vue'
  import ContentArea from './components/content/ContentArea.vue'
  export default {
    components:{
      HeaderArea,
      ContentArea
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .el-table tr {
    color: #000;
    font-size: 14px;
  }
  .el-table th {
    background-color: #eef1f6;
    line-height: 35px;
  }
  .el-table--border th,.el-table--border td,.el-table th.is-leaf {
    border: 1px solid #dfe6ec;
  }
</style>
