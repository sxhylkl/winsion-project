import * as types from '../mutation-types'
import service from '../../service'
import {messageAlert} from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {"orgName": "", "postName": "", "sort": "","areaName":""},
  formBackup: {},
  area:[],
  section: [],
  sectionSearch: [],
  sectionValue:''
}
// getters
const getters = {
  content7_dialogFormVisible: state=>state.dialogFormVisible,
  content7_status: state=>state.status,
  content7_tableData: state=>state.tableData,
  content7_form: state=>state.form,
  content7_area: state=>state.area,
  content7_section: state=>state.section,
  content7_sectionSearch: state=>state.sectionSearch,
}
// actions
const actions = {
  [types.CONTENT7_GET_INFO_ACTION]({commit}){
    //清空选择条件
    commit(types.CONTENT7_SAVE_SECTION_VALUE,'')
    //部门
    const dataSelectSearch = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "orgnizationInfo"
    }
    service.contentGetData(dataSelectSearch).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT7_SAVE_SECTION, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT7_GET_OTHER_INFO_ACTION]({commit}){
    //获取区域数据
    const dataSelectArea = {"WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]", "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"areaname\"}]", "PageStart": 1, "PageSize": 10000, "ViewName": "areaInfo"}
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT7_SAVE_AREA, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT7_SEARCH_INFO_ACTION]({commit,state}){
    //获取列表数据
    const ValueKey = state.sectionValue == "" ? "NN" : state.sectionValue
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + ValueKey + "\",\"Fields\":\"orgid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "postInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT7_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT7_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT7_EDIT_INFO, data)
  },
  [types.CONTENT7_ADD_INFO_ACTION]({commit}){
    const data = {"orgName": "", "postName": "", "sort": "","areaName":""}
    commit(types.CONTENT7_ADD_INFO, data)
  },
  [types.CONTENT7_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "postId": "",
      "areaId": data.areaName,
      "postName": data.postName,
      "sort": data.sort,
      "orgId": data.orgName
    }
    //组合所需数据
    const dataList = {
      "TableName": "postInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT7_SEARCH_INFO_ACTION)
        commit(types.CONTENT7_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加职能组信息失败', '提示')
      }
    })
  },
  [types.CONTENT7_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "postId": data.postId,
      "areaId": data.areaName==state.formBackup.areaName?state.formBackup.areaId:data.areaName,
      "postName": data.postName,
      "sort": data.sort,
      "orgId": data.orgName == state.formBackup.orgName ? state.formBackup.orgId : data.orgName
    }
    const dataList = {
      "TableName": "postInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT7_SEARCH_INFO_ACTION)
        commit(types.CONTENT7_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改职能组信息失败', '提示')
      }
    })
  },
  [types.CONTENT7_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "postInfo",
      "OpeCode": "801",
      "OperatorData": data.postId
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT7_SEARCH_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除职能组信息失败', '提示')
      }
    })
  },
  [types.CONTENT7_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT7_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT7_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT7_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT7_SAVE_SECTION](state, data){
    state.section = data
    state.sectionSearch = [{orgId:'NN',orgName:'全部'},...data]
  },
  [types.CONTENT7_SAVE_SECTION_VALUE](state, data){
    state.sectionValue = data
  },
  [types.CONTENT7_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT7_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT7_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT7_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT7_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


