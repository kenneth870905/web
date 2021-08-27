import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { 判断是否登陆 } from "@/api/登陆注册.js"
Vue.use(Vuex)
export default new Vuex.Store({
    plugins:[
        createPersistedState({//一般是是存接口里的关键信息的数据  防止 vuex 刷新后丢失数据 这次的问题就是 刷新后是否登陆的值丢失了  vuex-persistedstate 是一个模块 需要安装
            reducer(val){
                return {
                    是否登录:val.是否登录,
                     ZQinde:val.ZQinde,
                     SSinde:val.SSinde
                }
            },
        })
        // createPersistedState()
    ],
    state: {
       是否登录:false,
       ZQinde:{
        maxindex:1, 
        minindex:2,
        gzindex:0,
       },
       SSinde:{
        maxindex:1, 
        minindex:1,
        gzindex:0,
        zqtitle:[],//足球里按时间选择的每一个title
        // zqtitleAll:[],//足球里按时间选择的所有title
       }

    },
    getters:{
         
    },
    mutations:{ 
        更改登录状态(state,type){
            state.是否登录 = type
        },
        更改专家足球maxinde(state,index){
            state.ZQinde.maxindex = index
        },
        更改专家足球mininde(state,index){
            state.ZQinde.minindex = index
        },
        更改专家关注mininde(state,index){
            state.ZQinde.gzindex = index
        },
     

    },
    actions:{ 
      检测登陆({state}){
        var phone= localStorage.getItem('phone');
        var token= localStorage.getItem('token');
          console.log(phone)
         var obj={
             phone:phone,
             key:token
         }
         判断是否登陆(obj).then(x=>{
             console.log(x.data)
             if(x.data.code==1){
                state.是否登录 = true
             }else{
                state.是否登录 = false
             }
         }).catch(err=>{
             console.log(err)
         })
      }
    }
})
       
