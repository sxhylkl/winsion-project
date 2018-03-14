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
</style>
