import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//引入各个模块
import common from './modules/common'
import manage from './modules/manage'
import record from './modules/record'
import status from './modules/status'

export default new Vuex.Store({
  ...common,
  modules: {
    status,
    record,
    manage,
  }
})
