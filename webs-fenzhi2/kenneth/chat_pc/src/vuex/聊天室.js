/*
 * @Description: In User Settings Edit
 * @Author: kenneth
 * @Date: 2019-08-24 20:02:14
 * @LastEditTime: 2019-09-14 19:19:54
 * @LastEditors: 
 */
import router from '@/router'
import { api_获取投注列表, api_投注记录 } from "@/api/游戏彩票接口.js";
import { api_在线人数 , api_获取在线会员 } from "@/api/聊天室接口.js";
import { api_彩票跟单, api_获取房间列表, api_聊天记录, api_房间是否禁言  , api_撤回消息 , api_会员详情} from "@/api/聊天室接口.js";


import { MessageBox } from 'element-ui';

var 初始state={
    显示选房: false,
    房间列表: [],
    显示密码输入框: false,
    房间密码: '',
    投注记录: {
        show: false,
        list: [],
        total: 0,
        query: {
            page: 1,
            rows: 10,
            state: "", //"" 全部 1 未结算 2 已中奖 3 未中奖 4 未开奖
            type: "",
            date: ""
        }
    },
    中奖弹幕: true,

    state: "",       //
    当前房间: {},
    预设房间: "",
    房间已禁言: true,

    msglist: [],     //消息列表
    滚动条位置: 0,
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

    偏好彩票: '',
    显示排行榜: false,

    偏好彩票2: [],   //下面进入游戏
    选中会员: {},
    会员详情: {
        存取: {},
        msglist: [],
        是否禁言: false
    },
    显示会员详情: false,
    会员人数:[],
    人员列表:[],
    操作:{
        obj:"",
        show:false,
        top:0,
        left:0
    },
    房间记录:[
        // {房间:{},密码:""}
    ],
    领取红包:{
        领取弹框:false,
        发布弹框:false,
        红包:{},
        状态:{
            0:true,     //0 还有红包可以领取  1 表示已经领取完毕
            msg:true
        }
    }
}

