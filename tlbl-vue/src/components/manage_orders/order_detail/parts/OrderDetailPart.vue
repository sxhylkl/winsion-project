<template>
  <div>
    <!--接送起点费用-->
    <div class="luggage-numbers operation-container">
      <div class="clearfix">
        <div><img src="../../../../../static/images/ic_serviceend.png" alt=""></div>
        <div>
          <div>接送费用</div>
          <div><span class="price"></span>共<span class="price">{{orderDetailPrice.car.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{orderDetailPrice.car.transferPointName}}<span class="link-style" @click="chaining(orderDetailPrice.car.href)">查看标准&gt&gt</span></p>
      </div>
    </div>
    <!--未变更项目-->
    <div>
      <!--各项费用-->
      <order-detail-goods :orderDetailList="orderDetailPrice.orderDetailList"></order-detail-goods>
    </div>
    <!--变更项目-->
    <div v-if="orderDetailPrice.serviceChange">
      <div class="change-content">
        <div class="change-title over-time-tips">变更服务目录</div>
      </div>
      <!--各项费用-->
      <order-detail-goods :orderDetailList="orderDetailPrice.alterOrderDetailList"></order-detail-goods>
    </div>
    <!--费用合计-->
    <div>
      <!--未变更费用合计-->
      <div class="total-price clearfix" v-if="!orderDetailPrice.modifyunpay">
        <div>费用合计</div>
        <div><span class="price">{{orderDetailPrice.marketPrice}}</span>元</div>
      </div>
      <!--变更费用合计-->
      <div class="pay-container" v-if="orderDetailPrice.modifyunpay">
        <div class="clearfix already-pay">
          <div>已支付合计</div>
          <div class="line-through">{{orderDetailPrice.paidPriceAmount}}<span></span>元</div>
        </div>
        <div class="clearfix wait-pay">
          <div>待支付合计</div>
          <div><span class="price">{{orderDetailPrice.marketPrice}}</span>元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { setLocalStorage } from '../../../../api'
  import OrderDetailGoods from './OrderDetailGoods.vue'
  export default{
    components: {
      OrderDetailGoods
    },
    computed: mapGetters({
      orderDetailPrice: 'manage_orderDetail_orderDetailPrice'
    }),
    methods:{
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      }
    }
  }
</script>

<style>

</style>
