import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert } from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  tableData: [],
  form: {},
  formBackup: {},
  area: [],
  team: []
}
// getters
const getters = {
  content13_dialogFormVisible: state=>state.dialogFormVisible,
  content13_tableData: state=>state.tableData,
  content13_form: state=>state.form,
  content13_area: state=>state.area,
  content13_team: state=>state.team,
}
// actions
const actions = {
  [types.CONTENT13_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "runtrainsInfo"}
    service.contentGetData(dataList).then(result=> {
        if (result.data.success) {
          commit(types.CONTENT13_SAVE_LIST, result.data.data.dataList)
        }
      })
  },
  [types.CONTENT13_GET_OTHER_INFO_ACTION]({commit}){
    //获取检票口数据
    const dataSelectClassify = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "checkportInfo"
    }
    service.contentGetData(dataSelectClassify).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT13_SAVE_AREA, result.data.data.dataList)
      }
    })
    //获取站台数据
    const dataSelectTeam = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "platformInfo"}
    service.contentGetData(dataSelectTeam).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT13_SAVE_TEAM, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT13_SET_MQ_ACTION]({dispatch}){
    //监听字段
    const mqName = [
      '2017winsion.kingkong.web.topic'
    ].map(d=>d.replace(/\./g, "/"))
    //设置名称
    const clientId = '实时到发信息'+new Date().getTime();
    //mq
    service.contentSetMq(mqName,clientId,function (message) {
      let payloadString = JSON.parse(message.payloadString)
      if (payloadString.messageType == "32") {
        dispatch(types.CONTENT13_GET_INFO_ACTION)
      }
      if (payloadString.messageType == "30") {
        dispatch(types.CONTENT13_GET_INFO_ACTION)
      }
      if (payloadString.messageType == "31") {
        dispatch(types.CONTENT13_GET_INFO_ACTION)
      }
    })
  },
  [types.CONTENT13_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT13_EDIT_INFO, data)
  },
  [types.CONTENT13_CONFIRM_EDIT_INFO_ACTION]({commit,state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "runId":data.runsId,
      "arriveTime":(data.arriveTime==''||data.arriveTime==null||new Date(data.arriveTime).getTime()==new Date(state.formBackup.arriveTime).getTime())?0:new Date(data.arriveTime).getTime(),
      "departTime":(data.departTime==''||data.departTime==null||new Date(data.departTime).getTime()==new Date(state.formBackup.departTime).getTime())?0:new Date(data.departTime).getTime(),
      "checkportIds":data.checkportId,
      "platformId":data.platformId,
    }
    const dataList =  {
      "TableName": "runtrainsInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        commit(types.CONTENT13_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改车站到发信息失败','提示')
      }
    })
  },
  [types.CONTENT13_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT13_CONFIRM_CANCEL_INFO, false)
  },
  [types.CONTENT13_CONFIRM_CHECK_IN_INFO_ACTION]({}, {data, _this}){
    //发送请求
    const dataList = {
      "flag":1,
      "runsId": data.runsId
    }
    service.contentStartCheck(dataList).then(result=> {
      if (!result.data.success) {
        messageAlert(_this, '开始检票操作失败', '提示')
      }
    })
  },
  [types.CONTENT13_CONFIRM_CHECK_END_INFO_ACTION]({}, {data, _this}){
    //发送请求
    const dataList = {
      "flag":2,
      "runsId": data.runsId
    }
    service.contentStartCheck(dataList).then(result=> {
      if (!result.data.success) {
        messageAlert(_this, '结束检票操作失败', '提示')
      }
    })
  },
}
// mutations
const mutations = {
  [types.CONTENT13_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT13_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT13_SAVE_TEAM](state, data){
    state.team = data
  },
  [types.CONTENT13_EDIT_INFO](state, data){
    state.form = {
      ...data,
      checkportId:data.checkportId==''?[]:data.checkportId.split(',')
    }
    state.formBackup = {...data}
    state.dialogFormVisible = true
  },
  [types.CONTENT13_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT13_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


