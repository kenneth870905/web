
export default {
    namespaced:true,
    state:()=>{
        return {
            userInfo:{},
        }
    },
    getters:{
        
    },
    mutations:{
        setUserInfo(state,value){
            // console.log(value)
            state.userInfo = value
        }
    },
    actions:{
        
    },
}

