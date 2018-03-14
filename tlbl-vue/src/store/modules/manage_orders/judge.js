import service from '../../../service'
import * as types from '../../mutation-types'
import { getUrlData ,getLocalStorage} from '../../../api'

// initial state
let state = {
  orderId: '',
  judgeData: [],
  placeholderData: []
}

state = getLocalStorage(state,'judge')

// getters
const getters = {
  manage_judge_placeholderData: (state)=>state.placeholderData,
}

// actions
const actions = {
  [types.MANAGE__JUDGE__GET_STAFF_LIST]({commit, state, rootState},_this){
    const data = {
      jwt: getUrlData(_this,'jwt'),
      userId: getUrlData(_this, 'userId') ? getUrlData(_this, 'userId') : rootState.userId,
      orderId: getUrlData(_this, 'orderId') ? getUrlData(_this, 'orderId') : state.orderId
    };
    service.getTransferStaffList(data).then(
      (result)=> {
        result.data.success && commit(types.MANAGE__JUDGE__SAVE_STAFF_LIST, result.data.data)
      },
      (err)=>console.log(err)
    )
  },
  [types.MANAGE__JUDGE__SUBMIT]({state}, _this){
    const data = {
      jwt: getUrlData(_this,'jwt'),
      orderId: state.orderId,
      rateJson: JSON.stringify(state.judgeData)
    }
    service.commitTransferOrderRate(data).then(
      (result)=> {
        if (result.data.success) {
          _this.$alert('亲爱的用户：非常感谢您对接送小哥的评价！', '温馨提示', {
            confirmButtonText: '关闭',
            callback: action => {
              _this.$router.go(-1)
            }
          });
        } else if (result.data.code == 401) {
          document.title = "401";
        } else if (result.data.code == 600) {
          _this.$alert('亲爱的用户：请勿重复提交评价！', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
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
  [types.MANAGE__ORDER_LIST__TO_JUDGE_ORDER_ID](state, orderId){
    state.orderId = orderId
  },
  [types.MANAGE__JUDGE__SAVE_STAFF_LIST](state, data){
    console.log(data);
    state.placeholderData = data.map((item)=> {
      let tip = `我是接送小哥 ${item.name}:请为我的服务评价`
      return {staffId: item.staffId, tip}
    })
    state.judgeData = data.map((item)=> {
      return {staffId: item.staffId, content: '', starLevel: 0, tagName: ''}
    })
  },
  [types.MANAGE__JUDGE__UPDATE_RATE_CONTENT](state, {staffId, content}){
    state.judgeData = state.judgeData.map((item)=> {
      if (item.staffId == staffId) {
        return {...item, content}
      }
      return {...item}
    })
  },
  [types.MANAGE__JUDGE__UPDATE_STAR_LEVEL](state, {staffId, starLevel}){
    state.judgeData = state.judgeData.map((item)=> {
      if (item.staffId == staffId) {
        return {...item, starLevel, tagName: ''}
      }
      return {...item}
    })
  },
  [types.MANAGE__JUDGE__ADD_TAG_NAMEL](state, {staffId, tagItem}){
    state.judgeData = state.judgeData.map((item)=> {
      if (item.staffId == staffId) {
        let tagName = `${item.tagName},${tagItem}`
        tagName = tagName.replace(/^,+/, "").replace(/,+$/, "")
        return {...item, tagName}
      }
      return {...item}
    })
  },
  [types.MANAGE__JUDGE__DELETE_TAG_NAME](state, {staffId, tagItem}){
    state.judgeData = state.judgeData.map((item)=> {
      if (item.staffId == staffId) {
        let tagName = item.tagName
        tagName = tagName.search(`,${tagItem}`) != -1 ? tagName.replace(`,${tagItem}`, '') : (tagName.search(`${tagItem},`) != -1 ? tagName.replace(`${tagItem},`, '') : tagName.replace(`${tagItem}`, ''))
        return {...item, tagName}
      }
      return {...item}
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

