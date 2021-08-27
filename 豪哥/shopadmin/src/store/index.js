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
        },
        setRoles(state,list){
            state.loginInfo.roles = list
        }
    },
    getters:{
        roles:(state) => {
            // "Admin"				管理员拥有所有权限
            // "ProductRead",		商品读
            // "ProductWrite",		商品更改
            // "UserRead",			用户读
            // "UserWrite",		用户更改
            // "OrderRead",		订单读
            // "OrderWrite"		订单写
            if(!state.loginInfo.roles){
                return {}
            }else{
                let roles = state.loginInfo.roles
                let o = Object.fromEntries( roles.map(item => [item,true]) )
                return o
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
