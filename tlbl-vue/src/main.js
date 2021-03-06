import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import { handleGetTime } from './api'

Vue.use(ElementUI);
Vue.filter('handleGetTime', handleGetTime)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
