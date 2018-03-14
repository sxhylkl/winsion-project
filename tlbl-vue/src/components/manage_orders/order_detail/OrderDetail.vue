<template>
  <div class="tnlist-container">
    <!--订单基本信息-->
    <div class="complain order-detail-base">
      <!--送站订单title-->
      <!--<div class="order-title" :class="{ take: orderDetailTrain.type=='pickup'?false:true }">-->
      <div class="order-title">
        <div class="clearfix">
          <span class="font-icon">{{orderDetailTrain.type=='pickup'?'送':'接'}}</span>
          <span class="order-date">订单编号:{{orderDetailTrain.serialNumber}}</span>
        </div>
      </div>
      <div class="user-info order-detail order-detail-base-info">
        <div class="clearfix">
          <div>车次：<span class="detail-train-number">{{orderDetailTrain.trainNumber}}</span></div>
          <div>时间：<span class="time">{{orderDetailTrain.departOrArriveTime | handleGetTime('time')}}</span></div>
        </div>
        <div class="clearfix">
          <div>车站：<span class="station-name">{{orderDetailTrain.stationName}}</span></div>
          <div>车厢：<span class="station-carriage">{{orderDetailTrain.carriage}}</span><span>车厢</span></div>
        </div>
        <div class="clearfix">
          <div>昵称：<span class="name">{{orderDetailTrain.contact}}</span></div>
          <div>电话：<span class="mobile">{{orderDetailTrain.mobile}}</span></div>
        </div>
      </div>
    </div>

    <order-detail-map></order-detail-map>

    <order-detail-part></order-detail-part>
    <!--费用须知-->
    <div class="attach margin-bottom">
      <div>费用需知 <div id="fold" @click="show=!show"><i :class="[show?'el-icon-caret-bottom':'el-icon-caret-top']"></i></div></div>
      <transition name="fade">
        <ol v-if="show">
          <li>补缴费用:<br>如果您变更接站的服务终点或送站的服务起点，可能会导致加收距离费用；<br>如果您的同行人数、行李数量规格等与订单不符，您需补缴相关费用；</li>
          <li>取消订单的服务费用:<br>如果您在服务即将开始时取消订单，将根据取消时间收取服务费用，请您查看<span class="tel link-style"
                                                                    @click="chaining(orderDetailTrain.cancelService)">费用标准</span>;
          </li>
          <li v-if="orderDetailTrain.pickupPhone&&orderDetailTrain.takePhone">客服电话:
            <div v-if="orderDetailTrain.pickupPhone">送站服务客服电话：<a class="tel link-style"
                                                                 @click="chaining(`winsion://interactive/phonecall?phone=${orderDetailTrain.pickupPhone}`)">{{orderDetailTrain.pickupPhone}}</a>
            </div>
            <div v-if="orderDetailTrain.takePhone">接站服务客服电话：<a class="tel link-style"
                                                               @click="chaining(`winsion://interactive/phonecall?phone=${orderDetailTrain.takePhone}`)">{{orderDetailTrain.takePhone}}</a>
            </div>
          </li>
          <li>投诉与反馈:<br>如您对服务质量不满意，可以进行<span class="tel" id="goToComplain" @click="goToComplain">订单投诉</span><br>
            服务监督电话：<span class="tel link-style"
                         @click="chaining('winsion://interactive/phonecall?phone=010-88895560-8019')">010-88895560-8019</span>（工作日9:00-18:00）
          </li>
        </ol>
      </transition>
    </div>
    <!--订单受理中-->
    <div class="next-btn" v-if="orderDetailTrain.status=='handling'">
      <el-button @click="cancelOrderDetail">取消订单</el-button>
    </div>
    <!--订单待支付-->
    <div class="check-btn clearfix" v-else-if="orderDetailTrain.status=='unpay'">
      <el-button @click="cancelOrderDetail">取消订单</el-button>
      <el-button @click="goToPay">支付订单</el-button>
    </div>
    <!--订单变更待支付-->
    <div class="next-btn" v-else-if="orderDetailTrain.status=='modifyunpay'">
      <el-button class="pay-btn" @click="goToPay">支付订单</el-button>
    </div>
    <!--订单待执行-->
    <div class="check-btn clearfix" v-else-if="orderDetailTrain.status=='unexecute'">
      <el-button @click="cancelOrderDetail" :class="{unexecute:!orderDetailTrain.showBtn}">取消订单</el-button>
      <el-button v-show="orderDetailTrain.showBtn" @click="updateOrderDetailExecuteStatus">已到达送站起点</el-button>
    </div>
    <!--订单执行中-->
    <!--<div class="next-btn" v-else-if="orderDetailTrain.status=='executing'">
      <el-button @click="completeOrderDetail">完成订单</el-button>
    </div>-->
    <!--订单未评价-->
    <div class="clearfix" :class="[orderDetailTrain.showEvaluate?'check-btn':'next-btn']" v-else-if="orderDetailTrain.status=='norate'">
      <el-button @click="deleteOrderDetail">删除订单</el-button>
      <el-button v-if="orderDetailTrain.showEvaluate" @click="toJudge">评价订单</el-button>
    </div>
    <!--订单已评价-->
    <div class="check-btn clearfix" v-else-if="orderDetailTrain.status=='completed'">
      <el-button @click="deleteOrderDetail">删除订单</el-button>
      <el-button @click="toJudge">查看我的评价</el-button>
    </div>
    <!--订单已取消、订单支付失败已取消、订单已关闭-->
    <div class="next-btn" v-else>
      <el-button @click="deleteOrderDetail">删除订单</el-button>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import OrderDetailPart from './parts/OrderDetailPart.vue'
  import OrderDetailMap from './parts/OrderDetailMap.vue'
  import * as types from '../../../store/mutation-types'
  import {setLocalStorage, getStandard} from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.MANAGE__ORDER_DETAIL__GET_ORDER_DETAIL, this)
    },
    data(){
      return{
        show:false
      }
    },
    components: {
      OrderDetailPart,
      OrderDetailMap
    },
    computed: mapGetters({
      orderDetailTrain: 'manage_orderDetail_orderDetailTrain'
    }),
    methods: {
      goToComplain(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__TO_COMPLAIN, this)
      },
      cancelOrderDetail(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__CANCEL_ORDER, this)
      },
      deleteOrderDetail(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__DELETE_ORDER, this)
      },
      updateOrderDetailExecuteStatus(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__UPDATE_ORDER, this)
      },
      completeOrderDetail(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__COMPLETE_ORDER, this)
      },
      toJudge(){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__TO_JUDGE, {orderId: this.orderDetailTrain.orderId, _this: this})
      },
      toJudgeDetail(){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__JUDGE_DETAIL, {
          orderId: this.orderDetailTrain.orderId,
          _this: this
        })
      },
      goToPay(){
        window.location.href = `winsion://interactive/pay/paycashier?orderid=${this.orderDetailTrain.orderId}&ordertype=${this.orderDetailTrain.type}&serialnumber=${this.orderDetailTrain.serialNumber}&price=${this.orderDetailTrain.marketPriceAmount}&timeout=${this.orderDetailTrain.deadline}`
      },
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      }
    }
  }
