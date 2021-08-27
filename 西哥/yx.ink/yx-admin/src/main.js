import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI , {Message , MessageBox , Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
        // 路由验证和一些其他的 不要
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock')
//     mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false


Vue.prototype.正确=(string)=>{
    Message.success({
        showClose: true,
        message:string,
        type: 'success'
    })
}
Vue.prototype.错误=(string)=>{
    Message.error({
        showClose: true,
        message:string,
        type: 'error'
    })
}

import axios from 'axios'
axios.defaults.baseURL= api + '/public/index.php'
Vue.prototype.$img_url= (typeof img=='undefined' ? api : img) + '/runtime/storage/'
Vue.prototype.$axios = axios
var loadingInstance =''

Vue.prototype.$Loadading = (type)=>{
    console.log(123)
    if(type){
        loadingInstance = Loading.service({
            background:'rgba(255,255,255,0.4)'
        });
    }else{
        loadingInstance.close();
    }
}


Vue.use(axios)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let token = store.state.user.token
    if(token){
        config.headers['Authorization']=token
    }
    // config.headers['X-Token'] = token;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code==1001){
        console.log('登录过期，需要重新登录')
        if(router.app.$route.path!='/login'){
            MessageBox({
                title:"提示",
                message:"登录已过期，请重新登录",
                type:'warning',
                callback:()=>{
                    if(router.app.$route.path!='/login'){
                        router.push('/login')
                    }
                }
            })
        }
    }
    return response.data
}, function (error) {
    return Promise.reject(error);
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
