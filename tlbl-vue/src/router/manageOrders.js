import Complain from '../components/manage_orders/complain/Complain.vue';
import ComplaintList from '../components/manage_orders/complain_list/ComplaintList.vue';
import Judge from '../components/manage_orders/judge/Judge.vue';
import JudgeDetail from '../components/manage_orders/judge_detail/JudgeDetail.vue';
import OrderList from '../components/manage_orders/order_list/OrderList.vue';
import AllOrders from '../components/manage_orders/order_list/routes/AllOrders.vue';
import PickupOrders from '../components/manage_orders/order_list/routes/PickupOrders.vue';
import TakeOrders from '../components/manage_orders/order_list/routes/TakeOrders.vue';
import OrderDetail from '../components/manage_orders/order_detail/OrderDetail.vue';


export const manageOrders = [
  {
    path: '/orderList', component: OrderList,
    children:[
      { path: '', component: AllOrders  },
      { path: 'all', component: AllOrders },
      { path: 'current', component: PickupOrders },
      { path: 'history', component: TakeOrders },
    ]
  },
  {
    path: '/complain', component: Complain
  },
  {
    path: '/complaintList', component: ComplaintList
  },
  {
    path: '/judge', component: Judge
  },
  {
    path: '/judgeDetail', component: JudgeDetail
  },
  {
    path: '/orderDetail', component: OrderDetail
  }
]
