import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

import 投注 from "@/vuex/投注.js";
import user from "@/vuex/user.js";
import 游戏大厅 from "@/vuex/游戏大厅.js";
import 投注订单 from "@/vuex/投注订单.js";
import 进入游戏 from '@/vuex/进入游戏.js';
import 开奖走势 from '@/vuex/开奖走势.js';
import 资金明细 from "@/vuex/资金明细.js";
// import 悬浮按钮 from '@/vuex/悬浮按钮.js';


import { api_获取游戏彩票 } from "@/api/游戏彩票接口.js";
export default new Vuex.Store({
    plugins:[
    ],
    state: {
        登录框显示隐藏:false,
        注册框显示隐藏:false,
        皮肤切换:true,//默认显示白皮
        游戏彩票类型:[],
        config:config,
          //彩票颜色生肖等 主要用于 六合彩
          marSixNums:$.base.markSixNums,                            
    },
    getters:{
        全部彩票类型(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            return obj ? obj.children : []
        },
        分类彩票(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                var list=obj.children.filter(x=>x.title!='所有彩种');
                return list;
            }else{
                return []
            }
        },
        全部彩票(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                var obj1=obj.children.find(x=>x.title=='所有彩种');
                var list=obj1.children.filter(x=>x.title!='代理加盟');
                return list;
            }else{
                return []
            }
        }
    },
    mutations:{
        更改皮肤切换(state, type) {
            state.皮肤切换 = type
        },
        更改登录框显示隐藏(state, type) {
            state.登录框显示隐藏 = type
        },
        更改注册框显示隐藏(state, type) {
            state.注册框显示隐藏 = type
        },

        设置state(state,[key,value]){
            state[key]=value
        },
        设置config(state,[key,value]){
            state.config[key]=value;
        },


      },

    

    actions:{
        获取游戏彩票({state,commit,dispatch}){
            return new Promise((resolve, reject) => {
                api_获取游戏彩票().then(x=>{
                    var data=x.data;
                        data.forEach(item => {
                            if(!item.noSub){
                                item.children.forEach(x=>{
                                    x.children.forEach(y=>{
                                        y.type=x.type
                                        y.彩票=item.title=='彩票'
                                    })
                                })
                            }
                        });
                    state.游戏彩票类型=x.data
                    commit('设置state',['游戏彩票类型',x.data])
                    resolve()
                }).catch(err=>{
                    reject();
                })
            });
        },
        读取配置({state , dispatch , rootState}){
            var url=rootState.user.api路线.url
            var title_1 = state.config.title
            Promise.all([
                dispatch('修改config'),
                dispatch('获取json配置')
            ]).then(list=>{
                console.log(list,config);
                // 这里的cofig是获取到的

                if(typeof LineSwitch!='undefined'){
                    if(LineSwitch){
                        var obj=Object.assign({},config);
                            obj.api_url = url;
                            obj.img_url = url+'/M1/';
                            obj.iframe_url = url;
                            obj.wchat_url = url;
                            for (const key in obj) {
                                state.config[key]=obj[key]
                            }
                            config=state.config;
                            var config1 = state.config;
                            state.config=''
                            state.config=config1
                    }
                }
            
                    console.log(list[1])
                if(list[1]){
                    var jsondata=list[1];
                    document.title = jsondata.Title;
                    state.config.title = jsondata.Title
                }else{
                    document.title = title_1;
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        修改config({state,commit ,rootState}){
            console.log('修改config');
            var url=rootState.user.api路线.url
            var config_url=rootState.user.api路线.config
            return new Promise((resolve, reject) => {
                if(typeof LineSwitch!='undefined'){
                    if(!LineSwitch){
                        resolve()
                        return
                    }else{
                        console.log('需要获取config')
                    }
                }else{
                    resolve()
                    return
                }
                $.ajax({
                    type:'get',
                    url: config_url,
                    dataType: "script",
                    success: (data)=>{
                        resolve()
                    },
                    error:function(err){
                        resolve()                    
                    }
                })    
            });
        },
        获取json配置({state}){
            var title_1 = state.config.title
            var url='';
                if(typeof LineSwitch!='undefined'){
                    if(LineSwitch){
                        var str=state.config.api_url;
                            str=str.substring(str.indexOf('://')+3)
                        url = str.includes('www.') ? str : 'www.' + str
                    }else{
                        url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
                    }
                }else{
                    url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
                }
            var url1 = config.api_url + '/App_Upload/Agents/Json/' + url + '.json';
            return new Promise((resolve, reject) => {
                axios.get(url1).then(x => {
                    var data = x.data;
                        // data={"Id":1374,"Title":"传奇","Home":true,"Type":2,"Logo":true,"QQ":null,"Ver":"20190524144937"}
                    resolve(data);
                }).catch(err=>{
                    // var data={"Id":1374,"Title":"传奇","Home":true,"Type":2,"Logo":true,"QQ":null,"Ver":"20190524144937"}
                    resolve(false)
                }) 
            });
        // },

    },
    },

    modules:{
        投注,
        user,
        游戏大厅,
        投注订单,
        资金明细,
        // 彩票配置,
        // 个人资料,
        进入游戏,
        开奖走势,
        // 悬浮按钮,
        // 聊天室,
        // 私聊
    }
})


