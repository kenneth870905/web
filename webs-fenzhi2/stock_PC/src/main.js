import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'


// 引入elementui的组件 和 样式
import ElementUI from 'element-ui'; // 组件文件（js）
import { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件

// 注册（使用）elementui
Vue.use(ElementUI);


// 引入request.js
import req from '@/api/api.js';
// 把axios挂在Vue的原型上 所有vue的实例对象共享
Vue.prototype.req = req;

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false;
Vue.prototype.imgAdrees = "https://www.zo138.com";
// https://www.zo138.com/imgs/logo-2.png


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
    var url = config.url
    var obj = 无Authorization名单.find(x => url.includes(x));
    if (!obj) {
        var access_token = store.state.token.access_token
        if (access_token) {
            config.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
    }
    return config;
}, function (error) {
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
    if (typeof error.response == 'object') {
        console.log('有error.response:', error.response);
        var response = error.response;
        response.data.msg = response.data.Msg ? response.data.Msg : response.data.msg
        if (response.data.code == 401) {
            let url = response.config.url;
            let data = ''
            try {
                data = JSON.parse(response.config.data);
            } catch (error) {
                data = response.config.data;
            }
            let method = response.config.method;
            console.log('需要重新获取token');
            store.dispatch('重新换取token').then(x => {
                console.log('刷新token成功');
                axios({
                    method: method,
                    url: url,
                    data: data
                }).then(x1 => {
                    console.log(x1)
                    return Promise.resolve(x1)
                }).catch(err1 => {
                    console.log(err1)
                    return Promise.reject(err1)
                })
            }).catch(err => {
                console.log(err);
                console.log('刷新token失败')
                MessageBox('换取token失败，需要重新登录!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    router.push('/login');
                }).catch(() => {
                    router.push('/login');
                });
            })
        } else {
            console.log('非401错误');
            return Promise.resolve(response) // 可在组件内获取到服务器返回信息
        }
    } else {
        // 对响应错误做处理
        return Promise.reject(error)
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


// router.beforeEach((to, from, next) => {
//     console.log(to);
//     console.log('这里可以');
//     var meta=to.meta;
//       if(meta.需要登录){
//         var tokan=localStorage.tokan;  //加入这里是验证 tokan；
//         if(tokan){
//           next()  //已经登录过
//         }else{
//           next({ path: '/login' })  //加入这里跳转登陆
//         }
//       }else{
//         //不需要登陆直接跳转
//         next()
//       }
// })
