import { api_投注跟单 } from "@/api/聊天室接口.js";
import { api_官方投注 } from "@/api/游戏彩票接口.js";
import { Toast } from 'vant';

export default {
    namespaced: true,
    state: {
        跟单彩票: {
            show: false,
            obj: {
                Content: "", //投注内容 01,02,03 统一逗号隔开 
                Id: 4141682,     // Id 主要用于 分享跟单
                IssueCode: "",   //期号
                LotteryCode: '',     //彩票 Id 10001  
                LotteryName: "", // 彩票名称 分分时时彩
                MethodName: "",  //玩法 如5星
                Nums: 1,     //投注注数
                Price: 0,   //金额
                Timer: 0,
                // ======================主要针对计划跟单
                Codes:[],   //主要针对计划跟单
                MethodCode:""   //玩法Code
            }
        },
        type: 0,     //0 分享跟单 1 计划跟单
    },
    getters: {

    },
    mutations: {
      
    },
    actions: {
        确认跟单({ state, dispatch }) {
            if (state.type == 0) {
                dispatch('分享跟单');
            }else if(state.type ==1 ){
                dispatch('计划跟单');
            }else{
                Toast('未知跟单类型')
            }
        },
        async 分享跟单({ state , dispatch , commit}) {
            if (!state.跟单彩票.obj.Price || state.跟单彩票.obj.Price <= 0) {
                Toast('请输入金额')
                return
            }
            commit('加载中',true,{root:true})
            var obj={
                    Id: state.跟单彩票.obj.Id,
                    amount: state.跟单彩票.obj.Price
                }
            try {
                var r = await api_投注跟单(obj)
            } catch (error) {
                
                commit('加载中',false,{root:true})
                return
            }
            
            if(r.data.code==0){
                Toast('跟单成功')
            }else{
                Toast(r.data.msg)
            }
            commit('加载中',false,{root:true})
            dispatch('user/getUserInfo','',{root:true});
            state.跟单彩票.show = false
        },
        async 计划跟单({ state , dispatch , commit}){
            // model[issueCode]: 20190904176
            // model[lotteryCode]: 70000
            // model[methodCode]: 102
            // model[isTeamBuy]: false
            // model[orderList][0][key]: B_No09
            // model[orderList][0][price]: 3
            // model[orderList][1][key]: B_No25
            // model[orderList][1][price]: 3
            // teamBuyOdds: 0
            commit('加载中',true,{root:true})          
            var model={
                    issueCode:state.跟单彩票.obj.IssueCode,
                    lotteryCode:state.跟单彩票.obj.LotteryCode,
                    methodCode:state.跟单彩票.obj.MethodCode ,
                    isTeamBuy:false,
                    orderList:[]
                }
            state.跟单彩票.obj.Codes.forEach(item => {
                model.orderList.push({key:item , price:state.跟单彩票.obj.Price })
            });
            var obj ={
                    model:model,
                    teamBuyOdds:0
                }
            try {
                var r = await api_官方投注(obj)
            } catch (error) {
                commit('加载中',false,{root:true})
                Toast('系统错误，稍后再试')
                state.跟单彩票.show = false
                return
            }
            if(r.data.code==0){
                Toast('跟单成功')
            }else{
                Toast(r.data.msg)
            }
            state.跟单彩票.show = false
            commit('加载中',false,{root:true})
            dispatch('user/getUserInfo','',{root:true});
        }
    }
}