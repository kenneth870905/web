import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createPersistedState({
        // storage: window.sessionStorage,
        key: 'yxa',  //yxadmin
        reducer(val) {
            return {
                // 只储存state中的user,不把page放在这里面
                user: {
                    token:val.user.token
                }
            }
       }
    })],
    modules: {
        app,
        settings,
        user
    },
    getters
})

export default store
