<template>
  <div>
    <div v-for="item in orderList" :key="item.id" style="margin-bottom:0.2rem">
      <!--订单受理中-->
      <div class="order-acceptance" v-if="item.status=='handling'">
        <div @click="toOrderDetail(item)">
          <div class="order-title">
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span>订单受理中</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button @click="cancelOrder(item)">取消订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单变更待支付-->
      <div class="order-change-pay" v-else-if="item.status=='modifyunpay'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="remain"><order-list-time :endTime="item.deadline"></order-list-time></span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button class="pay-btn" @click="goToPay(item)">支付订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单待支付-->
      <div class="order-wait-pay" v-else-if="item.status=='unpay'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="remain"><order-list-time :endTime="item.deadline"></order-list-time></span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button @click="cancelOrder(item)">取消订单</button>
              <button @click="goToPay(item)">支付订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单支付失败-->
      <div class="order-fail" v-else-if="item.status=='payfailedcancel'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="cannot-accept">支付失败 已取消</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button @click="deleteOrder(item)">删除订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单待执行-->
      <div class="send-order-wait-execution" v-else-if="item.status=='unexecute'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="remain">订单待执行</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button :class="{unexecute:!item.showBtn}" @click="cancelOrder(item)">取消订单</button>
              <button v-show="item.showBtn" @click="updateOrderExecuteStatus(item)">已到达送站起点</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单执行中-->
      <div class="send-order-executing" v-else-if="item.status=='executing'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="remain">订单执行中</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation" style="height: 0.7rem">
              <button @click="completeOrder(item)" v-if="false">完成订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单已取消-->
      <div class="order-fail" v-else-if="item.status=='cancel'">
        <div @click="toOrderDetail(item)">
          <div class="order-title">
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="cannot-accept">已取消</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <order-list-price :item="item"></order-list-price>
            <div class="operation">
              <button @click="deleteOrder(item)">删除订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单待评价-->
      <div class="order-norate" v-else-if="item.status=='norate'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="cannot-accept">{{item.showEvaluate?'订单待评价':'已完成'}}</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <div class="operation">
              <button @click="deleteOrder(item)">删除订单</button>
              <button v-if="item.showEvaluate" @click="toJudge(item)">评价订单</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单已完成-->
      <div class="order-completed" v-else-if="item.status=='completed'">
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="cannot-accept">已完成</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <div class="operation">
              <button @click="deleteOrder(item)">删除订单</button>
              <button class="check-rate" @click="toJudgeDetail(item)">查看我的评价</button>
            </div>
          </div>
        </div>
      </div>
      <!--订单已关闭-->
      <div class="order-suspend" v-else>
        <div @click="toOrderDetail(item)">
          <div class="order-title" >
            <div class="clearfix">
              <span class="font-icon">{{item.type=='take'?'接':'送'}}</span>
              <span class="order-date">{{item.departOrArriveTime | handleGetTime('date')}}</span>
              <span class="cannot-accept">已中止</span>
            </div>
          </div>
          <order-list-train :item="item"></order-list-train>
        </div>
        <div class="order-footer">
          <div class="clearfix">
            <div class="operation">
              <button @click="deleteOrder(item)">删除订单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '../../../../store/mutation-types'
  import OrderListTrain from './OrderListTrain.vue'
  import OrderListPrice from './OrderListPrice.vue'
  import OrderListTime from './OrderListTime.vue'
  import {setLocalStorage} from '../../../../api'
  export default{
    props: ['orderList'],
    components: {
      OrderListTrain,
      OrderListPrice,
      OrderListTime
    },
    methods:{
      cancelOrder(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__CANCEL_ORDER,{order:item,_this:this})
      },
      goToPay(item){
        setLocalStorage(this)
        window.location.href = `winsion://interactive/pay/paycashier?orderid=${item.orderId}&ordertype=${item.type}&serialnumber=${item.serialNumber}&price=${item.marketPriceAmount}&timeout=${item.deadline}`
      },
      deleteOrder(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__DELETE_ORDER,{id:item.id,_this:this})
      },
      updateOrderExecuteStatus(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__UPDATE_ORDER,{id:item.id,_this:this})
      },
      completeOrder(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__COMPLETE_ORDER,{orderId:item.orderId,_this:this})
      },
      toJudge(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__TO_JUDGE,{orderId:item.orderId,_this:this})
      },
      toJudgeDetail(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__JUDGE_DETAIL,{orderId:item.orderId,_this:this})
      },
      toOrderDetail(item){
        this.$store.dispatch(types.MANAGE__ORDER_LIST__ORDER_DETAIL,{orderId:item.orderId,_this:this})
      }
    }
  }
</script>
<style>
  .order-detail {
    background-color: #fff;
    padding: 0.3rem;
  }

  .order-footer {
    background-color: #fff;
  }

  .detail:nth-of-type(2) {
    font-size: 0.26rem;
    color: #9d9d9d;
    margin: 0.22rem 0 0.16rem;
  }

  .detail > span {
    float: left;
    box-sizing: border-box;
    width: 33.33%;
  }

  .detail span:nth-of-type(2) {
    text-align: center;
  }

  .detail span:nth-of-type(3) {
    text-align: right;
  }

  .order-footer > div {
    padding: 0.2rem 0;
    margin: 0 0.3rem 0;
    border-top: 1px dashed #a2a2a2;
  }

  .price-container {
    float: left;
    padding: 0.16rem 0;
  }

  .price {
    color: #ee9c38;
  }

  .total {
    font-size: 0.28rem;
    color: #9c9c9c;
  }

  .operation {
    float: right;
  }

  .operation button, .check-rate {
    border: 1px solid #cccccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 0.15rem 0.21rem;
    background-color: #fff;
    color: #323232;
    font-size: 0.28rem;
  }

  .check-rate {
    border: 1px solid #cccccc !important;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 0.15rem 0.21rem;
    background-color: #fff !important;
    color: #323232 !important;
    font-size: 0.28rem;
  }

  .operation button:nth-of-type(2) {
    background-color: #306ab4;
    color: #fff;
    border-color: #306ab4;
  }

  .order-container > div:first-of-type {
    margin-top: 0.1rem;
  }

  .order-fail .order-footer > div {
    color: #989898 !important;
  }

  .cannot-accept {
    color: #909398 !important;
  }

  .remain {
    color: #ee9c38 !important;
  }

  .price-container {
    padding: 0;
  }

  .order-fail .total, .order-fail .price {
    color: #989898 !important;
  }
  .order-date{
    margin-top: 0.03rem;
    line-height: 0.38rem;
  }
  .unexecute{
    width: 100%;
  }
</style>
