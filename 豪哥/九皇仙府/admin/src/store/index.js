import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import { useRouter  } from 'vue-router'
// const router = useRouter()  
export default createStore({
    plugins: [createPersistedState({
        key: 'jiuhuangAdmin',
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
            console.log(123)
            state[key] = value
        },
        // setRoles(state,list){
        //     console.log(123)
        // }
    },
    actions: {
        // goOut({commit}){
        //     commit('setItem',['loginInfo',{}])
        // }
    },
    modules: {
    }
})
