import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 引入swiper
import 'swiper/css/swiper.css';

// 引入elementui的组件 和 样式
// import ElementUI from 'element-ui'; // 组件文件（js）
// import 'element-ui/lib/theme-chalk/index.css'; // 样式文件
// // 注册（使用）elementui
// Vue.use(ElementUI);


Vue.prototype.axios = axios
// axios.defaults.baseURL = "http://67.229.173.202:9000"; //这是调用数据接口

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.use(Lazyload);//懒加载
import { Lazyload } from 'vant';//懒加载

import { Uploader } from 'vant'; //文件图片上传
Vue.use(Uploader);//文件图片上传


// 解构引入组件
// import { Message } from 'element-ui';
Vue.prototype.axios = axios
Vue.config.productionTip = false

Vue.prototype.$back = function () {        
    history.back();
}


  //布局 瀑布流 布局
  import vueWaterfallEasy from 'vue-waterfall-easy'
  Vue.use(vueWaterfallEasy);

  import { List } from 'vant'; // Vantui List插件下拉刷新
  Vue.use(List);//注册list

 //复制赞贴
 import VueClipboard from 'vue-clipboard2'
 Vue.use(VueClipboard) 

axios.defaults.withCredentials=true;//让ajax携带cookie

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


