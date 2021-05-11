import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import './directives'

import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

// 注册全局组件
import userPopover from '@/components/用户弹框.vue'
Vue.component('userPopover', userPopover)

Vue.config.productionTip = false

import moment from 'moment'
// 北京时间
Vue.filter('bjTime', function (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    // return moment(daraStr).format(pattern)
    if(store.state.BjTime.show){
        return moment(daraStr).isValid() ? moment(daraStr).add(150,'minute').format(pattern) : daraStr
    }else{
        return ''
    }
})

import ElementUI, { Message , MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.正确 = (str) => {
    Message({ showClose: true, message: str, type: 'success' });
}
Vue.prototype.错误 = (str) => {
    Message({ showClose: true, message: str, type: 'error' });
}
// this.错误('System error, try again later')

router.beforeEach((to, from, next) => {
    // console.log(to)
    // 添加tag
    if(to.path!='/' && to.meta.title && !to.meta.notag){
        if(!store.state.tag.find(x=>x.path==to.path)){
            let obj = {
                path:to.path,
                fullPath:to.fullPath,
                meta:to.meta
            }
            store.commit('addTag', obj)
        }
    }

    if(to.path!='/login'){
        if(!store.state.token){
            next('/login')
        }else{
            next()
        }
    }else{
        next()
    }
})


import axios from 'axios'
axios.defaults.baseURL = api
// axios.defaults.headers.post['Content-Type'] = 'application/json'    //主要是去掉 charset=utf-8
Vue.prototype.$axios = axios

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = store.state.token
    if(token){
        config.headers['Authorization']=token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.msg=='Please log in first'){
        console.log('登录过期，需要重新登录')
        if(router.app.$route.path!='/login'){
            MessageBox({
                title:"提示",
                message:"登录已过期，请重新登录",
                type:'warning',
                callback:()=>{
                    MessageBox.close()
                    store.commit('setToken','')
                    if(router.app.$route.path!='/login'){
                        router.push('/login')
                    }
                }
            })
        }
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
