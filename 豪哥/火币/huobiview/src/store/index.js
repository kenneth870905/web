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
        token:""
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
