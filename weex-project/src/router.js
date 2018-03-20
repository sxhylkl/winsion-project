import Router from 'vue-router'
import SelectStatus from '@/components/select-status'
import SelectTrain from '@/components/select-train'
import SearchTrain from '@/components/search-train'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      component: SelectStatus
    },
    {
      path: '/selectTrain',
      component: SelectTrain
    },
    {
      path: '/searchTrain',
      component: SearchTrain
    },
  ]
})
