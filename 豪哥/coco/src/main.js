import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI,{Message} from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import axios from 'axios'
var api = 'http://98.126.219.242'
Vue.prototype.$api = api
axios.defaults.baseURL=api
Vue.prototype.$axios = axios

Vue.prototype.正确=(string)=>{
    Message.success({
        content:string,
        closable:true,
        duration:2
    })
}
Vue.prototype.错误=(string)=>{
    Message.error({
        content:string,
        closable:true,
        duration:2
    })
}

Vue.config.productionTip = false

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let url = config.url
    if(url!='/api/auth/login' && url!='/api/auth/register'){
        let token = store.state.userInfo.token
        config.headers['X-Token'] = token; 
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
