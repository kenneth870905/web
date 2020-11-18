/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-23 18:23:47
 * @LastEditTime: 2019-09-14 15:35:38
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { Loading, Message } from "element-ui";
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)
import { api_Online, api_退出登录 } from '@/api/登录接口.js'
import { api_GetPersonInfo } from "@/api/个人资料.js";


import 聊天室 from "./vuex/聊天室.js";
import 私聊 from "./vuex/私聊.js";
import user from "./vuex/user.js";
import 计划 from "./vuex/计划.js";
import 跟单 from "./vuex/跟单.js";
// const 计划 =()=>import('./vuex/计划.js')

export default new Vuex.Store({
    plugins:[
        createPersistedState({
            key: "liaotianshi",
            reducer(val){
                return {
                    user:val.user,
                    聊天室:{
                        房间记录:val.聊天室.房间记录,
                        当前房间:val.聊天室.当前房间,
                        房间密码:val.聊天室.房间密码
                    }
                }
            },
        })
    ],
    state: {
        显示登录框:false,
        userinfo:{},
        个人资料:{},

        config:config,
        彩票:[],
        marSixNums:$.base.markSixNums,
        加载:"",
        Online_init:true
    },
    getters:{
        全部彩票(state){
            var obj=state.彩票.find(x=>x.title=='所有彩种');
            return obj ? obj.children : []
        }
    },
    mutations: {
        设置state(state,[key,value]){
            state[key]=value
        }
    },
    actions: {
        加载中({ state }, type) {
            if (type) {
                state.加载 = Loading.service({
                    text: "正在加载",
                    background: "rgba(0, 0, 0, 0.5)"
                });
            } else {
                try {
                    state.加载.close();
                } catch (error) { }
            }
        },
        成功提示({},str){
            Message({
                showClose: true,
                message: str,
                type: 'success'
            });
        },
        失败提示({},str){
            Message({
                showClose: true,
                message: str,
                type: 'error',
                // duration:0
            });
        },
        获取彩票({state,commit}){
            return new Promise((resolve, reject) => {
                axios.get('static/json/caipiao.json').then(x=>{
                    state.彩票=x.data;
                    resolve()
                }).catch(err=>{
                    reject()
                })
            });
        },
        // 请求余额的函数
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                api_Online({ init: state.Online_init, n: 1 }).then(x => {
                    state.Online_init = false
                    commit('设置state',['userinfo',x.data])
                    resolve()
                }).catch(err => {
                    reject()
                })    
            });
        },
        获取个人资料({state}){
            return api_GetPersonInfo().then(x=>{
                state.个人资料=x.data
            }).catch(err=>{})
        }
    },
    modules:{
        聊天室,
        私聊,
        user,
        计划,
        跟单
    } 
})
