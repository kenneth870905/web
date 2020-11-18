import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
    plugins:[
        createPersistedState({//一般是是存接口里的关键信息的数据  防止 vuex 刷新后丢失数据 这次的问题就是 刷新后是否登陆的值丢失了
            reducer(val){
                return {
                    是否登录:val.是否登录,
                }
            },
        })
    ],
    state: {
        是否登录:false,
        // 是否显示查看更多按钮:false,
        userinfo:{},
        小说内容数据:{
          
        }
    },
    getters:{
         // 只能获取，不能设置 在网页中用...mapGetters获取  到计算属性computed里面
        // 登陆信息1(state) {
        //     return state.userinfo
        // },
    },
    mutations:{ 
        保存登陆状态(state,boer){
             console.log(111)
            state.是否登录 = boer
        },
        //     是否显示查看更多按钮状态(state,boer){
        //         console.log(222)
        //        state.是否显示查看更多按钮 = boer
        //    },
        用户信息(state,obj){
            state.userinfo = obj
        },
        小说内容数据信息(state,obj){
            state.小说内容数据 = obj
        }
    },
    actions:{ 

    }
})


