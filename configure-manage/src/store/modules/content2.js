import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert } from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {"blueToothId": "", "areaName": "", "pointName": ""},
  formBackup: {},
  area: []
}
// getters
const getters = {
  content2_dialogFormVisible: state=>state.dialogFormVisible,
  content2_status: state=>state.status,
  content2_tableData: state=>state.tableData,
  content2_form: state=>state.form,
  content2_area: state=>state.area
}
// actions
const actions = {
  [types.CONTENT2_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "patrolPointInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT2_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT2_GET_OTHER_INFO_ACTION]({commit}){
    //获取区域名称数据
    const dataSelectArea = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "areaInfo"
    }
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT2_SAVE_AREA, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT2_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT2_EDIT_INFO, data)
  },
  [types.CONTENT2_ADD_INFO_ACTION]({commit}){
    const data = {"blueToothId": "", "areaName": "", "pointName": ""}
    commit(types.CONTENT2_ADD_INFO, data)
  },
  [types.CONTENT2_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "id":"",
      "pointName":data.pointName,
      "blueToothId":data.blueToothId,
      "areaId":data.areaName
    }
    //组合所需数据
    const dataList =  {
      "TableName": "patrolPointInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT2_GET_INFO_ACTION)
        commit(types.CONTENT2_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加巡检信息失败','提示')
      }
    })
  },
  [types.CONTENT2_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "id":data.id,
      "pointName":data.pointName,
      "blueToothId":data.blueToothId,
      "areaId":data.areaName==state.formBackup.areaName?state.formBackup.areaId:data.areaName
    }
    const dataList =  {
      "TableName": "patrolPointInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT2_GET_INFO_ACTION)
        commit(types.CONTENT2_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改巡检信息失败','提示')
      }
    })
  },
  [types.CONTENT2_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList =  {
      "TableName": "patrolPointInfo",
      "OpeCode": "801",
      "OperatorData": data.id
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT2_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'删除巡检信息失败','提示')
      }
    })
  },
  [types.CONTENT2_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT2_CONFIRM_CANCEL_INFO, false)
  }
}
// mutations
const mutations = {
  [types.CONTENT2_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT2_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT2_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT2_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT2_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT2_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT2_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


