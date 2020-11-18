
export default {
    namespaced: true,
    state:{
        颜色:'#2e394d',
        
    },
    getters:{
        用户颜色(state){
            return state.颜色 ? state.颜色 : '#2e394d'
        }
    },
    mutations:{
        设置user(state,[key,value]){
            state[key]=value
        }
    },
    actions:{

    }
}