import service from '../../service'
import { getCookie } from '../../api'

const state = {
  userId:getCookie('WinsionUserID'),
  commonOrganization:[]
}
const getters = {
  commonOrganization:state=>{
    return [{orgid:'',orgname:'全部'},...state.commonOrganization]
  }
}
const actions = {
  getCommonList({commit}){
    //获取部门
    let organization = {
      "WhereClause": "",
      "OrderBy": "",
      "PageStart": 1,
      "PageSize": 100,
      "ViewName": "orgnizationinfo"
    }
    service.getData(organization).then(
      result=>{
        commit('saveCommonOrgList',result.data.data.dataList)
      },
      error=>{console.log(error)}
    )
  },
}
const mutations = {
  saveCommonOrgList(state,value){
    state.commonOrganization = value
  },
}


export default {
  state,
  getters,
  actions,
  mutations
}
