import { api_开奖记录 } from "@/api/游戏彩票接口.js";
import { api_彩票跟单 , api_获取房间列表 , api_聊天记录 ,
        api_房间是否禁言 , api_存取汇总 , api_最新发言记录 , api_用户是否禁言,
        api_在线人数,
        api_撤回消息
        } from "@/api/聊天室接口.js";

import router from '@/router'
import { Toast , Dialog} from 'vant';

export default {
    namespaced: true,
    state:{
        state:"",       //
        房间列表:[],
        当前房间:{},
        预设房间:"",
        房间密码:'',
        显示房间:false,
        msglist:[],     //消息列表
        滚动条位置:0,
        未读条数:0,
        到达底部:true,
        user:{},
        跟单彩票:{
            show:false,
            obj:{
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
        init:false,
        显示密码输入框:false,
        
        偏好彩票:'',
        显示排行榜:false,

        偏好彩票2:[],   //下面进入游戏
        显示最新中奖:true,
        选中会员:{},
        会员人数: [],
        会员详情:{
            存取:{},
            msglist:[],
            是否禁言:false
        },
        显示会员详情:false
    },
    getters:{

    },
    mutations:{
        清空聊天室(state){
            state.state='';
            state.当前房间={}
            state.预设房间="";
            state.房间密码='';
        },
        设置key(state,[key,value]){
            state[key]=value;
        },
        设置跟单弹框(state,type){
            state.跟单彩票.show=type
        },
        设置偏好彩票(state,id){
            typeof state.偏好彩票2!="object" ? state.偏好彩票2=[] : [];
            var index=state.偏好彩票2.findIndex(x=>x==id);
            if(index==-1){
                state.偏好彩票2.push(id)
            }else if(index != state.偏好彩票2.length-1){
                state.偏好彩票2.splice(index,1);
                state.偏好彩票2.push(id)
            }
        }
    },
    actions:{
        //切换房间时传入 obj 对象
        async 登录聊天室({state , rootState , dispatch , commit},obj){
            state.跟单彩票.show=false;
            state.显示排行榜=false;
            if(!config.my.chatBoxes){
                Toast('聊天室已关闭');
                return
            }
            
            if(state.房间列表.length==0){
                await dispatch('获取房间列表')
            }
            // obj:{
            //      房间:房间
            //      pwd:"房间密码"
            // }
            dispatch('获取房间列表');
            if(!state.当前房间.Id && !state.预设房间 && !obj){
                state.显示房间=true;
                return
            }
            if(!obj){
                // if(state.state=='0' || state.state==1 || state.state==2){
                if(state.init){
                    return
                }
            }else 
            // if(obj.房间.Id==state.当前房间.Id){
            //     console.log('已有房间2', obj.房间.Id , state.当前房间.Id)
            //     return 
            // }else
            {
                state.房间密码=obj.pwd
                state.预设房间=obj.房间
            }
            console.log('已有房3')
           
            if(window.appVue){
                window.appVue.addmsg = function (obj) {
                    dispatch('addmsg',obj)
                };
                window.appVue.userinit=(obj)=>{
                    dispatch('userinit',obj)
                }
                window.appVue.chatState=(obj)=>{
                    dispatch('chatState',obj)
                }
            }else{
                window.appVue = {
                    addmsg: function (obj) {
                        dispatch('addmsg',obj)
                    },
                    userinit:(obj)=>{
                        dispatch('userinit',obj)
                    },
                    chatState:(obj)=>{
                        dispatch('chatState',obj)
                    }
                };
            }
            
            console.log(4)
            // var userinfo=rootState.user.userinfo;
            // if(!userinfo.UserId){
            //     mui.confirm('进入聊天室需要登录，是否现在去登录？','提示',['取消','确定'],value=>{
            //         if(value.index==1){
            //             router.push('/login')
            //         }else{
            //             history.back();
            //         }
            //     })
            //     return
            // }
            console.log(5,state.当前房间.IsPwd,state.预设房间,state.房间密码,state.当前房间)
            // if(!state.当前房间)
            
            // state.当前房间.IsPwd =false 表示需要密码
            if(state.预设房间){
                if(!state.预设房间.IsPwd && !state.房间密码){
                    console.log('进入预选房间需要密码')
                    state.显示密码输入框=true;
                    return
                }
            }else if(!state.当前房间.IsPwd && !state.预设房间){
                if(!state.房间密码){
                    console.log('进入当前房间需要密码')
                    state.显示密码输入框=true;
                    return
                }
            }
            // if(!state.当前房间.IsPwd && !state.预设房间){
            //     if(!state.房间密码 && state.当前房间){
            //         console.log('房间密码')
            //         state.显示密码输入框=true;
            //         return
            //     }
            // }
            console.log('6')
            commit('设置key',['init',false])
            var url = ''
            if(typeof LineSwitch!='undefined' &&  LineSwitch){
                url =  config.wchat_url+'/signalr'
            }
            if(typeof 本地开发!='undefined'){
                url =  config.wchat_url+'/signalr'
            }
            appPage.init(state.预设房间 ? state.预设房间.Id : state.当前房间.Id ,url,state.房间密码);
        },
        重新连接({state , commit}){
            console.log('重新链接')
            commit('设置key',['init',false])
            var url = ''
            if(typeof LineSwitch!='undefined' &&  LineSwitch){
                url = config.wchat_url+'/signalr'
            }
            if(typeof 本地开发!='undefined'){
                url =  config.wchat_url+'/signalr'
            }
            appPage.init(state.预设房间 ? state.预设房间.Id : state.当前房间.Id , url ,state.房间密码);
        },
        获取聊天记录({state}){
            api_聊天记录(state.当前房间.Id).then(x=>{
                state.msglist = [...state.msglist , ...x.data]; 
            }).catch(err=>{})
        },
        退出聊天室({state , commit}){
            console.log('退出聊天室')
            // state.房间密码='';
            commit('设置key',['init',false])
            commit('设置key',['msglist',[]])
            $.connection.hub.stop()
        },
        发送消息({state,dispatch},obj){
            var newobj = {
                    "Vip":state.user.Vip,
                    "OnlineId":state.user.OnlineId,
                    "MemberId":"",
                    "Createtime":"19:24:37",
                    "Content":obj.Content,
                    "Type":1,
                    "ImgId":state.user.ImgId,
                    "Nickname":state.user.NickName
                }
            state.msglist.push(newobj); 
            //目前只有文本小修
            // {"Vip":"黄金会员","OnlineId":2776,"MemberId":"h****2","Createtime":"19:24:37","Content":"123123","Type":1}
            appPage.chatSend(obj.Content);
        },
        chatState({state,dispatch,commit},obj){
            state.state=obj.newState
            console.log(obj)
            if(obj.newState==0){
                commit('加载中',true,{root:true})
            }else if(obj.newState==1){
                if(state.预设房间){
                    state.当前房间=state.预设房间;
                }
                state.msglist=[];
                
                commit('加载中',false,{root:true})
                commit('设置key',['init',true])
            }else if(obj.newState==2){
                commit('加载中',true,{root:true})
            }else if(obj.newState==4){
                if(!state.init){
                    return
                }
                mui.confirm('回话超时，请刷新或退出','提示',['返回上一页','刷新'],(value)=>{
                    if(value.index==0){
                        history.back()
                    }else{
                        dispatch('重新连接');
                    }
                },'div')
            }
        },
        //接收消息
        addmsg({state} , obj){
            console.log(obj)
            //彩票  {"MemberId":"h****1","Createtime":"14:23:29","Content":"{\"IssueCode\":\"201907200725\",\"LotteryName\":\"分分时时彩\",\"MethodName\":\"五星\",\"Content\":\"第四星_5\",\"Amount\":100.0000}","Type":3}
            if(obj.Type!=1 || state.user.OnlineId!=obj.OnlineId || state.user.Guid!=obj.Guid){
                state.msglist.push(obj);
            }
            if(!state.到达底部){
                state.未读条数++
            }
            if(state.msglist.length>200){
                state.msglist.splice(0,1) 
            }
        },
        userinit({state,dispatch , commit},obj){
            console.log('userinit',obj);
            // alert(JSON.stringify(obj))
            //  101 返回用户信息
            //  100 登录超时
            //  0 成功
            //  其他错误

            if(obj.code==0){
                dispatch('获取聊天记录')
                Toast('登录成功')
            }else if(obj.code==1){
                Toast(obj.msg)
                if(obj.msg=='聊天室密码错误'){
                    console.log('密码错误')
                    commit('设置key',['显示密码输入框',true])
                    commit('设置key',['房间密码',''])
                }
            }else if(obj.code==100){
                mui.confirm(obj.msg,'提示',['返回上一页','重试'],(value)=>{
                    console.log(value);
                    if(value.index==0){
                        history.back()
                    }else{
                        dispatch('重新连接');
                    }
                },'div')
            }else if(obj.code==101){
                console.log(101)
                dispatch('获取聊天记录')
                state.user=obj.msg;
                // state.显示密码输入框=false;
                commit('设置key',['显示密码输入框',false])
            }else {
                mui.alert(obj.msg , '提示','确定',()=>{
                    // history.back();
                },'div')
            }
        },
   
        获取跟单信息( {state , commit} , obj){
            commit('加载中',true,{root:true})
            var Content=JSON.parse(obj.Content) 
            api_彩票跟单(Content.Id).then(x=>{
                state.跟单彩票.show = true;
                state.跟单彩票.obj = x.data;
                var data=x.data;
                    data.Amount=x.data.Price;
                obj.Content=JSON.stringify(x.data);
                commit('加载中',false,{root:true})
            }).catch(err=>{
                console.log(err)
                commit('加载中',false,{root:true})
                Toast('系统错误，稍后再试！');
            })
        },
        获取房间列表({state}){
            return new Promise((resolve, reject) => {
                api_获取房间列表().then(x=>{
                    state.房间列表=x.data;
                    // if(!state.当前房间.Id){
                    //     state.当前房间 = state.房间列表[0]
                    // }
                    resolve()
                }).catch(err=>{
                    reject()
                    // console.log(err)
                }) 
            });
        },
        获取房间人数({ state }) {
            api_在线人数().then(x => {
                state.会员人数 = x.data;
            }).catch(err => { })
        },
        async 撤销消息({state ,commit}){
            commit('加载中', true, { root: true })
            try {
                var r= await api_撤回消息(state.操作.obj.Id , state.当前房间.Id);                
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
        //投注记录============== 
        点击会员详情({state,dispatch},obj){
            if(state.user.ChatRole!=1){
                return
            }
            state.选中会员 = obj;
            state.显示会员详情=true;
            api_存取汇总({onlineId:obj.OnlineId}).then(x=>{
                console.log('获取汇总',x)
                state.会员详情.存取=x.data
            }).catch(err=>{})

            api_最新发言记录({onlineId:obj.OnlineId}).then(x=>{
                console.log('最新发言',x)
                state.会员详情.msglist=x.data
            }).catch(err=>{})
            
            dispatch('用户是否禁言')
        },
        用户是否禁言({state}){
            api_用户是否禁言({onlineId:state.选中会员.OnlineId}).then(x=>{
                console.log('查询用户是否禁言',x)
                state.会员详情.是否禁言=x.data.msg
            }).catch(err=>{})
        },
    },
}
