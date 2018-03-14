<template>
  <div class="page">
    <div class="order-message">订单信息-{{type?'送':'接'}}站订单-{{orderData.stationName}}</div>
    <div class="order-tips">
      <div class="clearfix">
        <div class="order-number">
          <span>订单编号：{{orderData.orderNumber}}</span>
          <span id="orderNumber"></span>
        </div>
        <div class="order-price">
          <span id="total">{{orderData.totalPrice}}</span>
          <span>元</span>
        </div>
      </div>
      <div class="success-icon">
        <img src="../../../../static/images/ic_success.png" alt="">
      </div>
      <div class="order-checking">亲爱的用户：您的订单正在进行后台审核,<span>5</span>分钟内将会显示是否受理!</div>
    </div>
    <footer class="my-orders-footer footer-btn">
      <router-link to="/orderList">
        <button id="goToOrderList">查看订单列表&gt&gt</button>
      </router-link>
    </footer>
  </div>
</template>

<script>
  import {setLocalStorage} from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
    },
    data(){
      return {
        type: this.$store.state.transferType == 'pickup',
        orderData: this.$store.state.waitAcceptance.waitAcceptanceData
      }
    }
  }
</script>

<style>
  .order-message, .order-tips {
    margin: 0 0.1rem;
  }

  .order-message {
    padding: 0.3rem 0 0.2rem;
    font-size: 0.28rem;
  }

  .order-tips {
    padding: 0 0.3rem;
    background-color: #fff;
  }

  .order-tips > div:nth-of-type(1) {
    padding: 0.3rem 0 0.2rem;
    border-bottom: 1px dashed #a6a6a6;
  }

  .order-number {
    float: left;
  }

  .order-number span:nth-of-type(1) {
    font-size: 0.28rem;
  }

  .order-number span:nth-of-type(2) {
    color: #326bb2;
    font-size: 0.26rem;
  }

  .order-price {
    float: right;
  }

  .order-price span:nth-of-type(1) {
    color: #ed9b37;
    font-size: 0.28rem;
  }

  .order-price span:nth-of-type(2) {
    font-size: 0.2rem;
  }

  .success-icon {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.46rem auto 0.5rem;
  }

  .success-icon img {
    width: 100%;
  }

  .order-checking {
    font-size: 0.28rem;
    line-height: 0.5rem;
    padding-bottom: 0.32rem;
  }

  .footer-btn {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }
</style>
