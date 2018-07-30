import service from '../../../service'
import * as types from '../../mutation-types'
import {isEmptyObject, getUrlData, getLocalStorage, floatMul, getStandard, isRunByVersion} from '../../../api'
import interactiveBridge from '../../../api'

// initial state
let state = {
  orderId: '',
  orderDetailData: {},
  goodsList: [],
  pointList: []
}

state = getLocalStorage(state, 'orderDetail')

// getters
const getters = {
  manage_orderDetail_orderDetailTrain: state=> {
    if (isEmptyObject(state.orderDetailData))return {
      type: 'pickup',
      stationId: '',
      serialNumber: '',
      trainNumber: '',
      departOrArriveTime: 946656000000,
      stationName: '',
      carriage: '',
      contact: '',
      mobile: '',
      status: '',
      orderId: '',
      marketPriceAmount: 0,
      deadline: '',
      showBtn: false,
      cancelService: '',
      pickupPhone: '',
      takePhone: '',
      showEvaluate:false
    }
    let {type, stationId, serialNumber, trainNumber, departOrArriveTime, stationName, carriage, contact, mobile, status, orderId,staffExecuteDtoList} = state.orderDetailData
    const showEvaluate = staffExecuteDtoList.length!=0
    const showBtn = status == "unexecute" && type == 'pickup' && new Date().getTime() > state.orderDetailData.predictArriveTime - 2 * 60 * 60 * 1000
    const marketPriceAmount = status == 'modifyunpay' ? ((state.orderDetailData.marketPriceAmount - state.orderDetailData.paidPriceAmount).toFixed(2)) : state.orderDetailData.marketPriceAmount
    const deadline = state.orderDetailData.deadline ? state.orderDetailData.deadline : ''
    const cancelService = getStandard(stationId, 'cancelService', 'pickup')
    const pickupPhone = getStandard(stationId, 'phone', 'pickup')
    const takePhone = getStandard(stationId, 'phone', 'take')
    if(status=='unpay'&&deadline<=new Date().getTime()){
      status = 'payfailedcancel'
    }
    return {
      type,
      stationId,
      serialNumber,
      trainNumber,
      departOrArriveTime,
      stationName,
      carriage,
      contact,
      mobile,
      status,
      orderId,
      deadline,
      marketPriceAmount,
      showBtn,
      cancelService,
      pickupPhone,
      takePhone,
      showEvaluate
    }
  },
  manage_orderDetail_orderDetailBrother: state=> {
    if (!state.orderDetailData.staffExecuteDtoList)return null
    if (!state.orderDetailData.staffExecuteDtoList.length)return null
    let wholeCourse = []
    let beforeCourse = []
    let afterCourse = []
    state.orderDetailData.staffExecuteDtoList.forEach(function (item) {
      if (item.executeType == 'all') {
        wholeCourse.push(item)
      }
      if (item.executeType == 'outside') {
        beforeCourse.push(item)
      }
      if (item.executeType == 'platform') {
        afterCourse.push(item)
      }
    })
    return {
      wholeCourse,
      beforeCourse,
      afterCourse
    }
  },
  manage_orderDetail_orderDetailMap: state=> {
    if (!state.pointList.length)return {
      longitude: 116.404,
      latitude: 39.915,
      stationName: '北京',
      type: false
    }
    const nowPointData = state.pointList.filter((item)=>state.orderDetailData.transferPointName == item.name)[0]
    const stationName = state.orderDetailData.stationName
    const type = state.orderDetailData.type == 'pickup'
    return {
      longitude: nowPointData.longitude,
      latitude: nowPointData.latitude,
      stationName,
      type
    }
  },
  manage_orderDetail_goodsObj: state=> {
    //更改商品列表类型
    const goodsObj = {
      rider: {id: ''},
      smallLuggage: {id: ''},
      luggage: {id: ''},
      incarriage: {id: ''},
      waitingroom: {id: ''}
    }
    const {transferPointName, stationId} = state.orderDetailData.stationId ? state.orderDetailData : {
      transferPointName: '',
      stationId: ''
    }
    const locationData = state.pointList.filter((item)=>transferPointName == item.name)
    const type = locationData.length == 0 ? '' : locationData[0].type

    const transferType = (state.orderDetailData.type ? state.orderDetailData.type : 'pickup')
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
          href: getStandard(stationId, 'incarriage', transferType),
          instruction: transferType ? '为您将行李搬入车厢内' : '从车厢开始为您搬运行李'
        }
      } else if (item.type == 'rider' && type.search(item.transferPointType) != -1) {
        goodsObj.rider = {
          ...item,
          href: getStandard(stationId, 'rider', transferType)
        }
      } else if (item.type == 'waitingroom' && type.search(item.transferPointType) != -1) {
        goodsObj.waitingroom = {...item}
      }
    })
    return goodsObj
  },
  manage_orderDetail_orderDetailPrice: (state, getters)=> {
    if (!state.pointList.length)return {
      orderDetailList: {
        rider: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        smallLuggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        luggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        incarriage: {amount: 0, price: 0, marketPrice: 0},
        waitingroom: {amount: 0, price: 0, marketPrice: 0},
      },
      alterOrderDetailList: {
        rider: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        smallLuggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        luggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        incarriage: {amount: 0, price: 0, marketPrice: 0},
        waitingroom: {amount: 0, price: 0, marketPrice: 0},
      },
      car: {marketPrice: 0, transferPointName: '', href: '', name: ''},
      paidPriceAmount: 0,
      marketPrice: 0,
      serviceChange: false,
      modifyunpay: false
    }

    //拿到所需数据
    const {alterOrderDetailList, orderDetailList, status, marketPriceAmount, paidPriceAmount, transferPointName, transferPointPrice, stationId} = state.orderDetailData
    const transferType = state.orderDetailData.type
    const currentType = transferType == 'pickup'
    const nowPointData = state.pointList.filter((item)=>transferPointName == item.name)
    let {standardRiderAmount, standardLuggageAmount, maxRiderAmount, maxLuggageAmount} = nowPointData.length
      ? nowPointData[0]
      : {standardRiderAmount: 3, standardLuggageAmount: 3, maxRiderAmount: 6, maxLuggageAmount: 6}

    //判断是否是变更类型
    const serviceChange = alterOrderDetailList.length !== 0
    const modifyunpay = status == 'modifyunpay'
    const marketPrice = modifyunpay ? ((marketPriceAmount - paidPriceAmount).toFixed(2)) : marketPriceAmount

    const goods = getters.manage_orderDetail_goodsObj

    return {
      orderDetailList: getPriceAndAmount(orderDetailList, goods, currentType),
      alterOrderDetailList: getAlterPriceAndAmount(alterOrderDetailList, orderDetailList, goods, currentType),
      car: {
        marketPrice: stationId == "1de76e8dac3c4ec5af2cdd06f2a5977b" ? transferPointPrice : transferPointPrice,
        transferPointName,
        href: getStandard(stationId, 'car', transferType)
      },
      serviceChange,
      modifyunpay,
      paidPriceAmount,
      marketPrice
    }

    //获取旧订单价格和数量
    function getPriceAndAmount(orderDetail, goodsObj, type) {

      //初始化值
      const orderDetailGoodsObj = {
        rider: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        smallLuggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        luggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        incarriage: {amount: 0, price: 0, marketPrice: 0},
        waitingroom: {amount: 0, price: 0, marketPrice: 0},
      }

      if (orderDetail.length == 0) {
        return orderDetailGoodsObj
      }

      orderDetail.forEach((item)=> {
        if (item.goodsId == goodsObj.rider.id) {
          orderDetailGoodsObj.rider = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.smallLuggage.id) {
          orderDetailGoodsObj.smallLuggage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.luggage.id) {
          orderDetailGoodsObj.luggage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.incarriage.id) {
          orderDetailGoodsObj.incarriage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.waitingroom.id) {
          orderDetailGoodsObj.waitingroom = {
            amount: item.amount,
            price: item.price
          }
        }
      })

      let carNumber, overPer, overLuggage, overSmallLuggage,freePer, freeLuggage, freeSmallLuggage
      const luggageNum = orderDetailGoodsObj.luggage.amount
      const smallLuggageNum = orderDetailGoodsObj.smallLuggage.amount
      const riderNum = orderDetailGoodsObj.rider.amount
      const incarriageValue = orderDetailGoodsObj.incarriage.amount
      const waitingroomValue = orderDetailGoodsObj.waitingroom.amount

      //以行李为基准计算车的数量
      if ((luggageNum + smallLuggageNum) <= maxLuggageAmount) {
        carNumber = 1;
      } else if ((luggageNum + smallLuggageNum) > maxLuggageAmount) {
        carNumber = parseInt((luggageNum + smallLuggageNum) / maxLuggageAmount) + parseInt((luggageNum + smallLuggageNum) % maxLuggageAmount !== 0 ? 1 : 0)
      }
      //超出的行李
      //通过小件行李数量先计算出大件行李超出数量，再计算出小件行李的超出数量
      overSmallLuggage = smallLuggageNum - floatMul(carNumber, standardLuggageAmount)
      overLuggage = overSmallLuggage > 0 ? luggageNum : (luggageNum + overSmallLuggage)
      overLuggage = overLuggage > 0 ? overLuggage : 0
      overSmallLuggage = overSmallLuggage > 0 ? overSmallLuggage : 0
      //免费的行李
      freeSmallLuggage = smallLuggageNum - overSmallLuggage
      freeLuggage = luggageNum - overLuggage

      //超出的人数，免费人数
      if(type){
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
          price: orderDetailGoodsObj.rider.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.rider.price), overPer)
        },
        smallLuggage: {
          total: smallLuggageNum,
          free: freeSmallLuggage,
          amount: overSmallLuggage,
          price: orderDetailGoodsObj.smallLuggage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.smallLuggage.price), overSmallLuggage)
        },
        luggage: {
          total: luggageNum,
          free: freeLuggage,
          amount: overLuggage,
          price: orderDetailGoodsObj.luggage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.luggage.price), overLuggage)
        },
        incarriage: {
          amount: incarriageValue,
          price: orderDetailGoodsObj.incarriage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.incarriage.price), incarriageValue)
        },
        waitingroom: {
          amount: waitingroomValue,
          price: orderDetailGoodsObj.waitingroom.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.waitingroom.price), waitingroomValue)
        },
      }
    }

    //获取新订单价格和数量
    function getAlterPriceAndAmount(orderDetail, oldOrderDetail, goodsObj, type) {

      //初始化值
      const orderDetailGoodsObj = {
        rider: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        smallLuggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        luggage: {total:0,free:0,amount: 0, price: 0, marketPrice: 0},
        incarriage: {amount: 0, price: 0, marketPrice: 0},
        waitingroom: {amount: 0, price: 0, marketPrice: 0},
      }

      if (orderDetail.length == 0) {
        return orderDetailGoodsObj
      }

      //=========================
      //整合旧订单数据
      const oldOrderDetailGoodsObj = {
        rider: 0,
        smallLuggage: 0,
        luggage: 0,
        incarriage: 0,
        waitingroom: 0,
      }
      oldOrderDetail.forEach((item)=> {
        if (item.goodsId == goodsObj.rider.id) {
          oldOrderDetailGoodsObj.rider = item.amount
        }
        if (item.goodsId == goodsObj.smallLuggage.id) {
          oldOrderDetailGoodsObj.smallLuggage = item.amount
        }
        if (item.goodsId == goodsObj.luggage.id) {
          oldOrderDetailGoodsObj.luggage = item.amount
        }
        if (item.goodsId == goodsObj.incarriage.id) {
          oldOrderDetailGoodsObj.incarriage = item.amount
        }
        if (item.goodsId == goodsObj.waitingroom.id) {
          oldOrderDetailGoodsObj.waitingroom = item.amount
        }
      })
      //========================
      //整合新订单数据
      orderDetail.forEach((item)=> {
        if (item.goodsId == goodsObj.rider.id) {
          orderDetailGoodsObj.rider = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.smallLuggage.id) {
          orderDetailGoodsObj.smallLuggage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.luggage.id) {
          orderDetailGoodsObj.luggage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.incarriage.id) {
          orderDetailGoodsObj.incarriage = {
            amount: item.amount,
            price: item.price
          }
        }
        if (item.goodsId == goodsObj.waitingroom.id) {
          orderDetailGoodsObj.waitingroom = {
            amount: item.amount,
            price: item.price
          }
        }
      })


      //==============
      //新增加的订单信息
      let carNumber, overPer, overLuggage, overSmallLuggage,freePer, freeLuggage, freeSmallLuggage
      const luggageNum = orderDetailGoodsObj.luggage.amount
      const smallLuggageNum = orderDetailGoodsObj.smallLuggage.amount
      const riderNum = orderDetailGoodsObj.rider.amount
      const incarriageValue = orderDetailGoodsObj.incarriage.amount
      const waitingroomValue = orderDetailGoodsObj.waitingroom.amount

      //=============
      //旧订单的订单信息
      let oldOverPer, oldOverLuggage
      const oldLuggageNum = oldOrderDetailGoodsObj.luggage
      const oldSmallLuggageNum = oldOrderDetailGoodsObj.smallLuggage
      const oldRiderNum = oldOrderDetailGoodsObj.rider
      const oldIncarriageValue = oldOrderDetailGoodsObj.incarriage
      const oldWaitingroomValue = oldOrderDetailGoodsObj.waitingroom

      //以行李为基准计算车的数量
      if ((luggageNum + oldLuggageNum + smallLuggageNum + oldSmallLuggageNum) <= maxLuggageAmount) {
        carNumber = 1;
      } else if ((luggageNum + oldLuggageNum + smallLuggageNum + oldSmallLuggageNum) > maxLuggageAmount) {
        carNumber = parseInt((luggageNum + oldLuggageNum + smallLuggageNum + oldSmallLuggageNum) / maxLuggageAmount) + parseInt((luggageNum + oldLuggageNum + smallLuggageNum + oldSmallLuggageNum) % maxLuggageAmount !== 0 ? 1 : 0)
      }
      //超出的行李
      //通过小件行李数量先计算出大件行李超出数量，再计算出小件行李的超出数量
      //通过旧数据计算出超出的行李数量的情况
      oldOverLuggage = oldSmallLuggageNum + oldLuggageNum - floatMul(carNumber, standardLuggageAmount)

      overSmallLuggage = smallLuggageNum + oldOverLuggage > 0 ? 0 : oldOverLuggage
      overLuggage = overSmallLuggage > 0 ? luggageNum : (luggageNum + overSmallLuggage)
      overLuggage = overLuggage > 0 ? overLuggage : 0
      overSmallLuggage = overSmallLuggage > 0 ? overSmallLuggage : 0

      //免费的行李
      freeSmallLuggage = smallLuggageNum - overSmallLuggage
      freeLuggage = luggageNum - overLuggage


      //超出的人数
      //先通过旧的人数算出超出情况
      oldOverPer = oldRiderNum - floatMul(carNumber, standardRiderAmount)

      if(type){
        overPer = riderNum + oldOverPer > 0 ? 0 : oldOverPer;
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
          price: orderDetailGoodsObj.rider.price ,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.rider.price), overPer)
        },
        smallLuggage: {
          total: smallLuggageNum,
          free: freeSmallLuggage,
          amount: overSmallLuggage,
          price: orderDetailGoodsObj.smallLuggage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.smallLuggage.price), overSmallLuggage)
        },
        luggage: {
          total: luggageNum,
          free: freeLuggage,
          amount: overLuggage,
          price: orderDetailGoodsObj.luggage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.luggage.price), overLuggage)
        },
        incarriage: {
          amount: incarriageValue,
          price: orderDetailGoodsObj.incarriage.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.incarriage.price), incarriageValue)
        },
        waitingroom: {
          amount: waitingroomValue,
          price: orderDetailGoodsObj.waitingroom.price,
          marketPrice: floatMul(parseFloat(orderDetailGoodsObj.waitingroom.price), waitingroomValue)
        },
      }
    }
  }
}

