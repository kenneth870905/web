import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vant , {Dialog} from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import axios from 'axios'
axios.defaults.baseURL=api + '/public/index.php'
Vue.prototype.$img_url= api + '/runtime/storage/'
Vue.prototype.$axios = axios
Vue.use(axios)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    let token = store.state.token
    if(token){
        config.headers['authorization']=token
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
            Dialog.alert({
                title: '标题',
                message: '登录过期请重新登录',
            }).then(() => {
                console.log('点了')
                console.log(router.app.$route.path)
                router.push('/login?r='+router.app.$route.path)
            });
            // MessageBox({
            //     title:"提示",
            //     message:"登录已过期，请重新登录",
            //     type:'warning',
            //     callback:()=>{
            //         if(router.app.$route.path!='/login'){
            //             router.push('/login')
            //         }
            //     }
            // })
        }
    }
    return response.data
}, function (error) {
    return Promise.reject(error);
});



// 自定义属性
Vue.prototype.$back=()=>{
    history.back()
}



new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
