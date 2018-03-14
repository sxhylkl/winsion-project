import * as types from '../mutation-types'
import service from '../../service'
import {messageAlert} from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  status: 'add',
  tableData: [],
  form: {"orgName": "", "postName": "", "teamName": "", "talkGroupId": "", "linkPhone": "", "sort": "", "areaId": []},
  formBackup: {},
  area: [],
  group: [],
  sectionSearch: [],
  groupSearch: [],
  sectionValue: '',
  groupValue: '',
}
// getters
const getters = {
  content8_dialogFormVisible: state=>state.dialogFormVisible,
  content8_status: state=>state.status,
  content8_tableData: state=>state.tableData,
  content8_form: state=>state.form,
  content8_area: state=>state.area,
  content8_group: state=>state.group,
  content8_sectionSearch: state=>state.sectionSearch,
  content8_groupSearch: state=>state.groupSearch,
}
// actions
const actions = {
  [types.CONTENT8_GET_INFO_ACTION]({commit}){
    commit(types.CONTENT8_SAVE_SECTION_VALUE,'')
    commit(types.CONTENT8_SAVE_GROUP_VALUE,'')
    //获取区域数据
    const dataSelectArea = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"areaname\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "areaInfo"
    }
    service.contentGetData(dataSelectArea).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT8_SAVE_AREA, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT8_GET_OTHER_INFO_ACTION]({commit}){
    //获取部门数据
    const dataSelectSearch = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "orgnizationInfo"
    }
    service.contentGetData(dataSelectSearch).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT8_SAVE_SECTION, result.data.data.dataList)
      }
    })
    //获取职能组
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"NN\",\"Fields\":\"orgid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "postInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT8_SAVE_GROUP, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT8_GET_GROUP_INFO_ACTION]({commit, state}){
    //获取职能组
    const ValueKey = state.sectionValue == '' ? 'NN' : state.sectionValue
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + ValueKey + "\",\"Fields\":\"orgid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "postInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT8_SAVE_GROUP_SEARCH, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT8_SEARCH_INFO_ACTION]({commit}){
    //获取列表数据
    const ValueKey1 = state.sectionValue == "" ? "NN" : state.sectionValue
    const ValueKey2 = state.groupValue == "" ? "NN" : state.groupValue
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"0\",\"ValueKey\":\"" + ValueKey1 + "\",\"Fields\":\"orgid\"},{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + ValueKey2 + "\",\"Fields\":\"postid\"}]",
      "OrderBy": "[{\"Mode\":\"0\",\"Field\":\"sort\"}]",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "teamInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT8_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT8_EDIT_INFO_ACTION]({commit}, data){
    commit(types.CONTENT8_EDIT_INFO, data)
  },
  [types.CONTENT8_ADD_INFO_ACTION]({commit}){
    const data = {"orgName": "", "postName": "", "teamName": "", "talkGroupId": "", "linkPhone": "", "sort": "", "areaId": []}
    commit(types.CONTENT8_ADD_INFO, data)
  },
  [types.CONTENT8_CONFIRM_ADD_INFO_ACTION]({dispatch, commit}, {data, _this}){
    //发送请求，添加数据
    //获取所需数据
    const operatorData = {
      "postId": data.postName,
      "teamId": "",
      "teamName": data.teamName,
      "sort": data.sort,
      "linkPhone": data.linkPhone,
      "talkGroupId": data.talkGroupId,
      "areas": data.areaId.join(',')
    }
    //组合所需数据
    const dataList = {
      "TableName": "teamInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT8_SEARCH_INFO_ACTION)
        commit(types.CONTENT8_CONFIRM_ADD_INFO, false)
      } else {
        //添加失败，提示用户
        messageAlert(_this, '添加作业组信息失败', '提示')
      }
    })
  },
  [types.CONTENT8_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data, _this}){
    //发送请求，更新数据
    const operatorData = {
      "postId": data.postName == state.formBackup.postName ? state.formBackup.postId : data.postName,
      "teamId": data.teamId,
      "teamName": data.teamName,
      "sort": data.sort,
      "linkPhone": data.linkPhone,
      "talkGroupId": data.talkGroupId,
      "areas": data.areaId.join(',')
    }
    const dataList = {
      "TableName": "teamInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT8_SEARCH_INFO_ACTION)
        commit(types.CONTENT8_CONFIRM_EDIT_INFO, false)
      } else {
        //编辑失败，提示用户
        messageAlert(_this, '修改作业组信息失败', '提示')
      }
    })
  },
  [types.CONTENT8_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList = {
      "TableName": "teamInfo",
      "OpeCode": "801",
      "OperatorData": data.teamId
    }
    service.contentDeleteData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT8_SEARCH_INFO_ACTION)
      } else {
        //删除失败，提示用户
        messageAlert(_this, '删除作业组信息失败', '提示')
      }
    })
  },
  [types.CONTENT8_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT8_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT8_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT8_SAVE_AREA](state, data){
    state.area = data
  },
  [types.CONTENT8_SAVE_SECTION](state, data){
    state.sectionSearch = [{orgId: 'NN', orgName: '全部'}, ...data]
  },
  [types.CONTENT8_SAVE_GROUP_SEARCH](state, data){
    state.groupSearch = [{postId: 'NN', postName: '全部'}, ...data]
  },
  [types.CONTENT8_SAVE_GROUP](state, data){
    state.group = data
  },
  [types.CONTENT8_SAVE_SECTION_VALUE](state, data){
    state.sectionValue = data
  },
  [types.CONTENT8_SAVE_GROUP_VALUE](state, data){
    state.groupValue = data
  },
  [types.CONTENT8_ADD_INFO](state, data){
    state.form = {...data}
    state.dialogFormVisible = true
    state.status = 'add'
  },
  [types.CONTENT8_EDIT_INFO](state, data){
    const areaId = data.areaId.split(',')
    state.form = {...data,areaId}
    state.formBackup = {...data}
    state.dialogFormVisible = true
    state.status = 'edit'
  },
  [types.CONTENT8_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT8_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT8_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


