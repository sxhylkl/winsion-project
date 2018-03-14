import service from '../../../service'
import * as types from '../../mutation-types'
import { getLocalStorage } from '../../../api'

// initial state
let state = {
  userId:'',
  complainList: []
}

state = getLocalStorage(state,'complaintList')

// getters
const getters = {
  manage_complainList_list: state=> {
    const complainList = []
    state.complainList.forEach((item)=> {
      if (item.effective == 'pend') {
        complainList.push({...item, remain: '订单待处理'})
      } else if (item.effective == 'cancel') {
        complainList.push({...item, remain: '订单已取消'})
      } else if (item.effective == 'receive') {
        complainList.push({...item, remain: '订单已接单'})
      } else if (item.effective == 'completed') {
        complainList.push({...item, remain: '订单已完成'})
      } else if (item.effective == 'suspend') {
        complainList.push({...item, remain: '订单已中止'})
      }
    })
    return complainList
  }
}

// actions
const actions = {
  [types.MANAGE__COMPLAIN_LIST__GET_COMPLAIN_LIST]({commit}, _this){
    const userId = _this.$route.query.userId
    commit(types.MANAGE__COMPLAIN_LIST__SAVE_USER_ID, userId)
    service.getComplaintOrderList({userId}).then(
      (result)=> {
        if (result.data.success) {
          if (result.data.data.length == 0) {
            _this.$alert('暂无订单', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else {
            commit(types.MANAGE__COMPLAIN_LIST__SAVE_COMPLAIN_LIST, result.data.data)
          }
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__COMPLAIN_LIST__SAVE_COMPLAIN_DATA]({state, commit}, {index, _this}){
    const {orderId, contact, mobile, serialNumber} = state.complainList[index]
    commit(types.TO__COMPLAIN__SAVE_COMPLAIN_DATA, {orderId, contact, mobile, serialNumber, userId:state.userId})
    _this.$router.push({path: '/complain'})
  }
}

// mutations
const mutations = {
  [types.MANAGE__COMPLAIN_LIST__SAVE_COMPLAIN_LIST](state, list){
    state.complainList = list
  },
  [types.MANAGE__COMPLAIN_LIST__SAVE_USER_ID](state, userId){
    state.userId = userId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


