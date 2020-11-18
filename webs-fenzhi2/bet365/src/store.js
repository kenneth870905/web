/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
config.title=''

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

import { Loading, Message } from 'element-ui';

import { api_Online } from "@/api/登录接口.js";
import { api_获取平台余额, api_转入金额, api_转出金额 } from "@/api/余额接口.js";
export default new Vuex.Store({

    plugins: [
        createPersistedState({
            reducer(val) {
                return {
                    userInfo: val.userInfo,
                }
            },
            // 使用 sessionStorage
            storage: window.sessionStorage,
        })
    ],
    state: {
        //配置文件
        config: config,

        userInfo: {
            Ck: 0,
            Messages: [],
            Money: "",
            Notices: [],
            Page: "/",
            UserId: "",
        },
        显示系统Messages: false,
        //==============================
        Aname: "",           //待进入游戏类型 如 AG BY
        Money: "",           // 平台余额
        Moneymin: "",        //总余额每个平台
        平台类型: "",
        //=============================
        登陆信息: "",
        显示登录框: false,
        显示进入游戏弹框: false,
        待进入游戏: {
            name: "",
            type: '',
            id: '',
            金额: 0,
        },
        首次登陆: true,
        系统公告: {
            url: '',
            show: false
        },
    },
    getters: {//只能获取，不能设置 在网页中用...mapGetters获取  到计算属性computed里面
        登陆信息1(state) {
            return state.登陆信息;
        },
        显示登录框(state) {
            return state.显示登录框;
        },
        显示进入游戏弹框(state) {
            return state.显示进入游戏弹框;
        },
        待进入游戏(state) {
            return state.待进入游戏;
        },
        userInfo(state) {
            return state.userInfo;
        },
        // 系统公告(state){
        //     return state.系统公告;
        // },
        试玩(state) {
            if (state.userInfo.UserId) {
                var userid = state.userInfo.UserId.toLowerCase();
                return userid.indexOf('demo') != '-1';
            } else {
                return false;
            }
        },
        系统公告(state) {
            var 系统公告 = {
                //系统
                url: "",
                show: false,
                //系统消息
                显示系统Messages: false,
                系统Messages: ""
            };
            if (state.userInfo.Notices) {
                state.userInfo.Notices.forEach(item => {
                    if (item.Group) {
                        系统公告 = {
                            url:config.iframe_url + "/Systems/Notice/Show?groupid=" +item.Group,
                            show: true
                        };
                    } else if (item.Ids) {
                        item.Ids.forEach(ids_1 => {
                            系统公告 = {
                                url: config.iframe_url + "/Systems/Notice/Show/" + ids_1.Id,
                                show: true
                            };
                        });
                    }
                });
            } else if (state.userInfo.Messages && state.userInfo.Messages.length > 0) {
                系统公告.显示系统Messages = true;
                系统公告.系统Messages = state.userInfo.Messages && state.userInfo.Messages.length > 0 ? state.userInfo.Messages[0].Content : "";
            }
            return 系统公告;
        },
        站点配置(state) {
            // var url = location.hostname.replace('www.','');
            var url = "1996997.com"; //
            var obj = {};
            // console.log(website)
            // if(!website){
            //     var website={
            //             list:{}
            //         }
            // }
            if (website.list.hasOwnProperty(url)) {
                var key = website.list[url];
                if (website.hasOwnProperty(key)) {
                    obj = website[key];
                }
            } else if (state.config.getConfig == 3) {
                obj = {
                    appUrl: config.erweima ? config.erweima : "/App_Upload/appBet.png"
                };
            }
            // includes
            return obj;
        }
    },
    mutations: {
        设置用户信息(state, 用户信息) {
            // console.log('mutations',用户信息)
            state.userInfo = 用户信息
        },
        修改用户信息(state, obj) {
            state.userInfo = obj
        },
        修改state(state, [key, val]) {
            state[key] = val
        },
        设置config(state, [key, value]) {
            state.config[key] = value;
        }
    },
    actions: { //在页面中用...mapActions 获取到函数里methods
        Online({ state, commit }) {
            api_Online({ init: 1, n: 1 }).then(x => {
                // state.userInfo=x.data;
                commit('修改用户信息', x.data)
            })
        },
        openloading({ state }, type) {
            if (type) {
                state.loading_1 = Loading.service({
                    fullscreen: true,
                    text: '拼命加载中···',
                    // spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            } else {
                setTimeout(() => {
                    state.loading_1.close()
                }, 500)
            }
        },
        getkey({ state }, key) {
            return state[key]
        },
        MoneyAll({ state }, 钱) {
            state.Money = 钱
        },
        更新登陆信息({ state }) {
            var value = localStorage.login
            state.登陆信息 = value
        },
        设置是否显示登录框({ state }, type) {
            state.显示登录框 = type;
        },
        设置进入游戏弹框({ state }, type) {
            state.显示进入游戏弹框 = type;
        },
        设置待进入游戏({ state, dispatch }, obj) {
            state.待进入游戏 = obj;
            dispatch('获取平台余额');
            state.显示进入游戏弹框 = true;
        },
        //请求余额的函数
        getUserInfo({ state, commit }) {
            //api_Online请求余额的接口
            api_Online({ init: 1, n: 1 }).then(x => {
                // commit('设置用户信息',x.data.UserId ? x.data : {})
                commit('设置用户信息', x.data)
                if (x.data.Notices) {
                    x.data.Notices.forEach(item => {
                        if (item.Group) {
                            state.系统公告 = {
                                url: config.iframe_url + '/Systems/Notice/Show?groupid=' + item.Group,
                                show: true
                            }
                        } else if (item.Ids) {
                            item.Ids.forEach(ids_1 => {
                                state.系统公告 = {
                                    url: config.iframe_url + '/Systems/Notice/Show/' + ids_1.Id,
                                    show: true
                                }
                            })
                        }
                    });
                } else if (x.data.Messages && x.data.Messages.length > 0) {
                    state.显示系统Messages = true
                }
            }).catch(err => {
                console.log(err)
            })
        },
        async 退出登录({ dispatch, commit }) {
            await api_退出登录()
            commit('设置用户信息', {})
            commit('修改state', ['首次登陆', true])
        },
        获取平台余额({ state }) {
            api_获取平台余额({ type: state.待进入游戏.type }).then(x => {
                state.待进入游戏.金额 = x.data.msg;
            }).catch(err => { })
        },
        async 转入金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待进入游戏.type
            }
            dispatch('openloading', true)
            try {
                var 转入 = await api_转入金额(obj);
                if (转入.data.code != 0) {
                    Message.error(转入.data.msg);
                }
                console.log(转入)
            } catch (error) {
                console.log(error)
                dispatch('openloading', false)
            }
            dispatch('获取平台余额');
            dispatch('getUserInfo');
            dispatch('openloading', false)
        },
        async 转出金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待进入游戏.type
            }
            dispatch('openloading', true)
            try {
                var 转出 = await api_转出金额(obj);
                if (转出.data.code != 0) {
                    Message.error(转出.data.msg);
                }
            } catch (error) {
                dispatch('openloading', false)
            }
            dispatch('获取平台余额');
            dispatch('getUserInfo')
            dispatch('openloading', false)
        }
    },
    modules: {
        // 刷新用户信息:刷新用户信息
    }
})
