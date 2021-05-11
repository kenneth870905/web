import Vue from 'vue'
import Vuex from 'vuex'
import CreatePersistedState from "vuex-persistedstate";	
Vue.use(Vuex)

var api_url = 'https://xf.jstnyw.com'

const store = new Vuex.Store({
	plugins: [
		CreatePersistedState({
			reducer(val){
				return {
					userInfo:val.userInfo,
					loginInfo:val.loginInfo,
					fxuid:val.fxuid,
					baseInfo:val.baseInfo,
					确认购物商品:val.确认购物商品,
					二次付款:val.二次付款,
					
					购物车:val.购物车
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
		loginInfo:{},
		fxuid:"",	//分享人id
		baseInfo:{},	//公司基本信息
		
		//不需要缓存的数据
		topath:"", 			//跳转地址
		购物车:[
			// {
			// 	sp:{},
			// 	number:0,
			// 	guige:[蓝色，xl],
			//  guigeId:0，
			//  t:随机数方便删除
			// }
		],
		立即购买:[
			// {
			// 	sp:{},
			// 	number:0,
			// 	guige:[蓝色，xl],
			//  guigeId:0
			// }
		],
		type:1,	// 1 购物车 2 直接购买 
		确认购物商品:[],		//  [{id:"",productId:"商品id",count:"数量",product:"商品"}]
		二次付款:{},	  		//订单中再次付款
		选择收货地址:{}
	},
	mutations: {
		setItem(state,[key,value]){
			state[key] = value
		},
		添加购物车(state,item){
			state.购物车.push(item)
		},
		删除购物车(state,list){
			// list 为购物车里面 t 的随机数组
			let list2 = state.购物车.filter(x=> !list.find(y=>y==x.t) )
			state.购物车 = list2
		}
	},
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
	actions: {
		// lazy loading openid
		async loginwx({state , dispatch , commit}){
			console.log('登录',)
			//获取微信登录code给后台
			await dispatch('getUserInfo')
			var code = await dispatch('getCode')
			console.log(code)
			console.log({"code": code, "superiorId": state.fxuid ? parseInt(state.fxuid) : 0, "userInfo": state.userInfo})
			return new Promise((resolve, reject)=>{
				uni.request({
					url:api_url+'/api/auth/loginwx',
					data:{"code": code, "superiorId": state.fxuid ? parseInt(state.fxuid) : 0, "userInfo": state.userInfo},
					method:'POST',
					success(res) {
						console.log(res)
						if(res.data.data){
							commit('setItem',['loginInfo',res.data.data])
							if(!state.topath){
								// uni.switchTab({
								// 	url:'/pages/home/home'
								// })
							}else{
								uni.switchTab({
									url:'/pages'+state.topath
								})
							}
						}else{
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
						resolve(res)
					},
					fail(err) {
						reject(err)
					}
				})
			})
		},
		getUserInfo({state,commit}){
			commit('setItem',['userInfo',{}])
			console.log('获取个人信息')
			return new Promise((resolve, reject)=>{
				uni.getUserInfo({
					success(res) {
						console.log(res)
						commit('setItem',['userInfo',res.userInfo])
						resolve()
					}
				})
			})
		},
		getCode({}){
			console.log('获取code')
			return new Promise((resolve, reject)=>{
				uni.login({
					provider: 'weixin',
					success:function(loginRes){
						resolve(loginRes.code)
					},
					fail(err) {
						console.log(err)
					}
				})
			})
		},
		getUserOpenId: async function ({ commit, state }) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function () { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	},
	modules:{
		
	}
})

export default store
