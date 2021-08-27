import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import createPersistedState from 'vuex-persistedstate'
import { api_刷新token } from "@/api/获取token.js";
import { Message , Loading } from 'element-ui';

Vue.use(Vuex)
export default new Vuex.Store({
    plugins:[
        createPersistedState({
            key:"stockpc",
            reducer(val){
                return {
                    token:val.token,
                }
            },
            // 使用 sessionStorage
            // storage: window.sessionStorage,
        })
    ],
    state: {
        // 控制已读:"333",
        config:config,
        userInfo:{ //登录信息
            // Money: "",//额
            phone: "",//电话号码
            realName: "",//真实姓名
            UserId: "",//注册账号
        },
        token:{
            access_token:'',
            refresh_token:"",
            有效:true,
        },
        定时器:"",
        加载:"",
    },
    getters:{
      
        userInfo(state){
            return state.userInfo;
        },
        user(state){ //为了拿账户名
            var access_token = state.token.access_token;
            try{
                var obj=JSON.parse(window.atob(access_token.split('.')[1]));
                return obj                
            } catch(err){
                return ''
            }       
        }
    },
  
    mutations:{
       // 需要一直保存的数据放在这里
        设置用户信息(state,getters,dispatch,用户信息){
            dispatch('定时刷新token')
            state.userInfo=用户信息
        },
        保存token(state,obj){
            state.token=obj;
        },

        // 控制已读数据(state,obj){
        //     state.控制已读=obj
        // },
        // 控是否已读(state){
           
        // }
    },
    actions:{
        加载中({state},type){
            console.log(type)
            if(type){
                state.加载 = Loading.service({
                    // fullscreen: true,
                    // lock: true,
                    // spinner: 'el-icon-loading',
                    text:"正在加载",
                    background: 'rgba(0, 0, 0, 0.5)'
                });
            }else{
                try {
                    setTimeout(() => {
                        state.加载.close();                                            
                    }, 300);
                } catch (error) {}
            }
        },
        成功提示({},text){
            Message({
                showClose: true,
                message: text,
                type: 'success',
                duration:1500
            });
        },
        错误提示({},text){
            Message({
                showClose: true,
                message: text,
                type: 'error',
                duration:1500
            });
        },
        保存token({state , commit , dispatch},obj){
            commit('保存token',obj);
            dispatch('定时刷新token')
        },
        定时刷新token({state , dispatch}){
            try {
                clearTimeout(state.定时器)
            } catch (error) {}
            var access_token = state.token.access_token;
            if(access_token){
                var obj=JSON.parse(window.atob(access_token.split('.')[1]));
                // console.log(obj.DisplayName)
                var t1=obj.exp+'000'; //失效时间
                var date=new Date()
                var t2=date.getTime()
                console.log(t1,t2);
                if(t1 < t2){
                    console.log('已经失效');
                    dispatch('重新换取token')
                }else if(t1 < t2 + 90*1000){
                    console.log('马上失效')
                    dispatch('重新换取token')
                }else {
                    console.log('失效时间还长')
                    state.定时器 = setTimeout(() => {
                        dispatch('重新换取token')
                    }, t1 - t2 - 90*1000);
                    console.log(t1 - t2 - 90*1000)
                }
            }else{
                dispatch('重新换取token')
            }
        },
        重新换取token({state , dispatch}){
            // var meta=router.currentRoute.meta;
            // console.log(router,meta,router.app.$route.meta);
            return new Promise((resolve, reject) => {
                api_刷新token(state.token.refresh_token).then(x=>{
                    if(x.data.code==200){
                        var token=x.data.data;
                            token.有效=true;
                        dispatch('保存token',token);
                        return resolve();
                    }else{
                        state.token.有效=false
                        return reject()
                    }
                }).catch(err=>{
                    state.token.有效=false
                    return reject()
                }) 
            });
        }
    }
})


