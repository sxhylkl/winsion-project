import * as types from '../../mutation-types'
import service from '../../../service'
import {messageAlert} from '../../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {userGroupName: "", userName: "", areaName: "", userId: []},
  formBackup: {},
  area: [],
  user: []
}
// getters
const getters = {
  content11_2_dialogFormVisible: state=>state.dialogFormVisible,
  content11_2_status: state=>state.status,
  content11_2_tableData: state=>state.tableData,
  content11_2_form: state=>state.form,
  content11_2_area: state=>state.area,
  content11_2_user: state=>state.user,
}
// actions
const actions = {
  [types.CONTENT11_2_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "userGroupInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_2_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_2_GET_OTHER_INFO_ACTION]({commit}){
    //获取类别数据
    const dataSelectArea = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "areaInfo"
    }
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_2_SAVE_AREA, result.data.data.dataList)
      }
    })

    //获取类别数据
    const dataSelectUser = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "userTableInfo"
    }
    service.contentGetData(dataSelectUser).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_2_SAVE_USER, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_2_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT11_2_EDIT_INFO, data)
  },
  [types.CONTENT11_2_ADD_INFO_ACTION]({commit}){
    const data = {userGroupName: "", userName: "", areaName: "", userId: []}
    commit(types.CONTENT11_2_ADD_INFO, data)
  },
  [types.CONTENT11_2_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      userGroupId: "",
      areaId: data.areaName,
      userGroupName: data.userGroupName,
      hascooperation: 0,
      hasim: 0,
      hasintercom: 0,
      hasnotice: 0,
      talkgroupid: data.talkGroupId,
      userIdList: data.userId.join(',')
    }
    //组合所需数据
    const dataList = {
      "TableName": "userGroupInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT11_2_GET_INFO_ACTION)
        commit(types.CONTENT11_2_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加用户组信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_2_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      userGroupId: data.userGroupId,
      areaId: data.areaName==state.formBackup.areaName?state.formBackup.areaId:data.areaName,
      userGroupName: data.userGroupName,
      hascooperation: 0,
      hasim: 0,
      hasintercom: 0,
      hasnotice: 0,
      talkgroupid: data.talkGroupId,
      userIdList: data.userId.join(',')
    }
    const dataList = {
      "TableName": "userGroupInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT11_2_GET_INFO_ACTION)
        commit(types.CONTENT11_2_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改用户组信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_2_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "userGroupInfo",
      "OpeCode": "801",
      "OperatorData": data.userGroupId,
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT11_2_GET_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除用户组信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_2_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT11_2_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT11_2_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT11_2_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT11_2_SAVE_USER](state, data){
    state.user = data
  },
  [types.CONTENT11_2_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT11_2_EDIT_INFO](state, data){
    state.form = {...data, userId: data.userId.split(',')}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT11_2_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT11_2_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT11_2_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


