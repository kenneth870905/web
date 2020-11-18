import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'



import Vant from 'vant';
import 'vant/lib/index.css';
import { Sticky } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Vant);
Vue.use(Sticky);
Vue.use(Lazyload);



// 解构引入组件
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.prototype.$back = function () {
    history.back();
}

//复制赞贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
