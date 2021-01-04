import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
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
        }
    },
    mutations: {
        setItem(state,obj){
            obj = obj
        }
    },
    actions: {
    },
    modules: {
    }
})
