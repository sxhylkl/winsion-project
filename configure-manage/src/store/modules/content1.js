import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert } from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {areaName: '', classificationName: '', deviceName: '', deviceNo: '', teamName: ''},
  formBackup: {},
  classify: [],
  area: [],
  team: []
}
// getters
const getters = {
  content1_dialogFormVisible: state=>state.dialogFormVisible,
  content1_status: state=>state.status,
  content1_tableData: state=>state.tableData,
  content1_form: state=>state.form,
  content1_classify: state=>state.classify,
  content1_area: state=>state.area,
  content1_team: state=>state.team,
}
// actions
const actions = {
  [types.CONTENT1_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "deviceInfo"}

    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT1_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT1_GET_OTHER_INFO_ACTION]({commit}){
    //获取类别数据
    const dataSelectClassify = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "classificationInfo"
    }
    service.contentGetData(dataSelectClassify).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT1_SAVE_CLASSIFY, result.data.data.dataList)
      }
    })
    //获取区域数据
    const dataSelectArea = {"WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "areaInfo"}
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT1_SAVE_AREA, result.data.data.dataList)
      }
    })
    //获取责任组数据
    const dataSelectTeam = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "teamInfo"}
    service.contentGetData(dataSelectTeam).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT1_SAVE_TEAM, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT1_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT1_EDIT_INFO, data)
  },
  [types.CONTENT1_ADD_INFO_ACTION]({commit}){
    const data = {areaName: '', classificationName: '', deviceName: '', deviceNo: '', teamName: ''}
    commit(types.CONTENT1_ADD_INFO, data)
  },
  [types.CONTENT1_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "classificationId":data.classificationName,
      "deviceName":data.deviceName,
      "areaId":data.areaName,
      "teamId":data.teamName,
      "deviceNo":data.deviceNo
    }
    //组合所需数据
    const dataList =  {
      "TableName": "deviceInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT1_GET_INFO_ACTION)
        commit(types.CONTENT1_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加设备信息失败','提示')
      }
    })
  },
  [types.CONTENT1_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "classificationId":data.classificationName==state.formBackup.classificationName?state.formBackup.classificationId:data.classificationName,
      "deviceName":data.deviceName,
      "areaId":data.areaName==state.formBackup.areaName?state.formBackup.areaId:data.areaName,
      "teamId":data.teamName==state.formBackup.teamName?state.formBackup.teamId:data.teamName,
      "deviceNo":data.deviceNo,
      "deviceId":data.id,
      "deviceTeamId":data.deviceTeamId,
    }
    const dataList =  {
      "TableName": "deviceInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT1_GET_INFO_ACTION)
        commit(types.CONTENT1_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改设备信息失败','提示')
      }
    })
  },
  [types.CONTENT1_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const operatorData = {
      "deviceId":data.id,
      "deviceTeamId":data.deviceTeamId,
    }
    const dataList =  {
      "TableName": "deviceInfo",
      "OpeCode": "801",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT1_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'删除设备信息失败','提示')
      }
    })
  },
  [types.CONTENT1_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT1_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT1_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT1_SAVE_CLASSIFY](state, data){
    state.classify = data
  },
  [types.CONTENT1_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT1_SAVE_TEAM](state, data){
    state.team = data
  },
  [types.CONTENT1_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT1_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT1_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT1_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT1_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


