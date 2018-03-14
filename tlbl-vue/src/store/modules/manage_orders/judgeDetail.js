import service from '../../../service'
import * as types from '../../mutation-types'
import { getUrlData,getLocalStorage } from '../../../api'


// initial state
let state = {
  orderId: '',
  judgeDetailData: [],
  rateItems: {
    badItems: [
      "服务态度差",
      "迟到",
      "联系不畅",
      "没有送上车",
      "搬运粗暴"
    ],
    goodItems: [
      "态度好",
      "准时",
      "细心周到",
      "服务专业",
      "轻拿轻放",
      "风雨无阻"
    ]
  }
}

state = getLocalStorage(state,'judgeDetail')

// getters
const getters = {
  manage_judgeDetail_judgeDetailData: (state)=> {
    const rateItems = {...state.rateItems}
    return state.judgeDetailData.map((item)=> {
      let rateArr = item.starLevel > 2 ? rateItems.goodItems : rateItems.badItems
      let tagName = rateArr.map((rate)=> {
        if (item.tagName.match(rate)) {
          return {rate, show: true}
        }
        return {rate, show: false}
      })
      return {...item, tagName}
    })
  }
}

// actions
const actions = {
  [types.MANAGE__JUDGE_DETAIL__GET_RATE_DETAIL]({commit, state, rootState},_this){
    const data = {
      jwt: getUrlData(_this,'jwt'),
      orderId: state.orderId,
      userId: rootState.userId
    }
    service.getTransferOrderRateDetail(data).then(
      (result)=> {
        if (result.data.success) {
          commit(types.MANAGE__JUDGE_DETAIL__SAVE_RATE_DETAIL, result.data.data)
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
  [types.MANAGE__ORDER_LIST__JUDGE_DETAIL_ORDER_ID](state, orderId){
    state.orderId = orderId
  },
  [types.MANAGE__JUDGE_DETAIL__SAVE_RATE_DETAIL](state, data){
    state.judgeDetailData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

