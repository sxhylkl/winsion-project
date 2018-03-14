import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//1.引入对应的路由
import Conternt1 from '../components/content1/Content.vue'
import Conternt2 from '../components/content2/Content.vue'
import Conternt3 from '../components/content3/Content.vue'
import Conternt4 from '../components/content4/Content.vue'
import Conternt5 from '../components/content5/Content.vue'
import Conternt6 from '../components/content6/Content.vue'
import Conternt7 from '../components/content7/Content.vue'
import Conternt8 from '../components/content8/Content.vue'
import Conternt9 from '../components/content9/Content.vue'
import Content10_1 from '../components/content10/content10-1/Content.vue'
import Content11_1 from '../components/content11/content11-1/Content.vue'
import Content11_2 from '../components/content11/content11-2/Content.vue'
import Content12 from '../components/content12/Content.vue'
import Content13 from '../components/content13/Content.vue'
import Content14_1 from '../components/content14/content14-1/Content.vue'
import Content14_2 from '../components/content14/content14-2/Content.vue'
import Content14_3 from '../components/content14/content14-3/Content.vue'


// 2. 定义路由
const routes = [
  {
   path: '/', component: Conternt1
   },
  {
    path: '/content1', component: Conternt1
  },
  {
    path: '/content2', component: Conternt2
  },
  {
    path: '/content3', component: Conternt3
  },
  {
    path: '/content4', component: Conternt4
  },
  {
    path: '/content5', component: Conternt5
  },
  {
    path: '/content6', component: Conternt6
  },
  {
    path: '/content7', component: Conternt7
  },
  {
    path: '/content8', component: Conternt8
  },
  {
    path: '/content9', component: Conternt9
  },
  {
    path: '/content10-1', component: Content10_1
  },
  {
    path: '/Content11-1', component: Content11_1
  },
  {
    path: '/content11-2', component: Content11_2
  },
  {
    path: '/content12', component: Content12
  },
  {
    path: '/content13', component: Content13
  },
  {
    path: '/content14-1', component: Content14_1
  },
  {
    path: '/content14-2', component: Content14_2
  },
  {
    path: '/content14-3', component: Content14_3
  },
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});
export default router;
