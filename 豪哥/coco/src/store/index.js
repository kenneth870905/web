import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'
Vue.use(Vuex)

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
        分组:[]
    },
    mutations: {
        setItem(state,[key,value]){
            console.log(value)
            state[key] = value
        }
    },
    actions: {
        获取分组({state}){
            axios.get(`/api/deviceset`,'').then(res => {
                console.log(res)
                if(res.data.code===0)
                state.分组 = res.data.data
            }).catch(err => {
                console.error(err); 
            })
        }
    },
    modules: {
    }
})
