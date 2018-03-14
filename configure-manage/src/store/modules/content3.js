import * as types from '../mutation-types'
import service from '../../service'
import {messageAlert} from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {itemdescribe: ''},
  formBackup: {}
}
// getters
const getters = {
  content3_dialogFormVisible: state=>state.dialogFormVisible,
  content3_status: state=>state.status,
  content3_tableData: state=>state.tableData,
  content3_form: state=>state.form
}
// actions
const actions = {
  [types.CONTENT3_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "patrolItemsInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT3_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT3_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT3_EDIT_INFO, data)
  },
  [types.CONTENT3_ADD_INFO_ACTION]({commit}){
    const data = {itemdescribe: ''}
    commit(types.CONTENT3_ADD_INFO, data)
  },
  [types.CONTENT3_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "id": "",
      "itemdescribe": data.itemdescribe
    }
    //组合所需数据
    const dataList = {
      "TableName": "patrolItemsInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT3_GET_INFO_ACTION)
        commit(types.CONTENT3_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加巡检项信息失败', '提示')
      }
    })
  },
  [types.CONTENT3_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "id": data.id,
      "itemdescribe": data.itemdescribe
    }
    const dataList = {
      "TableName": "patrolItemsInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT3_GET_INFO_ACTION)
        commit(types.CONTENT3_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改巡检项信息失败', '提示')
      }
    })
  },
  [types.CONTENT3_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "patrolItemsInfo",
      "OpeCode": "801",
      "OperatorData": data.id
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT3_GET_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除巡检项信息失败', '提示')
      }
    })
  },
  [types.CONTENT3_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT3_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT3_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT3_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT3_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT3_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT3_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT3_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


