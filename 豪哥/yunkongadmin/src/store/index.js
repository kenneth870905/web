import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: "shoujiyunkongAdmin",
            reducer(val) {
                return {
                    userInfo: val.userInfo,
                }
            }
        })
    ],
    state: {
        userInfo:{},
    },
    mutations: {
        setItem(state,[key , val]){
            state[key]= val
        }
    },
    actions: {
    },
    modules: {
    }
})
