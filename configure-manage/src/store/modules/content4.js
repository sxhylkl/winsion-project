import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert } from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {classificationNo: '', classificationName: ''},
  formBackup: {}
}
// getters
const getters = {
  content4_dialogFormVisible: state=>state.dialogFormVisible,
  content4_status: state=>state.status,
  content4_tableData: state=>state.tableData,
  content4_form: state=>state.form
}
// actions
const actions = {
  [types.CONTENT4_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "classificationInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT4_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT4_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT4_EDIT_INFO, data)
  },
  [types.CONTENT4_ADD_INFO_ACTION]({commit}){
    const data = {classificationNo: '', classificationName: ''}
    commit(types.CONTENT4_ADD_INFO, data)
  },
  [types.CONTENT4_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "id":"",
      "classificationNo":data.classificationNo,
      "classificationName":data.classificationName
    }
    //组合所需数据
    const dataList =  {
      "TableName": "classificationInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT4_GET_INFO_ACTION)
        commit(types.CONTENT4_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加问题大类信息失败','提示')
      }
    })
  },
  [types.CONTENT4_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "id":data.id,
      "classificationNo":data.classificationNo,
      "classificationName":data.classificationName
    }
    const dataList =  {
      "TableName": "classificationInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT4_GET_INFO_ACTION)
        commit(types.CONTENT4_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改问题大类信息失败','提示')
      }
    })
  },
  [types.CONTENT4_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList =  {
      "TableName": "classificationInfo",
      "OpeCode": "801",
      "OperatorData": data.id
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT4_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'删除问题大类信息失败','提示')
      }
    })
  },
  [types.CONTENT4_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT4_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT4_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT4_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT4_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT4_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT4_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT4_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


