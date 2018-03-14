import service from '../../../../service'
import * as types from '../../../mutation-types'
import {handleGetTime, getUrlData, getTime, getLocalStorage} from '../../../../api'
// initial state
let state = {
  newOrderTrainData: {},
  locationList: [],
  //站台和时间列表
  locationData: [],
  arriveTimeData: []
}

state = getLocalStorage(state, 'newOrderTrain')
// getters
const getters = {
  place_newOrderTrain_endData: state => state.locationList.filter((item) => item.parentId == ''),
  place_newOrderTrain_locationData: state => state.locationData,
  place_newOrderTrain_arriveTimeData: state => state.arriveTimeData
}

// actions
const actions = {
  [types.PLACE__NEW_ORDER_TRAIN__GET_LOCATION_LIST]({commit, state, rootState}, _this){
    const data = {
      jwt: getUrlData(_this, 'jwt'),
      stationId: state.newOrderTrainData.stationId,
      transferType: rootState.transferType
    }

    service.getTransferPointList(data).then(
      (result) => {
        const {success, data, code} = result.data;
        if (success) {
          commit(types.PLACE__NEW_ORDER_TRAIN__SAVE_LOCATION_LIST, data)
        } else if (code == 401) {
          document.title = "401";
        }
      },
      (err) => console.log(err)
    )
  },
  [types.PLACE__NEW_ORDER_TRAIN__SELECT_END]({commit, state}, {end, _this}){
    //获取站台数据
    const locationData = state.locationList.filter((item) => item.parentId == end)
    //获取当前车站
    const stationId = state.newOrderTrainData.stationId

    //获取当前状态
    const timeType = locationData[0].advanceMinute
    const noServiceText = `亲爱的用户，站内接送请您至少在发车前${timeType}分钟下单，感谢您的支持！`

    //判断当前的时间
    const arriveTimeData = [];
    const departDate = state.newOrderTrainData.departDate
    //-------------------当前时间戳-------------------------
    const now = new Date().getTime();
    //-----------------发车时间段--------------------------
    const startTime = departDate - timeType * 60 * 1000;
    //-----------------发车前4小时--------------------------
    const endTime = departDate - 4 * 60 * 60 * 1000;
    //判断是否超时
    if (startTime < now) {
      _this.$alert(noServiceText, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          //重置数据
          _this.trainData.end = ''
        }
      });
      return
    }
    //计算时间列表
    if (endTime > now) {
      //取发车前4小时到发车前的时间段，每10分钟
      let _endTime = endTime
      let _time = (startTime - _endTime) / (10 * 60 * 1000) + 1;
      for (let k = 0; k < _time; k++) {
        arriveTimeData.push({label: handleGetTime(_endTime, "time"), value: _endTime})
        _endTime = parseInt(_endTime) + 10 * 60 * 1000;
        if (_endTime > startTime) {
          break
        }
      }
    }
    if (startTime > now && endTime < now) {
      //取当前时间到发车前的时间段，每10分钟
      let _endTime = getTime(now);
      let _time = (startTime - _endTime) / (10 * 60 * 1000) + 1;
      _endTime = parseInt(_endTime)
      for (let m = 0; m < _time; m++) {
        if (_endTime > startTime) {
          break
        }
        arriveTimeData.push({label: handleGetTime(_endTime, "time"), value: _endTime})
        _endTime = parseInt(_endTime) + 10 * 60 * 1000;
      }
    }

    _this.trainData.location = ''
    _this.trainData.arriveTime = ''

    //保存站台列表
    commit(types.PLACE__NEW_ORDER_TRAIN__SAVE_LOCATION_DATA, locationData)
    //保存时间列表
    commit(types.PLACE__NEW_ORDER_TRAIN__SAVE_ARRIVE_TIME_DATA, arriveTimeData)
  },
  [types.PLACE__NEW_ORDER_TRAIN__TO_ORDER_INFO]({commit}, {newOrderTrainData, _this}){
    commit(types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA, newOrderTrainData)
    _this.$router.push({path: '/newOrder/info'})
  },
  [types.PLACE__NEW_ORDER_TRAIN__TO_ORDER_PRICE]({commit, rootState}, {newOrderTrainData, _this}){

    const type = rootState.transferType == 'pickup'
    const mobileReg = /^1\d{10}$/;
    const {departDate, contact, mobile, carriage, end, location, arriveTime} = newOrderTrainData
    if (contact == "") {
      _this.$alert('联系人不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (mobile == "") {
      _this.$alert('联系方式不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (!mobileReg.test(mobile)) {
      _this.$alert('请输入正确的联系方式！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (carriage == "") {
      _this.$alert('车厢不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (isNaN(carriage)) {
      _this.$alert('请输入正确的车厢！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (end == "") {
      _this.$alert('接送起点不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (location == "") {
      _this.$alert('接送起点不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (type && arriveTime == "") {
      _this.$alert('预计到达时间不能为空！', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
      return
    } else if (type && arriveTime !== "请选择") {
      const now = new Date().getTime();
      const timeType = JSON.parse(location).advanceMinute
      const noServiceText = `亲爱的用户，站内接送请您至少在发车前${timeType}分钟下单，感谢您的支持！`
      if (departDate - now < timeType * 60 * 1000) {
        _this.$alert(noServiceText, '温馨提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
        return
      }
    }
    //保存当前数据
    commit(types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA, newOrderTrainData)
    //重置订单乘车数量
    commit(types.PLACE__NEW_ORDER_TRAIN__RESET_ORDER_PRICE_NUM, {
      riderNum: 1,
      smallLuggageNum: 0,
      luggageNum: 0,
      incarriageValue: {value: 0, instruction: type ? '为您将行李送至站台上' : '从站台开始为您搬运行李'},
      roomValue: 0
    })

    _this.$router.push({path: '/newOrder/price'})
  }
}

// mutations
const mutations = {
  [types.TO__NEW_ORDER__SAVE_ORDER_TRAIN_DATA](state, newOrderTrainData){
    state.newOrderTrainData = newOrderTrainData
  },
  [types.PLACE__NEW_ORDER_TRAIN__SAVE_LOCATION_LIST](state, locationList){
    state.locationList = locationList
  },
  [types.PLACE__NEW_ORDER_TRAIN__SAVE_LOCATION_DATA](state, locationData){
    state.locationData = locationData
  },
  [types.PLACE__NEW_ORDER_TRAIN__SAVE_ARRIVE_TIME_DATA](state, arriveTimeData){
    state.arriveTimeData = arriveTimeData
  },
  [types.PLACE__NEW_ORDER_INFO__UPDATE_NEW_ORDER_TRAIN] (state, user) {
    state.newOrderTrainData = {...state.newOrderTrainData, ...user}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
