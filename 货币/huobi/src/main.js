import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$Loading = function(t){
    store.dispatch('loading',t)
} 

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
axios.defaults.baseURL = api_url
// axios.defaults.baseURL = 'http://test.yooy8.com'

axios.interceptors.request.use(
    function(config) {
    // 设置统一的请求头
    var token = store.state.user2.token
    if (token) {
        config.url = config.url + '?token=' + token
        // config.headers.Authorization = "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEyMzQ1NiwiYXVkIjoiIiwiZXhwIjoxNTg3OTIyMjEwLCJpYXQiOjE1ODc5MjE2MTAsImlzcyI6IiIsImp0aSI6ImI4YzExODQ5MjJiM2E2NzI4NmJlMTZlNDQ5ODY3NzczIiwibmJmIjoxNTg3OTIxNjEwLCJzdWIiOiIifQ.cwVtse4FbYLDyyTtnzKGzM7tpfRdWcVXC_kD9NSJs_s"
    }
    return config;
    },
    function(error) {
    return Promise.reject(error);
})
    // 响应错误处理
axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response) {
            // token 失效
            if(err.response.data.message == 'Token Signature could not be verified.'){
                router.push('/login')
            }
            console.log(err.response)
            return err.response
        }
        return Promise.reject(err);
    }
);



import '@/icons' // icon
// 权限
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    // Vue.use(ElementUI)

Vue.config.productionTip = false



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})