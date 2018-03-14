<template>
  <div class="tnlist-container">
    <div class="order-message">请输入订单基本信息-{{type?'送':'接'}}站订单-{{newOrderPriceData.stationName}}</div>
    <div class="luggage-numbers operation-container">
      <div class="clearfix">
        <div class="position-relative">
          <img src="../../../../../static/images/ic_serviceend.png" alt="">
          <span class="market-icon"></span>
        </div>
        <div>
          <div>接送费用</div>
          <div>
            <span class="line-through margin-right"
                  v-show="newOrderPriceData.marketPrice!=newOrderPriceData.actualPrice">{{locationPrice.price.actualPrice}}元</span>
            <span class="price">{{locationPrice.price.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{newOrderPriceData.locationName}}<span class="link-style" @click="chaining(newOrderPriceData.href)">查看标准&gt&gt</span>
        </p>
      </div>
    </div>
    <goods-list></goods-list>
    <div class="total-price clearfix">
      <div>费用合计：</div>
      <div>
        <div style="color: #999999; font-size:0.28rem; text-align: right">原价:<span
          class="actual-price">{{newOrderTotalPrice.actualTotal}}元</span></div>
        <div style="color: #ef5e49; font-size:0.28rem; text-align: right">推广价:<span
          class="price">{{newOrderTotalPrice.marketTotal}}元</span></div>
      </div>
    </div>
    <div>
      <el-row :gutter="20" style="padding: 0.2rem">
        <el-col :span="12">
          <div class="grid-content">
            <router-link to="/newOrder/train">
              <el-button style="width: 100%;background: #fff;color: #000">上一步</el-button>
            </router-link>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="width: 100%" @click="toWaitForCheck">下一步</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import GoodsList from '../parts/GoodsList.vue';
  import {mapGetters} from 'vuex'
  import * as types from '../../../../store/mutation-types'
  import {setLocalStorage} from '../../../../api'
  export default{
    created (){
      //保存数据
      setLocalStorage(this)
      //获取商品数据
      this.$store.dispatch(types.PLACE__NEW_ORDER_PRICE__GET_GOODS_LIST, this)
    },
    data(){
      return {
        type: this.$store.state.transferType == 'pickup'
      }
    },
    computed: mapGetters({
      newOrderPriceData: 'place_newOrderPrice_newOrderPriceData',
      newOrderTotalPrice: 'place_newOrderPrice_newOrderTotalPrice',
      locationPrice: 'place_newOrderPrice_getData'
    }),
    components: {
      GoodsList
    },
    methods: {
      toWaitForCheck(){
        this.$store.dispatch(types.PLACE__NEW_ORDER_PRICE__SAVE_WAIT_CHECK_DATA, this)
      },
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      }
    }
  }
</script>

<style>
  .operation-container .new-order-goods{
    margin-top: 10px;
  }
  .new-order-goods div{
    float: left;
    width: 0.8rem;
    line-height: 30px;
    text-align: center;
    border: 1px solid #bfcbd9;
  }
  .new-order-goods div:nth-child(1){
    width: 0.95rem;
    border-radius: 5px 0 0 5px/5px 0 0 5px;
  }
  .new-order-goods div:nth-child(2){
    border-left: 0 ;
    border-right: 0 ;
  }
  .new-order-goods div:nth-child(3){
    border-radius: 0 5px 5px 0/0 5px 5px 0;
  }
  .new-order-goods i{
    color: #bfcbd9;
  }

  #selectInCarriageValue>div{
    position: relative;
    width: 2.7rem;
  }

  #selectInCarriageValueTitle{
    border: 1px solid #bfcbd9;
    text-align: center;
    border-radius: 5px/5px;
    line-height: 0.6rem;
  }
  #selectInCarriageValueList{
    position: absolute;
    left: 0;
    top:0.7rem;
    width: 2.7rem;
    border: 1px solid #bfcbd9;
    background: #fff;
    border-radius: 5px/5px;
  }
  #selectInCarriageValueList>div{
    text-align: center;
    line-height: 0.6rem;
    margin: 5px 0;
  }
  #selectInCarriageValueList>div:nth-child(1){

    border-bottom: 1px solid #bfcbd9;
  }
  #selectInCarriageValueList>div:nth-child(2){
    border-top: 1px solid #bfcbd9;
  }
  .activeSelect{
    background: #20A0FF;
  }



</style>

