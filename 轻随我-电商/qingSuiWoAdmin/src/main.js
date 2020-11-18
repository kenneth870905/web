import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI, { Loading , MessageBox  } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
// import { compileToFunctions } from 'vue-template-compiler';

axios.defaults.baseURL = api_url
Vue.prototype.$axios = axios
Vue.prototype.$api_url = api_url



var Vueloading = ''
Vue.prototype.$loading = (type) => {
    if (type) {
        Vueloading = Loading.service({
            background:'rgba(0,0,0,.4)',
            text:"正在加载"
        });
    } else {
        setTimeout(() => {
            try {
                Vueloading.close()
            } catch (error) {
            }
        }, 300);
    }
}

// axios.post(url,params)
// .then(res => {
//     console.log(res)
// })
// .catch(err => {
//     console.error(err); 
// })
// axios.get(url,params)
// .then(res => {
//     console.log(res)
// })
// .catch(err => {
//     console.error(err); 
// })

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // let urlList = ['/api/auth/loginadmin'];
    let url = config.url
    if(url!='/api/auth/loginadmin'){
        let token = store.state.loginInfo.token
        config.headers['X-Token'] = token; 
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    var data =response.data
    if(data.code==1001){
        MessageBox({
            title:"提示",
            message:"登录过去需要重新登录",
            type:"error",
            showClose:false,
            closeOnClickModal:false,
            confirmButtonText: '确定',
            callback: action => {
                router.push('/login')
            }
        });
    }
    return data
}, function (error) {
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
    if(to.path!='/login' && !store.state.loginInfo.id){
        next('/login')
    }
    next()
})



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
