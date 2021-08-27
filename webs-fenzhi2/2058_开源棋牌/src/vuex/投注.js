
import { api_获取彩票配置 , api_获取近期开奖} from "@/api/游戏彩票接口.js";

import 投注配置 from "@/assets/js/投注.js";

export default {
    namespaced: true,
    state: {
        
        彩票id:"",
        官信:1, //1 官方，2 信用
        
        彩票配置:{},
        玩法一级:'',
        玩法二级:"",
        玩法三级:"",
        近期开奖:[],
        即将开奖:{},
        定时器1:"",
        球组:[]
    },
    getters: {
        玩法(state) {
            return state.玩法
        },
        当前彩种( state , getters, rootState , rootGetters){
            var 全部彩票=rootGetters['全部彩票'];
            var obj=全部彩票.find(x=>x.id==state.彩票id)
            return obj ? obj : {}
        }
    },
    mutations: {
        设置state(state, [key, value]) {
            state[key] = value;
        }
    },
    actions: {
        数据初始化({ state , dispatch , rootGetters}) {
            if(rootGetters['全部彩票'].length==0){
                dispatch('获取游戏彩票','',{root:true})
            }
            Promise.all([
                dispatch('获取彩票配置'),
                dispatch('获取近期开奖'),
                dispatch('获取即将开奖')
            ]).then(x=>{
                dispatch('设置购彩样式')
            }).catch(err=>{

            })
        },
        设置购彩样式({state}){
            var 配置=new 投注配置(state.彩票id,state.玩法三级);
            state.球组=配置.球组
        },
        获取彩票配置({state}){
            return new Promise((resolve, reject) => {
                var 玩法='';    //1 表示官方 2 表示信用
                var type=state.彩票id.substring(0,2);
                if(type=='70' || type=="50"){
                    玩法=2
                }else if(type=='30'){
                    玩法=1
                }else{
                    玩法=state.官信
                }
                api_获取彩票配置({lotteryCode:state.彩票id , type:玩法 }).then(x=>{
                    state.彩票配置=x.data
                    state.玩法=[0, 0]
                    state.玩法一级=x.data.Menus[0];
                    if(state.玩法一级.SubMenus){
                        state.玩法二级=state.玩法一级.SubMenus[0];
                        state.玩法三级=state.玩法二级.Methods[0]                    
                    }else{
                        // 没有第二级
                        state.玩法二级=state.玩法一级.Method;
                        state.玩法三级=state.玩法一级.Method                    
                    }
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            });
        },
        获取近期开奖({state}){
            return new Promise((resolve, reject) => {
                var query={
                        lotteryCode: state.彩票id,
                        state: 1
                    }
                api_获取近期开奖(query).then(x=>{
                    state.近期开奖=x.data.Top5
                    resolve()
                }).catch(err=>{
                    reject()
                })
            });
        },
        获取即将开奖({state,dispatch}){
            return new Promise((resolve, reject) => {
                try {
                    clearTimeout(state.定时器1)                    
                } catch (error) {}
                var query={
                        lotteryCode: state.彩票id,
                        state: 0
                    }
                api_获取近期开奖(query).then(x=>{
                    var data=x.data
                        data.showTimer = { h: '00', m: '00', s: '00' }
                    state.即将开奖=data;
                    dispatch('倒计时',state.即将开奖);
                    dispatch('开始倒计时')
                    resolve()
                }).catch(err=>{
                    reject()
                })
            });
        },
        倒计时({state},item) {
            function setVal() {
                item.Timer--;
                if (item.Timer <= 0) {
                    //已到开奖时间
                    item.showTimer = { h: '00', m: '00', s: '00' };
                    clearInterval(item.setIntervalTimer);
                    item.setIntervalTimer = null;
                }else {
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
        开始倒计时({state,dispatch}){
            state.定时器1 = setInterval(() => {
                if(!state.即将开奖.Timer || state.即将开奖.Timer<=0 || state.近期开奖[0].Content==null){
                    dispatch('获取即将开奖');
                    dispatch('获取近期开奖')
                }
            }, 3000);
        }
    },
    modules:{
    }
}