import { api_获取计划列表 } from "@/api/计划接口.js";

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
        async 获取计划({ state, dispatch }) {
            state.加载中=true;
            let q = {
                    lotteryCode: state.LotteryCode,
                    method: state.method
                }
            try {
                var r = await api_获取计划列表(q)
            } catch (error) {
                dispatch('失败提示', '系统错误，稍后再试', { root: true })
                state.加载中=false;
                return
            }
            state.加载中 = false;
            state.list = r.data.List;
            state.Lotterys = r.data.Lotterys;
            state.LotteryCode = r.data.LotteryCode;
            if(!state.Title){
                state.Title = r.data.Title ? r.data.Title : r.data.Lotterys[0].LotteryName;
            }
            state.Methods = r.data.Methods;
            if(!state.method){
                state.method = state.Methods.length > 0 ? state.Methods[0] : '';
            }
            // console.log(r);
        }
    }
}