import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate";	
Vue.use(Vuex)

import data from '@/static/data/data.js'

var api_url = 'https://33796088.com'
const store = new Vuex.Store({
	plugins: [
		CreatePersistedState({
			key : '777mall',
			reducer(val){
				return {
					userInfo:val.userInfo,
					登录:val.登录,
					token:val.token
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
		登录:false,
		token:"",
		//不需要缓存的数据
		data:data,
	},
	mutations: {
		setItem(state,[key,value]){
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
		
	},
	modules:{
		
	}
})

export default store
