import { api_获取计划列表 } from "@/api/计划接口.js";
import {Toast} from 'vant'
var 计划state = {
    list: [],
    Lotterys: [],
    LotteryCode: '',
    Methods: [],
    Title: '',
    method: "",     //玩法
    加载中:false
}
export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(计划state)),
    getters: {

    },
    mutations: {

    },
    actions: {
        async 获取计划({ state, dispatch , commit}) {
            // state.加载中=true;
            commit('加载中',true,{root:true})
            let q = {
                    lotteryCode: state.LotteryCode,
                    method: state.method
                }
            try {
                var r = await api_获取计划列表(q);
            } catch (error) {
                console.log(error)
                commit('加载中',false,{root:true})
                Toast('系统错误，稍后再试!')
                // state.加载中=false;
                return
            }
            commit('加载中',false,{root:true})
            // state.加载中 = false;
            state.list = r.data.List;
            state.Lotterys = r.data.Lotterys;
            state.LotteryCode = r.data.LotteryCode;
            if(!state.Title){
                state.Title = r.data.Title;
            }
            state.Methods = r.data.Methods;
            if(!state.method){
                state.method = state.Methods.length > 0 ? state.Methods[0] : '';
            }
            // console.log(r);
        }
    }
}