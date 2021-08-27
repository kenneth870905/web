import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// swiper 5 
import 'swiper/css/swiper.css'

// 重新路由防止报错
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

import axios from 'axios'
axios.defaults.baseURL=api_url + '/tmm/public/index.php/'

Vue.prototype.$api_url = api_url
Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



// window.onload = function(){
//     getRem(720,100)
// }

// window.onresize = function(){
//     getRem(720,100)
// }

// function getRem(pwidth,prem){
//     var html = document.getElementsByTagName('html')[0];
//     var oWidth = document.body.clientWidth || document.documentElement.clientWidth
//     html.style.fontSize = oWidth/pwidth*prem+'px'
// }



// function  adapt(designWidth,  rem2px) {
// 	var  d  =  window.document.createElement('div');
// 	d.style.width  =  '1rem';  
// 	d.style.display  =  "none";  
// 	var  head  =  window.document.getElementsByTagName('head')[0];  
// 	head.appendChild(d);  
// 	var  defaultFontSize  =  parseFloat(window.getComputedStyle(d,null).getPropertyValue('width'));
// 	//这行是自己添加的
// 	defaultFontSize=16;
// //	console.log(defaultFontSize);
// 	d.remove();
// 	document.documentElement.style.fontSize  =  window.innerWidth  /  designWidth  *  rem2px  /  defaultFontSize  *  100  +  '%';  
// 	var  st  =  document.createElement('style');  
// 	var  portrait  =  "@media screen and (min-width:" + window.innerWidth + "px) {html{font-size:" + ((window.innerWidth / (designWidth / rem2px) / defaultFontSize) * 100)  + "%;}}";  
// 	var  landscape  =  "@media screen and (min-width:" + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100)  + "%;}}"  
// 	st.innerHTML  =  portrait  +  landscape;
// 	head.appendChild(st);
// 	return  defaultFontSize
// };
// window.onresize=function(){
//     adapt(375,100);
// }
// adapt(375,  100);