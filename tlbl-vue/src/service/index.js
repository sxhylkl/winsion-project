import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

//线下
//export const URL = "http://172.16.5.34:9210";
//线上
export const URL = "http://mobile-api.tlbl.winsion.net";

export default {
  updateUserAgreeTransferService(data) {
    return Vue.http.post(`${URL}/user/updateUserAgreeTransferService`, data, {headers: {}, emulateJSON: true});
  },
  getNoPayOrder: function (data) {
    return Vue.http.post(`${URL}/vas/getNoPayOrder`, data, {headers: {}, emulateJSON: true});
  },
  getAllTrainMessage: function (data) {
    return Vue.http.post(`${URL}/vas/getAllTransferTrainList`, data, {headers: {}, emulateJSON: true});
  },
  isAccordTransferOrderRequest: function (data) {
    return Vue.http.post(`${URL}/vas/isAccordTransferOrderRequest`, data, {headers: {}, emulateJSON: true});
  },
  getCodeResolveResult: function (data) {
    return Vue.http.post(`${URL}/vas/getCodeResolveResult`, data, {headers: {}, emulateJSON: true});
  },
  searchTrainMsgByStationAndTrainNumber: function (data) {
    return Vue.http.post(`${URL}/vas/searchTrainMsgByStationAndTrainNumber`, data, {headers: {}, emulateJSON: true});
  },
  getRecentContacts: function (data) {
    return Vue.http.post(`${URL}/v3/vas/getRecentContacts`, data, {headers: {}, emulateJSON: true});
  },
  deleteRecentContacts: function (data) {
    return Vue.http.post(`${URL}/v3/vas/deleteRecentContacts`, data, {headers: {}, emulateJSON: true});
  },
  getTransferPointList: function (data) {
    return Vue.http.post(`${URL}/vas/getTransferPointList`, data, {headers: {}, emulateJSON: true});
  },
  getGoodsList: function (data) {
    return Vue.http.post(`${URL}/vas/getGoodsList`, data, {headers: {}, emulateJSON: true});
  },
  commitTransferOrder: function (data) {
    return Vue.http.post(`${URL}/vas/commitTransferOrder`, data, {headers: {}, emulateJSON: true});
  },
  getTransferOrderList: function (data) {
    return Vue.http.post(`${URL}/vas/getTransferOrderList`, data, {headers: {}, emulateJSON: true});
  },
  cancel: function (data) {
    return Vue.http.post(`${URL}/pay/cancel`, data, {headers: {}, emulateJSON: true});
  },
  deleteTransferOrder: function (data) {
    return Vue.http.post(`${URL}/vas/deleteTransferOrder`, data, {headers: {}, emulateJSON: true});
  },
  updateOrderExecuteStatus: function (data) {
    return Vue.http.post(`${URL}/vas/updateOrderExecuteStatus`, data, {headers: {}, emulateJSON: true});
  },
  completeTransferOrder: function (data) {
    return Vue.http.post(`${URL}/vas/completeTransferOrder`, data, {headers: {}, emulateJSON: true});
  },
  getTransferOrderDetail: function (data) {
    return Vue.http.post(`${URL}/vas/getTransferOrderDetail`, data, {headers: {}, emulateJSON: true});
  },
  addOrderComplaint: function (data) {
    return Vue.http.post(`${URL}/vas/addOrderComplaint`, data, {headers: {}, emulateJSON: true});
  },
  getTransferStaffList: function (data) {
    return Vue.http.post(`${URL}/vas/getTransferStaffList`, data, {headers: {}, emulateJSON: true});
  },
  getTransferOrderRateDetail: function ( data) {
    return Vue.http.post(`${URL}/vas/getTransferOrderRateDetail`, data, {headers: {}, emulateJSON: true});
  },
  commitTransferOrderRate: function ( data) {
    return Vue.http.post(`${URL}/vas/commitTransferOrderRate`, data, {headers: {}, emulateJSON: true});
  },
  getComplaintOrderList: function (data) {
    return Vue.http.post(`${URL}/vas/getComplaintOrderList`, data, {headers: {}, emulateJSON: true});
  }
}
