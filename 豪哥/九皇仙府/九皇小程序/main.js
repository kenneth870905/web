
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
let api = 'http://47.243.70.161/api'
Vue.prototype.$api_url = api

let loadingTotal = 0
let closeLoading=()=>{
	loadingTotal--
	if(loadingTotal<=0){
		setTimeout(()=>{
			uni.hideLoading()
		},300)
	}
}

Vue.prototype.$http = (url,data,m)=>{
	uni.showLoading({
		mask:true,
		title:"加载中"
	})
	loadingTotal++
	
	let method = m ? m.toUpperCase() : 'POST'
	var header = {}
	
		// let token = store.state.token
	let token = uni.getStorageSync('jiuhuangToken')
	// console.log('token',token)
	if(token){
		// header['Authorization'] ='Bearer '+token
		header['X-Token'] =token
	}
	return new Promise((resolve, reject)=>{
		uni.request({
			url:api+url,
			data:data,
			header:header,
			method:method,
			success(res) {
				closeLoading()
				if(res.code ==1001){
					uni.removeStorage({
						key:"jiuhuangToken"
					})
					console.log('需要重新登录')
					uni.showModal({
						title:'提示',
						content:"登录过期，请重新登录",
						showCancel:false,
						confirmText:"确定",
						success:(val)=>{
							uni.navigateTo({
								url:'/pages/login'
							})
						}
					})
				}
				resolve(res.data)
			},
			fail(err) {
				closeLoading()
				reject(err)
			}
		})
	})
}



const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif