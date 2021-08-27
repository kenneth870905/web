// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import QRCode from 'qrcode' //定义生成二维码组件

Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)

/*引入样式*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// router.afterEach((to, from) => {
//   console.log(store.state.userInfo.UserId);
//   if(!store.state.userInfo.UserId){
//     if(to.meta.需要登录){
//       router.push('/')
//     }
//     console.log(123)
//   }
// })