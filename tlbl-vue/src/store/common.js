import * as types from './mutation-types'
import { getCookie } from '../api'


// initial state
let state = {
  version: '1.0',
  userId:getCookie('userId'),
  transferType: ''
}

//update state
const localStateData = window.localStorage.getItem('_TIE_LU_BAN_LV_')

if(localStateData){
  const data = JSON.parse(localStateData)
  if(data.state.userId==state.userId){
    state = {
      version: data.state.version,
      userId: data.state.userId,
      transferType: data.state.transferType
    }
  }
}




// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  [types.TO__COMMON__CHANGE_USER_ID](state, userId){
    state.userId = userId
  },
  [types.MENU__SELECT_FUNCTION__SAVE_VERSION](state, version){
    state.version = version
  },
  [types.MENU__SELECT_FUNCTION__SAVE_TRANSFER_TYPE](state, type){
    state.transferType = type
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


