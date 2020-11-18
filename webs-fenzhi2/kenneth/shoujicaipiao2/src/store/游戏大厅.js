
import { api_GetLotteryInfos } from "@/api/游戏彩票接口.js";

export default {
    namespaced:true,
    state:{
        查看类型1:0,
        选中游戏:"",
        选中游戏分类:0,
        选中彩票类型:"",    // "" 表示全部
        开奖列表:[],
        定时器1:"",     //开奖列表定时器获取

        查询条件:{
            menuCode:"",
            lotteryCodes:[]
        }
    },
    getters:{

    },
    mutations:{
        设置state(state,[key,value]){
            state[key]=value;
        }
    },
    actions:{
        async 初始化({ state , rootState , dispatch }){
            state.选中游戏=0;
            state.选中彩票类型=0;
            state.查询条件={
                menuCode:"",
                lotteryCodes:[]
            }

            if(rootState.游戏彩票类型.length==0){
                await dispatch('获取游戏彩票', {}, {root: true}) 
            }
            var 游戏彩票=rootState.游戏彩票类型;
            if(!state.选中游戏){
                state.选中游戏=游戏彩票.find(x=>x.title!='彩票');
            }
            dispatch('获取彩票开奖列表');
        },
        切换彩种({state , dispatch , commit},obj){
            state.选中彩票类型=obj;
            state.查询条件={
                menuCode:obj.menuCode,
                lotteryCodes:[]
                // menuCode:'shishicai',
                // lotteryCodes:[10000]
            }
            commit('加载中',true,{root:true})
            dispatch('获取彩票开奖列表');
        },
        获取彩票开奖列表({state,dispatch , commit}){
            api_GetLotteryInfos(state.查询条件).then(x=>{
                
                commit('加载中',false,{root:true})
                var data=x.data;
                if(state.查询条件.lotteryCodes.length==0 || (state.查询条件.lotteryCodes.length==1 && state.查询条件.lotteryCodes[0]==10000 )){
                    state.开奖列表=data;
                    for (const key in state.开奖列表) {
                        dispatch('倒计时',state.开奖列表[key]);
                    }
                }else{
                    for (const key in data){
                        var item=state.开奖列表[key];
                        if(item){
                            state.开奖列表[key]=data[key];
                            dispatch('倒计时',state.开奖列表[key]);
                        }
                    }
                }
                if(!state.定时器1){
                    dispatch('startTimer')
                }
            })
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
        startTimer({state,dispatch}) {
            state.定时器1=setInterval(() => {
                state.查询条件.lotteryCodes=[]
                for (const key in state.开奖列表) {
                    // if(state.开奖列表[key].Timer<=1 || state.开奖列表[key].Content==null){
                    if(state.开奖列表[key].Timer<=1){
                        state.查询条件.lotteryCodes.push(key.substring(1))
                    }
                }
                if(state.查询条件.lotteryCodes.length>0){
                    console.log('定时获取开奖彩票')
                    dispatch('获取彩票开奖列表')
                }
            }, 5000);
        },
        取消定时获取({state}){
            try {
                clearInterval(state.定时器1);
                state.定时器1=''
            } catch (error) {}
        }
    }
}