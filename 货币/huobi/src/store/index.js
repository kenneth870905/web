import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

import createPersistedState from 'vuex-persistedstate'
import user2 from './user2.js'

import { Loading } from 'element-ui';
Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            reducer(val) {
                return {
                    user2: val.user2
                }
            }
        }),
    ],
    state:{
        loading:""
    },
    actions:{
        loading({state},t){
            if(t){
                let options ={
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                }
                state.loading = Loading.service(options);
            }else{
                state.loading.close();
            }
        }
    },
    modules: {
        app,
        user2
    },
    getters
})

export default store