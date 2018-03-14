import Vue from 'vue'
import Vuex from 'vuex'

//common
import common from './common'
//menu
import menu from './modules/menu/menu'
//placeOrders
import chooseTrain from './modules/place_orders/chooseTrain'
import searchTrain from './modules/place_orders/searchTrain'
import trainList from './modules/place_orders/trainList'
import newOrderPrice from './modules/place_orders/new_order/newOrderPrice'
import newOrderTrain from './modules/place_orders/new_order/newOrderTrain'
import newOrderInfo from './modules/place_orders/new_order/newOrderInfo'
import waitCheck from './modules/place_orders/waitCheck'
import waitAcceptance from './modules/place_orders/waitAcceptance'
//manageOrders
import complain from './modules/manage_orders/complain'
import complaintList from './modules/manage_orders/complaintList'
import orderList from './modules/manage_orders/orderList'
import orderDetail from './modules/manage_orders/orderDetail'
import judge from './modules/manage_orders/judge'
import judgeDetail from './modules/manage_orders/judgeDetail'


Vue.use(Vuex)

export default new Vuex.Store({
  ...common,
  modules: {
//menu
    menu,
//placeOrders
    chooseTrain,
    searchTrain,
    trainList,
    newOrderTrain,
    newOrderInfo,
    newOrderPrice,
    waitCheck,
    waitAcceptance,
//manageOrders
    complain,
    complaintList,
    orderList,
    orderDetail,
    judge,
    judgeDetail
  }
})
