import {
    api_彩票跟单, api_聊天记录,
    api_会员详情,
    api_在线人数,
    api_撤回消息,
    api_获取在线会员,
    
    api_房间是否禁言
} from "@/api/聊天室接口.js";
import { api_获取游戏房间 } from "@/api/红包游戏.js";
import { Toast, Dialog } from 'vant';

export default {
    namespaced: true,
    state: {
        state: "",       //
        房间列表: [],
        房间id:"",

        预设房间: "",
        房间密码:"",
        房间已禁言:true,
        输入焦点:false,
        msglist: [],     //消息列表
        未读条数: 0,
        到达底部: true,
        user: {},
        跟单彩票: {
            show: false,
            obj: {
                Content: "",
                IssueCode: "",
                LotteryCode: "",
                LotteryName: "",
                MethodName: "",
                Nums: 0,
                Price: 0,
                Timer: 0
            }
        },
        init: false,
        显示密码输入框: false,


        选中会员: {},
        会员详情: {
            存取: {},
            msglist: [],
            是否禁言: false
        },
        显示会员详情: false,
        会员人数: [],
        人员列表:[],
        人员定时器:"",
        操作:{
            obj:'',
            show:false,
            left:0,
            top:0
        },
        连接提示:"",
        领取红包:{
            弹框:false,
            红包:{},
            状态:{
                code:1,     //0 还有红包可以领取  1 表示已经领取完毕
                msg:false
            }
        }
    },
    getters: {

    },
    mutations: {
        清空聊天室(state) {
            state.state = '';
            state.预设房间 = "";
            state.房间密码 = '';
        },
        设置key(state, [key, value]) {
            state[key] = value;
        },
        设置跟单弹框(state, type) {
            state.跟单彩票.show = type
        }
    },
    actions: {
        //切换房间时传入 obj 对象
        async 登录聊天室({ state, rootState, dispatch, commit },id) {
            console.log('--------------',state.init,id)
            state.房间id = id

            if(state.init){
                return
            }
            state.连接提示 = '正在连接····'
            state.user={};
            state.msglist=[];
            dispatch('设置appVue')
            // commit('设置key', ['init', false])
            var url = ''
            if (typeof LineSwitch != 'undefined' && LineSwitch) {
                url = config.wchat_url + '/signalr'
            }
            if(process.env.NODE_ENV=='development'){
                url = config.wchat_url + '/signalr'
            }
            appPage.init(state.房间id , url, state.房间密码);
        },
        设置appVue({state , dispatch}){
            if (window.appVue) {
                window.appVue.addmsg = function (obj) {
                    dispatch('addmsg', obj)
                };
                window.appVue.userinit = (obj) => {
                    dispatch('userinit', obj)
                }
                window.appVue.chatState = (obj) => {
                    dispatch('chatState', obj)
                }
                //删除消息
                window.appVue.deleteMsg=(id)=>{
                    var index=state.msglist.findIndex(x=>x.Id==id);
                    state.msglist.splice(index,1)
                }
            } else {
                window.appVue = {
                    addmsg: function (obj) {
                        dispatch('addmsg', obj)
                    },
                    userinit: (obj) => {
                        dispatch('userinit', obj)
                    },
                    chatState: (obj) => {
                        dispatch('chatState', obj)
                    },
                    //删除消息
                    deleteMsg: (id)=>{
                        var index=state.msglist.findIndex(x=>x.Id==id);
                        state.msglist.splice(index,1)
                    }
                };
            }
        },
        重新连接({ state, commit, dispatch }) {
            commit('设置key', ['init', false])
            var url = ''
            if (typeof LineSwitch != 'undefined' && LineSwitch) {
                url = config.wchat_url + '/signalr'
            }
            if(process.env.NODE_ENV=='development'){
                url = config.wchat_url + '/signalr'
            }
            // dispatch('获取房间列表')
            appPage.init( state.房间id , url, state.房间密码);
        },
        获取聊天记录({ state }) {
            api_聊天记录(state.房间id).then(x => {
                state.msglist = x.data
            }).catch(err => { })
        },
        退出聊天室({ state, commit , dispatch}) {
            console.log('退出聊天室')
            // state.房间密码='';
            commit('设置key', ['init', false])
            commit('设置key', ['msglist', []])
            dispatch('停止获取人员')
            $.connection.hub.stop()
        },
        发送消息({ state, dispatch }, obj) {
            if(!state.init){
                Toast('请等待房间初始化完成')
                return
            }

            var date = new Date();
            var 小时 = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
            var 分钟 = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
            var 秒 = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
            var newobj = {
                "Vip": state.user.Vip,
                "OnlineId": state.user.OnlineId,
                "MemberId": "",
                "Createtime": 小时+':'+分钟+':'+秒,
                "Content": obj.Content,
                "Type": obj.type,        //1是文本   4 图片
                "ImgId": state.user.ImgId,
                "Nickname": state.user.NickName
            }
            console.log('发送消息',obj)
            //目前只有文本
            // {"Vip":"黄金会员","OnlineId":2776,"MemberId":"h****2","Createtime":"19:24:37","Content":"123123","Type":1}
            if (obj.type == 4) {
                console.log('发送图片')
                appPage.chatSendImg(obj.Content);
            } else {
                console.log('发送文字')
                appPage.chatSend(obj.Content);
            }
            // state.msglist.push(newobj);
        },
        chatState({ state, dispatch, commit }, obj) {
            state.state = obj.newState
            console.log(obj)
            if (obj.newState == 0) {
                state.连接提示='正在连接···'
                commit('设置key', ['init', true])
            } else if (obj.newState == 1) {
                state.连接提示=''
                // debugger;
                commit('设置key', ['init', true])
                setTimeout(() => {
                    // dispatch('获取房间列表')
                }, 500);
            } else if (obj.newState == 2) {
                state.连接提示='重新连接···'
            } else if (obj.newState == 4) {
                if (!state.init) {
                    return
                }
                state.连接提示 = '已断开连接···';
                console.log('红包游戏')
                mui.confirm('回话超时，请刷新或退出', '提示', ['返回上一页', '刷新'], (value) => {
                    if (value.index == 0) {
                        history.back()
                    } else {
                        dispatch('重新连接');
                    }
                }, 'div')
            }
        },
        //接收消息
        addmsg({ state }, obj) {
            console.log('接收消息',obj)
            //彩票  {"MemberId":"h****1","Createtime":"14:23:29","Content":"{\"IssueCode\":\"201907200725\",\"LotteryName\":\"分分时时彩\",\"MethodName\":\"五星\",\"Content\":\"第四星_5\",\"Amount\":100.0000}","Type":3}
            // if ( (obj.type != 4 || obj.Type != 1) || state.user.OnlineId != obj.OnlineId || state.user.Guid != obj.Guid) {
            // if ( (obj.type != 4 || obj.Type != 1) && state.user.Guid != obj.Guid ) {
            //     state.msglist.push(obj);
            // }

            state.msglist.push(obj);

            if (!state.到达底部) {
                state.未读条数++
            }
            if (state.msglist.length > 200) {
                state.msglist.splice(0, 1)
            }
        },
        userinit({ state, dispatch, commit }, obj) {
            console.log('userinit', obj);
            //  101 返回用户信息
            //  100 登录超时
            //  0 成功
            //  其他错误

            if (obj.code == 0) {
                dispatch('获取聊天记录')
                dispatch('获取人员列表')
                Toast('登录成功')
                dispatch('获取房间是否禁言')
            } else if (obj.code == 1) {
                Toast(obj.msg)
                state.连接提示 = obj.msg
                if (obj.msg == '聊天室密码错误') {
                    console.log('密码错误')
                    commit('设置key', ['显示密码输入框', true])
                    commit('设置key', ['房间密码', ''])
                }
            } else if (obj.code == 100) {
                mui.confirm(obj.msg, '提示', ['返回上一页', '重试'], (value) => {
                    console.log(value);
                    state.连接提示 = obj.msg
                    if (value.index == 0) {
                        history.back()
                    } else {
                        dispatch('重新连接');
                    }
                }, 'div')
            } else if (obj.code == 101) {
                console.log(101)
                dispatch('获取聊天记录')
                dispatch('获取人员列表')
                dispatch('获取房间是否禁言')
                state.user = obj.msg;
                // state.显示密码输入框=false;
                commit('设置key', ['显示密码输入框', false])
            } else {
                state.连接提示 = obj.msg
                mui.alert(obj.msg, '提示', '确定', () => {
                    // history.back();
                }, 'div')
            }
        },
        获取房间是否禁言({state}){
            var obj = {
                chatid: state.房间id
            }
            api_房间是否禁言(obj).then(x => {
                console.log('查看房间是否禁言', x)
                state.房间已禁言 = x.data.msg
            }).catch(err => {
                console.log(err)
            })
        },
        获取跟单信息({ state, commit ,  rootState}, obj) {
            var Content = JSON.parse(obj.Content)
            api_彩票跟单(Content.Id).then(x => {
                // state.跟单彩票.show = true;
                // state.跟单彩票.obj = x.data;
                if(x.data.code){
                    Toast(x.data.msg)
                    return
                }

                rootState.跟单.跟单彩票.show = true;
                rootState.跟单.跟单彩票.obj=x.data;
                rootState.跟单.type=0;

                var 详情 = JSON.parse(obj.Content)
                var 赔率 = 详情.WinRate;
                var data = x.data;
                data.Amount = x.data.Price;
                data.WinRate = 赔率
                console.log(JSON.stringify(data));
                // obj.Content=JSON.stringify(x.data);
                // "{\"Id\":4139753,\"IssueCode\":\"2019101\",\"LotteryCode\":70001,\"LotteryName\":\"香港六合彩\",\"MethodName\":\"特码B盘\",\"Content\":\"09\",\"Amount\":1.0000,\"WinRate\":30.72}"
                obj.Content = JSON.stringify(data);
            }).catch(err => {
                Toast('系统错误，稍后再试！');
            })
        },
        获取人员列表({state , dispatch}){
            api_获取在线会员().then(x=>{
                state.人员列表=x.data;
            }).catch(err=>{});
            if(!state.人员定时器){
                state.人员定时器 = setInterval(() => {
                    dispatch('获取人员列表')
                }, 1000 * 60);
            }
        },
        停止获取人员({state}){
            try {
                clearInterval(state.人员定时器)
            } catch (error) {}
            state.人员定时器='';
        },

        //投注记录==============
        async 撤销消息({state ,commit}){
            commit('加载中', true, { root: true })
            try {
                var r= await api_撤回消息(state.操作.obj.Id , state.房间id);                
            } catch (error) {
                Toast('系统错误稍后再试')
                commit('加载中', false, { root: true })
                return
            }
            if(r.data.code==0){
                Toast('撤回成功')
            }else{
                Toast(r.data.msg)
            }
            commit('加载中', false, { root: true })
        },
        点击会员详情({ state, dispatch }, obj) {
            if (state.user.ChatRole != 1) {
                return
            }
            state.选中会员 = obj;
            state.显示会员详情 = true;
            
            dispatch('获取会员详情')
        },
        获取会员详情({ state }) {
            api_会员详情({onlineId: state.选中会员.OnlineId}).then(x=>{
                console.log(x)
                state.会员详情.存取=x.data.MoneyTransact;
                state.会员详情.msglist=x.data.LastMessages;
                state.会员详情.是否禁言 = x.data.IsMute
            }).catch(err=>{})

        },
    },
}
