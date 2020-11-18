

export default {
    namespaced: true,
    state:{
        //定位坐标
        x:0,
        y:0,
        靠右:true,
        显示助手:true
    },
    getters:{},
    mutations:{
        设置state(state,[key,value]){
            state[key]=value
        }
    },
    actions:{
        
    },
    modules:{},
}