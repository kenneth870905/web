import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
config.showlogo=false

Vue.use(Vuex)
import { Loading } from 'element-ui'

config.getConfig=0;

import {api_退出登录,api_Online } from "@/api/请求登录的接口.js";
import { api_获取平台余额, api_转入金额, api_转出金额 } from '@/api/余额接口.js'

import createPersistedState from 'vuex-persistedstate'
export default new Vuex.Store({
    plugins:[
        createPersistedState({
            reducer(val){
                return {
                    ip:val.ip
                }
            },
    //         // 使用 sessionStorage
            storage: window.sessionStorage,
    //         // 使用 cookie
    //         // storage: {
    //         //     getItem: key => Cookies.get(key),
    //         //     setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
    //         //     removeItem: key => Cookies.remove(key)
    //         // }
        })
    ],
    state: {
         //配置文件
        config:config,
        ip:'',
        技术支持:false,
        显示子菜单:false,
        // minnav:"",
        //= =============================
        Aname: '', // 待进入游戏类型 如 AG BY
        Money: '', // 平台余额
        Moneymin: '', // 总余额每个平台
        平台类型: '',
          //= ============================
          显示进入游戏弹框: false,
          待进入游戏: {
            name: '',
            查询类型: '', // 对应查询余额的字段 如 AG BY
            gid: '',
            type: '',
            url_key: '', // 跳转对应的 key 值 对应 tiaozhuan.js
            url_id: '' // 跳转对应的id , 分开写为了于原始Id区分
        },
        userInfo:{ //登录信息
            Ck: 0,
            Messages: [],
            Money: "",
            Notices: [],
            Page: "/",
            UserId: "",
        },
        Online_init:true,
        time_1:"",
        stop:false,
        刚获取:false,
        游戏彩票:[]
    },
    getters:{ // 只能获取，不能设置 在网页中用...mapGetters获取  到计算属性computed里面
        userInfo(state){
            return state.userInfo;
        },
        试玩(state) {
            if (state.userInfo.UserId) {
                var userid = state.userInfo.UserId.toLowerCase()
                return userid.indexOf('demo') != '-1'
            } else {
                return false
            }
        },
        显示进入游戏弹框(state) {
            return state.显示进入游戏弹框
        },
        待进入游戏(state) {
            return state.待进入游戏
        },
        站点配置(state){
            var url=location.hostname.replace('www.','')//去掉默认的www.
            // console.log(url);
            // var url='1996996.com';
            var obj={};
            if(website.list.hasOwnProperty(url)){
                var key=website.list[url];
                if(website.hasOwnProperty(key)){
                    obj=website[key]
                }
            }else if (state.config.getConfig == 3){
                obj={
                    appUrl:config.erweima ? config.erweima : "/App_Upload/app.png"
                };
            }
            // includes
            return obj
        },
    },
    mutations: {
        设置用户信息(state,用户信息){
            state.userInfo=用户信息
        },
        修改state(state,[key,value]){
            state[key]=value;
        },
        修改config(state,[key,val]){
            state.config[key]=val;
        }
    },
    actions: {
        openloading({ state }, type) {
            if (type) {
                state.loading_1 = Loading.service({
                    fullscreen: true,
                    text: '拼命加载中···',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            } else {
                setTimeout(() => {
                    state.loading_1.close()
                }, 500)
            }
        },
        设置待进入游戏({ state , dispatch}, obj) {
            state.待进入游戏 = obj
            console.log(obj)
            if(state.userInfo.UserId){
                dispatch('获取平台余额',obj.查询类型)
            }
        },
        设置进入游戏弹框({ state }, type) {
            state.显示进入游戏弹框 = type
        },
        获取平台余额({ state }, cname) {
            state.Moneymin='正在查询'
            api_获取平台余额({ type: cname }).then(x => {
                state.Moneymin = x.data.msg
            }).catch(err => { 
                state.Moneymin='查询失败'
            })
        },
        async 转入金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待进入游戏.查询类型
            }
            console.log(obj)
            dispatch('openloading', true)
            try {
                await api_转入金额(obj)
            } catch (error) {
                console.log(error);
                dispatch('openloading', false)
            }
            dispatch('获取平台余额', state.待进入游戏.查询类型)
            dispatch('getUserInfo')
            dispatch('openloading', false)
        },
        async 转出金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待进入游戏.查询类型
            }
            dispatch('openloading', true)
            try {
                await api_转出金额(obj)
            } catch (error) {
                dispatch('openloading', false)
            }
            dispatch('获取平台余额', state.待进入游戏.查询类型)
            dispatch('getUserInfo')
            dispatch('openloading', false)
        },
        async 退出登录({dispatch , commit}){
            await api_退出登录()
            commit('设置用户信息',{})
            commit('修改state',['首次登陆',true])
        },
        //页面上不需要调用这里 调用 getUserInfo就好了
        定时获取userInfo({state,dispatch}){
            if(state.stop){
                return
            }
            if(state.time_1){
                try {
                    clearTimeout(state.time_1)
                } catch (error) {}
            }
            state.time_1 = setTimeout(() => {
                dispatch('getUserInfo')
                state.time_1 = ''
            }, 1000*30);
        },
        getUserInfo({state,commit,dispatch}){
            console.log('vuex getUserInfo')
            if(state.刚获取) return
            state.刚获取 = true
            setTimeout(() => {
                state.刚获取 = false
            }, 500);
            var hash = location.hash.substring(1).split('?')[0] !='/' ? location.hash.substring(1).split('?')[0] : "";
            api_Online({init:state.Online_init,n:1 , hash}).then(x=>{
                state.Online_init=false
                state.userInfo=x.data;
                //定时获取
                if(state.userInfo.UserId){
                    dispatch('定时获取userInfo')
                }
                if(x.data.Notices){
                   
                }else if(x.data.Messages && x.data.Messages.length>0){
                    state.显示系统Messages=true
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        获取游戏json({state}){
            return axios.get("json/home.json").then(x=>{
                state.游戏彩票=x.data
            }).catch(err=>{})
        }
    },
    // mutations:{
        // 修改state(state,[key,val]){
        //     console.log(key,val)
        //     state[key]=val
        // },
    // }
  
})
