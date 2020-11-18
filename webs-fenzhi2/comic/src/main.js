import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './libs/rem.js'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios;
//vant UI组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import { Lazyload } from 'vant';

var Options = {
  loading: 'images/loading.gif',
  error: 'images/loading.gif'
}
Vue.use(Lazyload, Options)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
