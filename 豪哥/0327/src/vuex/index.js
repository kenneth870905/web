import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

import user from './modules/user.js'
export default createStore({
    plugins:[
        createPersistedState({
            key:'0331',
            // reducer(value){
            //     return {
            //         user:value.user
            //     }
            // }
            paths:['user']
        })
    ],
    modules:{
        user
    }
})