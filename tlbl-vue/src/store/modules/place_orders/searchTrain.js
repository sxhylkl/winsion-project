import * as types from '../../mutation-types'
import interactiveBridge, {getUrlData} from '../../../api'
import service from '../../../service'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  [types.PLACE__SEARCH_TRAIN__SWEEP_TICKET]({commit, rootState}, _this){
    interactiveBridge('sendQRCode', 'receiveQRCode', {}, function (code) {
      //发起请求
      service.getCodeResolveResult({code: code, type: rootState.transferType}).then(
        (result)=> {
          const {success, data, code, message} = result.data;
          if (success) {
            const newOrderTrainData = {
              stationName: data.stationName,
              trainNumber: data.trainNumber,
              departDate: data.dateString,
              trainRunId: data.trainRunId,
              stationId: data.stationId,
              contact: '',
              mobile: '',
              carriage: data.carriage,
              end: '',
              location: '',
              arriveTime: '',
              precious: '0',
              remark: ''
            };
            commit(types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA, newOrderTrainData)
            _this.$router.push({path: '/newOrder'});
          } else if (code == 305) {
            _this.$alert(message, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else if (code == 306) {
            _this.$alert(message, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else if (code == 307 || code == 309) {
            _this.$alert(message, '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          } else if (code == 308) {
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
    });
  },
  [types.PLACE__SEARCH_TRAIN__SEARCH_TRAIN]({commit, rootState}, {trainNumber, dateValue, stationId, _this}){
    //提示信息
    if (trainNumber == '') {
      _this.$alert('车次不能为空!', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }
    if (dateValue == '') {
      _this.$alert('日期不能为空!', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }
    if (stationId == '') {
      _this.$alert('车站不能为空!', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    }
    //获取车次
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      trainNumber:trainNumber.replace(/\s+/g, ""),
      stationId,
      transferType: rootState.transferType,
      runDate: new Date(dateValue).getTime()
    };
    service.searchTrainMsgByStationAndTrainNumber(data).then(
      (result)=> {
        const {success, data, code} = result.data;
        if (success) {
          if (!data.length) {
            _this.$alert('查询不到当前的车次信息!', '温馨提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return false;
          } else {
            commit(types.PLACE__SEARCH_TRAIN__SAVE_TRAIN_LIST, data)
            _this.$router.push({path: '/trainList'});
          }
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err)=>console.log(err)
    )
  }
}

// mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}

