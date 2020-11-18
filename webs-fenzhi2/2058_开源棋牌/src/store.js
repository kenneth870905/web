import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { api_Online, api_退出登录 } from '@/api/登录接口.js'
// import { api_获取平台余额, api_转入金额, api_转出金额 } from '@/api/余额接口.js'

Vue.use(Vuex)

config.getConfig = 0

import 投注 from "@/vuex/投注.js";
import 资金明细 from "@/vuex/资金明细.js";
import 进入游戏 from '@/vuex/进入游戏.js';
import 投注订单 from "@/vuex/投注订单.js";
import user from "@/vuex/user.js";
import 聊天室 from '@/vuex/聊天室.js';
import 个人资料 from '@/vuex/个人资料.js';
import 开奖走势 from '@/vuex/开奖走势.js';
import 私聊 from '@/vuex/私聊.js';
import 悬浮按钮 from '@/vuex/悬浮按钮.js';

import { api_获取游戏彩票 } from "@/api/游戏彩票接口.js";
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            reducer(val) {
                return {
                    user:val.user,
                    userInfo: val.userInfo,
                    ip:val.ip,
                    聊天室:{
                        当前房间:val.聊天室.当前房间,
                        预设房间:val.聊天室.预设房间,
                        房间密码:val.聊天室.房间密码,
                        偏好彩票:val.聊天室.偏好彩票,
                        偏好彩票2:val.聊天室.偏好彩票2
                    }
                }
            },
            // 使用 sessionStorage
            storage: window.sessionStorage
            // 使用 cookie
            // storage: {
            //     getItem: key => Cookies.get(key),
            //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
            //     removeItem: key => Cookies.remove(key)
            // }
        })
    ],
    state:{
        加载中:false,
        技术支持:false,
        config:config,
        ip:'',
        userInfo: {
            Ck: 0,
            Messages: [],
            Money: '',
            Notices: [],
            Page: '/',
            UserId: ''
        },
        彩票玩法:1,
         //==============================
         Aname:"",           //待进入游戏类型 如 AG BY
         Money:"",           // 平台余额
         Moneymin:"",        //总余额每个平台
         平台类型:"",
         //=============================
        待进入游戏:{
            name:"",
            type:'',
            id:'',
            金额:0,
        },
        显示进入游戏弹框:false,
        tabbarShow:true,
        //彩票颜色生肖等 主要用于 六合彩
        marSixNums:$.base.markSixNums,
        //加密
        publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
        游戏彩票类型:[],
    },
    getters: {// 只能获取，不能设置 在网页中用...mapGetters获取  到计算属性computed里面
        
        登陆信息1(state) {
            return state.登陆信息
        },
        显示进入游戏弹框(state){
            return state.显示进入游戏弹框;
        },
        待进入游戏(state){
            return state.待进入游戏;
        },
        userInfo(state) {
            return state.userInfo
        },
        getTabbarShow(state){
            return state.tabbarShow
        },
        //带有类型 
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
    mutations: {
        设置是否显示登录框({state},type){
            state.显示登录框 = type;
        },
        设置进入游戏弹框({state},type){
            state.显示进入游戏弹框=type;
        },
        设置待进入游戏({state , dispatch},obj){
            state.待进入游戏=obj;
            dispatch('获取平台余额');
            state.显示进入游戏弹框=true;
        },
        // 需要一直保存的数据放在这里
        设置用户信息(state, 用户信息) {
            // console.log('mutations',用户信息)
            state.userInfo = 用户信息
        },
        修改用户信息(state,obj){
            state.userInfo=obj
        },
        修改state(state, [key, val]) {
            console.log(key, val)
            state[key] = val
        },
        修改config(state, [key, val]) {
            state.config[key] = val
        },
        设置config(state,[key,value]){
            state.config[key]=value;
        },
        updateTabbarShow(state, payload){
            state.tabbarShow = payload
          },
          加载中(state,type){
            if(!type){
                setTimeout(() => {
                    state.加载中=type                    
                }, 300);
            }else{
                state.加载中=type
            }
        },
        设置state(state,[key,value]){
            state[key]=value
        },
        设置config(state,[key,value]){
            state.config[key]=value;
        }
    },
    actions: { // 在页面中用...mapActions 获取到函数里methods
        获取游戏彩票({state,commit,dispatch}){
            console.log('获取彩票')
            return new Promise((resolve, reject) => {
                api_获取游戏彩票().then(x=>{
                    console.log('获取彩票',x)
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
        Online({state , commit}){
            api_Online({init: 1,n: 1}).then(x=>{
                // state.userInfo=x.data;
                commit('修改用户信息',x.data)
            })
        },
        更新登陆信息({ state }) {
            var value = localStorage.login
            state.登陆信息 = value
        },
        获取平台余额({state}){
            api_获取平台余额({type: state.待进入游戏.type}).then(x=>{
                state.待进入游戏.金额=x.data.msg;
            }).catch(err=>{})
        },
        async 转入金额({state,dispatch},金额){
            var obj={
                    amount: 金额,
                    type: state.待进入游戏.type
                }
            dispatch('openloading',true)
            try {
                var 转入= await api_转入金额(obj);
                if(转入.data.code!=0){
                    Message.error(转入.data.msg);
                }
                console.log(转入)
            } catch (error) {
                console.log(error)
                dispatch('openloading',false)        
            }
            dispatch('获取平台余额');
            dispatch('getUserInfo');
            dispatch('openloading',false)
        },
        async 转出金额({state,dispatch},金额){
            var obj={
                amount: 金额,
                type: state.待进入游戏.type
            }
            dispatch('openloading',true)
            try {
                var 转出 = await api_转出金额(obj);  
                if(转出.data.code!=0){
                    Message.error(转出.data.msg);
                }
            } catch (error) {
                dispatch('openloading',false)                                                
            }
            dispatch('获取平台余额');
            dispatch('getUserInfo')  
            dispatch('openloading',false)
        },
        读取配置({state , dispatch , rootState}){
            var url=rootState.user.url
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
            var url=rootState.user.url
            var config_url=rootState.user.config
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
        
    },
    modules:{
        // 刷新用户信息:刷新用户信息
    },
    modules:{
        投注,
        user,
        // 游戏大厅,
        投注订单,
        资金明细,
        // 彩票配置,
        个人资料,
         进入游戏,
        开奖走势,
        悬浮按钮,
        聊天室,
        私聊
    }
})