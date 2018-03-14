import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

//线下
export const URL = "http://172.16.0.17:9411";

export default {
  getData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/job/gridFindByBaseCondition`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  getPieData(data) {
    return Vue.http.post(`${URL}/grid/0.01/patrol/getPatrolPieChartData`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  getProblemPieData(data) {
    return Vue.http.post(`${URL}/grid/0.01/patrol/getProblemPieChartData`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  submitAllotData(data){
    let params = ''
    for(let each in data){
      params += `${each}=${data[each]}&`
    }
    params = params.substring(0,params.length-1)
    return Vue.http.post(`${URL}/grid/0.01/allocate/problemAllocate?${params}`,{headers: {}, emulateJSON: true});
  },
  updateAllotData(data){
    let params = ''
    for(let each in data){
      params += `${each}=${data[each]}&`
    }
    params = params.substring(0,params.length-1)
    return Vue.http.post(`${URL}/grid/0.01/patrol/getProblemPieChartData?${params}`,{headers: {}, emulateJSON: true});
  },
}
