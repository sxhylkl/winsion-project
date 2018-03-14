import * as types from '../../mutation-types'
import service from '../../../service'
import {handleGetTime, getUrlData,getLocalStorage} from '../../../api'

// initial state
let state = {
  trainList: []
}

state = getLocalStorage(state,'trainList')

// getters
const getters = {}

// actions
const actions = {
  [types.PLACE__TRAIN_LIST__SELECT_TRAIN]({commit, rootState}, {train, _this}){
    //判断出发时间是否符合要求
    const trainDate = handleGetTime(train.departTime, 'time').split(':')
    const trainDateHour = parseInt(trainDate[0])
    const trainDateMin = parseInt(trainDate[1])
    //判断车站
    const stationId = train.stationId

    //北京西
    if (stationId=='1de76e8dac3c4ec5af2cdd06f2a5977b'&&(trainDateHour < 6 || trainDateHour > 23 || (trainDateHour == 6 && trainDateMin < 20))) {
      _this.$alert('非常抱歉，工作人员服务时间为\n(06:20-23:00)，感谢您的支持。', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }
    //郑州
    if (stationId=='5c41d92d20724a97b56afe7f434f876b'&&(trainDateHour < 10 || trainDateHour > 21 || (trainDateHour == 20 && trainDateMin > 40))) {
      _this.$alert('非常抱歉，工作人员服务时间为\n(10:00-20:40)，感谢您的支持。', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }
    //呼和浩特和呼和浩特东
    if ((stationId=='fa6300b05d09447aba2f4a998b0577c5'||stationId=='3f9a4bee66aa467587506a3c33c39b0c')&&(trainDateHour < 7 || trainDateHour > 23 )) {
      _this.$alert('非常抱歉，工作人员服务时间为\n(7:00-23:00)，感谢您的支持。', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }

    const trainRunId = train.trainRunId
    const transferType = rootState.transferType
    const jwt = getUrlData(_this,'jwt')

    service.isAccordTransferOrderRequest({jwt, stationId, trainRunId, transferType}).then(
      (result)=> {
        let {success, code, message} = result.data;
        if (success) {
          const newOrderTrainData = {
            stationName: train.stationName,
            trainNumber: train.trainNumber,
            departDate: transferType == 'take' ? train.arriveTime : train.departTime,
            trainRunId,
            stationId,
            contact: '',
            mobile: '',
            carriage: '',
            end: '',
            location: '',
            arriveTime: '',
            precious: '0',
            remark: ''
          };
          commit(types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA, newOrderTrainData);
          _this.$router.push({path: '/newOrder'});
        } else if (code == 305 || code == 306) {
          _this.$alert(message, '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
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
const mutations = {
  [types.PLACE__SEARCH_TRAIN__SAVE_TRAIN_LIST](state, trainList){
    state.trainList = trainList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

