import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//引入各个模块
import content1 from './modules/content1.js'
import content2 from './modules/content2.js'
import content3 from './modules/content3.js'
import content4 from './modules/content4.js'
import content5 from './modules/content5.js'
import content6 from './modules/content6.js'
import content7 from './modules/content7.js'
import content8 from './modules/content8.js'
import content9 from './modules/content9.js'

import content10_1 from './modules/content10/content10-1.js'

import content11_1 from './modules/content11/content11-1.js'
import content11_2 from './modules/content11/content11-2.js'

import content12 from './modules/content12.js'
import content13 from './modules/content13.js'

import content14_1 from './modules/content14/content14-1.js'
import content14_2 from './modules/content14/content14-2.js'
import content14_3 from './modules/content14/content14-3.js'


export default new Vuex.Store({
  modules: {
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,
    content8,
    content9,
    content10_1,
    content11_1,
    content11_2,
    content12,
    content13,
    content14_1,
    content14_2,
    content14_3
  }
})
