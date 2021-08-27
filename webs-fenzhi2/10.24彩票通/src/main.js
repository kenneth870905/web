import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 




// 引入elementui的组件 和 样式
// import ElementUI from 'element-ui'; // 组件文件（js）
// import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 注册（使用）elementui
// Vue.use(ElementUI);


import Vant from 'vant';
// import { Sticky } from 'vant';
// import { Dialog } from 'vant';
import 'vant/lib/index.css';
// Vue.use(Sticky);

Vue.use(Vant);

import 'swiper/dist/css/swiper.css';

// 解构引入组件
// import { Message } from 'element-ui';
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
