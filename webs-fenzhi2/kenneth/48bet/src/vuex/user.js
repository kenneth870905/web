import { api_Online, api_退出登录 } from "@/api/登录接口.js";

export default {
    namespaced: true,
    state: {
        userinfo: {}
    },
    getters: {
        试玩(state) {
            if (state.userinfo.UserId) {
                var userid = state.userinfo.UserId.toLowerCase();
                return userid.indexOf("demo") != "-1";
            } else {
                return false;
            }
        },
        系统公告(state) {
            var 系统公告 = {
                //系统滚滚滚
                url: "",
                show: false,
                //系统消息
                显示系统Messages: false,
                系统Messages: ""
            };
            if (state.userinfo.Notices) {
                state.userinfo.Notices.forEach(item => {
                    if (item.Group) {
                        系统公告 = {
                            url:
                                config.iframe_url +
                                "/Systems/Notice/Show?groupid=" +
                                item.Group,
                            show: true
                        };
                    } else if (item.Ids) {
                        item.Ids.forEach(ids_1 => {
                            系统公告 = {
                                url: config.iframe_url + "/Systems/Notice/Show/" + ids_1.Id,
                                show: true
                            };
                        });
                    }
                });
            } else if (
                state.userinfo.Messages &&
                state.userinfo.Messages.length > 0
            ) {
                系统公告.显示系统Messages = true;
                系统公告.系统Messages =
                    state.userinfo.Messages && state.userinfo.Messages.length > 0
                        ? state.userinfo.Messages[0].Content
                        : "";
            }
            return 系统公告;
        }
    },
    mutations: {
        保存用户(state, obj) {
            state.userinfo = obj ? obj : {};
        }
    },
    actions: {
        getUserInfo({ state, dispatch, commit }) {
            return new Promise((resolve, reject) => {
                api_Online({ init: true })
                    .then(x => {
                        commit("保存用户", x.data);
                        resolve();
                    })
                    .catch(err => {
                        reject();
                    });
            });
        }
        // async 退出登录({ dispatch, commit }) {
        //     await api_退出登录()
        //     commit('保存用户', {})
        // },
    }
};
