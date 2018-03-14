import service from '../../service'
import {handleGetTime} from '../../api'
const state = {
  managePost:[],
  manageTeam:[],
  manageGrid:[],
  manageQuestion:[],
  manageCondition:{
    organization:'',
    post:'',
    team:'',
    timeRange:'',
    status:'',
    grid:'',
    question:'',
    outTime:'',
  },
  managePieData:{
    problemClassificationList:{problemClassificationList:[]},
    problemPointList:{problemPointList:[]},
    problemStateList:{problemStateList:[]},
  },
  manageTableData:{
    dataList:[],
    totalcount:0,
    pagecount:1
  },
  manageTableRange:0,
  manageTableOrderBy:"[{Field:process,Mode:1}]",
  manageCurrentTableData:{
    id:'',
    pointname:'',
    classificationname:'',
    typename:'',
    priority:'',
    costtime:'',
    processname:'',
    commituser:'',
    ctime:'',
    comment:'',
  },
  manageFlag:true,
  manageInfoFlag:true,
  manageInfoImg:[],
  manageInfoMaintainList:[],
  manageInfoMaintainData:{
    assignedteamname:'',
    id:'',
    handleperson:'',
    dealtime:''
  }
}
const getters = {
  managePost:state=>{
    return [{postid:'',postname:'全部'},...state.managePost]
  },
  manageTeam:state=>{
    return [{teamid:'',teamsName:'全部'},...state.manageTeam]
  },
  manageGrid:state=>{
    return [{id:'',pointName:'全部'},...state.manageGrid]
  },
  manageQuestion:state=>{
    return [{id:'',classificationname:'全部'},...state.manageQuestion]
  },
  manageCondition:state=>state.manageCondition,
  managePieData:state=>{
    const problemClassificationList = state.managePieData.problemClassificationList.problemClassificationList
    const problemPointList = state.managePieData.problemPointList.problemPointList
    const problemStateList = state.managePieData.problemStateList.problemStateList

    const background = {
      '待修复':'#fc5858',
      '修复中':'#4ab6ab',
      '待验收':'#52a4e9',
      '已完成':'#999',
      '未完成':'#fc8658'
    }
    let color1 = []
    const data1 = problemStateList.map(item=>{
      color1.push(background[item.name])
      return {name:item.name,value:item.number}
    })
    const data2 = problemPointList.map(item=>{
      return {name:item.name,value:item.number}
    })
    const data3 = problemClassificationList.map(item=>{
      return {name:item.name,value:item.number}
    })

    return{
      pieData1:{color:color1,data:data1},
      pieData2:{data:data2},
      pieData3:{data:data3},
    }
  },
  manageTableDataList:state=>state.manageTableData.dataList,
  manageTableDataTotal:state=>state.manageTableData.totalcount,
  manageTableDataPage:state=>state.manageTableData.pagecount,
  manageTableRange:state=>state.manageTableRange,
  manageFlag:state=>state.manageFlag,
  manageInfoFlag:state=>state.manageInfoFlag,
  manageCurrentTableData:state=>state.manageCurrentTableData,
  manageInfoImg:state=>state.manageInfoImg,
  manageInfoMaintainList:state=>state.manageInfoMaintainList,
  manageInfoMaintainData:state=>state.manageInfoMaintainData,
}
const actions = {
  getManageGridAndQuestionData({commit}){
    //获取网格列表
    let gridData = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 1000,
      "ViewName": "pratolpointinfo"
    }
    service.getData(gridData).then(
      result=>{
        commit('saveManageGridData',result.data.data.dataList)
      },
      error=>{console.log(error)}
    )
    //获取问题大类数据
    let questionData = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 1000,
      "ViewName": "problemclassificationsinfo"
    }
    service.getData(questionData).then(
      result=>{
        commit('saveManageQuestionData',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )


  },
  getManagePost({commit},{val}){
    commit('updateManagePost',[])
    commit('updateManageTeam',[])
    //值为空，就停止发起请求
    if(!val)return

    let data = {
      "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + val + ",Fields:orgid}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "orgnizationpostviewinfo"
    }

    service.getData(data).then(
      result=>{
        commit('updateManagePost',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
  },
  getManageTeam({commit},{val}){
    commit('updateManageTeam',[])
    //值为空，就停止发起请求
    if(!val)return

    let data = {
      "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + val + ",Fields:postid}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "teamsinfo"
    }

    service.getData(data).then(
      result=>{
        commit('updateManageTeam',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
  },
  getManagePieData({commit,state}){
    let {organization, post, team, timeRange,
      status, grid, question, outTime} = state.manageCondition

    //整理数据
    organization = organization===""?"NN":organization
    post = post===""?"NN":post
    team = team===""?"NN":team
    status = status===""?"NN":status
    grid = grid===""?"NN":grid
    question = question===""?"NN":question
    outTime = outTime===""?"NN":outTime

    let pieTimeRange0 = timeRange===""?"NN":handleGetTime(new Date(timeRange[0]).getTime(),'date')
    let pieTimeRange1 = timeRange===""?"NN":handleGetTime(new Date(timeRange[1]).getTime(),'date')

    //发送请求
    let data = {
      "porganiazationId": organization,
      "ppostId": post,
      "pteamId":team,
      "classificationId":question,
      "pointId":grid,
      "process":status,
      "overTimeState":outTime,
      "startDate": pieTimeRange0,
      "endDate": pieTimeRange1
    }

    service.getProblemPieData(data).then(
      result=>{
        commit('saveManagePieData',result.data.data.problemPieChartNewDto)
      },
      error=>{console.log(error);}
    )

  },
  getManageTableData({commit,state},{currentPage}){
    let {organization, post, team, timeRange,
      status, grid, question, outTime} = state.manageCondition

    //整理数据
    organization = organization===""?"NN":organization
    post = post===""?"NN":post
    team = team===""?"NN":team
    status = status===""?"NN":status
    grid = grid===""?"NN":grid
    question = question===""?"NN":question
    outTime = outTime===""?"NN":outTime

    let pieTimeRange0 = timeRange===""?"NN":handleGetTime(new Date(timeRange[0]).getTime(),'date')
    let pieTimeRange1 = timeRange===""?"NN":handleGetTime(new Date(timeRange[1]).getTime(),'date')

    let tableTimeRange0 = pieTimeRange0=='NN'?pieTimeRange0:("'"+pieTimeRange0+"T00:00:00"+"'")
    let tableTimeRange1 = pieTimeRange1=='NN'?pieTimeRange1:("'"+pieTimeRange1+"T23:59:59"+"'")

    let data = {
      WhereClause: "[{FieldKey:0,JoinKey:0,Fields:orgid,ValueKey:"+organization+"}," +
      "{FieldKey:0,JoinKey:0,Fields:postid,ValueKey:"+post+"}," +
      "{FieldKey:0,JoinKey:0,Fields:committeamid,ValueKey:"+team+"}," +
      "{FieldKey:0,JoinKey:0,Fields:classificationid,ValueKey:'"+question+"'}," +
      "{FieldKey:0,JoinKey:0,Fields:pointid,ValueKey:"+grid+"}," +
      "{FieldKey:0,JoinKey:0,Fields:process,ValueKey:"+status+"}," +
      "{FieldKey:0,JoinKey:0,Fields:overstate,ValueKey:"+outTime+"}," +
      "{JoinKey:0,ValueKey:" + tableTimeRange0 + ",Fields:reporttime,FieldKey:4}," +
      "{JoinKey:2,ValueKey:" + tableTimeRange1 + ",Fields:reporttime,FieldKey:2}]",
      OrderBy:state.manageTableOrderBy,
      PageStart: currentPage,
      PageSize: 7,
      ViewName: "reportproblemsviewinfo"
    }

    service.getData(data).then(
      result=>{
        commit('updateManageTableRange',currentPage)
        commit('saveManageTableData',result.data.data)
      },
      error=>{console.log(error);}
    )
  },
  getManageInfoData({commit},{item}){
    //获取图片
    let photoData = {
      "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + item.id + ",Fields:tasksid}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 1000,
      "ViewName": "jobmonitorfilesviewinfo"
    }
    service.getData(photoData).then(
      result=>{
        commit('saveManageInfoImg',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
    //获取维修人员列表
    let maintainData = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "teamsinfo"
    }
    service.getData(maintainData).then(
      result=>{
        commit('saveManageInfoMaintainList',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
    //根据状态的不同，判断是设置信息还是修改信息
    if (item.process == 0){
      //设置信息
      //更改显示的状态
      commit('updateManageInfoFlag',true)
    }else {
      //修改信息
      //更改显示的状态
      commit('updateManageInfoFlag',false)
      let infoData = {
        "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + item.id + ",Fields:tasksid}]",
        "OrderBy": "",
        "PageStart": 1,
        "PageSize": 10000,
        "ViewName": "problemresultsviewinfo"
      }
      service.getData(infoData).then(
        result=>{
          commit('saveManageInfoMaintainData',result.data.data.dataList[0])
        },
        error=>{console.log(error);}
      )
    }
    //更改manageFlag状态
    commit('updateManageFlag',false)
  },
  submitManageAllotData({commit,dispatch},data){
    service.submitAllotData(data).then(
      result=>{
        dispatch('getManagePieData')
        commit('updateManageTableOrderBy',"[{Field:process,Mode:1}]")
        dispatch('getManageTableData',{currentPage:1})
        commit('updateManageFlag',true)
      },
      error=>{console.log(error);}
    )
  },
  updateManageAllotData({commit},data){
    service.updateAllotData(data).then(
      result=>{
        dispatch('getManagePieData')
        commit('updateManageTableOrderBy',"[{Field:process,Mode:1}]")
        dispatch('getManageTableData',{currentPage:1})
        commit('updateManageFlag',true)
      },
      error=>{console.log(error);}
    )
  },
}
const mutations = {
  updateManagePost(state,value){
    state.managePost = value
  },
  updateManageTeam(state,value){
    state.manageTeam = value
  },
  updateManageCondition(state,value){
    state.manageCondition = value
  },
  saveManageGridData(state,value){
    state.manageGrid = value
  },
  saveManageQuestionData(state,value){
    state.manageQuestion = value
  },
  saveManagePieData(state,value){
    state.managePieData = value
  },
  saveManageTableData(state,value){
    state.manageTableData = value
  },
  updateManageTableOrderBy(state,value){
    state.manageTableOrderBy = value
  },
  saveManageCurrentTable(state,value){
    state.manageCurrentTableData = value
  },
  updateManageFlag(state,value){
    state.manageFlag = value
  },
  updateManageInfoFlag(state,value){
    state.manageInfoFlag = value
  },
  saveManageInfoImg(state,value){
    state.manageInfoImg = value
  },
  saveManageInfoMaintainList(state,value){
    state.manageInfoMaintainList = value
  },
  saveManageInfoMaintainData(state,value){
    state.manageInfoMaintainData = value
  },
  updateManageTableRange(state,value){
    state.manageTableRange = value
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
