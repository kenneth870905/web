import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { Loading, Message } from "element-ui";
Vue.use(Vuex);

import user from "./vuex/user.js";
import 待入游戏 from "./vuex/待入游戏.js";

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: "48bet",
            reducer(val) {
                return {
                    user: val.user,
                    ip: val.ip
                };
            }
        })
    ],
    state: {
        config: config,
        加载: "",
        技术支持: false,
        ip: ""
    },
    getters: {
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
        修改state(state, [key, value]) {
            state[key] = value;
        }
    },
    actions: {
        加载中({ state }, type) {
            console.log("加载中", type);
            if (type) {
                state.加载 = Loading.service({
                    // fullscreen: true,
                    // lock: true,
                    // spinner: 'el-icon-loading',
                    text: "正在加载",
                    background: "rgba(0, 0, 0, 0.5)"
                });
            } else {
                try {
                    state.加载.close();
                } catch (error) { }
            }
        },
        错误提示({ }, value) {
            Message({
                showClose: true,
                message: value,
                type: "error",
                duration: 1500
            });
        },
        成功提示({ }, value) {
            Message({
                showClose: true,
                message: value,
                type: "success",
                duration: 1500
            });
        }
    },
    modules: {
        user,
        待入游戏
    }
});
