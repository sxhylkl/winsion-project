import service from '../../../service'
import * as types from '../../mutation-types'
import {getUrlData, getLocalStorage} from '../../../api'

// initial state
let state = {
  orderStatus: 'all',
  orderList: []
}

state = getLocalStorage(state, 'orderList')

// getters
const getters = {
  manage_orderList: state=> {
    return state.orderList.map((item)=> {
      const showEvaluate = item.staffExecuteDtoList.length != 0
      const showBtn = item.status == "unexecute" && item.type == "pickup" && (new Date().getTime()) > (item.predictArriveTime - 2 * 60 * 60 * 1000);
      const marketPriceAmount = item.status == 'modifyunpay' ? ((item.marketPriceAmount - item.paidPriceAmount).toFixed(2)) : item.marketPriceAmount
      if (item.status == 'unpay' && item.deadline <= new Date().getTime()) {
        item.status = 'payfailedcancel'
      }
      return {...item, showEvaluate, showBtn, marketPriceAmount}
    })
  }
}

// actions
const actions = {
  [types.MANAGE__ORDER_LIST__GET_ORDER_LIST]({commit, state, rootState}, _this){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      orderStatus: state.orderStatus,
      pageIndex: 0,
      pageSize: 10
    }
    service.getTransferOrderList(data).then(
      (result)=> {
        const {success, data, code} = result.data
        if (success) {
          commit(types.MANAGE__ORDER_LIST__SAVE_ORDER_LIST, data)
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__ORDER_LIST__CANCEL_ORDER]({dispatch, rootState}, {order, _this}){

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
          result.data.success && dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST, _this)
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
        alertContent = "服务即将开始，提前30分钟-2小时取消订单，将会收取总费用20%的手续费，剩余费用沿原支付途径返回。确认取消订单？";
      } else if (nowTime >= laterTime) {
        alertContent = "服务即将开始，提前0-30分钟取消订单，将会收取总费用30%的手续费，剩余费用沿原支付途径返回。确认取消订单？"
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
            alertContent = "服务即将开始，提前30分钟-2小时取消订单，将会收取总费用20%的手续费，剩余费用沿原支付途径返回。确认取消订单？";
          } else if (nowTime >= laterTime) {
            alertContent = "服务即将开始，提前0-30分钟取消订单，将会收取总费用30%的手续费，剩余费用沿原支付途径返回。确认取消订单？"
          }
        } else if (delay > 0 && delay > 30) {
          alertContent = "已取消订单不可恢复，确认取消订单？";
        }
      }
    }
  },
  [types.MANAGE__ORDER_LIST__DELETE_ORDER]({dispatch, rootState}, {id, _this}){

    _this.$confirm("已删除订单不可恢复，确认删除订单？", '删除订单提示', {
      confirmButtonText: '删除订单',
      cancelButtonText: '关闭',
      type: 'warning'
    }).then(() => {
      const data = {
        jwt: getUrlData(_this, 'jwt'),
        userId: rootState.userId,
        transferOrderId: id
      };
      service.deleteTransferOrder(data).then(
        (result)=> {
          const {success, code} = result.data
          if (success) {
            dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST, _this)
          } else if (code == 401) {
            document.title = "401";
          }
        },
        (err)=>console.log(err)
      )
    }).catch(() => {
    });
  },
  [types.MANAGE__ORDER_LIST__UPDATE_ORDER]({dispatch, rootState}, {id, _this}){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      transferOrderId: id
    };
    service.updateOrderExecuteStatus(data).then(
      (result)=> {
        if (result.data.success) {
          dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST, _this)
        } else if (result.data.code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__ORDER_LIST__COMPLETE_ORDER]({dispatch, rootState}, {orderId, _this}){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      orderId: orderId
    };
    service.completeTransferOrder(data).then(
      (result)=> {
        if (result.data.success) {
          dispatch(types.MANAGE__ORDER_LIST__GET_ORDER_LIST)
        } else if (result.data.code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__ORDER_LIST__TO_JUDGE]({commit}, {orderId, _this}){
    commit(types.MANAGE__ORDER_LIST__TO_JUDGE_ORDER_ID, orderId)
    _this.$router.push({path: '/judge'})
  },
  [types.MANAGE__ORDER_LIST__JUDGE_DETAIL]({commit}, {orderId, _this}){
    commit(types.MANAGE__ORDER_LIST__JUDGE_DETAIL_ORDER_ID, orderId)
    _this.$router.push({path: '/judgeDetail'})
  },
  [types.MANAGE__ORDER_LIST__ORDER_DETAIL]({commit}, {orderId, _this}){
    commit(types.TO__ORDER_DETAIL__SAVE_ORDER_ID, orderId)
    _this.$router.push({path: '/orderDetail'})
  }
}

// mutations
const mutations = {
  [types.MANAGE__ORDER_LIST__SAVE_ORDER_LIST](state, orderList){
    state.orderList = orderList
  },
  [types.MANAGE__ORDER_LIST__SET_ORDER_TYPE](state, orderStatus){
    state.orderStatus = orderStatus
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
