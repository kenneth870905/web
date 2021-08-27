
import { api_获取平台余额, api_转入金额, api_转出金额 } from "@/api/余额接口.js";
import { Toast } from 'vant';
export default {
    namespaced: true,
    state: {
        显示弹框: false,
        type: "",
        title: "",
        id: "",
        平台余额: "",
    },
    getters: {},
    mutations: {
        设置state(state, [key, value]) {
            state[key] = value;
        }
    },
    actions: {
        设置类型({ state, dispatch, commit }, obj) {
            console.log(123)
            state.显示弹框 = true;
            state.type = obj.type;
            state.title = obj.title;
            state.id = obj.id;
            state.平台余额 = "";
            dispatch('获取平台余额')
        },
        获取平台余额({ state, commit }) {
            var obj = {
                type: state.type
            }
            commit('加载中', true, { root: true })
            api_获取平台余额(obj).then(x => {
                if (x.data.code == 0) {
                    state.平台余额 = x.data.msg
                } else {
                    Toast(x.data.msg);
                }
                commit('加载中', false, { root: true })
            }).catch(err => {
                commit('加载中', true, { root: true })
            })
        },
        async 转入金额({ state, commit, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.type
            }
            commit('加载中', true, { root: true })
            var r = await api_转入金额(obj);
            console.log(r)
            if (r.data.code == 0) {
                dispatch('获取平台余额');
                dispatch('user/getUserInfo', '', { root: true })
                Toast('转入成功')
            } else {
                Toast(r.data.msg)
            }
            commit('加载中', false, { root: true })
        },
        async 转出金额({ state, dispatch, commit }, 金额) {
            var obj = {
                amount: 金额,
                type: state.type
            }
            commit('加载中', true, { root: true })
            var r = await api_转出金额(obj);
            if (r.data.code == 0) {
                dispatch('获取平台余额');
                dispatch('user/getUserInfo', '', { root: true })
                Toast('转出成功')
            } else {
                Toast(r.data.msg)
            }
            commit('加载中', false, { root: true })
        }
    }
}