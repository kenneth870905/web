/*
 * @Description: In User Settings Edit
 * @Author: kenneth
 * @Date: 2019-09-11 19:14:51
 * @LastEditTime: 2019-09-14 16:11:43
 * @LastEditors: kenneth
 */
import { api_获取所有消息, api_发送消息, api_获取最新消息, api_撤销消息, api_获取菜单 } from "@/api/私聊接口.js";

// import { Toast, Dialog } from 'vant';
const 初始state = {
    自己: {},        //本人
    消息列表: [],
    正在聊天: {
        list: [],               //消息
        SenderProfile: {}       //聊天人
    },
    到达底部: true,
    未读条数: 0,
    显示会员详情: false,
    正在聊天code: '',

    操作: {
        obj: '',
        show: false,
        left: 0,
        top: 0
    },
    定时器: "",     //用于详情
    列表定时器: ""  //用于列表
}
export default {
    namespaced: true,
    state: JSON.parse(JSON.stringify(初始state)),
    getters: {

    },
    mutations: {

    },
    actions: {
        //主要用于退出
        清空私聊({ state, dispatch }) {
            dispatch('销毁定时器');
            dispatch('取消获取列表')
            for (const key in state) {
                state[key] = 初始state[key]
            }
            // state=Object.assign({},初始state);
        },
        async 私聊初始化({ state, commit, dispatch, getters }, code) {

            // console.log(code);
            state.到达底部 = true
            state.正在聊天code = code

            dispatch('加载中', true, { root: true })
            state.消息列表.forEach(item => {
                if (item.SenderProfile.Code == state.正在聊天code) {
                    item.MessageCount = 0
                }
            })
            await dispatch('获取所有消息')
            dispatch('获取最新消息');
            dispatch('加载中', false, { root: true })
        },
        取消获取列表({ state }) {
            try {
                clearInterval(state.列表定时器)
            } catch (error) { }
        },
        获取消息列表({ state, dispatch }) {
            api_获取菜单().then(x => {
                console.log('获取消息列表', x);
                var list = x.data.ChatMenu;
                if (!list) {
                    return
                }
                state.消息列表 = list;
                state.自己 = x.data.ReceiverProfile;
                if (!state.列表定时器) {
                    state.列表定时器 = setInterval(() => {
                        dispatch('获取消息列表')
                    }, 1000 * 30);
                }
            }).catch(err => { })
        },
        获取所有消息({ state }) {
            // console.log('获取所有消息')
            return new Promise((resolve, reject) => {
                api_获取所有消息(state.正在聊天code).then(x => {
                    // console.log(x)
                    state.正在聊天.list = x.data.PrivateMessages ? x.data.PrivateMessages : [];

                    state.正在聊天.SenderProfile = x.data.SenderProfile ? x.data.SenderProfile : {}
                    resolve()
                }).catch(err => {
                    console.log(err);
                    reject()
                })
            });
        },
        销毁定时器({ state }) {
            try {
                clearInterval(state.定时器)
                state.定时器 = ''
            } catch (error) { }
        },
        async 获取最新消息({ state, dispatch }) {
            var x = await api_获取最新消息(state.正在聊天code)
            //接收最新消息
            var list = x.data.PrivateMessage ? x.data.PrivateMessage : [];
            console.log(list);
            state.正在聊天.list = [...state.正在聊天.list, ...list];
            let DeleteMessage = x.data.DeleteMessage ? x.data.DeleteMessage : [];
            state.正在聊天.list.forEach(item => {
                if (DeleteMessage.includes(item.Id)) {
                    var index = state.正在聊天.list.findIndex(x => x.Id == item.Id);
                    console.log(index);
                    state.正在聊天.list.splice(index, 1)
                }
            })
            if (state.定时器) {
                return
            }
            state.定时器 = setInterval(() => {
                dispatch('获取最新消息');
            }, 5000);
        },
        async 发送消息({ state, getters, dispatch, commit }, obj) {
            // ReceiverCode(int), Message(string), MessageType(int)
            dispatch('加载中', true, { root: true })
            try {
                var r1 = await api_发送消息(obj)
            } catch (error) {
                dispatch('加载中', false, { root: true })
                dispatch('失败提示', '系统错误，稍后再试', { root: true })
                return
            }
            if (r1.data.Msg == '发送成功' || r1.data.msg == '发送成功') {
                // dispatch('成功提示', '发送成功', { root: true })
                var date = new Date();
                var 小时 = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                var 分钟 = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                var 秒 = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                var obj = {
                    Createtime: 小时 + ':' + 分钟 + ':' + 秒,
                    Id: r1.data.MsgId,
                    IsValid: true,
                    Message: obj.Message,
                    MessageType: obj.MessageType,
                    ReceiverCode: obj.ReceiverCode,
                    SenderCode: state.自己.Code,
                }
                console.log(obj);
                state.正在聊天.list.push(obj);
                if(!state.消息列表.find(x=>x.SenderProfile.Code == obj.ReceiverCode)){
                    dispatch('获取消息列表')
                }
            } else {
                dispatch('失败提示', r1.data.Msg ? r1.data.Msg : r1.data.msg, { root: true })
            }
            dispatch('加载中', false, { root: true })
        },
        async 撤销消息({ state, dispatch }) {
            dispatch('加载中', true, { root: true })
            var obj = {
                ReceiverCode: state.操作.obj.ReceiverCode,
                MessageId: state.操作.obj.Id
            }
            try {
                var r = await api_撤销消息(obj)
            } catch (error) {
                dispatch('失败提示', '系统错误，稍后再试', { root: true })
                dispatch('加载中', false, { root: true })
                return
            }
            dispatch('加载中', false, { root: true })
            if (r.data.code != 0) {
                dispatch('失败提示', r.data.msg, { root: true })
                return
            }
            dispatch('成功提示', '撤回/删除成功', { root: true })
            var index = state.正在聊天.list.findIndex(x => x.Id == state.操作.obj.Id);
            console.log(index)
            state.正在聊天.list.splice(index, 1)

        }
    }
}


