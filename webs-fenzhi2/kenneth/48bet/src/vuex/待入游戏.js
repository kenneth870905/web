import {
    api_获取平台余额,
    api_转入金额,
    api_转出金额
} from "@/api/余额接口.js";

export default {
    namespaced: true,
    state: {
        待入游戏: {
            name: "",
            type: "",
            gid: ""
        },
        平台余额: "",
        显示: false
    },
    getters: {},
    mutations: {},
    actions: {
        设置({ state }, [key, value]) {
            state[key] = value;
        },
        设置进入游戏({ state, dispatch }, obj) {
            // obj={
            //     name:"",
            //     type:"",
            //     gid:""
            // }
            state.待入游戏 = obj;
            state.显示 = true;
            setTimeout(() => {
                dispatch("获取平台余额");
            }, 500);
        },
        获取平台余额({ state, dispatch }) {
            dispatch("加载中", true, { root: true });
            state.平台余额 = "";
            return new Promise((resolve, reject) => {
                api_获取平台余额({ type: state.待入游戏.type }).then(x => {
                    if (x.data.code == 0) {
                        state.平台余额 = x.data.msg;
                    } else {
                        state.平台余额 = "获取失败";
                        dispatch("错误提示", x.data.msg, { root: true });
                    }
                    dispatch("加载中", false, { root: true });
                    resolve();
                }).catch(err => {
                    dispatch("加载中", false, { root: true });
                    reject();
                });
            });
        },
        async 转入金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待入游戏.type
            };
            dispatch("加载中", true, { root: true });
            try {
                var r = await api_转入金额(obj);
            } catch (error) {
                dispatch("错误提示", "系统错误稍后再试", { root: true });
                dispatch("加载中", false, { root: true });
                return;
            }
            // console.log(r)
            if (r.data.code == 0) {
                await Promise.all([
                    dispatch("获取平台余额"),
                    dispatch("user/getUserInfo", "", { root: true })
                ])
                    .then(x => { })
                    .catch(err => { });
                dispatch("成功提示", "转入成功", { root: true });
            } else {
                dispatch("错误提示", r.data.msg, { root: true });
            }
            dispatch("加载中", false, { root: true });
        },
        async 转出金额({ state, dispatch }, 金额) {
            var obj = {
                amount: 金额,
                type: state.待入游戏.type
            };
            dispatch("加载中", true, { root: true });
            try {
                var r = await api_转出金额(obj);
            } catch (error) {
                dispatch("加载中", false, { root: true });
            }

            if (r.data.code == 0) {
                await Promise.all([
                    dispatch("获取平台余额"),
                    dispatch("user/getUserInfo", "", { root: true })
                ])
                    .then(x => { })
                    .catch(err => { });
                dispatch("成功提示", "转出成功", { root: true });
            } else {
                dispatch("错误提示", r.data.msg, { root: true });
            }
            dispatch("加载中", false, { root: true });
        }
    }
};
