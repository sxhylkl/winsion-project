<template>
  <!--各项费用-->
  <div>
    <!--候车室-->
    <div class="luggage-numbers operation-container" v-if="orderDetailList.waitingroom.amount">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.waitingroom.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.waitingroom.name}}</div>
          <div><span class="price">{{orderDetailList.waitingroom.amount}}</span>×{{orderDetailList.waitingroom.price}}共<span class="price">{{orderDetailList.waitingroom.marketPrice}}</span>元
          </div>
        </div>
      </div>
    </div>
    <!--人数-->
    <div class="luggage-numbers operation-container" v-if="orderDetailList.rider.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.rider.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.rider.name}} 共{{orderDetailList.rider.total}}人</div>
          <div class="font-small">免费人数 <span class="price">{{orderDetailList.rider.free}}</span></div>
          <div class="font-small">收费人数 <span class="price">{{orderDetailList.rider.amount}}</span>×{{orderDetailList.rider.price}}共<span
            class="price">{{orderDetailList.rider.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.rider.instruction}}<span class="link-style" @click="chaining(goodsObj.rider.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <!--小件行李件数费用-->
    <div class="luggage-numbers operation-container" v-if="orderDetailList.smallLuggage.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.smallLuggage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.smallLuggage.name}} 共{{orderDetailList.smallLuggage.total}}件</div>
          <div class="font-small">免费件数 <span class="price">{{orderDetailList.smallLuggage.free}}</span></div>
          <div class="font-small">收费件数 <span class="price">{{orderDetailList.smallLuggage.amount}}</span>×{{orderDetailList.smallLuggage.price}}共<span class="price">{{orderDetailList.smallLuggage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.smallLuggage.instruction}}<span class="link-style" @click="chaining(goodsObj.smallLuggage.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <!--行李件数费用-->
    <div class="luggage-numbers operation-container" v-if="orderDetailList.luggage.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.luggage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.luggage.name}} 共{{orderDetailList.luggage.total}}件</div>
          <div class="font-small">免费件数 <span class="price">{{orderDetailList.luggage.free}}</span></div>
          <div class="font-small">收费件数 <span class="price">{{orderDetailList.luggage.amount}}</span>×{{orderDetailList.luggage.price}}共<span class="price">{{orderDetailList.luggage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.luggage.instruction}}<span class="link-style" @click="chaining(goodsObj.luggage.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <!--行李是否送上车费用-->
    <div class="luggage-numbers operation-container" v-if="orderDetailList.incarriage.amount">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.incarriage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.incarriage.name}}</div>
          <div><span class="price">{{orderDetailList.incarriage.amount}}</span>×{{orderDetailList.incarriage.price}}共<span class="price">{{orderDetailList.incarriage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.incarriage.instruction}}<span class="link-style" @click="chaining(goodsObj.incarriage.href)">查看标准&gt;&gt;</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { setLocalStorage } from '../../../../api'
  export default{
    props:['orderDetailList'],
    computed: mapGetters({
      goodsObj: 'manage_orderDetail_goodsObj'
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
