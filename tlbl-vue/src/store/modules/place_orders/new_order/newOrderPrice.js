import service from '../../../../service'
import * as types from '../../../mutation-types'
import {getLocalStorage, getUrlData, floatMul, getStandard} from '../../../../api'

// initial state
let state = {
  goodsList: [],
  newOrderPriceNum: {}
}

state = getLocalStorage(state, 'newOrderPrice')

// getters
const getters = {
  place_newOrderPrice_getLocationData: (state, getters, rootState)=> {
    const location = rootState.newOrderTrain.newOrderTrainData.location
    return location ? JSON.parse(location) : {
      name: '',
      price: 0,
      address: '',
      longitude: 0,
      latitude: 0,
      parentId: '',
      type: '',
      imgUrl: '',
      standardLuggageAmount: 0,
      standardRiderAmount: 0,
      maxLuggageAmount: 0,
      maxRiderAmount: 0
    }
  },
  place_newOrderPrice_newOrderPriceData: (state, getters, rootState)=> {
    const type = rootState.transferType
    const {stationName, stationId} = rootState.newOrderTrain.newOrderTrainData
    const locationData = getters.place_newOrderPrice_getLocationData
    const actualPrice = parseFloat(locationData.price)

    const marketPrice = stationId == "1de76e8dac3c4ec5af2cdd06f2a5977b" ? actualPrice : actualPrice
    const locationName = locationData.name
    const href = getStandard(stationId, 'car', type)
    return {stationName, actualPrice, marketPrice, locationName, href}
  },
  place_newOrderPrice_goodsObj: (state, getters, rootState)=> {
    const goodsObj = {}
    const transferType = rootState.transferType
    const stationId = rootState.newOrderTrain.newOrderTrainData.stationId
    const locationData = getters.place_newOrderPrice_getLocationData
    const type = locationData.type

    state.goodsList.forEach(function (item) {
      if (item.type == 'luggage' && type.search(item.transferPointType) != -1 && item.name == '小件行李') {
        goodsObj.smallLuggage = {
          ...item,
          href: getStandard(stationId, 'smallLuggage', transferType)
        }
      } else if (item.type == 'luggage' && type.search(item.transferPointType) != -1) {
        goodsObj.luggage = {
          ...item,
          href: getStandard(stationId, 'luggage', transferType)
        }
      } else if (item.type == 'incarriage' && type.search(item.transferPointType) != -1) {
        goodsObj.incarriage = {
          ...item,
          href: getStandard(stationId, 'incarriage', transferType)
        }
      } else if (item.type == 'rider' && type.search(item.transferPointType) != -1) {
        //区分接站和送站的乘车人的价格
        if (transferType == 'pickup') {
          goodsObj.rider = {
            ...item,
            href: getStandard(stationId, 'rider', transferType)
          }
        } else {
          goodsObj.rider = {
            ...item,
            actualPrice: 0,
            marketPrice: 0,
            href: getStandard(stationId, 'rider', transferType)
          }
        }
      } else if (item.type == 'waitingroom' && type.search(item.transferPointType) != -1) {
        goodsObj.waitingroom = {...item}
      }
    })
    return goodsObj
  },
  place_newOrderPrice_getData: (state, getters, rootState)=> {
    //初始价格
    const {actualPrice, marketPrice} = getters.place_newOrderPrice_newOrderPriceData
    //各个物品的价格
    const {rider, smallLuggage, luggage, incarriage, waitingroom} =  getters.place_newOrderPrice_goodsObj
    //各个物品的实际数量
    const {riderNum, smallLuggageNum, luggageNum, incarriageValue, roomValue} = state.newOrderPriceNum
    //各个物品的限制数量
    const locationData = getters.place_newOrderPrice_getLocationData
    const {standardLuggageAmount, standardRiderAmount, maxLuggageAmount, maxRiderAmount} = locationData

    const transferType = rootState.transferType == 'pickup'
    //计算价格,车的数量，超出的人数，超出的行李，实际总价，折扣总价
    let carNumber, overPer, overLuggage, overSmallLuggage, freePer, freeLuggage, freeSmallLuggage

    //以行李为基准计算车的数量
    if (luggageNum + smallLuggageNum <= maxLuggageAmount) {
      carNumber = 1;
    } else if (luggageNum + smallLuggageNum > maxLuggageAmount) {
      carNumber = parseInt((luggageNum + smallLuggageNum) / maxLuggageAmount) + parseInt((luggageNum + smallLuggageNum) % maxLuggageAmount !== 0 ? 1 : 0);
    }
    //超出的行李
    //通过小件行李数量先计算出大件行李超出数量，再计算出小件行李的超出数量
    overSmallLuggage = smallLuggageNum - floatMul(carNumber, standardLuggageAmount);
    overLuggage = overSmallLuggage > 0 ? luggageNum : (luggageNum + overSmallLuggage)
    overLuggage = overLuggage > 0 ? overLuggage : 0
    overSmallLuggage = overSmallLuggage > 0 ? overSmallLuggage : 0
    //免费的行李
    freeSmallLuggage = smallLuggageNum - overSmallLuggage
    freeLuggage = luggageNum - overLuggage

    //超出的人数，免费人数
    if(transferType){
      overPer = riderNum - floatMul(carNumber, standardRiderAmount);
      overPer = overPer > 0 ? overPer : 0
      freePer = riderNum - overPer
    }else {
      overPer = 0
      freePer = riderNum
    }


    return {
      rider: {
        total: riderNum,
        free: freePer,
        amount: overPer,
        price:  rider ? rider.marketPrice : 0,
        actualPrice: floatMul(overPer, rider ? rider.actualPrice : 0),
        marketPrice: floatMul(overPer, rider ? rider.marketPrice : 0)
      },
      smallLuggage: {
        total: smallLuggageNum,
        free: freeSmallLuggage,
        amount: overSmallLuggage,
        price: smallLuggage ? smallLuggage.marketPrice : 0,
        actualPrice: floatMul(overSmallLuggage, (smallLuggage ? smallLuggage.actualPrice : 0)),
        marketPrice: floatMul(overSmallLuggage, (smallLuggage ? smallLuggage.marketPrice : 0))
      },
      luggage: {
        total: luggageNum,
        free: freeLuggage,
        amount: overLuggage,
        price: luggage ? luggage.marketPrice : 0,
        actualPrice: floatMul(overLuggage, (luggage ? luggage.actualPrice : 0)),
        marketPrice: floatMul(overLuggage, (luggage ? luggage.marketPrice : 0))
      },
      incarriage: {
        amount: incarriageValue ? incarriageValue.value : 0,
        price: incarriageValue && incarriageValue.value ? incarriage.marketPrice : 0,
        actualPrice: incarriageValue && incarriageValue.value ? incarriage.actualPrice : 0,
        marketPrice: incarriageValue && incarriageValue.value ? incarriage.marketPrice : 0
      },
      waitingroom: {
        amount: riderNum,
        price: roomValue ? waitingroom.marketPrice : 0,
        actualPrice: roomValue ? floatMul(waitingroom.actualPrice, riderNum) : 0,
        marketPrice: roomValue ? floatMul(waitingroom.marketPrice, riderNum) : 0
      },
      price: {
        actualPrice: floatMul(actualPrice, carNumber),
        marketPrice: floatMul(marketPrice, carNumber)
      }
    }
  },
  place_newOrderPrice_newOrderTotalPrice: (state, getters)=> {
    const {rider, smallLuggage, luggage, incarriage, waitingroom, price} = getters.place_newOrderPrice_getData
    //--------------计算总价-----------------
    return {
      actualTotal: (rider.actualPrice + smallLuggage.actualPrice + luggage.actualPrice + incarriage.actualPrice + waitingroom.actualPrice + price.actualPrice).toFixed(2),
      marketTotal: (rider.marketPrice + smallLuggage.marketPrice + luggage.marketPrice + incarriage.marketPrice + waitingroom.marketPrice + price.marketPrice).toFixed(2)
    }
  }
}


