import service from '../../service'
import {handleGetTime} from '../../api'


const state = {
  statusTime: new Date(),
  statusData: [],
  statusFlag: false,
  statusCurrent: '第2候车室',
  statusCurrentFlag: false,
  statusDialogFlag: false,
  statusDialogData:{
    arr:[],
    data:{
      pointname:'',
      planstarttime:'',
      planendtime:'',
      realstarttime:'',
      realendtime:'',
      patrolsstate:'',
      committeamname:'',
    }
  }
}
const getters = {
  statusTime: state=>state.statusTime,
  statusFlag: state=>state.statusFlag,
  statusCurrent: state=>state.statusCurrent,
  statusCurrentData: state=>state.statusData.filter(d=>d.pointname == state.statusCurrent),
  statusCurrentFlag: state=>state.statusCurrentFlag,
  statusDialogFlag: state=>state.statusDialogFlag,
  statusDialogData: state=>state.statusDialogData,
  statusData: state=> {
    let arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = []
    //分组
    state.statusData.forEach(d=> {
      if (d.pointname == '第2候车室') {
        arr2.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第3候车室') {
        arr3.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第4候车室') {
        arr4.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第5候车室') {
        arr5.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第6候车室') {
        arr6.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第7候车室') {
        arr7.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第8候车室') {
        arr8.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      } else if (d.pointname == '第9候车室') {
        arr9.push({id: d.id, status: d.patrolsstate, teamName: d.committeamname})
      }
    })

    return {
      roomData2: getRoom(arr2),
      roomData3: getRoom(arr3),
      roomData4: getRoom(arr4),
      roomData5: getRoom(arr5),
      roomData6: getRoom(arr6),
      roomData7: getRoom(arr7),
      roomData8: getRoom(arr8),
      roomData9: getRoom(arr9)
    }

    //获取状态和进度
    function getRoom(arr) {
      let totalStatus, process
      let stop = [], running = [], question = [], normal = []

      arr.forEach(function (item) {
        if (item.status == '未开始') {
          stop.push(item)
        } else if (item.status == '进行中') {
          running.push(item)
        } else if (item.status == '异常') {
          question.push(item)
        } else {
          normal.push(item)
        }
      })

      if (arr.length == stop.length) {
        totalStatus = 'stop'
      } else if (arr.length == normal.length) {
        totalStatus = 'normal'
      } else if (question.length) {
        totalStatus = 'question'
      } else {
        totalStatus = 'running'
      }

      process = arr.length ? parseInt((arr.length - stop.length) / (arr.length) * 100) : 0

      return {totalStatus, process}
    }
  }
}
const actions = {
  getStatusDate({commit}, {currentTime}){

    //保存查询条件
    commit('saveStatusTime', currentTime)

    const beforeTime = handleGetTime(new Date(currentTime).getTime(), 'date')
    const countTime = new Date(beforeTime).getTime() + 24 * 60 * 60 * 1000
    const afterTime = handleGetTime(countTime, 'date')

    //组合请求条件
    const data = {
      WhereClause: "[{JoinKey:0,ValueKey:NN,Fields:postid,FieldKey:0}," +
      "{FieldKey:0,JoinKey:0,ValueKey:NN,Fields:teamid}," +
      "{JoinKey:0,ValueKey:" + beforeTime + ",Fields:planstarttime,FieldKey:4}," +
      "{JoinKey:2,ValueKey:" + afterTime + ",Fields:planendtime,FieldKey:2}]",
      OrderBy: "",
      PageStart: 1,
      PageSize: 10000,
      ViewName: "patrolsviewinfo"
    }

    service.getData(data).then(
      result=> {
        commit('saveStatusDate', result.data.data.dataList)
      },
      error=> {
        console.log(error);
      }
    )
  },
  getStatusDetails({commit}, {val}){

    let data = {
      "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + val.id + ",Fields:patrolsid}]",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 1000,
      "ViewName": "patroldetailsviewinfo"
    }

    service.getData(data).then(
      result=> {
        commit('saveStatusDialogData',{arr:result.data.data.dataList,data:val})
        commit('updateStatusDialogFlag', true)
      },
      error=> {
        console.log(error);
      }
    )
  }
}
const mutations = {
  saveStatusDate(state, value){
    state.statusData = value
    state.statusFlag = true
  },
  saveStatusTime(state, value){
    state.statusTime = value
  },
  updateStatusRoom(state, value){
    state.statusCurrent = value.current ? value.current : state.statusCurrent.current
    state.statusCurrentFlag = value.status
  },
  updateStatusDialogFlag(state, value){
    state.statusDialogFlag = value
  },
  saveStatusDialogData(state, value){
    state.statusDialogData = value
  },
  resetStatusFlag(state, value){
    state.statusCurrentFlag = false
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
