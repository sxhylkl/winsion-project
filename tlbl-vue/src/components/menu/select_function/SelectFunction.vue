<template>
  <div>
    <create-order type="pickup"></create-order>
    <create-order type="take"></create-order>
    <div class="service-tip clearfix">
      <p>接送站服务开通车站：北京西、郑州、呼和浩特、呼和浩特东</p>
      <p class="service-intro">
        <span class="link-style" @click="chaining('http://cdn.tlbl.winsion.net/service/transfer/introduction/introduction.html')">服务介绍</span>
      </p>
    </div>
    <div class="service-privilege">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="service-privilege-page">我的优惠券</div>
            <div class="service-privilege-desc">超值优惠券，多用多送，尽享出行</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" style="text-align: right"><img @click="toPrivilege()" style="width: 64px;height: auto;margin-right: 0.2rem" src="../../../../static/images/privilege.png" alt=""></div>
        </el-col>
      </el-row>
    </div>
    <footer class="my-orders-footer">
      <router-link to="/orderList">
        <el-button>我的订单列表</el-button>
      </router-link>
    </footer>
  </div>
</template>
<script>
  import CreateOrder from './parts/CreateOrder.vue';
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.MENU__SELECT_FUNCTION__GET_VERSION,{sendName:' ',receiveName:'receiveVersion'})
    },
    components: {
      CreateOrder
    },
    methods:{
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      },
      toPrivilege(){
        setLocalStorage(this)
        const userId = this.$store.state.userId
        //线下
        //window.location.href = `http://172.16.5.34:9124/coupon/index.html?userId=${userId}`
        //线上
        window.location.href = `http://121.42.48.201:9024/coupon/index.html?userId=${userId}`
      }
    }
  }
</script>
<style>

  .send-container > div:nth-of-type(1) {
    padding-bottom: 0.16rem;
    border-bottom: 1px dashed #a8a8a8;
  }

  .send-container > div:nth-of-type(2) {
    padding: 0.28rem 0;
    font-size: 0.3rem;
    color: #000;
  }

  .send-container > div:nth-of-type(3) {
    text-align: center;
  }

  .send-container button {
    padding: 0.16rem 0.24rem;
    font-size: 16px;
  }

  .my-orders-footer button {
    width: 100%;
    padding: 0.2rem 0;
    font-size: 0.32rem;
  }

  .service-tip {
    color: #bab9c1;
    font-size: 0.24rem;
    margin: 0 0.1rem;
  }

  .service-intro {
    font-size: 0.28rem;
    color: #336db7;
    text-align: right;
  }

  .service-intro a {
    color: #336db7;
  }
  .link-style{
    color: #336db7;
  }
  .service-privilege{
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    padding: 0.26rem 0;
    background: #fff;
    width: 100%;
  }
  .service-privilege .service-privilege-page{
    font-size: 0.28rem;
    color: #13BCF2;
    padding: 0.2rem 0 0.12rem 0.26rem;
  }
  .service-privilege .service-privilege-desc{
    font-size: 0.28rem;
    color: #000;
    padding: 0 0 0 0.26rem;
  }
</style>
