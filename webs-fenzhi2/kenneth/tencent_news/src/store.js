import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import { Toast } from "vant";
Vue.use(Vuex)


import user from './vuex/user.js'
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: "tencent_news",
            reducer(val) {
                return {
                    user: val.user
                }
            },
        })
    ],
    state: {
        t1: []
    },
    mutations: {

    },
    actions: {
        加载中({ }, type) {
            if (type) {
                Toast.loading({
                    mask: true,
                    duration: 0
                })
            } else {
                Toast.clear();
            }
        },
        获取t1({ state }) {
            return axios.post('/NewType/findAll').then(x => {
                state.t1 = x.data;
            }).catch(err => { })
        }
    },
    modules: {
        user
    }
})

