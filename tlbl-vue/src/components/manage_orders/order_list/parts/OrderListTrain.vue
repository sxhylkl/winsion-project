<template>
  <div>
    <div class="order-detail">
      <div class="detail clearfix">
        <span>{{item.trainNumber}}</span>
        <span>{{item.stationName}}</span>
        <span>{{item.departOrArriveTime | handleGetTime('time')}}</span>
      </div>
      <div class="detail clearfix">
        <span>接站起点</span>
        <span>预计到达时间</span>
        <span>接站终点</span>
      </div>
      <div class="detail clearfix" v-if="item.type=='take'">
        <span>{{item.carriage}}车厢</span>
        <span>{{item.predictArriveTime | handleGetTime('time')}}</span>
        <span>{{item.transferPointName}}</span>
      </div>
      <div class="detail clearfix" v-else>
        <span>{{item.transferPointName}}</span>
        <span>{{item.predictArriveTime | handleGetTime('time')}}</span>
        <span>{{item.carriage}}车厢</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props: ['item'],
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
</style>
