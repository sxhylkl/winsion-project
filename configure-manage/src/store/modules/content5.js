import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert } from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {classificationName:"",typeName:"",planCostTime:"",priority:""},
  formBackup: {},
  classify: []
}
// getters
const getters = {
  content5_dialogFormVisible: state=>state.dialogFormVisible,
  content5_status: state=>state.status,
  content5_tableData: state=>state.tableData,
  content5_form: state=>state.form,
  content5_classify: state=>state.classify
}
// actions
const actions = {
  [types.CONTENT5_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "problemTypeInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT5_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT5_GET_OTHER_INFO_ACTION]({commit}){
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
        commit(types.CONTENT5_SAVE_CLASSIFY, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT5_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT5_EDIT_INFO, data)
  },
  [types.CONTENT5_ADD_INFO_ACTION]({commit}){
    const data = {classificationName:"",typeName:"",planCostTime:"",priority:""}
    commit(types.CONTENT5_ADD_INFO, data)
  },
  [types.CONTENT5_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "id":"",
      "classificationId":data.classificationName,
      "typeName":data.typeName,
      "planCostTime":data.planCostTime,
      "priority":data.priority
    }
    //组合所需数据
    const dataList =  {
      "TableName": "problemTypeInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT5_GET_INFO_ACTION)
        commit(types.CONTENT5_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加问题类型信息失败','提示')
      }
    })
  },
  [types.CONTENT5_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "id":data.id,
      "classificationId":data.classificationName==state.formBackup.classificationName?state.formBackup.classificationId:data.classificationName,
      "typeName":data.typeName,
      "planCostTime":data.planCostTime,
      "priority":data.priority==state.formBackup.priority?state.formBackup.priority:data.priority
    }
    const dataList =  {
      "TableName": "problemTypeInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT5_GET_INFO_ACTION)
        commit(types.CONTENT5_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改问题类型信息失败','提示')
      }
    })
  },
  [types.CONTENT5_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList =  {
      "TableName": "problemTypeInfo",
      "OpeCode": "801",
      "OperatorData": data.id,
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT5_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'删除问题类型信息失败','提示')
      }
    })
  },
  [types.CONTENT5_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT5_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT5_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT5_SAVE_CLASSIFY](state, data){
    state.classify = data
  },
  [types.CONTENT5_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT5_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT5_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT5_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT5_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


