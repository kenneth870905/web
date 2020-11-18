import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import Vuex from 'vuex'
// import store from './store/store'

// Vue.use(Vuex)



// 引入elementui的组件 和 样式
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 注册（使用）elementui
Vue.use(ElementUI);


import Vant from 'vant';
import { Dialog } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 解构引入组件
import { Message } from 'element-ui';
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.prototype.$back = function () {
    history.back();
}

//复制赞贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)



//添加一个请求拦截器
var 无Authorization名单 = [
        '/api/Account/GetSmsCode',  //获取短信验证码
        '/api/Account/Register',    //注册
        '/api/Account/login',       //登录
        'api/Account/RefreshToken', //刷新token
        '/api/Account/Logout'       //退出
    ]
// var 无Authorization名单 = ['/api/Contract/CreateContract']
axios.interceptors.request.use(function (config) {
    var url=config.url
    var obj=无Authorization名单.find(x=>url.includes(x));
    if(!obj){
        var access_token=store.state.token.access_token
        if (access_token) {
            config.headers.common['Authorization'] ='Bearer '+access_token;
        }
    }
    return config;
  }, function (error) {
    console.info(error);
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response)
    // console.log('响应拦截器关闭')
    // if (response.data.code == 0) {
    //     return response
    // } else if (response.data.msg && response.data.msg != '成功') {
    //     return Promise.reject(response)
    // }
        return response
    }, function (error) {
        if(typeof error.response == 'object'){
            console.log('有error.response:',error.response);
            var response=error.response;
                response.data.msg = response.data.Msg ? response.data.Msg : response.data.msg
            if(response.data.code==401){
                let url = response.config.url;
                let data=''
                try {
                    data = JSON.parse(response.config.data) ;                    
                } catch (error) {
                    data = response.config.data ;                     
                }
                let method= response.config.method;
                console.log('需要重新获取token');
                store.dispatch('重新换取token').then(x=>{
                    console.log('刷新token成功');
                    axios({
                        method: method,
                        url: url,
                        data: data
                    }).then(x1=>{
                        console.log(x1)
                        return Promise.resolve(x1)
                    }).catch(err1=>{
                        console.log(err1)
                        return Promise.reject(err1)
                    })
                }).catch(err=>{
                    console.log('刷新token失败')
                    Dialog.alert({ title: '提示', message: '换取token失败，需要重新登录'}).then(() => {
                        router.push('/login');
                    });
                })
            }else{
                console.log('非401错误');
                return Promise.resolve(response) // 可在组件内获取到服务器返回信息
            }
        }else{
             // 对响应错误做处理
            return Promise.reject(error)
        }
})


router.beforeEach((to, from, next) => {
    // 获取token
    const token = window.localStorage.getItem('access_token');
    if (token) {
        // 直接放行
        next();
    } else {  // 否则是没有
        // 如果去的是登录页
        if (to.path === '/login' || to.path === '/' || to.path === '/register' || '/information' || '/czjl' )  {
            // 直接放行
            next();
        } else {
            // 如果去的是其他页,跳转到登录页
            Message.error('请登录以后再操作！')
            // 跳转到登录页
            return next({ "path": "/login" })
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
