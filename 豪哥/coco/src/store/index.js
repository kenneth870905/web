import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'
Vue.use(Vuex)
import router from '@/router'


export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key:"coco",
            reducer(val){
                return {
                    userInfo:val.userInfo,
                    登录信息:val.登录信息
                }
            }
        })
    ],
    state: {
        userInfo:{},
        登录信息:{
            记住密码:false,
            name:"",
            password:""
        },
        分组:[],
        所有应用:{
            loading:true,
            list:[]
        },
        设备类型:[],
        统计:{},
        入款账户:[]
    },
    mutations: {
        setItem(state,[key,value]){
            state[key] = value
        }
    },
    actions: {
        更新用户信息({state}){
            axios.get(`/api/user/${state.userInfo.id}`,'')
            .then(res => {
                console.log(res)
                if(res.data.code===0){
                    state.userInfo.balance = res.data.data.balance
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        获取分组({state}){
            axios.get(`/api/deviceset`,'').then(res => {
                if(res.data.code===0){
                    state.分组 = res.data.data
                    if(state.分组.length>0 && router.app.$route.path=='/'){
                        router.push('/device?name='+state.分组[0].name)
                    }
                }
            }).catch(err => {
                console.error(err); 
            })
        },
        获取所有应用({state}){
            state.所有应用.loading = true
            axios.get('/api/device/0/applist', '').then(res => {
                if (res.data.code === 0) {
                    state.所有应用.list = res.data.data
                }
                state.所有应用.loading = false
            }).catch(err => {
                state.所有应用.loading = false
            })
        },
        获取机型({state}){
            axios.get('/api/devicetype','').then(res => {
                if(res.data.code===0){
                    state.设备类型 = res.data.data
                }
            }).catch(err => {})
        },
        统计({state}){
            axios.get(`/api/user/${state.userInfo.id}/statistics`,'')
            .then(res => {
                console.log(res)
                if(res.data.code===0){
                    state.统计 = res.data.data
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        获取入款账户({state}){
            axios.get('/api/card',{page:1, size:100}).then(res => {
                if(res.data.code===0){
                    state.入款账户 = res.data.data
                }
            }).catch(err => {
            })
        }
    },
    modules: {
    }
})
