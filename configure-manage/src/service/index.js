import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
//西站
//export const URL = "http://10.0.0.2:9411";
//export const MQIP = "10.0.0.2";
//公司
//export const URL = "http://172.16.6.11:9411";
//export const URL = "http://172.16.0.17:9411";
//export const MQIP = "172.16.0.17";
//郑州
//export const URL = "http://10.0.0.24:9411";
//export const MQIP = "10.0.0.24";
export const MQPORT = 61614;
//测试
export const URL = "http://172.16.6.6:9411";
export const MQIP = "172.16.6.6";

export default {
  //content查询，增加，修改，删除
  contentGetData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/findByBaseCondition`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  contentAddData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/insertOperator`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  contentUpdateData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/updateOperator`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  contentDeleteData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/deleteOperator`,{data:JSON.stringify(data)},{headers: {}, emulateJSON: true});
  },
  contentGetAreaNodeData(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/areaNodeList`,data,{headers: {}, emulateJSON: true});
  },
  contentStartCheck(data) {
    return Vue.http.post(`${URL}/kingkong/0.01/device/changeCheckStatus?runsId=${data.runsId}&flag=${data.flag}`,{},{headers: {}, emulateJSON: true});
  },
  contentSetMq(mqName,clientId,callback){
    //监听端口
    let client = new Paho.MQTT.Client(MQIP, MQPORT, clientId);
    //处理mq
    client.onMessageArrived = function (message) {
      callback(message)
    };
    //监听字段
    client.connect({
      onSuccess() {
        mqName.forEach(d=>client.subscribe(d))
      }
    });
    //失败情况
    client.onConnectionLost = function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };
  }
}