</script>
<style>

  .fade-enter-active {
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-active,.fade-leave {
    opacity: 0
  }

  #fold{
    float: right;
    width: 20%;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }

  .attach > div {
    padding-bottom: 0.2rem;
    color: #336db7;
    font-size: 0.28rem;
    border-bottom: 1px dashed #a5a5a5;
  }

  .attach li {
    margin: 0.2rem 0 0.2rem 0.3rem;
    font-size: 0.28rem;
  }

  .tel {
    color: #236db4;
  }

  .total-price > div:nth-of-type(1) {
    float: left;
  }

  .total-price > div:nth-of-type(2) {
    float: right;
    font-size: 0.20rem;
  }

  .total-price > div:nth-of-type(2) span {
    font-size: 16px;
  }

  .instruction {
    color: #999999;
    font-size: 0.28rem;
  }

  .instruction span {
    float: right;
    color: #236db4;
  }

  .order-date {
    color: #3369af;
    float: left !important;
  }

  .order-detail-base-info > div {
    margin-bottom: 0.1rem !important;
  }

  .user-info > div > div {
    float: left;
    width: 50%;
    text-align: left;
    color: #999999;
    height: 0.6rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
  }

  .user-info > div > div span {
    color: #323232;
  }

  .over-time-tips {
    margin: 0.1rem;
    color: #fc0013;
    font-size: 0.24rem;
  }

  .pay-container > div > div:nth-of-type(1) {
    float: left;
  }

  .pay-container > div > div:nth-of-type(2) {
    float: right;
  }

  .already-pay {
    color: #999999;
    padding-bottom: 0.2rem;
  }

  .wait-pay {
    padding-top: 0.2rem;
    border-top: 1px dashed #a6a6a6;
  }

  .el-button + .el-button {
    margin-left: 0;
  }

  .unexecute {
    width: 100% !important;
  }
</style>