// actions
const actions = {
  [types.PLACE__NEW_ORDER_PRICE__GET_GOODS_LIST]({commit, state, rootState}, _this){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      stationId: rootState.newOrderTrain.newOrderTrainData.stationId,
      transferType: rootState.transferType,
      trainRunId: rootState.newOrderTrain.newOrderTrainData.trainRunId
    }
    service.getGoodsList(data).then(
      (result)=> {
        const {success, data, code} = result.data;
        if (success) {
          commit(types.PLACE__NEW_ORDER_PRICE__SAVE_GOODS_LIST, data)
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_WAIT_CHECK_DATA]({commit, state, getters}, _this){
    const orderDetail = []

    if (getters.place_newOrderPrice_goodsObj.rider) {
      orderDetail.push({
        id: 'number-' + getters.place_newOrderPrice_goodsObj.rider.id,
        goodsId: getters.place_newOrderPrice_goodsObj.rider.id,
        price: getters.place_newOrderPrice_goodsObj.rider.marketPrice,
        amount: state.newOrderPriceNum.riderNum
      })
    }

    if (getters.place_newOrderPrice_goodsObj.smallLuggage) {
      orderDetail.push({
        id: 'number-' + getters.place_newOrderPrice_goodsObj.smallLuggage.id,
        goodsId: getters.place_newOrderPrice_goodsObj.smallLuggage.id,
        price: getters.place_newOrderPrice_goodsObj.smallLuggage.marketPrice,
        amount: state.newOrderPriceNum.smallLuggageNum
      })
    }

    if (getters.place_newOrderPrice_goodsObj.luggage) {
      orderDetail.push({
        id: 'number-' + getters.place_newOrderPrice_goodsObj.luggage.id,
        goodsId: getters.place_newOrderPrice_goodsObj.luggage.id,
        price: getters.place_newOrderPrice_goodsObj.luggage.marketPrice,
        amount: state.newOrderPriceNum.luggageNum
      })
    }

    if (getters.place_newOrderPrice_goodsObj.incarriage) {
      orderDetail.push({
        id: 'carriage-' + getters.place_newOrderPrice_goodsObj.incarriage.id,
        goodsId: getters.place_newOrderPrice_goodsObj.incarriage.id,
        price: getters.place_newOrderPrice_goodsObj.incarriage.marketPrice,
        amount: state.newOrderPriceNum.incarriageValue.value
      })
    }

    if (getters.place_newOrderPrice_goodsObj.waitingroom) {
      orderDetail.push({
        id: 'rest-' + getters.place_newOrderPrice_goodsObj.waitingroom.id,
        goodsId: getters.place_newOrderPrice_goodsObj.waitingroom.id,
        price: getters.place_newOrderPrice_goodsObj.waitingroom.marketPrice,
        amount: state.newOrderPriceNum.riderNum
      })
    }

    commit(types.PLACE__NEW_ORDER_PRICE__SAVE_WAIT_CHECK_DATA, orderDetail)
    _this.$router.push({path: '/waitCheck'});
  }
}

// mutations
const mutations = {
  [types.PLACE__NEW_ORDER_TRAIN__RESET_ORDER_PRICE_NUM] (state, newOrderPriceNum) {
    state.newOrderPriceNum = newOrderPriceNum
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_GOODS_LIST](state, goodsList){
    state.goodsList = goodsList
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_RIDER_NUM](state, value){
    state.newOrderPriceNum.riderNum = value
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_LUGGAGE_NUM](state, value){
    state.newOrderPriceNum.luggageNum = value
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_SMALL_LUGGAGE_NUM](state, value){
    state.newOrderPriceNum.smallLuggageNum = value
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_INCARRIAGE_VALUE](state, data){
    state.newOrderPriceNum.incarriageValue = {
      value: data.value,
      instruction: data.type ? (data.value == 0 ? '为您将行李送至站台上' : '为您将行李搬入车厢内') : (data.value == 0 ? '从站台开始为您搬运行李' : '从车厢开始为您搬运行李')
    }
  },
  [types.PLACE__NEW_ORDER_PRICE__SAVE_ROOM](state, value){
    state.newOrderPriceNum.roomValue = value
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
