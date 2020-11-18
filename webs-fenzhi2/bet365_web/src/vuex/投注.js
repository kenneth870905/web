
import { api_获取彩票配置, api_获取近期开奖 } from "@/api/游戏彩票接口.js";

import 投注配置 from "@/assets/js/投注.js";

export default {
    namespaced: true,
    state: {

        彩票id: "",
        官信: 1, //1 信用，2 官方

        彩票配置: {},
        玩法一级: '',
        玩法二级: "",
        玩法三级: "",
        近期开奖: [],
        即将开奖: {},
        定时器1: "",
        选号配置: {},
        显示确认投注: false,
        待确认投注: {
            methodCode: "",     //玩法code
            content: "",        //投注号码       
            nums:0,             //注数
            price: 2,           //单价
            mode: 1,            //价格单位 1 元 2 角 3 分
            point: 0,           //返利
            玩法:""
        },
        购物车列表:[],
        官方购物车:{
            show:false,
            list:[],
            金额:2
        },
    },
    getters: {
        当前彩种(state, getters, rootState, rootGetters) {
            var 全部彩票 = rootGetters['全部彩票'];
            var obj = 全部彩票.find(x => x.id == state.彩票id)
            return obj ? obj : {}
        },
        官方选号(state){
            return state.选号配置.获取投注
        },
        注数(state) {
            // return state.选号配置.注数
            if(state.官信==2){
                return 0;
            }else{
                if(state.选号配置.list && state.选号配置.list.length>0){
                    console.log(state.彩票id, state.玩法三级.Code, state.选号配置.获取投注.str,state.选号配置.获取投注 )
                    try {
                        return Lottery.BetHelper.GetNum(state.彩票id, state.玩法三级.Code, state.选号配置.获取投注.str);
                    } catch (error) {
                        return 0
                    }
                }else{
                    return Lottery.BetHelper.GetNum(state.彩票id, state.玩法三级.Code, (state.选号配置.获取手动头部投注 ? state.选号配置.获取手动头部投注 +'|' :'') + state.选号配置.手动输入);
                }
            }
        },
        总金额(state, getters){
            var 单位=['',1,0.1,0.01]
            var 金额 = state.待确认投注.price * getters.注数 * 单位[state.待确认投注.mode];
                金额 = Math.round(金额*10000) / 10000
            return 金额
        },
        已选注单(state , getters){
            var str="";
            try {
                str=state.选号配置.获取投注.str
            } catch (error) {}
            var obj={
                    methodCode : state.玩法三级.Code,
                    // content : state.选号配置.获取投注.str ? state.选号配置.获取投注.str :'内容错误',
                    // content : state.选号配置.获取投注.str,
                    content : str,
                    content : str,
                    nums : getters.注数,
                    price : state.待确认投注.price,
                    mode : state.待确认投注.mode,
                    point : state.待确认投注.point,
                    玩法 : state.玩法一级.Label+'_'+state.玩法三级.Label,
                }
            return obj;
        }
    },
    mutations: {
        设置state(state, [key, value]) {
            state[key] = value;
        },
    },
    actions: {
        购物车随机投注({state , getters ,dispatch},number=1){
            for (let i = 0; i < number; i++) {
                state.选号配置.设置机选()
                var obj={
                    methodCode : state.玩法三级.Code,
                    content : state.选号配置.获取投注.str,
                    nums : getters.注数,
                    price : state.待确认投注.price,
                    mode : state.待确认投注.mode,
                    point : state.待确认投注.point,
                    玩法 : state.玩法一级.Label+'_'+state.玩法三级.Label,
                }
                dispatch('添加至购物车',obj);
            }
        },
        添加至购物车({state},obj){
            state.购物车列表.unshift(obj)
            state.显示确认投注=false;
        },
        设置待确认投注({ state, getters },content) {
            state.待确认投注.content = state.选号配置.获取投注.str;
            state.待确认投注.nums = getters.注数
            state.待确认投注.玩法 = state.玩法一级.Label+'_'+state.玩法三级.Label;
            state.待确认投注.methodCode = state.玩法三级.Code;
            state.显示确认投注=true
        },
        数据初始化({ state, dispatch, rootGetters }) {
            if (rootGetters['全部彩票'].length == 0) {
                dispatch('获取游戏彩票', '', { root: true })
            }
            Promise.all([
                dispatch('获取彩票配置'),
                dispatch('获取近期开奖'),
                dispatch('获取即将开奖')
            ]).then(x => {
                dispatch('设置购彩样式')
            }).catch(err => { })
        },
        设置购彩样式({ state }) {
            state.选号配置 =new 投注配置(state.彩票id, state.玩法三级).配置
        },
        获取彩票配置({ state }) {
            return new Promise((resolve, reject) => {
                var 玩法 = '';    //1 表示官方 2 表示信用
                var type = state.彩票id.substring(0, 2);
                if (type == '70' || type == "50") {
                    玩法 = 2
                    state.官信=2
                } else if (type == '30') {
                    玩法 = 1
                    state.官信=1
                } else {
                    玩法 = state.官信
                }
                api_获取彩票配置({ lotteryCode: state.彩票id, type: 玩法 }).then(x => {
                    state.彩票配置 = x.data

                    state.玩法一级 = x.data.Menus.find(y=>y.Activity) ? x.data.Menus.find(y=>y.Activity) : x.data.Menus[0];
                    if (state.玩法一级.SubMenus) {
                        state.玩法二级 = state.玩法一级.SubMenus[0];
                        state.玩法三级 = state.玩法二级.Methods[0]
                    } else {
                        // 没有第二级
                        state.玩法二级 = state.玩法一级.Method;
                        state.玩法三级 = state.玩法一级.Method
                    }
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            });
        },
        获取近期开奖({ state }) {
            return new Promise((resolve, reject) => {
                var query = {
                    lotteryCode: state.彩票id,
                    state: 1
                }
                api_获取近期开奖(query).then(x => {
                    state.近期开奖 = x.data.Top5
                    resolve()
                }).catch(err => {
                    reject()
                })
            });
        },
        获取即将开奖({ state, dispatch }) {
            return new Promise((resolve, reject) => {
                try {
                    clearTimeout(state.定时器1)
                } catch (error) { }
                var query = {
                    lotteryCode: state.彩票id,
                    state: 0
                }
                api_获取近期开奖(query).then(x => {
                    var data = x.data
                    data.showTimer = { h: '00', m: '00', s: '00' }
                    state.即将开奖 = data;
                    dispatch('倒计时', state.即将开奖);
                    dispatch('开始倒计时')
                    resolve()
                }).catch(err => {
                    reject()
                })
            });
        },
        倒计时({ state }, item) {
            function setVal() {
                item.Timer--;
                if (item.Timer <= 0) {
                    //已到开奖时间
                    item.showTimer = { h: '00', m: '00', s: '00' };
                    clearInterval(item.setIntervalTimer);
                    item.setIntervalTimer = null;
                } else {
                    var h = '00' + Math.floor(item.Timer / 3600);
                    var m = '00' + Math.floor((item.Timer / 60 % 60));
                    var s = '00' + Math.floor((item.Timer % 60));
                    item.showTimer = { h: h.substr(h.length - 2), m: m.substr(m.length - 2), s: s.substr(s.length - 2) };
                }
            }
            setVal();
            item.setIntervalTimer = setInterval(function () {
                setVal();
            }, 1000)
        },
        开始倒计时({ state, dispatch }) {
            state.定时器1 = setInterval(() => {
                if (!state.即将开奖.Timer || state.即将开奖.Timer <= 0 || state.近期开奖[0].Content == null) {
                    dispatch('获取即将开奖');
                    dispatch('获取近期开奖')
                }
            }, 10000);
        }
    },
    modules: {
    }
}