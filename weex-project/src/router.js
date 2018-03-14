import Router from 'vue-router'
import SelectStatus from '@/components/select-status'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      component: SelectStatus
    }
  ]
})
