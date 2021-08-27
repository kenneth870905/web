const 引导state = {
    扫雷: true,
    扫雷引导: {
        已查看: false
    },
    新特邀: {
        show: true,
        引导: true,
        已查看: false
    },
    抢红包: true,     //新特邀嘉宾
    // 0表示不显示 1.礼包->2.特邀嘉宾 -> 3.游戏弹框->4.选择游戏类型->5.5选择游戏->6手动关闭或流程结束
    特邀引导: {
        步骤: 0,
        gameName: "", //主要用于保存游戏名称
        gameName_2: "",  //比如 cq9 的跳起来
        进入领取页面: false,     //是否进入过领取页面
        引导结束: false,     //手动关闭手为真
    },
    init: false
}

import { api_特邀getinfo, api_是否进入游戏, api_查看vip引导 } from "@/api/特邀嘉宾.js";
export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(引导state)),
    getters: {
        引导状态(state, getters, rootState) {
            // type 1 表示 特邀游戏 2 新特邀 3 扫雷
            // 扫雷
            if (!state.扫雷引导.已查看 && rootState.config.noTelegram.path == '/hbgame' && !rootState.技术支持) {
                return { type: 3 }
            }
            // 新特邀888红包
            if (!state.新特邀.已查看 && state.新特邀.show) {
                return { type: 2 }
            }
            //前面两个不需要等待查询完成
            if (!state.init) {
                return { type: "" }
            }
            //老特邀
            if (state.特邀引导.步骤 != 0 && !state.特邀引导.引导结束) {
                let o = { type: 1 };
                let o1 = { ...o, ...state.特邀引导 }
                return o1;
            }
            return { type: "" }
        }
    },
    mutations: {
        M特邀引导(state, [key, val]) {
            state.特邀引导[key] = val;
        }
    },
    actions: {
        async init({ state, dispatch, commit }) {
            dispatch('设置扫雷')
            dispatch('设置新特邀');
            await dispatch('查询特邀状态')
            state.init = true
            console.log('初始化完成')
            // dispatch('user','',{root:true})
        },
        设置扫雷({ state, rootState }) {
            if (rootState.config.noTelegram && rootState.config.noTelegram.path == '/hbgame' && state.扫雷) {
                state.扫雷 = true
                // console.log('扫雷扫雷扫雷扫雷扫雷扫雷扫雷扫雷扫雷扫雷')
            } else {
                state.扫雷 = false
            }
        },
        设置新特邀({ state, rootState }) {
            if (!rootState.config.newTeYao) {
                state.新特邀 = false
            } else {
                if (rootState.config.newTeYao.url && rootState.config.newTeYao.url_list) {
                    var hostname = window.location.hostname;
                    var obj = rootState.config.newTeYao.url_list.find(x => hostname.includes(x))
                    if (obj) {
                        state.新特邀.show = true
                    } else {
                        state.新特邀.show = false
                    }
                } else {
                    state.新特邀 = false
                }
            }
        },
        查询特邀状态({ state, rootState }) {
            console.log('查询特邀状态', rootState.urlType)
            return new Promise((resolve, reject) => {
                // resolve();
                // return
                if (state.特邀引导.引导结束) {
                    state.特邀引导.步骤 = 0
                    resolve()
                    return
                }
                Promise.all([
                    api_特邀getinfo(),
                    api_是否进入游戏(),
                    api_查看vip引导()
                ]).then(all => {
                    console.log(all)
                    //基本领取信息
                    var x = all[0]
                    // x.data.Days = '1-3'
                    // x.data.Day = 3
                    //是否进入过游戏
                    var y = all[1]
                    // y.data = 'False'
                    //是否进入过领取页面 判断是否显示特邀引导
                    var z = all[2]
                    // z = {data:'False'}
                    // if(x.data.msg == '请登录'){
                    if (x.data.msg) {
                        state.特邀引导.步骤 = 0
                        resolve()
                        return
                    }
                    if (x.data.Day && !x.data.Days) {
                        // 是特邀嘉宾 但没有领取过一次
                        // 已查看特邀引导  特邀弹窗 只有 Type=3 是才显示
                        if (rootState.urlType == 3) {
                            if (z.data == 'True') {
                                state.特邀引导.步骤 = 0
                                resolve()
                                return
                            }
                            state.特邀引导.步骤 = 1
                        }
                    } else if (x.data.Day && x.data.Days) {
                        //是特邀嘉宾 并且已经领取
                        //是特邀嘉宾 并且已经进入游戏
                        if (y.data == 'True') {
                            state.特邀引导.步骤 = 0
                            state.特邀引导.引导结束 = true;
                            resolve()
                            return
                        }
                        // 已领取赏金 弹出游戏引导框
                        state.特邀引导.步骤 = 3
                    }
                    resolve()
                }).catch(err => {
                    resolve()
                })
            });
        }
    }
}