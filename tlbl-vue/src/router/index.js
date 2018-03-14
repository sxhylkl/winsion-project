import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 1. 定义（路由）组件
import { menu } from './menu'
import { placeOrders } from './placeOrders'
import { manageOrders } from './manageOrders'


// 2. 定义路由
const routes = [
  ...menu,
  ...placeOrders,
  ...manageOrders
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});
export default router;
