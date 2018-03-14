import interactiveBridge, {getUrlData} from '../../../api'
import service from '../../../service'
import * as types from '../../mutation-types'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  [types.MENU__USER_AGREEMENT__BOOK] ({rootState}, _this) {
    const userId = rootState.userId
    service.updateUserAgreeTransferService({userId}).then(
      (result) => {
        result.data.success && _this.$router.replace('/selectFunction')
      },
      (err) => console.log(err)
    )
  },
  [types.MENU__SELECT_FUNCTION__GET_VERSION] ({commit}, {sendName, receiveName}) {
    interactiveBridge(sendName, receiveName, {}, function (version) {
      commit(types.MENU__SELECT_FUNCTION__SAVE_VERSION, version)
    })
  },
  [types.MENU__SELECT_FUNCTION__CREATE_ORDER]({commit, rootState}, {type, _this}){
    const jwt = getUrlData(_this, 'jwt')
    const userId = rootState.userId
    service.getNoPayOrder({jwt, userId}).then(
      (result)=> {
        const {success, data, code, message} = result.data;
        if (success && data == "") {
          commit(types.MENU__SELECT_FUNCTION__SAVE_TRANSFER_TYPE, type);
          _this.$router.push({path: '/chooseTrain'});
        } else if (code == 305 || code == 306) {
          _this.$alert(message, {
            confirmButtonText: '确定',
            callback: action => {}
          });
        } else if (code == 307) {
          _this.$confirm('亲爱的用户：您有一个订单正在待支付状态，请先支付或取消订单，才能创建新订单。', '有订单待支付提示', {
            confirmButtonText: '去支付',
            cancelButtonText: '关闭',
            type: 'warning'
          }).then(() => {
            commit(types.TO__ORDER_DETAIL__SAVE_ORDER_ID, message)
            _this.$router.push('/orderDetail');
          }).catch(() => {
          });
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
