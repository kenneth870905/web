import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        key: 'dianshang1028',
        reducer(value){
            return{
                loginInfo:value.loginInfo
            }
        }
    })],
    state: {
        loginInfo: {}
    },
    mutations: {
        setItem(state,[key,value]){
            state[key] = value
        }
    },
    actions: {
    },
    modules: {
    }
})
