<template>
  <div>
    <order-list-item :orderList="allOrders"></order-list-item>
  </div>
</template>

<script>
  import OrderListItem from '../parts/OrderListItem.vue'
  import { mapGetters } from 'vuex'
  import * as types from '../../../../store/mutation-types'
  export default{
    created() {
      this.$store.dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST,this)
    },
    components:{
      OrderListItem
    },
    computed: mapGetters({
      allOrders:'manage_orderList'
    }),
  }
</script>

<style>

</style>
