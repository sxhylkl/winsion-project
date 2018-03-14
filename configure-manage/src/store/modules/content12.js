import * as types from '../mutation-types'
import service from '../../service'
import { messageAlert , handleGetTime} from '../../api'
// initial state
const state = {
  dialogFormVisible: false,
  detailsVisible: false,
  status: 'add',
  tableData: [],
  team: [],
  schedulingPlan:{planName:'', startDate:'', endDate:'',flag:''},
  schedulingWay:{cycleName:'', regularDays:"1"},
  schedulingSpecificWay:{name:'', teamname:[], startdays:1, starttime:'', enddays:1, endtime:''},
  schedulingSpecificList:[],
  schedulingSpecificListBackup:[],
}
// getters
const getters = {
  content12_dialogFormVisible: state=>state.dialogFormVisible,
  content12_detailsVisible: state=>state.detailsVisible,
  content12_status: state=>state.status,
  content12_tableData: state=>state.tableData,
  content12_team: state=>state.team,
  content12_schedulingPlan: state=>state.schedulingPlan,
  content12_schedulingWay: state=>state.schedulingWay,
  content12_schedulingSpecificWay: state=>state.schedulingSpecificWay,
  content12_schedulingSpecificList: state=>state.schedulingSpecificList,
}
// actions
const actions = {
  [types.CONTENT12_GET_INFO_ACTION]({commit}){
    //获取列表数据
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"0\",\"Fields\":\"delflag\"}]",
      "OrderBy": "", "PageStart": 1, "PageSize": 10000, "ViewName": "workPlanInfo"}
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT12_SAVE_LIST, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT12_GET_OTHER_INFO_ACTION]({commit}){
    //获取类别数据
    const dataSelectTeam = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "teamInfo"
  }
    service.contentGetData(dataSelectTeam).then(result=> {
      if (result.data.success) {
        commit(types.CONTENT12_SAVE_TEAM, result.data.data.dataList)
      }
    })
  },
  [types.CONTENT12_GET_DETAILS_ACTION]({commit},{data,_this,condition}){
    //发送请求，添加数据
    const dataList = {
      "WhereClause": "[{\"FieldKey\":\"0\",\"JoinKey\":\"2\",\"ValueKey\":\"" + data + "\",\"Fields\":\"workplancyclesid\"}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "workplancycleitemsInfo"
    }
    service.contentGetData(dataList).then(result=> {
      if (result.data.success) {
        //保存数据,并开启对应的状态
        commit(types.CONTENT12_SAVE_SPECIFIC_LIST,result.data.data.dataList)
        if(condition=='details'){
          commit(types.CONTENT12_CONFIRM_DETAILS_INFO,true)
        }else {
          commit(types.CONTENT12_EDIT_INFO,true)
        }
        //设置弹窗显示
      }else {
        //添加失败，提示用户
        messageAlert(_this,'获取详情失败','提示')
      }
    })
  },
  [types.CONTENT12_EDIT_INFO_ACTION]({commit,dispatch}, {data,_this}){
    const {cycleName,endDate,planName,regularDays,startDate,workplanCyclesId,workplansId} = data
    //排班计划
    const schedulingPlan = {planName, startDate, endDate,flag:workplansId}
    commit(types.CONTENT12_SAVE_PLAN,schedulingPlan)
    //排班方式
    const schedulingWay = {cycleName, regularDays}
    commit(types.CONTENT12_SAVE_WAY,schedulingWay)
    //排班具体方式
    const schedulingSpecificWay = {name:'', teamname:[], startdays:1, starttime:'', enddays:1, endtime:''}
    commit(types.CONTENT12_SAVE_SPECIFIC_WAY,schedulingSpecificWay)
    dispatch(types.CONTENT12_GET_DETAILS_ACTION,{data:workplanCyclesId,_this,condition:''})
  },
  [types.CONTENT12_ADD_INFO_ACTION]({commit}){
    //排班计划
    const schedulingPlan = {planName:'', startDate:'', endDate:'',flag:''}
    commit(types.CONTENT12_SAVE_PLAN,schedulingPlan)
    //排班方式
    const schedulingWay = {cycleName:'', regularDays:"1"}
    commit(types.CONTENT12_SAVE_WAY,schedulingWay)
    //排班具体方式
    const schedulingSpecificWay = {name:'', teamname:[], startdays:1, starttime:'', enddays:1, endtime:''}
    commit(types.CONTENT12_SAVE_SPECIFIC_WAY,schedulingSpecificWay)
    //重置数组
    commit(types.CONTENT12_SAVE_SPECIFIC_LIST, [])
    //更新状态
    commit(types.CONTENT12_ADD_INFO,true)
  },
  [types.CONTENT12_CONFIRM_ADD_INFO_ACTION]({dispatch, commit, state}, {data1,data2, _this}){
    //发送请求，添加数据
    const workPlanCycleItemsDtoList = state.schedulingSpecificListBackup.map(d=>{
      return {
        teamName:d.name,
        teamIds:d.teamname.map(d=>d.split(':')[0]),
        startDays:d.startdays,
        startTime:d.starttime,
        endDays:d.enddays,
        endTime:d.endtime
      }
    })
    const workPlanCyclesDto = {
      ...data2,
      workPlanCycleItemsDtoList:workPlanCycleItemsDtoList,
    }
    //获取所需数据
    const operatorData = {
      planName:data1.planName,
      startDate:handleGetTime(new Date(data1.startDate).getTime(),'date'),
      endDate:handleGetTime(new Date(data1.endDate).getTime(),'date'),
      used:0,
      workPlanCyclesDto:workPlanCyclesDto
    }
    //组合所需数据
    const dataList =  {
      "TableName": "workPlanInfo",
      "OpeCode": "800",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentAddData(dataList).then(result=> {
      if (result.data.success) {
        //添加成功，刷新列表
        dispatch(types.CONTENT12_GET_INFO_ACTION)
        commit(types.CONTENT12_CONFIRM_ADD_INFO, false)
      }else {
        //添加失败，提示用户
        messageAlert(_this,'添加排班计划失败','提示')
      }
    })
  },
  [types.CONTENT12_CONFIRM_EDIT_INFO_ACTION]({dispatch, commit, state}, {data1,data2, _this}){
    //发送请求，更新数据
    //整合所需数据
    const workPlanCycleItemsDtoList = state.schedulingSpecificListBackup.map(d=>{
      const teamIds = typeof d.teamname=='string'?d.teamsid.split(','):d.teamname.map(d=>d.split(':')[0])
      return {
        teamName:d.name,
        teamIds,
        startDays:d.startdays,
        startTime:d.starttime,
        endDays:d.enddays,
        endTime:d.endtime
      }
    })
    const workPlanCyclesDto = {
      cycleName:data2.cycleName,
      regularDays:parseInt(data2.regularDays),
      workPlanCycleItemsDtoList,
    }
    const workPlanDto = {
      planName:data1.planName,
      startDate:typeof data1.startDate=='string'?data1.startDate:handleGetTime(new Date(data1.startDate).getTime(),'date'),
      endDate:typeof data1.endDate=='string'?data1.endDate:handleGetTime(new Date(data1.endDate).getTime(),'date'),
      used:0,
      workPlanCyclesDto
    }
    const operatorData = {
      workPlanId:data1.flag,
      used:0,
      workPlanDto
    }
    //获取所需数据
    const dataList =  {
      "TableName": "workPlanInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData)
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //编辑成功，刷新列表
        dispatch(types.CONTENT12_GET_INFO_ACTION)
        commit(types.CONTENT12_CONFIRM_EDIT_INFO, false)
      }else {
        //编辑失败，提示用户
        messageAlert(_this,'修改排班计划失败','提示')
      }
    })
  },
  [types.CONTENT12_CONFIRM_DELETE_INFO_ACTION]({dispatch}, {data, _this}){
    //发送请求
    const dataList =  {
      "TableName": "workPlanInfo",
      "OpeCode": "801",
      "OperatorData": data.workplansId,
    }
    service.contentDeleteData(dataList).then(
      result=> {
        if (result.data.success) {
          //删除成功，刷新列表
          dispatch(types.CONTENT12_GET_INFO_ACTION)
        }else {
          //删除失败，提示用户
          messageAlert(_this,'删除排班计划失败','提示')
        }
      },
      error=> {
        //删除失败，提示用户
        messageAlert(_this,'删除排班计划失败','提示')
      }
    )
  },
  [types.CONTENT12_CONFIRM_EXECUTE_INFO_ACTION]({dispatch}, {data, _this}){
    const operatorData = {
      workPlanId:data.workplansId,
      used:1,
      workPlanDto:null
    }
    //发送请求
    const dataList =  {
      "TableName": "workPlanInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData),
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT12_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'使排班计划生效失败','提示')
      }
    })
  },
  [types.CONTENT12_CONFIRM_NOT_EXECUTE_INFO_ACTION]({dispatch}, {data, _this}){
    const operatorData = {
      workPlanId:data.workplansId,
      used:0,
      workPlanDto:null
    }
    //发送请求
    const dataList =  {
      "TableName": "workPlanInfo",
      "OpeCode": "802",
      "OperatorData": JSON.stringify(operatorData),
    }
    service.contentUpdateData(dataList).then(result=> {
      if (result.data.success) {
        //删除成功，刷新列表
        dispatch(types.CONTENT12_GET_INFO_ACTION)
      }else {
        //删除失败，提示用户
        messageAlert(_this,'使排班计划失效失败','提示')
      }
    })
  },
  [types.CONTENT12_CONFIRM_CANCEL_INFO_ACTION]({commit}){
    commit(types.CONTENT12_CONFIRM_CANCEL_INFO, false)
  },
}
// mutations
const mutations = {
  [types.CONTENT12_SAVE_LIST](state, data){
    state.tableData = data
  },
  [types.CONTENT12_SAVE_TEAM](state, data){
    state.team = data
  },
  [types.CONTENT12_ADD_INFO](state, data){
    state.dialogFormVisible = data
    state.status = 'add'
  },
  [types.CONTENT12_EDIT_INFO](state, data){
    state.dialogFormVisible = data
    state.status = 'edit'
  },
  [types.CONTENT12_CONFIRM_CANCEL_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT12_CONFIRM_ADD_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT12_CONFIRM_EDIT_INFO](state, data){
    state.dialogFormVisible = data
  },
  [types.CONTENT12_CONFIRM_ADD_SPECIFIC_WAY](state, data){
    let arr = [...state.schedulingSpecificListBackup,data]
    let len = arr.length
    let middle = null
    for (let i = 0; i < len; i++) {
      for (let j = i+1; j < len; j++) {
        let workDay1 = arr[i].startdays
        let workDay2 = arr[j].startdays

        let timeArr1 = arr[i].starttime.split(':')

        let time1 = parseInt(timeArr1[0])*60+parseInt(timeArr1[1])

        let timeArr2 = arr[j].starttime.split(':')
        let time2 = parseInt(timeArr2[0])*60+parseInt(timeArr2[1])

        if(workDay1>workDay2||(workDay1==workDay2&&time1>time2)){
          middle = arr[j]
          arr[j] = arr[i]
          arr[i] = middle
        }
      }
    }

    let arr1=[],arr2=[]
    arr.forEach(d=>{
      if(d.teamname instanceof Array){
        arr1.push({
          ...d,
          teamname:d.teamname.map(t=>t.split(':')[1]).join(',')
        })
      }else {
        arr1.push(d)
      }
      arr2.push(d)
    })

    state.schedulingSpecificList = arr1
    state.schedulingSpecificListBackup = arr2
  },
  [types.CONTENT12_CONFIRM_DELETE_SPECIFIC_WAY](state, data){
    state.schedulingSpecificList = state.schedulingSpecificList.filter((d,i)=>i!=data)
    state.schedulingSpecificListBackup = state.schedulingSpecificListBackup.filter((d,i)=>i!=data)
  },
  [types.CONTENT12_CONFIRM_DETAILS_INFO](state, data){
    state.detailsVisible = data
  },
  [types.CONTENT12_SAVE_SPECIFIC_LIST](state, data){
    state.schedulingSpecificList = data
    state.schedulingSpecificListBackup = data
  },
  [types.CONTENT12_SAVE_PLAN](state, data){
    state.schedulingPlan = data
  },
  [types.CONTENT12_SAVE_WAY](state, data){
    state.schedulingWay = data
  },
  [types.CONTENT12_SAVE_SPECIFIC_WAY](state, data){
    state.schedulingSpecificWay = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}


