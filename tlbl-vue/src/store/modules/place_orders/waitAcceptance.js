import * as types from '../../mutation-types'
import {getLocalStorage} from '../../../api'

// initial state
let state = {
  waitAcceptanceData:{}
}

state = getLocalStorage(state,'waitAcceptance')

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
  [types.PLACE__WAIT_CHECK__SAVE_WAIT_ACCEPTANCE_DATA](state,order){
    state.waitAcceptanceData = order
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
