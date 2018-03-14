<template>
  <div class="tnlist-container">
    <div class="order-message">订单信息-{{type?'送':'接'}}站订单-{{newOrderTrainData.stationName}}-待确认</div>
    <div class="order-base-info">
      <div class="clearfix">
        <div class="order-train-number">{{newOrderTrainData.trainNumber}}</div>
        <div class="order-time">{{newOrderTrainData.departDate | handleGetTime('time')}}</div>
      </div>
      <div class="user-info">
        <div class="clearfix">
          <div>车站：<span class="station-name">{{newOrderTrainData.stationName}}</span></div>
          <div>车厢：<span class="station-carriage">{{newOrderTrainData.carriage}}</span>车厢</div>
        </div>
        <div class="clearfix">
          <div>昵称：<span class="name">{{newOrderTrainData.contact}}</span></div>
          <div>电话：<span class="mobile">{{newOrderTrainData.mobile}}</span></div>
        </div>
      </div>
    </div>
    <div class="end-point operation-container">
      <div class="clearfix">
        <div><img src="../../../../static/images/ic_serviceend.png" alt=""></div>
        <div>
          <div>接送费用</div>
          <div><span class="price">{{priceData.price.marketPrice}}</span>元</div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{newOrderPriceData.locationName}}<span class="link-style" @click="chaining(newOrderPriceData.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.waitingroom&&priceData.waitingroom.amount">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.waitingroom.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.waitingroom.name}}</div>
          <div><span class="price">{{priceData.waitingroom.amount}}</span>×{{priceData.waitingroom.price}}共<span
            class="price">{{priceData.waitingroom.marketPrice}}</span>元
          </div>
        </div>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.rider&&priceData.rider.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.rider.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.rider.name}} 共{{priceData.rider.total}}人</div>
          <div class="font-small">免费人数 <span class="price">{{priceData.rider.free}}</span></div>
          <div class="font-small">收费人数 <span class="price">{{priceData.rider.amount}}×</span>{{priceData.rider.price}}共<span class="price">{{priceData.rider.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.rider.instruction}}<span class="link-style"
                                               @click="chaining(goodsObj.rider.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.smallLuggage&&priceData.smallLuggage.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.smallLuggage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.smallLuggage.name}} 共{{priceData.smallLuggage.total}}件</div>
          <div class="font-small">免费件数 <span class="price">{{priceData.smallLuggage.free}}</span></div>
          <div class="font-small">收费件数 <span class="price">{{priceData.smallLuggage.amount}}</span>×{{priceData.smallLuggage.price}}共<span
            class="price">{{priceData.smallLuggage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.smallLuggage.instruction}}<span class="link-style" @click="chaining(goodsObj.smallLuggage.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.luggage&&priceData.luggage.total">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.luggage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.luggage.name}} 共{{priceData.luggage.total}}件</div>
          <div class="font-small">免费件数 <span class="price">{{priceData.luggage.free}}</span></div>
          <div class="font-small">收费件数 <span class="price">{{priceData.luggage.amount}}</span>×{{priceData.luggage.price}}共<span class="price">{{priceData.luggage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.luggage.instruction}}<span class="link-style" @click="chaining(goodsObj.luggage.href)">查看标准&gt;&gt;</span>
        </p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.incarriage&&priceData.incarriage.amount">
      <div class="clearfix">
        <div><img :src="`./static/images/${goodsObj.incarriage.iconUrl}`" alt=""></div>
        <div>
          <div>{{goodsObj.incarriage.name}}</div>
          <div><span class="price">{{priceData.incarriage.amount}}</span>×{{priceData.incarriage.price}}共<span
            class="price">{{priceData.incarriage.marketPrice}}</span>元
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{newOrderTrainData.stationId=='1de76e8dac3c4ec5af2cdd06f2a5977b'?(priceData.incarriage.amount?'为您将行李送至站台上' :
          '为您将行李搬入车厢内'):(priceData.incarriage.amount?'从站台开始为您搬运行李' : '从车厢开始为您搬运行李')}}<span
            class="link-style" @click="chaining(goodsObj.incarriage.href)">查看标准&gt;&gt;</span></p>
      </div>
    </div>
    <div class="total-price clearfix">
      <div>费用合计</div>
      <div><span class="price">{{totalPrice.marketTotal}}</span>元</div>
    </div>
    <div class="attach">
      <div>费用需知</div>
      <ol>
        <li>补缴费用:<br>如果您变更接站的服务终点或送站的服务起点，可能会导致加收距离费用；<br>如果您的同行人数、行李数量规格等与订单不符，您需补缴相关费用；</li>
        <li>取消订单的服务费用:<br>如果您在服务即将开始时取消订单，将根据取消时间收取服务费用，请您查看<span class="tel link-style"
                                                                  @click="chaining(cancelService)">费用标准</span>;
        </li>
        <li>客服电话:
          <div v-if="pickupPhone">送站服务客服电话：<a class="tel link-style"
                                              @click="chaining(`winsion://interactive/phonecall?phone=${pickupPhone}`)">{{pickupPhone}}</a>
          </div>
          <div v-if="takePhone">接站服务客服电话：<a class="tel link-style"
                                            @click="chaining(`winsion://interactive/phonecall?phone=${takePhone}`)">{{takePhone}}</a>
          </div>
          服务监督电话：<a class="tel link-style" @click="chaining('winsion://interactive/phonecall?phone=010-88895560-8019')">010-88895560-8019</a>（工作日9:00-18:00）
        </li>
      </ol>
    </div>
    <div>
      <el-row style="padding: 0.2rem">
        <el-col :span="12">
          <div class="grid-content" style="width: 90%;margin: 0 auto">
            <router-link to="/newOrder/train">
              <el-button style="width: 100%;background: #fff;color: #000">上一步</el-button>
            </router-link>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple" style="width: 90%;margin: 0 auto">
            <el-button type="primary" style="width: 100%" @click="submitOrder">提交订单</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../../store/mutation-types'
  import {setLocalStorage, getStandard} from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
    },
    data(){
      return {
        newOrderTrainData: this.$store.state.newOrderTrain.newOrderTrainData,
        type: this.$store.state.transferType == 'pickup',
        cancelService: getStandard(this.$store.state.newOrderTrain.newOrderTrainData.stationId, 'cancelService', 'pickup'),
        pickupPhone: getStandard(this.$store.state.newOrderTrain.newOrderTrainData.stationId, 'phone', 'pickup'),
        takePhone: getStandard(this.$store.state.newOrderTrain.newOrderTrainData.stationId, 'phone', 'take')
      }
    },
    computed: mapGetters({
      priceData: 'place_newOrderPrice_getData',
      totalPrice: 'place_newOrderPrice_newOrderTotalPrice',
      newOrderPriceData: 'place_newOrderPrice_newOrderPriceData',
      goodsObj: 'place_newOrderPrice_goodsObj'
    }),
    methods: {
      submitOrder(){
        this.$store.dispatch(types.PLACE__WAIT_CHECK__SUBMIT_ORDER, this)
      },
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      }
    }
  }
</script>
<style>

  .font-small{
    font-size: 12px;
  }

  .order-base-info > div:nth-of-type(1) {
    padding-bottom: 0.2rem;
    border-bottom: 1px dashed #a6a6a6;
  }

  .order-train-number {
    float: left;
    color: #2c62ba;
  }

  .order-time {
    float: right;
    color: #959595;
  }

  .user-info {
    padding-top: 0.3rem;
  }

  .user-info > div:nth-of-type(1) {
    margin-bottom: 0.2rem;
  }
</style>
