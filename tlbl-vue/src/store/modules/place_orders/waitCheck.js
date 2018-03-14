import service from '../../../service'
import * as types from '../../mutation-types'
import {getLocalStorage, getUrlData} from '../../../api'
// initial state
let state = {
  waitCheckData: {}
}

state = getLocalStorage(state,'waitCheck')


// getters
const getters = {

}

// actions
const actions = {
  [types.PLACE__WAIT_CHECK__SUBMIT_ORDER]({commit, state, rootState, getters}, _this){
    const newOrderTrainData = rootState.newOrderTrain.newOrderTrainData
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      userId: rootState.userId,
      trainRunId: newOrderTrainData.trainRunId,
      stationId: newOrderTrainData.stationId,
      contact: newOrderTrainData.contact,
      mobile: newOrderTrainData.mobile,
      carriage: newOrderTrainData.carriage,
      remark: newOrderTrainData.remark,
      type: rootState.transferType,
      transferPointId: getters.place_newOrderPrice_getLocationData.id,
      predictArriveTime: rootState.transferType == 'take' ? newOrderTrainData.departDate : newOrderTrainData.arriveTime,
      orderDetailJson: JSON.stringify(state.waitCheckData)
    };
    service.commitTransferOrder(data).then(
      (result)=> {
        const {success, data, code, message} = result.data;
        if (success) {
          const order = {
            orderNumber: data,
            stationName: newOrderTrainData.stationName,
            totalPrice: getters.place_newOrderPrice_newOrderTotalPrice.marketTotal
          };
          commit(types.PLACE__WAIT_CHECK__SAVE_WAIT_ACCEPTANCE_DATA, order)
          _this.$router.push({path:'/waitAcceptance'})
        } else if (code == 305 || code == 306) {
          _this.$alert(message, '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        } else if (code == 307) {
          _this.$confirm('亲爱的用户：您有一个订单正在待支付状态，请先支付或取消订单，才能创建新订单。', '有订单待支付提示', {
            confirmButtonText: '去支付',
            cancelButtonText: '关闭',
            type: 'warning'
          }).then(() => {
            commit(types.TO__ORDER_DETAIL__SAVE_ORDER_ID, message)
            _this.$router.push({path:'/orderDetail'});
          }).catch(() => {});
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  }
}

// mutations
const mutations = {
  [types.PLACE__NEW_ORDER_PRICE__SAVE_WAIT_CHECK_DATA](state, waitCheckData){
    state.waitCheckData = waitCheckData
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

