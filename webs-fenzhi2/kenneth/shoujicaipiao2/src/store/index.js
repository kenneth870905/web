import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
Vue.use(Vuex)

import 投注 from "@/store/投注.js";
import user from "@/store/user.js";
import 游戏大厅 from "@/store/游戏大厅.js";
import 投注订单 from "@/store/投注订单.js";
import 资金明细 from "@/store/资金明细.js";
import 个人资料 from    '@/store/个人资料.js';
import 进入游戏 from '@/store/进入游戏.js';
import 开奖走势 from '@/store/开奖走势.js';
import 悬浮按钮 from '@/store/悬浮按钮.js';
import 聊天室 from '@/store/聊天室.js';
import 私聊 from '@/store/私聊.js';
import 跟单 from '@/store/跟单.js';
import 计划 from '@/store/计划.js'
import 红包游戏 from '@/store/红包游戏.js'
import 引导 from '@/store/引导.js'

// import 聊天2 from '@/store/聊天2.js'

import { api_获取游戏彩票 } from "@/api/游戏彩票接口.js";
import { api_特邀getinfo } from "@/api/特邀嘉宾.js";

export default new Vuex.Store({
    plugins:[
        createPersistedState({
            reducer(val){
                return {
                    user:val.user,
                    ip:val.ip,
                    聊天室:{
                        当前房间:val.聊天室.当前房间,
                        预设房间:val.聊天室.预设房间,
                        房间密码:val.聊天室.房间密码,
                        偏好彩票:val.聊天室.偏好彩票,
                        偏好彩票2:val.聊天室.偏好彩票2,
                    },
                    引导:val.引导
                }
            },
            // 使用 sessionStorage
            // storage: window.sessionStorage,
            // 使用 cookie
            // storage: {
            //     getItem: key => Cookies.get(key),
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            //     removeItem: key => Cookies.remove(key)
            // }
        })
    ],
    state: {
        技术支持:false,
        加载中:false,
        ip:'',
        pageDirection: 'fade',//控制页面切换
        // config:JSON.parse(JSON.stringify(config)),
        config:config,
        游戏彩票类型:[],
        //彩票颜色生肖等 主要用于 六合彩
        marSixNums:$.base.markSixNums,
        //加密方式
        publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
        toast:"",
        time:"",
        // 0表示不显示 1.礼包->2.特邀嘉宾 -> 3.游戏弹框->4.选择游戏类型->5.5选择游戏->6手动关闭或流程结束
        urlType:"",
        getJson:false
    },
    mutations: {
        setPageDirection(state, dir){
            state.pageDirection = dir;
        },
        加载中(state,type){
            if(!type){
                setTimeout(() => {
                    state.加载中=type                    
                }, 300);
            }else{
                state.加载中=type;
            }
        },
        设置state(state,[key,value]){
            state[key]=value
        },
        设置config(state,[key,value]){
            state.config[key]=value;
        }
    },
    getters:{
        //带有类型 
        全部彩票类型(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            return obj ? obj.children : [];
        },
        分类彩票(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                var list=obj.children.filter(x=>x.title!='所有彩种');
                return list;
            }else{
                return [];
            }
        },
         // {title:时时彩,'...':"..."}
        全部彩票(state){
            var obj=state.游戏彩票类型.find(x=>x.title=='彩票');
            if(obj){
                var obj1=obj.children.find(x=>x.title=='所有彩种');
                var list=obj1.children.filter(x=>x.title!='代理加盟');
                return list;
            }else{
                return [];
            }
        }
    },
    actions: {
        获取游戏彩票({state}){
            return new Promise((resolve, reject) => {
                console.log('获取游戏彩票')
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
                    var href =''
                    if(typeof LineSwitch!='undefined'){
                        if(LineSwitch){
                            href = state.config.api_url;
                        }else{
                            href = window.location.hostname;
                        }
                    }else{
                        // 不是APP使用url地址 如 www.0698aa.com
                        href = window.location.hostname;
                    }
                    // href ="https://www.flcp8808.com";
                    // console.log('当前',href);
                    if(config.typeSort){
                        let obj = config.typeSort.find(item1=>item1.url.find(y=>href.includes(y)))
                        if(obj){
                            let sort = obj.sort || [];
                            let list = [];
                            for (let i = 0; i < sort.length; i++) {
                                let obj1 = data.find(item2=>item2.title == sort[i])
                                let i2 = data.findIndex(item2=>item2.title == sort[i]) 
                                if(obj1){
                                    list.push(obj1)
                                    data.splice(i2,1)
                                }
                            }
                            list=[...list , ...data]
                            state.游戏彩票类型=list
                        }else{
                            console.log('无需设置')
                            state.游戏彩票类型=data;
                        }
                    }else{
                        state.游戏彩票类型=data;
                    }
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
        获取json配置({state,dispatch}){
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
                    // 不是APP使用url地址 如 www.0698aa.com
                    url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
                }
            var url1 = config.api_url + '/App_Upload/Agents/Json/' + url + '.json';
            return new Promise((resolve, reject) => {
                axios.get(url1).then(x => {
                    var data = x.data;
                    // data={"Id":1374,"Title":"传奇","Home":true,"Type":2,"Logo":true,"QQ":null,"Ver":"20190524144937"}
                    state.urlType = data.Type
                    if (data.Logo) {
                        document.querySelector('link[rel="icon"]').href='/App_Upload/Agents/ico/' + data.Id + '.ico'
                    }else{
                        document.querySelector('link[rel="icon"]').href="/favicon.ico"
                    }
                    state.getJson = true
                    resolve(data);
                }).catch(err=>{
                    document.querySelector('link[rel="icon"]').href="/favicon.ico"
                    // state.urlType = 3
                    state.getJson = true
                    resolve(false)
                }) 
            });
        },
        特邀getinfo({state}){
            api_特邀getinfo().then(x=>{
                // 这个地方需要再改下
                if(x.data.Day && !x.data.Days){
                    state.特邀引导.步骤 = 1
                }else if(x.data.Day && x.data.Days){
                    state.特邀引导.步骤 = 3
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    modules:{
        投注,
        user,
        游戏大厅,
        投注订单,
        资金明细,
        // 彩票配置,
        个人资料,
        进入游戏,
        开奖走势,
        悬浮按钮,
        聊天室,
        私聊,
        跟单,
        计划,

        红包游戏,
        引导,

        // 聊天2
    }
})
