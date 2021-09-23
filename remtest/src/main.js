import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
// 自己写的
import '@/assets/vant.scss'

Vue.use(Vant);

import Loading from '@/components/loading/index.js'
console.log(Loading)
// let loadingn_2 = Loading.install
//     loadingn_2().append()  
// Vue.prototype.$loading = Loading.install()
Vue.prototype.$loading = Loading
      

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


const baseSize = 32
let setRem = () => {
    let scale = document.documentElement.clientWidth / 750
    document.documentElement.style.fontSize = (baseSize * Math.min(scale,2))+'px'
}
setRem()
window.onresize = ()=>{
    setRem()
}