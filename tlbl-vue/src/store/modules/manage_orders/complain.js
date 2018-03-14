import service from '../../../service'
import {URL} from '../../../service'
import * as types from '../../mutation-types'
import { getLocalStorage ,setLocalStorage } from '../../../api'

// initial state
let state = {
  complainData: {}
}

state = getLocalStorage(state,'complain')

// getters
const getters = {

}

// actions
const actions = {
  [types.MANAGE__COMPLAIN__SUBMIT_COMPLAIN]({state}, {content,complainData,_this}){
    const {orderId,userId} = state.complainData
    const {mobile,contact}  = complainData
    service.addOrderComplaint({orderId,mobile,contact,content}).then(
      (result)=> {
        if (result.data.success) {
          _this.$alert('亲爱的用户，您好，您的投诉已提交成功，我们将会致电与您取得联系，请保持投诉电话的畅通，非常感谢！', '温馨提示', {
            confirmButtonText: '关闭',
            callback: action => {
              if (!userId) {
                _this.$router.push({path: '/orderList'})
              } else {
                setLocalStorage(_this)
                window.history.go(-2)
              }
            }
          });
        }
      },
      (err)=>console.log(err)
    )

  }
}

// mutations
const mutations = {
  [types.TO__COMPLAIN__SAVE_COMPLAIN_DATA](state, data){
    state.complainData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

