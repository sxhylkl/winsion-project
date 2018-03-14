import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import ManageMain from '../components/manage/ManageMain.vue'
import RecordMain from '../components/record/RecordMain.vue'
import StatusMain from '../components/status/StatusMain.vue'

const routes = [
  {path: '/', component: StatusMain},
  {path: '/status', component: StatusMain},
  {path: '/manage', component: ManageMain},
  {path: '/record', component: RecordMain},
]

export default new Router({
  routes
})
