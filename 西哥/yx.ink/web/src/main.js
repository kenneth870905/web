import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI , {Loading,Message , MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
// 图片放大
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
Vue.use(VuePhotoZoomPro)
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 滑块验证
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify)


Vue.config.productionTip = false


Vue.prototype.正确 = (string) => {
    Message.success({
        showClose: true,
        message: string,
        type: 'success'
    })
}
Vue.prototype.错误 = (string) => {
    Message.error({
        showClose: true,
        message: string,
        type: 'error'
    })
}

import axios from 'axios'
axios.defaults.baseURL= api + '/public/index.php'
Vue.prototype.$img_url= (typeof img=='undefined' ? api : img) + '/runtime/storage/'
Vue.prototype.$axios = axios

var loadingInstance =''
Vue.prototype.$Loading = (type)=>{
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
    let token = store.state.token
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
                    store.state.token = ''
                    store.state.userInfo = {}
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
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
