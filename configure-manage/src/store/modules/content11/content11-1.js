import * as types from '../../mutation-types'
import service from '../../../service'
import {messageAlert} from '../../../api'
// initial state
const state = {
  flag1: false,
  flag2: false,
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {
    "sipTellAddress": "",
    "operateTime": "",
    "login": "",
    "orgId": "",
    "mmPwd": "",
    "photoUrl": "",
    "password": "",
    "loginTime": "",
    "userLevel": "",
    "lastSsId": "",
    "areaName": "",
    "loginIp": "",
    "loginName": "",
    "startTime": "",
    "passwordSec": "",
    "mmpUser": "",
    "orgName": "",
    "sipPassword": "",
    "roleId": "",
    "photo": "",
    "sort": "",
    "userName": "",
    "userId": "",
    "areaId": "",
    "lastTimestamp": "",
    "roleName": "",
    "endTime": "",
    "userType": "",
    "device": "",
    "status": "",
    "teamName": "",
    "teamId": "",
    "postName": "",
    "postId": "",
  },
  formBackup: {},
  area: [],
  organization: [],
  post: [],
  team: [],
  role: []
}
// getters
const getters = {
  content11_1_dialogFormVisible: state=>state.dialogFormVisible,
  content11_1_status: state=>state.status,
  content11_1_tableData: state=>state.tableData,
  content11_1_form: state=>state.form,
  content11_1_area: state=>state.area,
  content11_1_organization: state=>state.organization,
  content11_1_post: state=>state.post,
  content11_1_team: state=>state.team,
  content11_1_role: state=>state.role,
  content11_1_flag1: state=>state.flag1,
  content11_1_flag2: state=>state.flag2,
}
// actions
const actions = {
  [types.CONTENT11_1_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {"WhereClause": "", "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "userInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_1_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_1_GET_OTHER_INFO_ACTION]({commit}){
    //获取区域
    const dataSelectArea = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "areaInfo"
    }
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_1_SAVE_AREA, result.data.data.dataList)
      }
    })
    //获取部门
    const dataSelectOrg = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "orgnizationInfo"
    }
    service.contentGetData(dataSelectOrg).then(result=> {
        if (result.data.success) {
          commit(types.CONTENT11_1_SAVE_ORG, result.data.data.dataList)
        }
    })
    //获取角色
    const dataSelectRole = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "roleInfo"
    }
    service.contentGetData(dataSelectRole).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_1_SAVE_ROLE, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_1_GET_POST_INFO_ACTION]({commit}, value){
    //获取职能组
    const dataSelectPost = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + value + "\",\"Fields\":\"orgid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "postInfo"
    }
    service.contentGetData(dataSelectPost).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_1_SAVE_POST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_1_GET_TEAM_INFO_ACTION]({commit}, {org, post}){
    //获取班组
    const dataSelectTeam = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"0\",\"ValueKey\":\"" + org + "\",\"Fields\":\"orgid\"},{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + post + "\",\"Fields\":\"postid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "teamInfo"
    }
    service.contentGetData(dataSelectTeam).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT11_1_SAVE_TEAM, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT11_1_EDIT_INFO_ACTION]({commit,state}, data){
    //避免触发select事件的标识
    if(data.orgName!=state.form.orgName){
      commit(types.CONTENT11_1_UPDATE_STATUS_1, true)
    }
    if(data.postName!=state.form.postName){
      commit(types.CONTENT11_1_UPDATE_STATUS_2, true)
    }
    //编辑数据的展示
    commit(types.CONTENT11_1_EDIT_INFO, data)
  },
  [types.CONTENT11_1_ADD_INFO_ACTION]({commit,state}){
    const data = {
      "sipTellAddress": "",
      "operateTime": "",
      "login": "",
      "orgId": "",
      "mmPwd": "",
      "photoUrl": "",
      "password": "",
      "loginTime": "",
      "userLevel": "",
      "lastSsId": "",
      "areaName": "",
      "loginIp": "",
      "loginName": "",
      "startTime": "",
      "passwordSec": "",
      "mmpUser": "",
      "orgName": "",
      "sipPassword": "",
      "roleId": "",
      "photo": "",
      "sort": "",
      "userName": "",
      "userId": "",
      "areaId": "",
      "lastTimestamp": "",
      "roleName": "",
      "endTime": "",
      "userType": "",
      "device": "",
      "status": "",
      "teamName": "",
      "teamId": "",
      "postName": "",
      "postId": "",
    }
    //避免触发select事件的标识
    if(data.orgName!=state.form.orgName){
      commit(types.CONTENT11_1_UPDATE_STATUS_1, true)
    }
    if(data.postName!=state.form.postName){
      commit(types.CONTENT11_1_UPDATE_STATUS_2, true)
    }
    //添加数据的展示
    commit(types.CONTENT11_1_ADD_INFO, data)
  },
  [types.CONTENT11_1_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "userId": "",
      "orgId": data.orgName,
      "postId": data.postName,
      "teamId": data.teamName,
      "areaId": data.areaName,
      "userName": data.userName,
      "login": "1",
      "loginIp": "1",
      "loginName": data.loginName,
      "loginTime": "0",
      "startTime": new Date(data.startTime).getTime(),
      "endTime": new Date(data.endTime).getTime(),
      "password": data.password,
      "passwordSec": "0",
      "status": data.status,
      "operateTime": "0",
      "photo": "0",
      "sipTellAddress": data.sipTellAddress,
      "sipPassword": data.sipPassword,
      "userType": "1",
      "mmpUser": data.mmpUser,
      "mmPwd": data.mmPwd,
      "userLevel": "1",
      "lastSsId": "0",
      "device": "0",
      "lastTimestamp": "0",
      "sort": "1",
      "photoUrl": data.photoUrl,
      "roleId": data.roleName
    }

    //组合所需数据
    const dataList = {
      "TableName": "userInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT11_1_GET_INFO_ACTION)
        commit(types.CONTENT11_1_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加用户信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_1_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "userId": data.userId,
      "orgId": data.orgName == state.formBackup.orgName ? state.formBackup.orgId : data.orgName,
      "postId": data.postName == state.formBackup.postName ? state.formBackup.postId : data.postName,
      "teamId": data.teamName == state.formBackup.teamName ? state.formBackup.teamId : data.teamName,
      "areaId": data.areaName == state.formBackup.areaName ? state.formBackup.areaId : data.areaName,
      "userName": data.userName,
      "login": "1",
      "loginIp": "1",
      "loginName": data.loginName,
      "loginTime": "0",
      "startTime": new Date(data.startTime).getTime(),
      "endTime": new Date(data.endTime).getTime(),
      "password": data.password,
      "passwordSec": "0",
      "status": data.status,
      "operateTime": "0",
      "photo": "0",
      "sipTellAddress": data.sipTellAddress,
      "sipPassword": data.sipPassword,
      "userType": "1",
      "mmpUser": data.mmpUser,
      "mmPwd": data.mmPwd,
      "userLevel": "1",
      "lastSsId": "0",
      "device": "0",
      "lastTimestamp": "0",
      "sort": "1",
      "photoUrl": data.photoUrl,
      "roleId": data.roleName == state.formBackup.roleName ? state.formBackup.roleId : data.roleName
    }
    const dataList = {
      "TableName": "userInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT11_1_GET_INFO_ACTION)
        commit(types.CONTENT11_1_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改用户信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_1_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "userInfo",
      "OpeCode": "801",
      "OperatorData": data.userId,
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT11_1_GET_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除用户信息失败', '提示')
      }
    })
  },
  [types.CONTENT11_1_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT11_1_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT11_1_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT11_1_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT11_1_SAVE_ORG](state, data){
    state.organization = data
  },
  [types.CONTENT11_1_SAVE_POST](state, data){
    state.post = data
  },
  [types.CONTENT11_1_SAVE_TEAM](state, data){
    state.team = data
  },
  [types.CONTENT11_1_SAVE_ROLE](state, data){
    state.role = data
  },
  [types.CONTENT11_1_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT11_1_EDIT_INFO](state, data){
    state.form = {...data}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT11_1_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
    state.post = []
    state.team = []
  },
  [types.CONTENT11_1_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT11_1_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT11_1_UPDATE_STATUS_1](state, data){
    state.flag1 = data
  },
  [types.CONTENT11_1_UPDATE_STATUS_2](state, data){
    state.flag2 = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


