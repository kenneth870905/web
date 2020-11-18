import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Router from 'vue-router'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//系统错误捕获
const errorHandler = (error, vm)=>{
    console.error('抛出全局异常');
    console.error(vm);
    console.error(error);
}
// Vue.config.errorHandler = errorHandler;
// Vue.prototype.$throw = (error)=> errorHandler(error,this);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')




