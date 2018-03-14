/**
 * Created by yanfa on 2017/9/12.
 */
import service from '../../service'
import {handleGetTime} from '../../api'
const state = {
  recordPost:[],
  recordTeam:[],
  recordCondition:{
    organization:'',
    post:'',
    team:'',
    timeRange:''
  },
  recordPieData:{userInplace:'',userOutplace:'',placePercent:0,patrolComp:'',
    patrolUncomp:'',patrolPercent:0,patrolNormal:'',patrolAbnormal:'',patrolRate:0},
  recordTableData:[],
  recordTableDataRange:0,
  recordTableDataCount:{
    all:0,
    normal:0,
    stop:0,
    running:0,
    question:0,
  },
  recordTableInfoData:[],
  recordTableInfoDataIndex:-1,
  recordTableDataSelect:''
}
const getters = {
  recordPost:state=>{
    return [{postid:'',postname:'全部'},...state.recordPost]
  },
  recordTeam:state=>{
    return [{teamid:'',teamsName:'全部'},...state.recordTeam]
  },
  recordCondition:state=>state.recordCondition,
  recordPieData:state=>{
    let {userInplace,userOutplace,placePercent,patrolComp,
      patrolUncomp,patrolPercent,patrolNormal,patrolAbnormal,patrolRate} = state.recordPieData

    //整合3个饼图的数据
    let pieData1 = {
      name1:userInplace,
      name2:userOutplace,
      percent:`${parseInt(placePercent * 100)}%`,
      data:[{value: userInplace, name: '到位'}, {value: userOutplace, name: '未到位'}]
    }

    let pieData2 = {
      name1:patrolComp,
      name2:patrolUncomp,
      percent:`${parseInt(patrolPercent * 100)}%`,
      data:[{value: patrolComp, name: '完成'}, {value: patrolUncomp, name: '未完成'}]
    }

    let pieData3 = {
      name1:patrolNormal,
      name2:patrolAbnormal,
      percent:`${parseInt(patrolRate * 100)}%`,
      data:[{value: patrolNormal, name: '巡视正常'}, {value: patrolAbnormal, name: '发现问题'}]
    }

    return{
      pieData1,
      pieData2,
      pieData3,
    }

  },
  recordTableDataCount:state=>state.recordTableDataCount,
  recordTableData:state=>{
    //获取总数量，页数，当前页的数据
    let len = state.recordTableData.length
    let page = (len%7==0)?(len/7):(parseInt(len/7)+1)
    let range1 = state.recordTableDataRange*7
    let range2 = range1 + 7
    let data = state.recordTableData.filter((d,i)=>range1<=i<range2)
    return{page, data}
  },
  recordTableDataRange:state=>state.recordTableDataRange,
  recordTableInfoDataIndex:state=>state.recordTableInfoDataIndex,
  recordTableInfoData:state=>state.recordTableInfoData,
  recordTableDataSelect:state=>state.recordTableDataSelect,
}
const actions = {
  getRecordPost({commit},{val}){
    commit('updateRecordPost',[])
    commit('updateRecordTeam',[])
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
        commit('updateRecordPost',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
  },
  getRecordTeam({commit},{val}){
    commit('updateRecordTeam',[])
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
        commit('updateRecordTeam',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
  },
  getRecordPieData({commit,state}){
    //获取数据,并整理
    let {organization,post,team,timeRange} = state.recordCondition
    organization = organization===""?"NN":organization
    post = post===""?"NN":post
    team = team===""?"NN":team

    //获取饼图数据
    let pieTimeRange0 = timeRange===""?"NN":handleGetTime(new Date(timeRange[0]).getTime(),'date')
    let pieTimeRange1 = timeRange===""?"NN":handleGetTime(new Date(timeRange[1]).getTime(),'date')
    let pieData = {
      "porganiazationId":organization,
      "ppostId": post,
      "pteamId": team,
      "startDate": pieTimeRange0,
      "endDate": pieTimeRange1
    }
    service.getPieData(pieData).then(
      result=>{
        commit('saveRecordPieData',result.data.data)
      },
      error=>{console.log(error);}
    )
  },
  getRecordTableData({commit,state},{status}){
    //情况数据
    commit('saveRecordTableData',[])
    //使展开内容闭合
    commit('saveRecordTableInfoDataIndex',-1)
    //获取数据,并整理
    let {organization,post,team,timeRange} = state.recordCondition
    organization = organization===""?"NN":organization
    post = post===""?"NN":post
    team = team===""?"NN":team

    let pieTimeRange0 = timeRange===""?"NN":handleGetTime(new Date(timeRange[0]).getTime(),'date')
    let pieTimeRange1 = timeRange===""?"NN":handleGetTime(new Date(timeRange[1]).getTime(),'date')

    let tableTimeRange0 = pieTimeRange0=='NN'?pieTimeRange0:("'"+pieTimeRange0+"T00:00:00"+"'")
    let tableTimeRange1 = pieTimeRange1=='NN'?pieTimeRange1:("'"+pieTimeRange1+"T23:59:59"+"'")
    //获取表格数据
    let tableData = {
      WhereClause: "[{JoinKey:0,ValueKey:" + organization + ",Fields:orgid,FieldKey:0}," +
      "{JoinKey:0,ValueKey:" + post + ",Fields:postid,FieldKey:0}," +
      "{FieldKey:0,JoinKey:0,ValueKey:" + team + ",Fields:teamid}," +
      "{JoinKey:0,ValueKey:" + tableTimeRange0 + ",Fields:planstarttime,FieldKey:4}," +
      "{JoinKey:2,ValueKey:" + tableTimeRange1 + ",Fields:planendtime,FieldKey:2}]",
      OrderBy: "",
      PageStart: 1,
      PageSize: 10000,
      ViewName: "patrolsviewinfo"
    }
    service.getData(tableData).then(
      result=>{
        //更改序号值
        commit('saveRecordTableDataRange',0)

        let current = [],all=[],normal=[],stop=[],running=[],question=[]
        let dataList = result.data.data.dataList

        dataList.forEach(d=>{
          //全部
          all.push(d)
          //各种类型的分类
          if(d.patrolsstate=='正常'){
            normal.push(d)
          }else if(d.patrolsstate=='未开始'){
            stop.push(d)
          }else if(d.patrolsstate=='进行中'){
            running.push(d)
          }else if(d.patrolsstate=='异常'){
            question.push(d)
          }
          //根据条件筛选
          if(d.patrolsstate.search(status)!=-1){
            current.push(d)
          }
        })
        commit('saveRecordTableDataCount',{
          all:all.length,
          normal:normal.length,
          stop:stop.length,
          running:running.length,
          question:question.length,
        })

        commit('saveRecordTableData',current)
      },
      error=>{console.log(error);}
    )


  },
  getRecordTableInfoData({commit},{index,id}){
    //获取详情
    let data = {
      "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + id + ",Fields:patrolsid}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 10000,
      "ViewName": "patroldetailsviewinfo"
    }

    service.getData(data).then(
      result=>{
        //保存当前选中位置
        commit('saveRecordTableInfoDataIndex',index)
        //保存详情数据
        commit('saveRecordTableInfoData',result.data.data.dataList)
      },
      error=>{console.log(error);}
    )
  }
}
const mutations = {
  updateRecordPost(state,value){
    state.recordPost = value
  },
  updateRecordTeam(state,value){
    state.recordTeam = value
  },
  updateRecordCondition(state,value){
    state.recordCondition = value
  },
  saveRecordPieData(state,value){
    state.recordPieData = value
  },
  saveRecordTableDataCount(state,value){
    state.recordTableDataCount = value
  },
  saveRecordTableData(state,value){
    state.recordTableData = value
  },
  saveRecordTableInfoDataIndex(state,value){
    state.recordTableInfoDataIndex = value
  },
  saveRecordTableInfoData(state,value){
    state.recordTableInfoData = value
  },
  saveRecordTableDataRange(state,value){
    state.recordTableDataRange = value
  },
  saveRecordTableSelectData(state,value){
    state.recordTableDataSelect = value
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
