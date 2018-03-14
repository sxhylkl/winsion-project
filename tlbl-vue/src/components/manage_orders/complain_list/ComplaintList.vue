<template>
  <div class="tnlist-container">
    <div class="complain" v-for="(data,index) in complainList" @click="toComplain(index)">
      <div class="order-title" :class="[data.type=='take'?'take':'']">
        <div class="clearfix">
          <span class="font-icon">{{data.type=='take'?'接':'送'}}</span>
          <span class="order-date">订单编号:{{data.serialNumber}}</span>
          <span class="remain">{{data.remain}}</span>
        </div>
      </div>
      <div class="order-detail">
        <div class="detail clearfix">
          <span>{{data.ctime | handleGetTime('date')}}</span>
          <span>{{data.stationName}}</span>
          <span><span class="price">{{data.price}}</span>元</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as types from '../../../store/mutation-types'
  import {mapGetters} from 'vuex'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.MANAGE__COMPLAIN_LIST__GET_COMPLAIN_LIST,this)
    },
    computed: mapGetters({
      complainList:'manage_complainList_list'
    }),
    methods:{
      toComplain(index){
        this.$store.dispatch(types.MANAGE__COMPLAIN_LIST__SAVE_COMPLAIN_DATA,{index,_this:this})
      }
    }
  }
</script>
<style>
  .complain {
    margin: 0.1rem;
    background-color: #fff;
  }

  .order-detail {
    padding: 0.3rem;
  }

  .order-title {
    padding: 0.3rem 0.3rem 0;
    background-color: #f3f6fb;
  }

  .order-title > div {
    padding-bottom: 0.2rem;
    border-bottom: 1px dashed #9ca0a3;
  }

  .order-title span:nth-last-of-type(1) {
    font-size: 0.28rem;
    color: #3369af;
    float: right;
  }

  .order-title.take {
    background-color: #fef4f2;
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

  .take span:nth-of-type(1) {
    color: #ee4800;
    border: 1px solid #ee4800;
  }

  .remain {
    color: #ee9c38 !important;
  }
</style>
