
var 聊天2state = {
    消息:[],
    未读消息:0,
    请求验证:[],
    time1:""
}
import { api_待验证请求} from "@/api/聊天接口.js";
export default {
    namespaced:true,
    state:Object.assign({},聊天2state),
    getters:{},
    mutations:{
        修改state(state,[key,value]){
            state[key] = value
        }
    },
    actions:{
        async 链接ws({dispatch,rootState}){
            window.appVue = {
                addmsg: function (obj) {
                    console.log(obj)
                    // dispatch('addmsg', obj)
                },
                userinit: (obj) => {
                    console.log(obj)
                    // dispatch('userinit', obj)
                },
                chatState: (obj) => {
                    console.log(obj)
                    // dispatch('chatState', obj)
                },
                //删除消息
                deleteMsg: (id)=>{
                    var index=state.msglist.findIndex(x=>x.Id==id);
                    state.msglist.splice(index,1)
                }
            };
            console.log(rootState.config.api_url)
            if (typeof (appPage) != 'object') {
                try {
                    console.log('正在加载聊天文件···')
                    await dispatch('获取js',rootState.config.api_url + "/Scripts/signalR/jquery.signalR-2.2.2.js?v=1")
                    await dispatch('获取js',rootState.config.api_url + '/signalr/hubs?v=6')
                    await dispatch('获取js',rootState.config.api_url + '/Areas/MApi/Content/chat.js?v=7');
                } catch (error) {
                    console.log(error)
                    console.log('聊天室文件加载失败，请重试')
                    return
                }
            }
            var url = ''
            if (typeof LineSwitch != 'undefined' && LineSwitch) {
                url = config.wchat_url + '/signalr'
            }
            if(process.env.NODE_ENV=='development'){
                url = config.wchat_url + '/signalr'
            }
            console.log('________________',url)
            appPage.init('' , url, '');
        },
        获取js({},url){
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "get",
                    url: url,
                    // data: "data",
                    dataType: "script",
                    success: function (response) {
                        resolve()
                    },
                    error:function(err){
                        reject()
                    }
                });
            });
        },
        初始化({state}){
            // state = Object.assign({},聊天2state)
            // console.log(state,聊天2state)
            for (const key in state) {
                state[key] = 聊天2state[key]
            }
        },
        取消获取验证请求(){
            try {
                clearTimeout(state.time1)                
            } catch (error) {}
        },
        async 获取验证请求({state,dispatch , rootState}){
            console.log('获取好友请求')
            try {
                clearTimeout(state.time1)
            } catch (error) {}
            let userinfo = rootState.user.userinfo
            state.time1 = setTimeout(() => {
                dispatch('获取验证请求')
            }, 1000*30);
            if(!userinfo.UserId) return
            var r =  await api_待验证请求()
            if(r.data.code==0){
                state.请求验证 = r.data.msg;
            }
        }

    }
}