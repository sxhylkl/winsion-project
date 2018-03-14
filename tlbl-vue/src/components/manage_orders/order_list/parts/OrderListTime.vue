<template>
  <div>{{time}}</div>
</template>
<script>
  import * as types from '../../../../store/mutation-types'
  export default{
    data () {
      return {
        time : '',
        flag : false
      }
    },
    mounted () {
      let time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(time)
          this.$store.dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST,this)
        }
        this.timeDown()
      },500)
    },
    props : {
      endTime : {
        type : Number
      }
    },
    methods : {
      timeDown () {
        const endTime = this.endTime
        const nowTime = new Date().getTime();
        let leftTime = parseInt((endTime-nowTime)/1000)
        let d = parseInt(leftTime/(24*60*60))
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          this.flag = true
          this.time = `待支付00分00秒`
          return
        }
        this.time = `待支付${m}分${s}秒`
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
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
</style>
