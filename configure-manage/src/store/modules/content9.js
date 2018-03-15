import * as types from '../mutation-types'
import service from '../../service'
import {messageAlert} from '../../api'
// initial state
const state = {
  tableData: [],
  tableSelectData:[],
  tableStatus: 'add',
  tableShow: false,
  tableForm: {typeName: '', purposeName: ''},
  tableBackupForm: {},
  listData: [],
  listStatus: 'add',
  listShow: false,
  listForm: {areaName: '', parentName: '', number: '', countFlag: '', typeName: '', ssId: ''},
  listBackupForm: {},
}
// getters
const getters = {
  content9_tableData: state=>state.tableData,
  content9_tableSelectData: state=>state.tableSelectData,
  content9_tableStatus: state=>state.tableStatus,
  content9_tableShow: state=>state.tableShow,
  content9_tableForm: state=>state.tableForm,
  content9_listData: state=>state.listData,
  content9_listStatus: state=>state.listStatus,
  content9_listShow: state=>state.listShow,
  content9_listForm: state=>state.listForm,
}
// actions
const actions = {
  [types.CONTENT9_GET_OTHER_INFO_ACTION]({commit},_this){
    //获取table下拉框
    const dataSelect = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 1000,
      "ViewName": "areaPurposeInfo"
    }
    service.contentGetData(dataSelect).then(result=> {
      if (result.data.success) {
        //获取数据成功
        commit(types.CONTENT9_SAVE_TABLE_SELECT_INFO, result.data.data.dataList)
      } else {
        //获取数据失败
        messageAlert(_this, '获取数据失败', '提示')
      }
    })
  },
  [types.CONTENT9_GET_TABLE_INFO_ACTION]({commit},_this){
    //获取table信息
    const dataList = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "areaTypeViewInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        //获取数据成功
        commit(types.CONTENT9_SAVE_TABLE_INFO, result.data.data.dataList)
      } else {
        //获取数据失败
        messageAlert(_this, '获取数据失败', '提示')
      }
    })
  },
  [types.CONTENT9_GET_LIST_INFO_ACTION]({commit},_this){
    //获取节点信息
    service.contentGetAreaNodeData({}).then(result=> {
      if (result.data.success) {
        //获取数据成功
        commit(types.CONTENT9_SAVE_LIST_INFO, result.data.data)
      } else {
        //获取数据失败
        messageAlert(_this, '获取数据失败', '提示')
      }
    })
  },
  [types.CONTENT9_TABLE_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "areaTypeViewInfo",
      "OpeCode": "801",
      "OperatorData": data.areaTypeId
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT9_GET_TABLE_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除区域类型失败', '提示')
      }
    })
  },
  [types.CONTENT9_TABLE_CONFIRM_ADD_INFO_ACTION]({commit, dispatch}, {data, _this}){
    //发送请求
    const reqData = {
      "id":"",
      "typeName":data.typeName,
      "cut": data.purposeName,
      "typeNo":"1"
    }
    const dataList = {
      "TableName": "areaTypeViewInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(reqData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT9_GET_TABLE_INFO_ACTION)
        commit(types.CONTENT9_TABLE_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加区域类型失败', '提示')
      }
    })
  },
  [types.CONTENT9_TABLE_CONFIRM_EDIT_INFO_ACTION]({commit, dispatch, state}, {data, _this}){
    //发送请求
    const reqData = {
      "id":data.areaTypeId,
      "typeName":data.typeName,
      "cut": data.purposeName === state.tableBackupForm.purposeName ? state.tableBackupForm.purposeId : data.purposeName,
      "typeNo":"1"
    }
    const dataList = {
      "TableName": "areaTypeViewInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(reqData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT9_GET_TABLE_INFO_ACTION)
        commit(types.CONTENT9_TABLE_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改区域类型失败', '提示')
      }
    })
  },
  [types.CONTENT9_LIST_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "areaNodeViewInfo",
      "OpeCode": "801",
      "OperatorData": data.areaId
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT9_GET_LIST_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除区域管理失败', '提示')
      }
    })
  },
  [types.CONTENT9_LIST_CONFIRM_ADD_INFO_ACTION]({commit, dispatch}, {data, _this}){
    //发送请求
    const reqData = {
      "id":"",
      "number":data.number,
      "distinction":"1",
      "level":"1",
      "areaName":data.areaName,
      "ssId":data.ssId,
      "parentId":data.parentId,
      "areaTypeId":data.typeName,
      "areaCapacity":"1",
      "warningLine":"1",
      "orderNumber":"1",
      "countFlag":data.countFlag
    }
    const dataList = {
      "TableName": "areaNodeViewInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(reqData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT9_GET_LIST_INFO_ACTION)
        commit(types.CONTENT9_LIST_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加区域管理失败', '提示')
      }
    })
  },
  [types.CONTENT9_LIST_CONFIRM_EDIT_INFO_ACTION]({commit, dispatch, state}, {data, _this}){
    //发送请求
    const reqData = {
      "id":data.areaId,
      "number":data.number,
      "distinction":"1",
      "level":"1",
      "areaName":data.areaName,
      "ssId":data.ssId,
      "parentId":data.parentId,
      "areaTypeId":data.typeName==state.listBackupForm.typeName?state.listBackupForm.areaTypeId:data.typeName,
      "areaCapacity":"1",
      "warningLine":"1",
      "orderNumber":"1",
      "countFlag":data.countFlag
    }
    const dataList = {
      "TableName": "areaNodeViewInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(reqData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT9_GET_LIST_INFO_ACTION)
        commit(types.CONTENT9_LIST_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改区域管理失败', '提示')
      }
    })
  },
}
// mutations
const mutations = {
  [types.CONTENT9_SAVE_TABLE_INFO](state, data){
    state.tableData = data
  },
  [types.CONTENT9_SAVE_TABLE_SELECT_INFO](state, data){
    state.tableSelectData = data
  },
  [types.CONTENT9_TABLE_ADD_INFO](state, data){
    state.tableStatus = 'add'
    state.tableShow = true
    state.tableForm = {...data}
    state.tableBackupForm = {...data}
  },
  [types.CONTENT9_TABLE_EDIT_INFO](state, data){
    state.tableStatus = 'edit'
    state.tableShow = true
    state.tableForm = {...data}
    state.tableBackupForm = {...data}
  },
  [types.CONTENT9_TABLE_CONFIRM_CANCEL_INFO](state, data){
    state.tableShow = data
  },
  [types.CONTENT9_TABLE_CONFIRM_ADD_INFO](state, data){
    state.tableShow = data
  },
  [types.CONTENT9_TABLE_CONFIRM_EDIT_INFO](state, data){
    state.tableShow = data
  },
  [types.CONTENT9_SAVE_LIST_INFO](state, data){
    state.listData = data
  },
  [types.CONTENT9_LIST_ADD_INFO](state, data){
    state.listStatus = 'add'
    state.listShow = true
    state.listForm = {...data}
    state.listBackupForm = {...data}
  },
  [types.CONTENT9_LIST_EDIT_INFO](state, data){
    state.listStatus = 'edit'
    state.listShow = true
    state.listForm = {...data}
    state.listBackupForm = {...data}
  },
  [types.CONTENT9_LIST_CONFIRM_CANCEL_INFO](state, data){
    state.listShow = data
  },
  [types.CONTENT9_LIST_CONFIRM_ADD_INFO](state, data){
    state.listShow = data
  },
  [types.CONTENT9_LIST_CONFIRM_EDIT_INFO](state, data){
    state.listShow = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}


