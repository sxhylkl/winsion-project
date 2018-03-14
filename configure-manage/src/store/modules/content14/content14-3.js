import * as types from '../../mutation-types'
import service from '../../../service'
import { messageAlert } from '../../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {"trainTaskTypeName": ""},
  formBackup: {}
}
// getters
const getters = {
  content14_3_dialogFormVisible: state=>state.dialogFormVisible,
  content14_3_status: state=>state.status,
  content14_3_tableData: state=>state.tableData,
  content14_3_form: state=>state.form,
}
// actions
const actions = {
  [types.CONTENT14_3_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "traintasktypeinfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT14_3_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT14_3_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT14_3_EDIT_INFO, data)
  },
  [types.CONTENT14_3_ADD_INFO_ACTION]({commit}){
    const data = {"trainTaskTypeName": ""}
    commit(types.CONTENT14_3_ADD_INFO, data)
  },
  [types.CONTENT14_3_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "trainTaskTypesId":"",
      "trainTaskTypeName":data.trainTaskTypeName
    }
    //组合所需数据
    const dataList =  {
      "TableName": "traintasktypeinfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT14_3_GET_INFO_ACTION)
        commit(types.CONTENT14_3_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加信息失败','提示')
      }
    })
  },
  [types.CONTENT14_3_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "trainTaskTypesId":data.trainTaskTypesId,
      "trainTaskTypeName":data.trainTaskTypeName
    }
    const dataList =  {
      "TableName": "traintasktypeinfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT14_3_GET_INFO_ACTION)
        commit(types.CONTENT14_3_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改信息失败','提示')
      }
    })
  },
  [types.CONTENT14_3_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList =  {
      "TableName": "traintasktypeinfo",
      "OpeCode": "801",
      "OperatorData": data.trainTaskTypesId
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT14_3_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'删除信息失败','提示')
      }
    })
  },
  [types.CONTENT14_3_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT14_3_CONFIRM_CANCEL_INFO, false)
  }
}
// mutations
const mutations = {
  [types.CONTENT14_3_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT14_3_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT14_3_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT14_3_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT14_3_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT14_3_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