export default {
    namespaced: true,
    state:JSON.parse(JSON.stringify(初始state)),
    getters: {
        当前房间人数(state){
            if(!state.当前房间.Id){
                return "****"
            }else{
                var obj = state.会员人数.find(x=>x.Id==state.当前房间.Id);
                return obj ? obj.UserCount : '****'
            }
        }
    },
    mutations: {
        设置key(state, [key, value]) {
            state[key] = value;
        },
        删除房间记录(state,index){
            state.房间记录.splice(index,1)
        },
        设置跟单弹框(state, type) {
            state.跟单彩票.show = type
        },
        设置偏好彩票(state, id) {
            typeof state.偏好彩票2 != "object" ? state.偏好彩票2 = [] : [];
            var index = state.偏好彩票2.findIndex(x => x == id);
            if (index == -1) {
                state.偏好彩票2.push(id)
            } else if (index != state.偏好彩票2.length - 1) {
                state.偏好彩票2.splice(index, 1);
                state.偏好彩票2.push(id)
            }
        },
        数据初始化(state){
            for (const key in state) {
                state[key] = 初始state[key]
            }
        }
    },
    actions: {
        进入记录房间({ state , dispatch },obj){
            state.当前房间=obj.房间;
            state.房间密码=obj.密码;
            dispatch('登录聊天室')
        },
        选择房间({ state, dispatch }, obj) {
            console.log(obj)
            state.显示选房=false;
            if (!obj.IsPwd) {
                state.预设房间 = obj;
                state.显示密码输入框 = true;
            } else {
                state.当前房间=obj
                dispatch('登录聊天室')  //不需要密码直接进入
            }
        },
        添加回调({dispatch , state}){
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
                    console.info('消息撤回',id)
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
                        console.info('消息撤回',id)
                        var index=state.msglist.findIndex(x=>x.Id==id);
                        state.msglist.splice(index,1)
                    }
                };
            }
        },
        async 登录聊天室({ state, rootState, dispatch, commit },id) {
            state.user={};
            dispatch('加载中', true, { root: true })
            await dispatch('获取房间列表');
            dispatch('获取房间人数');
            dispatch('获取人员列表');
            dispatch('添加回调');

            if(id){
                if(state.房间列表.find(x=>x.Id==id)){
                    state.当前房间=state.房间列表.find(x=>x.Id==id)
                    state.预设房间=state.房间列表.find(x=>x.Id==id)
                }
            }
            // console.log('进入房间', state.当前房间 , state.房间密码 )

            if (state.当前房间.Id) {
                var obj = state.房间列表.find(x => x.Id == state.当前房间.Id);
                // 已选房间 不存在重新选择
                if (!obj) {
                    // console.log('已选房间不存在')
                    state.显示选房 = true;
                    state.当前房间={}
                    dispatch('加载中', false, { root: true })
                    return
                }else{
                    state.显示选房 = false;
                }
                // 已选房间 没有记录密码（或密码错误） 重新选择
                if (!state.当前房间.IsPwd && !state.房间密码) {
                    // console.log('已选房间需要密码保存密码')
                    if(id){
                        state.显示密码输入框=true;
                    }else{
                        state.显示选房 = true;
                        state.当前房间={};                    
                    }
                    // console.log('已选房间 没有记录密码（或密码错误） 重新选择')
                    dispatch('加载中', false, { root: true })
                    return
                }
            } else {
                // console.log('没有选择房间')
                state.显示选房 = true;
                dispatch('加载中', false, { root: true })
                return
            }

            commit('设置key', ['init', false])
            var url = ''
            if(process.env.NODE_ENV=='development'){
                url = config.wchat_url + '/signalr'
            }

            appPage.init(state.当前房间.Id , url, state.房间密码);
        },
        重新连接({ state, commit }) {
            // console.log('重新链接')
            commit('设置key', ['init', false])
            var url = ''
            if (typeof 开发 != 'undefined' && 开发) {
                url = config.wchat_url + '/signalr'
            }
            appPage.init( state.当前房间.Id, url, state.房间密码);
        },
        获取聊天记录({ state }) {
            api_聊天记录(state.当前房间.Id).then(x => {
                state.msglist = x.data;
            }).catch(err => { })
        },
        退出聊天室({ state, commit }) {
            // console.log('退出聊天室')
            // state.房间密码='';
            commit('设置key', ['init', false])
            commit('设置key', ['msglist', []])
            $.connection.hub.stop()
        },
        发送消息({ state, dispatch }, obj) {
            var date = new Date();
            var 小时 = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
            var 分钟 = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
            var 秒 = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
            state.到达底部 = true
            var newobj = {
                "Vip": state.user.Vip,
                "OnlineId": state.user.OnlineId,
                "MemberId": "",
                "Createtime":  小时+':'+分钟+':'+秒 ,
                "Content": obj.Content,
                "Type": obj.type,
                "ImgId": state.user.ImgId,
                "Nickname": state.user.NickName
            }

            if(obj.type==4){
                // console.log('发送图片')
                appPage.chatSendImg(obj.Content);
            }else{
                appPage.chatSend(obj.Content);
                state.msglist.push(newobj);
            }
            // state.msglist.push(newobj);
            // 目前只有文本小修
            // {"Vip":"黄金会员","OnlineId":2776,"MemberId":"h****2","Createtime":"19:24:37","Content":"123123","Type":1}
            // appPage.chatSend(str);
        },
        chatState({ state, dispatch, commit }, obj) {
            state.state = obj.newState
            if (obj.newState == 0) {
                dispatch('加载中', true, { root: true })
                commit('设置key', ['init', true])
            } else if (obj.newState == 1) {
                state.msglist = [];
                dispatch('加载中', false, { root: true })
                commit('设置key', ['显示密码输入框', false])
                commit('设置key', ['init', true])
            } else if (obj.newState == 2) {
                dispatch('加载中', true, { root: true })
            } else if (obj.newState == 4) {
                if (!state.init) {
                    return
                }
                MessageBox.confirm('回话超时，请刷新或退出', '提示', {
                    confirmButtonText: '重试',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dispatch( '重新连接');
                }).catch(() => {});
            }
        },
        //接收消息
        addmsg({ state }, obj) {
            console.log(obj)
            //彩票  {"MemberId":"h****1","Createtime":"14:23:29","Content":"{\"IssueCode\":\"201907200725\",\"LotteryName\":\"分分时时彩\",\"MethodName\":\"五星\",\"Content\":\"第四星_5\",\"Amount\":100.0000}","Type":3}
            if (obj.Type != 1 || state.user.OnlineId != obj.OnlineId || state.user.Guid != obj.Guid) {
                state.msglist.push(obj);
            }

            if (!state.到达底部) {
                state.未读条数++
            }
            if (state.msglist.length > 200) {
                state.msglist.splice(0, 1)
            }
        },
        userinit({ state, dispatch, commit }, obj) {
            console.log('userinit_______________', obj);
            // alert(JSON.stringify(obj))
            //  101 返回用户信息
            //  100 登录超时
            //  0 成功
            //  其他错误
            if (obj.code == 0) {
                dispatch('获取聊天记录')
                dispatch('获取房间是否禁言')
                dispatch('成功提示', '聊天室登录成功', { root: true })
            } else if (obj.code == 1) {
                dispatch('失败提示', obj.msg, { root: true })
                if (obj.msg == '聊天室密码错误') {
                    commit('设置key', ['显示密码输入框', true])
                    commit('设置key', ['房间密码', ''])
                }
            } else if (obj.code == 100) {
                MessageBox.confirm(obj.msg, '提示', {
                    confirmButtonText: '重试',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    dispatch('重新连接');
                }).catch(() => {});
            } else if (obj.code == 101) {
                dispatch('成功提示', '聊天室登录成功', { root: true })
                dispatch('获取聊天记录')
                dispatch('获取房间是否禁言')
                state.user = obj.msg;
                commit('设置key', ['显示密码输入框', false])
                
                var 房间=state.房间记录.find(x=>x.房间.Id==state.当前房间.Id)
                if(!房间){
                    let obj={
                            房间:state.当前房间,
                            密码:!state.当前房间.IsPwd ? state.房间密码 : ''
                        }
                    state.房间记录.push(obj)                    
                }else{
                    //主要用于 如果后端把密码改了，下次输入密码还能保存
                    房间.密码= !state.当前房间.IsPwd ? state.房间密码 : ''
                }
            } else {
                dispatch('失败提示', obj.msg, { root: true })
            }
        },
        获取跟单信息({ state, commit, dispatch , rootState }, obj) {
            dispatch('加载中', true, { root: true })
            var Content = JSON.parse(obj.Content)
            api_彩票跟单(Content.Id).then(x => {
                console.log(x)
                if(x.data.code){
                    dispatch('失败提示', x.data.msg, { root: true })
                }else{
                    state.跟单彩票.show = true;
                    state.跟单彩票.obj = x.data;
                    
                    rootState.跟单.跟单彩票.show = true;
                    rootState.跟单.跟单彩票.obj=x.data;
                    rootState.跟单.type = 0
                    //修改聊天内容
                    var 详情 = JSON.parse(obj.Content)
                    var 赔率 = 详情.WinRate;
                    var data = x.data;
                        data.Amount = x.data.Price;
                        data.WinRate = 赔率
                    obj.Content = JSON.stringify(x.data);
                }
                dispatch('加载中', false, { root: true })
            }).catch(err => {
                dispatch('加载中', false, { root: true })
                dispatch('失败提示', '系统错误，稍后再试！', { root: true })
            })
        },
        获取房间列表({ state }) {
            return new Promise((resolve, reject) => {
                api_获取房间列表().then(x => {
                    var list = x.data;
                    for(var i=list.length-1;i>=0 ;i--){
                        if(list[i].Name=='PK10'){
                            list.splice(i,1)
                        }
                    }
                    state.房间列表 = list;
                    resolve()
                }).catch(err => {
                    reject()
                })
            });
        },
        获取房间是否禁言({ state }) {
            var obj = {
                chatid: state.当前房间.Id
            }
            api_房间是否禁言(obj).then(x => {
                console.log('查看房间是否禁言', x)
                state.房间已禁言 = x.data.msg
            }).catch(err => {
                console.log(err);
            })
        },
        获取房间人数({state}){
            api_在线人数().then(x=>{
                state.会员人数=x.data;
            }).catch(err=>{})
        },
        获取人员列表({state}){
            api_获取在线会员().then(x=>{
                state.人员列表=x.data;
            }).catch(err=>{
            })
        },
        //投注记录==============
        async 撤销消息({state ,dispatch}){
            dispatch('加载中', true, { root: true })
            try {
                var r= await api_撤回消息(state.操作.obj.Id , state.当前房间.Id);                
            } catch (error) {
                dispatch('失败提示','系统错误稍后再试',{root:true})
                dispatch('加载中', false, { root: true })
                return
            }
            if(r.data.code==0){
                dispatch('成功提示','撤回成功',{root:true})
            }else{
                dispatch('失败提示',r.data.msg,{root:true})
            }
            dispatch('加载中', false, { root: true })
        },
        点击会员详情({ state ,dispatch}, obj) {
            console.log(obj);
            if (state.user.ChatRole != 1) {
                return
            }
            if(!obj.OnlineId){
                dispatch('失败提示','无详情可查看',{root:true});
                return
            }
            state.选中会员 = obj;
            state.显示会员详情 = true;
            dispatch('会员详情')
        },
        会员详情({ state }) {
            api_会员详情({onlineId: state.选中会员.OnlineId}).then(x=>{
                console.log(x)
                state.会员详情.存取=x.data.MoneyTransact;
                state.会员详情.msglist=x.data.LastMessages;
                state.会员详情.是否禁言 = x.data.IsMute
            }).catch(err=>{})

        },
        async 获取投注记录({ state }) {
            state.投注记录.list = [];
            try {
                var r = await api_获取投注列表(state.投注记录.query)
            } catch (error) {
                return
            }
            state.投注记录.total = r.data.total;
            state.投注记录.list = r.data.rows
        },
    },
}
