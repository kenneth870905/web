import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$api_url = api_url
Vue.prototype.$img_url = api_url + '/tmm/public/storage/'

import axios from 'axios'
axios.defaults.baseURL = api_url
Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {
    console.log('beforeEach',to)
    next() 
    setTimeout(() => {
        var div = document.getElementById('md')
        div.scrollIntoView({behavior:'smooth',block:'center'})
    }, 500);
})

