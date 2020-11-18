
import { api_Online } from "@/api/登录接口.js";
import { api_隐藏公告 } from "@/api/公告接口.js";
import { api_获取等级 } from "@/api/个人资料.js";

var list=[
    {img: config.img_url+"static/image/my/zhuti_1.png",color:"#ec0909",name:"玫瑰红"},
    {img:config.img_url+"static/image/my/zhuti_2.png",color:"#df4f1a",name:"珊瑚色"},
    {img:config.img_url+"static/image/my/zhuti_3.png",color:"#14bd58",name:"草绿"},
    {img:config.img_url+"static/image/my/zhuti_4.png",color:"#4169E1",name:"宝石蓝"},
    {img:config.img_url+"static/image/my/zhuti_5.png",color:"#d09700",name:"金麒麟"},
    {img:config.img_url+"static/image/my/zhuti_6.png",color:"#8A2BE2",name:"紫罗兰"},
    {img:config.img_url+"static/image/my/zhuti_7.png",color:"#FF4500",name:"红橙"},
    {img:config.img_url+"static/image/my/zhuti_8.png",color:"#ec0000",name:"罂粟红"},
    {img:config.img_url+"static/image/my/zhuti_9.png",color:"#213862",name:"高贵蓝"}
]

export default {
    namespaced: true,
    state:{
        userinfo:{},
        偏好设置:{
            高级投注模式:false,
            聊天室弹框:true,
            购彩助手:true,
            主题色:{}
        },
        彩票玩法:2,
        等级:{},
        api路线:"",
        路线list:[]
    },
    getters:{
        用户主题色(state){
            if(state.偏好设置.主题色.color){
                return state.偏好设置.主题色
            }else{
                return list[0];
            }
        },
        试玩(state) {
            if (state.userinfo.UserId) {
                var userid = state.userinfo.UserId.toLowerCase()
                return userid.indexOf('demo') != '-1'
            } else {
                return false
            }
        },
    },
    mutations:{
        设置state(state,[key,value]){
            state[key]=value
        },
        设置主题(state,obj){
            state.偏好设置.主题色=obj
            if(window.plus){
                var clientid = plus.push.getClientInfo().clientid;
                plus.navigator.setStatusBarBackground(obj.color);
            }else{
                document.addEventListener('plusready', function(){
                    var clientid = plus.push.getClientInfo().clientid;
                    plus.navigator.setStatusBarBackground(obj.color);
                });    
            }
        }
    },
    actions:{
        获取个人等级({state}){
            api_获取等级().then(x=>{
                console.log(x);
                state.等级=x.data;
            }).catch(err=>{})
        },
        getUserInfo({state,dispatch}){
            return new Promise((resolve, reject) => {
                api_Online({init: true}).then(x=>{
                    state.userinfo=x.data;
                    if(x.data.Messages && x.data.Messages.length>0 ){
                        mui.alert(x.data.Messages[0].Content,'消息提醒','我知道了',()=>{
                            var obj={
                                    Id:x.data.Messages[0].Id, 
                                    Type: 2
                                }
                            api_隐藏公告(obj).then(r=>{
                                dispatch('getUserInfo')
                            }).catch(err1=>{
                                dispatch('getUserInfo')
                            })
                        })
                    }
                    resolve()
                }).catch(err=>{
                    reject()
                })    
            });
        },
    },
    modules:{},
}