<template>
  <div @click="show=false">
    <div class="luggage-numbers operation-container" v-if="goodsObj.waitingroom">
      <div class="rest-room">
        <div class="position-relative">
          <img :src="`./static/images/${goodsObj.waitingroom.iconUrl}`" alt="">
          <span class="circular" :class="{checked:checked}" @click="selectRoom"></span>
          <span class="rest-icon" v-show="goodsObj.waitingroom.actualPrice!=goodsObj.waitingroom.marketPrice"></span>
        </div>
        <p>{{goodsObj.waitingroom.name}}</p>
        <p class="line-through" v-show="goodsObj.waitingroom.actualPrice!=goodsObj.waitingroom.marketPrice"><span>{{goodsObj.waitingroom.actualPrice}}</span>元/人
        </p>
        <p><span class="price">{{goodsObj.waitingroom.marketPrice}}</span>元/人</p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.rider">
      <div class="clearfix">
        <div class="position-relative">
          <img :src="`./static/images/${goodsObj.rider.iconUrl}`" alt="">
          <span class="market-icon"></span>
        </div>
        <div>
          <div>{{goodsObj.rider.name}}</div>
          <div>
            <span class="line-through margin-right" v-show="goodsObj.rider.actualPrice!=goodsObj.rider.marketPrice">{{goodsObj.rider.actualPrice}}元</span>
            <span class="price">{{goodsObj.rider.marketPrice}}</span>元
          </div>
        </div>
        <div class="new-order-goods">
          <div><span>{{newOrderPriceNum.riderNum}}</span></div>
          <div @click="minusRider"><i class="el-icon-minus"></i></div>
          <div @click="addRider"><i class="el-icon-plus"></i></div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.rider.instruction}}<span class="link-style"
                                               @click="chaining(goodsObj.rider.href)">查看标准&gt&gt</span></p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.smallLuggage">
      <div class="clearfix">
        <div class="position-relative">
          <img :src="`./static/images/${goodsObj.smallLuggage.iconUrl}`" alt="">
          <span class="market-icon"></span>
        </div>
        <div>
          <div>{{goodsObj.smallLuggage.name}}</div>
          <div>
            <span class="line-through margin-right"
                  v-show="goodsObj.smallLuggage.actualPrice!=goodsObj.smallLuggage.marketPrice">{{goodsObj.smallLuggage.actualPrice}}元</span>
            <span class="price">{{goodsObj.smallLuggage.marketPrice}}</span>元
          </div>
        </div>
        <div class="new-order-goods">
          <div><span>{{newOrderPriceNum.smallLuggageNum}}</span></div>
          <div @click="minusSmallLuggage"><i class="el-icon-minus"></i></div>
          <div @click="addSmallLuggage"><i class="el-icon-plus"></i></div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.luggage.instruction}}<span class="link-style"
                                                 @click="chaining(goodsObj.luggage.href)">查看标准&gt&gt</span></p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.luggage">
      <div class="clearfix">
        <div class="position-relative">
          <img :src="`./static/images/${goodsObj.luggage.iconUrl}`" alt="">
          <span class="market-icon"></span>
        </div>
        <div>
          <div>{{goodsObj.luggage.name}}</div>
          <div>
            <span class="line-through margin-right" v-show="goodsObj.luggage.actualPrice!=goodsObj.luggage.marketPrice">{{goodsObj.luggage.actualPrice}}元</span>
            <span class="price">{{goodsObj.luggage.marketPrice}}</span>元
          </div>
        </div>
        <div class="new-order-goods">
          <div><span>{{newOrderPriceNum.luggageNum}}</span></div>
          <div @click="minusLuggage"><i class="el-icon-minus"></i></div>
          <div @click="addLuggage"><i class="el-icon-plus"></i></div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{goodsObj.luggage.instruction}}<span class="link-style"
                                                 @click="chaining(goodsObj.luggage.href)">查看标准&gt&gt</span></p>
      </div>
    </div>
    <div class="luggage-numbers operation-container" v-if="goodsObj.incarriage">
      <div class="clearfix">
        <div class="position-relative">
          <img :src="`./static/images/${goodsObj.incarriage.iconUrl}`" alt="">
          <span class="market-icon"></span>
        </div>
        <div>
          <div>{{goodsObj.incarriage.name}}</div>
          <div>
            <span class="line-through margin-right"
                  v-show="goodsObj.incarriage.actualPrice!=goodsObj.incarriage.marketPrice">{{goodsObj.incarriage.actualPrice}}元</span>
            <span class="price">{{goodsObj.incarriage.marketPrice}}</span>元
          </div>
        </div>
        <div id="selectInCarriageValue">
          <div>
            <div id="selectInCarriageValueTitle" @click.stop="show=!show">{{newOrderPriceNum.incarriageValue.value?'是':'否'}}</div>
            <div v-if="show" id="selectInCarriageValueList">
              <div v-for="item in options" @click.stop="selectInCarriage(item.value)" :class="{activeSelect:newOrderPriceNum.incarriageValue.value==item.value}">{{item.label}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix instruction">
        <p>{{newOrderPriceNum.incarriageValue.instruction}}<span class="link-style"
                                                                 @click="chaining(goodsObj.incarriage.href)">查看标准&gt&gt</span>
        </p>
      </div>
    </div>
  </div>

</template>
<script>
  import * as types from '../../../../store/mutation-types'
  import {mapGetters} from 'vuex'
  import {setLocalStorage} from '../../../../api'
  export default{
    data(){
      return {
        show:false,
        checked: false,
        options: [{label: '是', value: 1}, {label: '否', value: 0}],
        newOrderPriceNum: this.$store.state.newOrderPrice.newOrderPriceNum,
        maxLuggageAmount: JSON.parse(this.$store.state.newOrderTrain.newOrderTrainData.location).maxLuggageAmount
      }
    },
    computed: mapGetters({
      goodsObj: 'place_newOrderPrice_goodsObj',
    }),
    methods: {
      selectRoom(){
        this.checked = !this.checked
        const value = this.checked ? 1 : 0
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_ROOM, value)
      },
      addRider(){
        let value = this.newOrderPriceNum.riderNum
        value++
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_RIDER_NUM, value)
      },
      minusRider(){
        let value = this.newOrderPriceNum.riderNum
        value--
        if(value==0){
          this.$alert(`乘车人数最少1人`, '温馨提示', {
            confirmButtonText: '确定',
            callback: action=> {
            }
          })
          return
        }
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_RIDER_NUM, value)
      },
      addLuggage(){
        let value = this.newOrderPriceNum.luggageNum
        value++
        if ((value + this.newOrderPriceNum.smallLuggageNum) == this.maxLuggageAmount + 1) {
          this.$alert(`每辆行李车可承载${this.maxLuggageAmount}件行李，每超过${this.maxLuggageAmount}件将增加1辆行李车。`, '温馨提示', {
            confirmButtonText: '确定',
            callback: action=> {
            }
          })
          this.maxLuggageAmount = -10000000
        }
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_LUGGAGE_NUM, value)
      },
      addSmallLuggage(){
        let value = this.newOrderPriceNum.smallLuggageNum
        value++
        if ((value + this.newOrderPriceNum.luggageNum) == this.maxLuggageAmount + 1) {
          this.$alert(`每辆行李车可承载${this.maxLuggageAmount}件行李，每超过${this.maxLuggageAmount}件将增加1辆行李车。`, '温馨提示', {
            confirmButtonText: '确定',
            callback: action=> {
            }
          })
          this.maxLuggageAmount = -10000000
        }
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_SMALL_LUGGAGE_NUM, value)
      },
      minusLuggage(){
        let value = this.newOrderPriceNum.luggageNum
        value--
        if(value==-1)return
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_LUGGAGE_NUM, value)
      },
      minusSmallLuggage(){
        let value = this.newOrderPriceNum.smallLuggageNum
        value--
        if(value==0)return
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_SMALL_LUGGAGE_NUM, value)
      },
      selectInCarriage(value){
        this.show = !this.show
        this.$store.commit(types.PLACE__NEW_ORDER_PRICE__SAVE_INCARRIAGE_VALUE, {
          value,
          type: this.$store.state.transferType == 'pickup'
        })
      },
      chaining(href){
        setLocalStorage(this)
        window.location.href = href
      }
    }
  }
</script>
<style scoped>

  .instruction {
    color: #999999;
    font-size: 0.28rem;
  }

  .market-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 0.9rem;
    height: 0.2rem;
    background: url("../../../../../static/images/ic_itemmarketprice.png") no-repeat;
    background-size: 100% 100%;
  }

  .el-select {
    width: 130px;
  }

  .el-input-number {
    width: 2.58rem;
  }

  .checked {
    background: url("../../../../../static/images/icon_restroomchecked.png");
    background-size: 100% 100%;
  }
</style>
