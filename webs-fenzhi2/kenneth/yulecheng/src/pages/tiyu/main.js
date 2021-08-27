console.log('page tiyu')

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'


// 引入elementui的组件 和 样式
import ElementUI from 'element-ui' // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'swiper/dist/css/swiper.css'
import axios from 'axios' // 样式文件
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


// 前置守卫
// router.beforeEach((to, from, next) => {
//     console.log('前置守卫') 
// });

router.afterEach((to, from) => {
    // console.log('后置守卫')
    // console.log(store.state.userInfo.UserId)
    if (!store.state.userInfo.UserId) {
        if (to.meta.需要登录) {
            router.push('/')
        }
    }
})

