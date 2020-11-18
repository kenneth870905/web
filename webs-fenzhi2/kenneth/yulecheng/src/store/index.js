import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { Loading } from 'element-ui'

import { api_Online, api_退出登录 } from '@/api/登录接口.js'
import { api_获取平台余额, api_转入金额, api_转出金额 } from '@/api/余额接口.js'

Vue.use(Vuex)

config.getConfig = 0
// config.telegram.show=false
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            reducer(val) {
                return {
                    userInfo: val.userInfo,
                    首次登陆: val.首次登陆,
                    ip:val.ip
                }
            },
            // 使用 sessionStorage
            storage: window.sessionStorage
            // 使用 cookie
            // storage: {
            //     getItem: key => Cookies.get(key),
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            //     removeItem: key => Cookies.remove(key)
            // }
        })
    ],
    state: {
        // 配置文件
        config: config,
        ip:'',
        技术支持:false,
        loading_1: '',
        userInfo: {
            Ck: 0,
            Messages: [],
            Money: '',
            Notices: [],
            Page: '/',
            UserId: ''
        },
        显示系统Messages: false,
        //= =============================
        Aname: '', // 待进入游戏类型 如 AG BY
        Money: '', // 平台余额
        Moneymin: '', // 总余额每个平台
        平台类型: '',
        //= ============================
        登陆信息: '',
        显示登录框: false,
        显示进入游戏弹框: false,
        待进入游戏: {
            name: '',
            gid: '',
            type: '',
        },
        首次登陆: true,
        Online_init:true
    },
    getters: {// 只能获取，不能设置 在网页中用...mapGetters获取  到计算属性computed里面
        登陆信息1(state) {
            return state.登陆信息
        },
        显示登录框(state) {
            return state.显示登录框
        },
        显示进入游戏弹框(state) {
            return state.显示进入游戏弹框
        },
        待进入游戏(state) {
            return state.待进入游戏
        },
        userInfo(state) {
            return state.userInfo
        },
        试玩(state) {
            if (state.userInfo.UserId) {
                var userid = state.userInfo.UserId.toLowerCase()
                return userid.indexOf('demo') != '-1'
            } else {
                return false
            }
        },
        站点配置(state) {
            var url = location.hostname.replace('www.','');
            // var url='1996997.com';   //
            var obj = {}
            if (website.list.hasOwnProperty(url)) {
                var key = website.list[url]
                if (website.hasOwnProperty(key)) {
                    obj = website[key]
                }
            }else if (state.config.getConfig == 3) {
                obj = {
                    appUrl:config.erweima ? config.erweima : "/App_Upload/appBet.png"
                }
            }
            // includes
            return obj
        }
    },
    mutations: {
        // 需要一直保存的数据放在这里
        设置用户信息(state, 用户信息) {
            // console.log('mutations',用户信息)
            state.userInfo = 用户信息
        },
        修改state(state, [key, val]) {
            console.log(key, val)
            state[key] = val
        },
        修改config(state, [key, val]) {
            state.config[key] = val
        }
    },
    actions: { // 在页面中用...mapActions 获取到函数里methods
        openloading({ state }, type) {
            if (type) {
                state.loading_1 = Loading.service({
                    fullscreen: true,
                    text: '拼命加载中···',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            } else {
                setTimeout(() => {
                    state.loading_1.close()
                }, 500)
            }
        },
        getkey({ state }, key) {
            return state[key]
        },
        MoneyAll({ state }, 钱) {
            state.Money = 钱
        },
        更新登陆信息({ state }) {
            var value = localStorage.login
            state.登陆信息 = value
        },
        设置是否显示登录框({ state }, type) {
            state.显示登录框 = type
        },
        设置进入游戏弹框({ state , dispatch}, type) {
            state.显示进入游戏弹框 = type
            if(state.userInfo.UserId && type){
                dispatch('获取平台余额',state.待进入游戏.type)
            }
        },
        设置待进入游戏({ state }, obj) {
            state.待进入游戏 = obj
        },
        // 请求余额的函数
        getUserInfo({ state, commit }) {
            console.log('调用用户信息')
            return new Promise((resolve, reject) => {
                var hash = location.hash.substring(1).split('?')[0]!='/' ? location.hash.substring(1).split('?')[0] : ''
                console.log(hash)
                api_Online({ init: state.Online_init, n: 1 , hash }).then(x => {
                    // commit('设置用户信息',x.data.UserId ? x.data : {})
                    state.Online_init = false
                    commit('设置用户信息', x.data)
                    if (x.data.Notices) {
                    } else if (x.data.Messages && x.data.Messages.length > 0) {
                        state.显示系统Messages = true
                    }
                    resolve()
                }).catch(err => {
                    console.log(err)
                    reject()
                })    
            });
        },
        async 退出登录({ dispatch, commit }) {
            await api_退出登录()
            commit('设置用户信息', {})
            commit('修改state', ['首次登陆', true])
        },
        获取平台余额({ state }, type) {
            console.log('获取平台余额')
            state.Moneymin='正在获取'
            return new Promise((resolve, reject) => {
                api_获取平台余额({ type: type }).then(x => {
                    state.Moneymin = x.data.msg
                    resolve()
                }).catch(err => {
                    state.Moneymin='获取失败'
                    reject()
                }) 
            });
        },
        async 转入金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待进入游戏.type
            }
            dispatch('openloading', true)
            try {
                await api_转入金额(obj)
            } catch (error) {
                dispatch('openloading', false)
            }
            dispatch('获取平台余额',  state.待进入游戏.type)
            dispatch('getUserInfo')
            dispatch('openloading', false)
        },
        async 转出金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type:  state.待进入游戏.type
            }
            dispatch('openloading', true)
            try {
                await api_转出金额(obj)
            } catch (error) {
                dispatch('openloading', false)
            }
            dispatch('获取平台余额',state.待进入游戏.type)
            dispatch('getUserInfo')
            dispatch('openloading', false)
        }
    },
    modules: {
        // 刷新用户信息:刷新用户信息
    }
})
