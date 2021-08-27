import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)


import ElementPlus ,{ElMessageBox}  from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';

import axios from 'axios'
axios.defaults.baseURL= api+'public/index.php/index/'
app.config.globalProperties.$api = api


axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.videoUpdate
    if(token){
        config.headers['Authorization']='bearer '+token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code==-1){
        ElMessageBox({
            title:"提示",
            message:"登录已过期，请重新登录",
            type:'warning',
            callback:()=>{
                ElMessageBox.close()
                localStorage.removeItem('videoUpdate')
                if(router.currentRoute.value!='/login'){
                    router.push('/login')
                }
            }
        })
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
app.config.globalProperties.$axios = axios


// 导航守卫
router.beforeEach((to, from, next) => {
    if(to.path=='/login'){
        next()
    }else{
        let token = localStorage.videoUpdate
        if(token){
            next()
        }else{
            next('/login')
        }
    }
})


app.use(ElementPlus).use(store).use(router).mount('#app')




