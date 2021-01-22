import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI,{Message,Modal} from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import axios from 'axios'
// var api = 'http://98.126.219.242'
var api = 'https://test.infuwu.com'
Vue.prototype.$api = api
axios.defaults.baseURL=api
Vue.prototype.$axios = axios

Vue.prototype.正确=(string)=>{
    Message.success({
        content:string,
        closable:true,
        duration:3
    })
}
Vue.prototype.错误=(string)=>{
    Message.error({
        content:string,
        closable:true,
        duration:3
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

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code==1001){
        console.log('登录过期，需要重新登录')
        Modal.info({
            title: '提示',
            content:"登录过期，请重新登录",
            onOk:()=>{
                router.push('/login')
            }
        })
        // MessageBox({
        //     title:"提示",
        //     message:"登录过期，请重新登录",
        //     type:"error",
        //     showClose:false,
        //     closeOnClickModal:false,
        //     confirmButtonText: '确定',
        //     callback: action => {
        //         router.push('/login')
        //     }
        // });
    }
    return response
}, function (error) {
    return Promise.reject(error);
});

// 路由拦截
router.beforeEach((to, from, next) => {
    if(to.path=='/login' || to.path=='/register'){
        next()
    }else{
        if(store.state.userInfo.id){
            next()
        }else{
            next('/login')
        }
    }
})

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