// actions
const actions = {
  [types.MANAGE__ORDER_DETAIL__GET_ORDER_DETAIL]({commit, rootState, state}, _this){

    if(getUrlData(_this, 'userId')){
      commit(types.TO__COMMON__CHANGE_USER_ID,getUrlData(_this, 'userId'))
    }

    if(getUrlData(_this, 'orderId')){
      commit(types.TO__ORDER_DETAIL__SAVE_ORDER_ID,getUrlData(_this, 'orderId'))
    }

    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      orderId:  state.orderId
    };
    //拿到订单的信息
    service.getTransferOrderDetail(data).then(
      (result)=> {
        if (result.data.success) {
          commit(types.MANAGE__ORDER_DETAIL__SAVE_ORDER_DETAIL, result.data.data)
          const data = {
            jwt: getUrlData(_this, 'jwt'),
            stationId: result.data.data.stationId,
            transferType: result.data.data.type,
            trainRunId: result.data.data.trainRunId ? result.data.data.trainRunId : ''
          };
          //拿到商品的信息
          service.getGoodsList(data).then(
            (result)=> {
              result.data.success && commit(types.MANAGE__ORDER_DETAIL__SAVE_GOODS_LIST, result.data.data)
              //拿到地点的价格信息
              service.getTransferPointList(data).then(
                (result)=> {
                  result.data.success && commit(types.MANAGE__ORDER_DETAIL__SAVE_POINT_LIST, result.data.data)
                },
                (err)=>console.log(err)
              )
            },
            (err)=>console.log(err)
          )
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__ORDER_DETAIL__TO_COMPLAIN]({commit, state}, _this){
    let {orderId, contact, mobile, serialNumber} = state.orderDetailData
    commit(types.TO__COMPLAIN__SAVE_COMPLAIN_DATA, {orderId, contact, mobile, serialNumber})
    _this.$router.push({path: '/complain'})
  },
  [types.MANAGE__ORDER_DETAIL__TO_MAP]({state,getters}){
    //if (!isRunByVersion(rootState.version, '2.0.3'))return
    if (!state.orderDetailData.orderId)return
    //经纬度
    const {longitude, latitude} = getters.manage_orderDetail_orderDetailMap
    //发送数据
    interactiveBridge('sendOrderId', 'receiveOrderId', {orderId:state.orderDetailData.orderId, longitude, latitude}, function () {})
  },
  [types.MANAGE__ORDER_DETAIL__CANCEL_ORDER]({dispatch, rootState, state}, _this){

    const order = state.orderDetailData
    let alertContent = "已取消订单不可恢复，确认取消订单？"

    if (order.type == "pickup" && order.status == "unexecute") {
      changeText(order.predictArriveTime);
    } else if (order.type == "take" && order.status == "unexecute") {
      takeText(order.predictArriveTime, order.departOrArriveDelay);
    }
    _this.$confirm(alertContent, '取消订单提示', {
      confirmButtonText: '取消订单',
      cancelButtonText: '关闭',
      type: 'warning'
    }).then(() => {
      const data = {
        jwt: getUrlData(_this, 'jwt'),
        userId: rootState.userId,
        orderId: order.orderId
      };
      service.cancel(data).then(
        (result)=> {
          result.data.success && dispatch(types.MANAGE__ORDER_DETAIL__GET_ORDER_DETAIL, _this)
        },
        (err)=>console.log(err)
      )
    }).catch(() => {
    });

    //接站取消订单的扣费标准
    function changeText(arriveTime) {
      let nowTime = new Date().getTime();
      let endTime = arriveTime - 2 * 60 * 60 * 1000;
      let laterTime = arriveTime - 30 * 60 * 1000;
      if (nowTime <= endTime) {
        alertContent = "已取消订单不可恢复，确认取消订单？";
      } else if (nowTime > endTime && nowTime < laterTime) {
        alertContent = "服务即将开始，提前30分钟-2小时取消订单，将会收取总费用50%的手续费，剩余费用沿原支付途径返回。确认取消订单？";
      } else if (nowTime >= laterTime) {
        alertContent = "服务即将开始，提前0-30分钟取消订单，将会收取总费用100%的手续费，剩余费用沿原支付途径返回。确认取消订单？"
      }
    }

    function takeText(arriveTime, delay) {
      let nowTime = new Date().getTime();
      let endTime = arriveTime - 2 * 60 * 60 * 1000;
      let laterTime = arriveTime - 30 * 60 * 1000;
      if (nowTime <= endTime) {
        alertContent = "已取消订单不可恢复，确认取消订单？";
      } else if (nowTime > endTime && nowTime <= arriveTime) {
        if ((delay > 0 && delay <= 30) || delay == -1 || delay == 0) {
          if (nowTime > endTime && nowTime < laterTime) {
            alertContent = "服务即将开始，提前30分钟-2小时取消订单，将会收取总费用50%的手续费，剩余费用沿原支付途径返回。确认取消订单？";
          } else if (nowTime >= laterTime) {
            alertContent = "服务即将开始，提前0-30分钟取消订单，将会收取总费用100%的手续费，剩余费用沿原支付途径返回。确认取消订单？"
          }
        } else if (delay > 0 && delay > 30) {
          alertContent = "已取消订单不可恢复，确认取消订单？";
        }
      }
    }
  },
  [types.MANAGE__ORDER_DETAIL__DELETE_ORDER]({rootState, state}, _this){

    _this.$confirm("已删除订单不可恢复，确认删除订单？", '删除订单提示', {
      confirmButtonText: '删除订单',
      cancelButtonText: '关闭',
      type: 'warning'
    }).then(() => {
      const data = {
        jwt: getUrlData(_this, 'jwt'),
        userId: rootState.userId,
        transferOrderId: state.orderDetailData.id
      };
      service.deleteTransferOrder(data).then(
        (result)=> {
          if (result.data.success) {
            if(getUrlData(_this, 'flag')){
              window.location.href = 'winsion://orderList'
            }else {
              _this.$router.go(-1)
            }
            //发送数据
            interactiveBridge('sendCloseState', 'receiveCloseState', {}, function () {})
          } else if (result.data.code == 401) {
            document.title = "401";
          }
        },
        (err)=>console.log(err)
      )
    }).catch(() => {
    });
  },
  [types.MANAGE__ORDER_DETAIL__UPDATE_ORDER]({dispatch, rootState}, _this){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      transferOrderId: state.orderDetailData.id
    };
    service.updateOrderExecuteStatus(data).then(
      (result)=> {
        if (result.data.success) {
          dispatch(types.MANAGE__ORDER_DETAIL__GET_ORDER_DETAIL, _this)
        } else if (result.data.code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__ORDER_DETAIL__COMPLETE_ORDER]({dispatch, rootState, state}, _this){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      orderId: state.orderDetailData.orderId
    };
    service.completeTransferOrder(data).then(
      (result)=> {
        if (result.data.success) {
          dispatch(types.MANAGE__ORDER_DETAIL__GET_ORDER_DETAIL, _this)
        } else if (result.data.code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  }
}

// mutations
const mutations = {
  [types.TO__ORDER_DETAIL__SAVE_ORDER_ID](state, orderId){
    state.orderId = orderId
    state.pointList = []
    state.orderDetailData = {}
    state.goodsList = []
  },
  [types.MANAGE__ORDER_DETAIL__SAVE_ORDER_DETAIL](state, data){
    state.orderDetailData = data
  },
  [types.MANAGE__ORDER_DETAIL__SAVE_GOODS_LIST](state, goodsList){
    state.goodsList = goodsList
  },
  [types.MANAGE__ORDER_DETAIL__SAVE_POINT_LIST](state, pointList){
    state.pointList = pointList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

