import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker';


import { Toast , Dialog} from 'vant';

import axios from 'axios';
axios.defaults.baseURL = api_url; //这是调用数据接口
// http request 拦截器
// console.log(store);
axios.interceptors.request.use(
    config => {
        if(store.state.user.token){
            config.headers.Authorization ='bearer '+store.state.user.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(
    function (response) {
        // console.log(response);
        return response;
    },
    function (error) {
        if (error && error.response) {
            return error.response;
        }
        return Promise.reject(error); // 返回接口返回的错误信息
    }
);
Vue.prototype.$axios = axios;


import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
Vue.use(Vant);
Vue.use(Lazyload, {
    lazyComponent: true
});
// 轮播样式
import 'swiper/css/swiper.css';

Vue.prototype.$back = () => {
    history.back()
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
    // console.log('前置守卫')
    if(to.meta.testTonken){
        if(!store.state.user.token有效){
            console.log('需要登录1')
            Dialog.alert({
                title: '提示',
                message: '登录信息失效，请重新登录'
            }).then(() => {
                // router.push('/login')
                next('/login')
            });
        }else{
            next()    
        }
    }else{
        next()
    }
})
router.afterEach((to, from) => {
    setTimeout(() => Toast.clear(), 300);
    // console.log('解析守卫')
    if(to.meta.testTonken){
        // console.log(store.state.user.token有效)
        if(!store.state.user.token有效){
            Dialog.alert({
                title: '提示',
                message: '登录信息失效，请重新登录'
            }).then(() => {
                router.replace('/login')
            });
            console.log('需要登录2')
        }
    }
})


