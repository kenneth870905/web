import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



export default new Vuex.Store({
    plugins:[
    ],
    state: {
        登录框显示隐藏:false,
        注册框显示隐藏:false,
        更改密码框显示隐藏:false,
        皮肤切换:true,//默认显示白皮
        是否登陆:false,
        user:{
            name:""
        },
        弹框:{
            itemshow:false,
            第一次:true
        }
       
    },
       
    getters:{
       
    },
    mutations:{
        控制弹框(state,obj){
            state.弹框=obj
        },
        保存(state,obj){
            state.user=obj
        },
        更改皮肤切换(state, type) {
            state.皮肤切换 = type
        },
        更改登录框显示隐藏(state, type) {
            state.登录框显示隐藏 = type
        },
        更改注册框显示隐藏(state, type) {
            state.注册框显示隐藏 = type
        },
        改变密码框显示隐藏(state, type) {
            state.更改密码框显示隐藏 = type
        },
        更改登陆状态(state, type) {
            state.是否登陆 = type
        },

      },

    actions:{

  
 
    },

    modules:{
       
    }
})


