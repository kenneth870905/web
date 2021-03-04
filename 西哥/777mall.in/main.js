import Vue from 'vue'
import App from './App'

import store from './store'

// 阿里巴巴图标 icon
import '@/static/icon/iconfont.css'

// 复制剪切板
// https://ext.dcloud.net.cn/plugin?id=415
import '@/js_sdk/ican-H5Api/ican-H5Api.js'

Vue.config.productionTip = false

// uni app演示地址
// https://hellouniapp.dcloud.net.cn/

// var api = 'https://777mall.in/api/v1/api'
// var api = 'https://43.249.83.146'
// var api = 'http://www.order.com'
// var api = 'http://order.com'
var api = 'http://43.249.83.147'
Vue.prototype.$api_url = api
Vue.prototype.$http = (url,data,m)=>{
	let method = m ? m.toUpperCase() : 'POST'
	var header = {}
	var urlList = ['index/login']
	
	if(!urlList.includes(url)){
		let token = store.state.token
		if(token){
			// header['Authorization'] ='Bearer '+token
			header['Authorization'] =token
		}
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url:api+url,
			data:data,
			header:header,
			method:method,
			success(res) {
				if(res.data.msg ==='Please log in first'){
					store.state.token = ''
					console.log('需要重新登录')
					uni.showModal({
						title:'prompt',
						content:"Login has expired, need to log in again",
						cancelText:"cancel",
						confirmText:"confirm",
						success:(val)=>{
							if (val.confirm) {
								uni.navigateTo({
									url:'/pages/login'
								})
							} else if (val.cancel) {
								uni.switchTab({
									url:'/pages/home'
								})
							}
						}
					})
				}
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

App.mpType = 'app'

// #ifdef H5
	// https://hhyang.cn/v2/start/quickstart.html
	// 这个要写在这里,不然会App报错
	import {router,RouterMount} from './router.js'  //路径换成自己的
	Vue.use(router)
// #endif

const app = new Vue({
	store,
	...App
})

app.$mount();

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	// https://hhyang.cn/v2/start/quickstart.html
	// RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	// app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

