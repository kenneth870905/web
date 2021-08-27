import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import axios from 'axios';
Vue.config.productionTip = false
axios.defaults.withCredentials = true;      // 允许携带cookie
console.log('page1 index')
// 引入elementui的组件 和 样式
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload, NumberKeyboard, CountDown , Toast } from 'vant';
var Options = {
    loading: "static/image/imgloading.gif",
    error: "static/image/imgloading2.jpg",
    attempt: 2
    // throttleWait:50000
}

console.log('NODE_ENV',process.env.NODE_ENV)

// 图片懒加载
Vue.use(Lazyload, Options);
Vue.use(NumberKeyboard);
Vue.use(CountDown);

Vue.use(Vant)
Vue.prototype.$axios = axios

import 'swiper/dist/css/swiper.css';
//复制赞贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 主要判断是否有上一页
if(!sessionStorage.sjcpPath || sessionStorage.sjcpPath==undefined || sessionStorage.sjcpPath=='undefined'){
    sessionStorage.sjcpPath = 0
}

// 前置守卫
router.beforeEach((to, from, next) => {
    sessionStorage.sjcpPath = 1
    var userinfo = store.state.user.userinfo;
    if (to.meta.需要登录) {
        if (!userinfo.UserId) {
            // router.replace('/login')
            router.push('/login')
        } else {
            next()
        }
    } else {
        next()
    }
});

//后置守卫
router.afterEach((to, from) => {
    var userinfo = store.state.user.userinfo;
    if (to.meta.需要登录) {
        if (!userinfo.UserId) {
            router.push('/login')
        }
    }
    console.log('后置守卫')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
