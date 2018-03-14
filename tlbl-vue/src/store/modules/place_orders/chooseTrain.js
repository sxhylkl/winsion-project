import service from '../../../service'
import * as types from '../../mutation-types'
import {getUrlData,getLocalStorage} from '../../../api'

// initial state
let state = {
  allTrainData: []
}

state = getLocalStorage(state,'chooseTrain')

// getters
const getters = {
  place_chooseTrain_allTrainData: (state,getters,rootState)=> {
    return state.allTrainData.map((item)=> {
      const _item = {}
      //runDateStatus值
      _item.runDateStatus = item.runDate == 0 ? '' : `+${item.runDate}`
      //stationId值
      _item.stationId = rootState.transferType == "pickup" ? item.departStationId : item.arriveStationId
      //displayStatus,statusClass的值
      if (item.status == "waiting") {
        _item.displayStatus = "正在候车";
        _item.statusClass = "already-arrive";
      } else if (item.status == "check") {
        _item.displayStatus = "正在检票";
        _item.statusClass = "check-ticket";
      } else if (item.status == "arrive") {
        _item.displayStatus = "已到站";
        _item.statusClass = "already-arrive";
      } else if (item.status == "stopcheck") {
        _item.displayStatus = "停止检票";
        _item.statusClass = "stop-check";
      } else if (item.status == "depart") {
        _item.displayStatus = "已出发";
        _item.statusClass = "already-arrive";
      } else if (item.status == "offline") {
        _item.displayStatus = "停运";
        _item.statusClass = "stop-check";
      }
      //displayDelay,delayClass的值
      if (item.delay == 0) {
        _item.displayDelay = "正点";
        _item.delayClass = "depart-time";
      } else if (item.delay == -1) {
        _item.displayDelay = "晚点未定";
        _item.delayClass = "depart-time-delay";
      } else {
        _item.displayDelay = "晚点";
        _item.delayClass = "depart-time-delay";
      }
      return {...item, ..._item}
    })
  }
}

// actions
const actions = {
  [types.PLACE__CHOOSE_TRAIN__GET_ALL_TRAIN]({commit, rootState},_this){
    const data = {
      jwt: getUrlData(_this,'jwt'),
      userId: rootState.userId,
      transferType: rootState.transferType,
      pageIndex: 0,
      pageSize: 10
    }
    service.getAllTrainMessage(data).then(
      (result)=> {
        const {success, data, code} = result.data;
        if (success) {
          commit(types.PLACE__CHOOSE_TRAIN__SAVE_ALL_TRAIN, data)
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  },
  [types.PLACE__CHOOSE_TRAIN__SELECT_TRAIN]({commit, rootState}, {trainData, _this}){
    const transferType = rootState.transferType
    const data = {
      jwt: getUrlData(_this,'jwt'),
      stationId: trainData.stationId,
      trainRunId: trainData.trainRunId,
      transferType
    };
    service.isAccordTransferOrderRequest(data).then(
      (result)=> {
        const {success, code, message} = result.data
        if (success) {
          const newOrderTrainData = {
            trainRunId: trainData.trainRunId,
            stationId: trainData.stationId,
            stationName: transferType == "take" ? trainData.arriveStation : trainData.departStation,
            departDate: transferType == "take" ? trainData.arriveDateTime : trainData.departDateTime ,
            trainNumber: trainData.trainNumber,
            contact: '',
            mobile: '',
            carriage: '',
            end: '',
            location: '',
            arriveTime: '',
            precious: '0',
            remark: ''
          }
          commit(types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA, newOrderTrainData)
          _this.$router.push({path: '/newOrder'});
        } else if (code == 305 || code == 306) {
          _this.$alert(message, {
            confirmButtonText: '确定',
            callback: action => {}
          });
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    );
  },
}

// mutations
const mutations = {
  [types.PLACE__CHOOSE_TRAIN__SAVE_ALL_TRAIN](state, allTrainMessage){
    state.allTrainData = allTrainMessage
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

