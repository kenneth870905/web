import Vue from 'vue'
import App from './App'

import store from './store'
import '@/static/fontClass/iconfont.css'

Vue.config.productionTip = false


var api = 'https://33796088.com'
Vue.prototype.$api_url = api
Vue.prototype.$http = (url,data,m)=>{
	let method = m ? m.toUpperCase() : 'GET'
	var header = {}
	var urlList = ['/api/auth/loginwx']
	
	if(!urlList.includes(url)){
		let token = store.state.loginInfo.token
		header['X-Token'] = token
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url:api+url,
			data:data,
			header:header,
			method:method,
			success(res) {
				//如果登录过去删除登录信息
				if(res.data.code==1001){
					store.state.loginInfo = {}
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

const app = new Vue({
	store,
	...App
})
app.$mount()


// uni.request({
// 	url:api+'/api/product',
// 	// header:{
// 	// 	// "content-type":"application/json;charset=UTF-8"
// 	// },
// 	data:{	page:1, size:10},
// 	method:'GET',
// 	success(res) {
// 		console.log(res)
// 	},
// 	fail(err) {
// 		console.log(err)
// 	}
// })


