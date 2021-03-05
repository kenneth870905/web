export default {
    namespaced: true,
    state:{
        token:"",
        user:{}
    },
    mutations:{
        设置state(state,[key,val]){
            state[key] = val
        }
    },
    actions:{

    }
}
