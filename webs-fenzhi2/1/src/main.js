import Vue from 'vue'
import App from './App.vue'
import router from './router'
//使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;


import { Swipe, SwipeItem, Tabbar, TabbarItem , NoticeBar, Field, NavBar,Tab, Tabs, Row, Col} from 'vant';
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(NoticeBar);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Tab).use(Tabs);
Vue.use(Row).use(Col);

Vue.config.productionTip = false


//vue-blu ui库
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
Vue.use(VueBlu)



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
