import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    plugins:[
        createPersistedState({
            key:"777mallAdmin",
            reducer:(value)=>{
                return {
                    tag:value.tag
                }
            }
        })
    ],
    state: {
        tag:[]
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
