import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage:window.sessionStorage,
            key:'huobi0306',
            reducer(val){
                return {
                    token:val.token
                }
            }
        })
    ],
    state: {
        token:"",
        // 详情:{
        //     买入汇率:"",
        //     手续费:"",
        //     卖出汇率:"",
        //     主ID:"",
        //     副ID:""
        // }
    },
    mutations: {
        setToken(state,t){
            state.token = t
        }
    },
    actions: {
    },
    modules: {
    }
})
