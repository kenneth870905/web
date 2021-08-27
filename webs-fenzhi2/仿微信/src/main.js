import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'




// 引入elementui的组件 和 样式
import ElementUI from 'element-ui'; // 组件文件（js）
import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// 注册（使用）elementui
Vue.use(ElementUI);



// 解构引入组件
// import { Message } from 'element-ui';
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.prototype.$back = function () {
    history.back();
}

//复制赞贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)



//添加一个请求拦截器
// var 无Authorization名单 = [
//     'http://www.ceshi.com/vx.php?action=login',       //登录
   
// ]
// axios.interceptors.request.use(function (config) {
//         var url=config.url
//         var obj=无Authorization名单.find(x=>url.includes(x));
//              if(!obj){
//                 var token= window.localStorage.getItem('token')
//             if (token) {
//                 config.headers.common['Authorization'] ='Bearer '+token;
//             }
//         }
//         return config;
//         }, function (error) {
//         console.info(error);
//         return Promise.reject(error);
//         });





import { Message } from 'element-ui';
router.beforeEach((to, from, next) => {
    // 获取token
    const token = window.localStorage.getItem('token');
    // 有token
    if (token) {
      // 直接放行
      next();
    } else {  // 否则是没有
      // 如果去的是登录页
      if (to.path === '/') {
        // 直接放行
        next();
      } else {
        // 如果去的是其他页,跳转到登录页
        Message.error('请登录以后再操作！')
        // 跳转到登录页
        return next({"path": "/"})
      }
    }
  })





new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
