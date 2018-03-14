import service from '../../../../service'
import * as types from '../../../mutation-types'
import {getLocalStorage} from '../../../../api'
// initial state
let state = {
  userInfo: [],
  user: {id: '', contact: '', mobile: ''}
}

getLocalStorage(state, 'newOrderInfo')

// getters
const getters = {
  place_newOrderInfo_userInfo: state=> {
    let user = state.user
    return state.userInfo.map((item)=> {
      if (user.id == item.id) {
        return {...item, show: true}
      }
      return {...item, show: false}
    })
  }
}

// actions
const actions = {
  [types.PLACE__NEW_ORDER_INFO__GET_CONTACT_INFO]({commit, rootState}){
    service.getRecentContacts({userId: rootState.userId}).then(
      (result)=> {
        const {success, data} = result.data
        if (success) {
          commit(types.PLACE__NEW_ORDER_INFO__SAVE_CONTACT_INFO, data)
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.PLACE__NEW_ORDER_INFO__UPDATE_NEW_ORDER_TRAIN]({commit, state}, _this){
    const {contact, mobile} = state.user
    commit(types.PLACE__NEW_ORDER_INFO__UPDATE_NEW_ORDER_TRAIN, {contact, mobile})
    _this.$router.push({path: '/newOrder/train'});
  },
  [types.PLACE__NEW_ORDER_INFO__DELETE_CONTACT_INFO]({state, commit, dispatch}, {user, _this}){
    _this.$confirm('此操作将永久删除该联系人, 是否继续?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      service.deleteRecentContacts({contactId: user.id}).then(
        (result)=> {
          if (result.data.success) {
            if (user.id == state.user.id) {
              commit(types.PLACE__NEW_ORDER_INFO__UPDATE_CONTACT_INFO, {id: '', contact: '', mobile: ''})
            }
            dispatch(types.PLACE__NEW_ORDER_INFO__GET_CONTACT_INFO)
          }
        },
        (err)=>console.log(err)
      )
    }).catch(() => {
    });
  }
}

// mutations
const mutations = {
  [types.PLACE__NEW_ORDER_INFO__SAVE_CONTACT_INFO](state, userInfo){
    state.userInfo = userInfo
  },
  [types.PLACE__NEW_ORDER_INFO__UPDATE_CONTACT_INFO](state, user){
    const {id, contact, mobile} = user
    state.user = {id, contact, mobile}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

