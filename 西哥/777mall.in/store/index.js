import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate";	
Vue.use(Vuex)

import data from '@/static/data/data.js'

const store = new Vuex.Store({
	plugins: [
		CreatePersistedState({
			key : '777mallH5',
			reducer(val){
				return {
					userInfo:val.userInfo,
					token:val.token,
					color:val.color
				}
			},
			// 使用 sessionStorage
			// storage: window.sessionStorage,
			// 使用 cookie
			// storage: {
			//     getItem: key => Cookies.get(key),
			//     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
			//     removeItem: key => Cookies.remove(key)
			// }
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	],
	state: {
		//需要缓存的数据
		userInfo:{},
		token:"",
		//不需要缓存的数据
		data:data,
		color:""//默认没有
	},
	mutations: {
		setItem(state,[key,value]){
			console.log(key)
			state[key] = value
		}
	},
    getters:{
		getproduct:(state)=>(id)=>{
			return state.data.product.find(x=>x.id==id)
		}
        // currentColor(state){
        //     return state.colorList[state.colorIndex]
        // }
    },
	actions: {
		设置颜色({state} ){
			// 也可以使用
			// const currentWebview = this.$mp.page.$getAppWebview();
			if(state.color){
				// #ifndef APP-PLUS
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];  
				var currentWebview = page.$getAppWebview(); //页面栈最顶层就是当前webview 
				currentWebview.evalJS(
					`window.document.documentElement.style.setProperty('--color', "${state.color}")`
				)
				// #endif
			}
		},
		getUserInfo({state,commit}){
			// console.log(this._vm)
			let api = this._vm.$api_url
			uni.request({
				url:api+'/UserInfo',
				header:{
					Authorization:state.token
				},
				success(res){
					if(res.data.result){
						commit('setItem',['userInfo',res.data.data])
					}else if(res.data.msg ==='Please log in first'){
						state.token = ''
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
				},
				fail(err) {
					console.log(err)
				}
			})
		}
	},
	modules:{
		
	}
})

export default store
