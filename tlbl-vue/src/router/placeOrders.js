import ChooseTrain from '../components/place_orders/choose_train/ChooseTrain.vue';
import SearchTrain from '../components/place_orders/search_train/SearchTrain.vue';
import TrainList from '../components/place_orders/train_list/TrainList.vue';

import NewOrder from '../components/place_orders/new_order/NewOrder.vue';
import NewOrderInfo from '../components/place_orders/new_order/routes/NewOrderInfo.vue';
import NewOrderTrain from '../components/place_orders/new_order/routes/NewOrderTrain.vue';
import NewOrderPrice from '../components/place_orders/new_order/routes/NewOrderPrice.vue';

import WaitAcceptance from '../components/place_orders/wait_acceptance/WaitAcceptance.vue';
import WaitCheck from '../components/place_orders/wait_check/WaitCheck.vue';

export const placeOrders = [
  {
    path: '/chooseTrain', component: ChooseTrain
  },
  {
    path: '/searchTrain', component: SearchTrain
  },
  {
    path: '/trainList', component: TrainList
  },
  {
    path: '/newOrder', component: NewOrder,
    children: [
      {path: '', component: NewOrderTrain},
      {path: 'train', component: NewOrderTrain},
      {path: 'price', component: NewOrderPrice},
      {path: 'info', component: NewOrderInfo}
    ]
  },
  {
    path: '/waitAcceptance', component: WaitAcceptance
  },
  {
    path: '/waitCheck', component: WaitCheck
  },
]
