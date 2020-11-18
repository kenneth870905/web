
import Vue from 'vue'
import VueRouter from 'vue-router'
// import nav from '@/views/nav.vue';
import nav from '../components/nav.vue';

Vue.use(VueRouter)

import 首页 from "./首页.js";
import 我的 from "./我的.js";
import 游戏 from "./游戏.js";
import 余额宝 from "./余额宝.js";
import 资讯 from "./资讯.js";
import 充值 from "./充值.js";
import 代理 from "./代理.js";
import 刮刮乐 from "./刮刮乐.js";
// 聊天专用
import 聊天 from "./聊天.js";

const import_1 =(path)=>{
    return new Promise((resolve, reject) => {
        document.querySelector('#_Loading_').style.display="flex";
        path = path.substring(2)
        resolve(import(`@/${path}`));
        setTimeout(() => {
            document.querySelector('#_Loading_').style.display="none";            
        }, 300);
    });
} 


const routes = [
    {path: '/home/home', redirect: '/'},
        ...聊天,
        ...首页,
        ...我的,
        ...游戏,
        ...余额宝,
        ...资讯,
        ...充值,
        ...代理,
        ...刮刮乐,
    {
        path: '/',
        name: '',
        components:{
            // default: ()=> import(/* webpackChunkName: "one" */'@/views/home/Home.vue'),
            default: ()=> import(/* webpackChunkName: "indexone" */'../views/home/Home.vue'),
            nav:nav
        },
        meta:{
            不能返回:true,
            index:1
        }
    },
    {
        path:"/jh",
        component:()=>import('@/views/计划/计划.vue')
    },
    {
        path: "/yxdt",
        components: {
            default: () => import(/* webpackChunkName: "one" */'../views/游戏大厅/游戏大厅.vue') ,
            // default: Foo,
            nav: nav
        },
        meta: {
            不能返回: true,
            index: 2
        }
    },
    {
        path:"/login",
        component:()=>import(/*  webpackChunkName: "one" */'@/views/login/login.vue')
    },
    {
        path:'/ltsOrders',
        component:()=>import(/* webpackChunkName: "one" */'@/views/订单/orders.vue'),
        meta:{
            需要登录:true,
        }
    },
    {
        path:"/discovery",
        components:{
            default:()=>import(/* webpackChunkName: "one" */'@/views/发现/发现.vue'),
            nav:nav
        },
        meta:{
            不能返回:true,
            index:4
        }
    },
    {
        path:"/reg",
        component:()=>import('@/views/login/新注册.vue')
    },
    {
        path:"/register",
        component:()=>import('@/views/login/新注册.vue')
    },{
        path:"/retrieve",
        component:()=>import('@/views/忘记密码/找回密码.vue')
    },{
        path:"/zhmm",
        component:()=>import('@/views/忘记密码/短息找回密码.vue')
    },{
        path:"/kaijiang",
        components:{
            default:()=>import('@/views/开奖/开奖.vue'),
            nav:nav
        }
    },
    {
        path:"/dlmima",
        component:()=>import('@/views/my/修改登录密码.vue')
    },{
        path:"/aqmima",
        component:()=>import('@/views/my/修改安全密码.vue')
    },


    {
        path:'/kjzs',
        component:()=>import('@/views/开奖走势/开奖走势.vue'),
        meta:{
            不能返回:true
        }
    },
    {
        path:'/orders',
        components:{
            default:()=>import('@/views/订单/orders.vue'),
            nav:nav
        },
        meta:{
            不能返回:true,
            需要登录:true,
            index:3
        }
    },
    {
        path:"/order",
        component:()=>import('@/views/订单/order.vue')
    },
    {
        path:"/edzh",
        component:()=>import('@/views/额度转换/额度转换.vue')
    },
    {
        path:"/helpCenter", 
        component:()=>import('@/views/帮助/帮助中心.vue')
    },{
        path:"/helpDetails", 
        component:()=>import('@/views/帮助/帮助详情.vue')
    },{
        path:"/rule",
        component:()=>import('@/views/游戏规则/游戏规则.vue')
    },{
        path:"/setting",
        component:()=>import('@/views/详细设定/详细设定.vue')
    },{
        path:"/noticeLead",
        component:()=>import('@/views/信息公告/公告引导页.vue')
    },
    {
        path:'/notice',
        component:()=>import('@/views/信息公告/公告列表.vue')
    },
    {
        path:'/message',
        component:()=>import('@/views/信息公告/消息列表.vue')
    },
    {
        path:'/shouchong',
        component:()=>import('@/views/首充/每日首充.vue')
    },
    {
        path:"/ifr/:type",
        component:()=>import('@/views/iframe.vue')
    },
    {
        path:'/chatBoxes',
        component:()=>import('@/views/聊天室/聊天室.vue'),
        meta:{
            不能返回:true
        }
    },
    {
        path:'/chatBoxes/:id',
        component:()=>import('@/views/聊天室/聊天室.vue'),
        meta:{
            不能返回:true
        }
    },
    
    {
        path:"/chatlist",
        component:()=>import('@/views/聊天室/消息列表.vue')
    },
    {
        path:"/privateChat",
        component:()=>import('@/views/聊天室/私聊.vue')
    },
    {
        path:"/chatUserDetails",
        component:()=>import('@/views/聊天室/会员详情.vue')
    },
    {
        path:'/kefu',
        component:()=>import('@/views/客服中心/客服中心.vue')
    },
    {
        path:"/lhzl/:type",
        component:()=>import('@/views/六合资料/六合资料.vue')
    },
    {
        path:"/lhzlDetails",
        component:()=>import('@/views/六合资料/iframe.vue')
    },
    {
        path:"/tjQunHongBao",
        component:()=>import('@/views/红包/群红包.vue')
    },
    // 红包游戏
    {
        path:"/hbxq",
        component:()=>import('@/views/红包/领取详情.vue')
    },
    {
        path:"/hbGame",
        component:()=>import_1('@/views/红包游戏/游戏列表.vue')
    },
    {
        path:'/hbOrderList',
        component:()=>import('@/views/红包游戏/记录/红包记录.vue')
    },
    {
        path:"/hbStatistics",
        component:()=>import_1('@/views/红包游戏/记录/汇总.vue')
    },
    {
        path:"/hbGame/room",
        component:()=>import_1('@/views/红包游戏/红包房间.vue')
    },
    {
        path:"/hbGame/sendSaol",
        component:()=>import('@/views/红包游戏/发布红包/扫雷红包.vue')
    },
    {
        path:"/hbGame/sendJQ",
        component:()=>import_1('@/views/红包游戏/发布红包/发布禁抢.vue')
    },
    {
        path:"/hbGame/info",
        component:()=>import_1('@/views/红包游戏/房间信息.vue')
    },{
        path:"/hbGame/rule",
        component:()=>import_1('@/views/红包游戏/规则/规则大厅.vue')
    },

    // 扫雷玩法
    {
        path:"/hbGame/ruleDetails",
        component:()=>import_1('@/views/红包游戏/规则/规则.vue')
    },
    // {
    //     path:"/hbGame/saoleiRule1",
    //     component:()=>import_1('@/views/红包游戏/规则/扫雷规则1.vue')
    // },{
    //     path:"/hbGame/saoleiRule2",
    //     component:()=>import_1('@/views/红包游戏/规则/扫雷规则2.vue')
    // },{
    //     path:"/hbGame/saoleiRule3",
    //     component:()=>import_1('@/views/红包游戏/规则/扫雷规则3.vue')
    // },



    {
        path:"/testPush",
        component:()=>import('@/views/推送调试.vue')
    },
    {
        path:"/weihu",
        component:()=>import('@/views/维护.vue')
    },
    {
        path:"*",
        name:"",
        component:()=>import('@/views/404.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
