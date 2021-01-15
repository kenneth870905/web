import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

var api = 'https://777mall.in/api/v1/api'
Vue.prototype.$api_url = api
Vue.prototype.$http = (url,data,m)=>{
	let method = m ? m.toUpperCase() : 'GET'
	var header = {}
	var urlList = ['index/login']
	
	if(!urlList.includes(url)){
		let token = store.state.token
		header['authorization'] ='Bearer '+token
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url:api+url,
			data:data,
			header:header,
			method:method,
			success(res) {
				//如果登录过去删除登录信息
				// if(res.data.code==1001){
				// 	store.state.loginInfo = {}
				// }
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
// app.$mount()

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	// https://hhyang.cn/v2/start/quickstart.html
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

