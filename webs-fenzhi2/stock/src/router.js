import Vue from 'vue'
import Router from 'vue-router'
import home from './views/首页/home.vue'
import 底部导航 from './components/底部导航/底部导航.vue'

Vue.use(Router)

export default new Router({

    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'electron',
            meta: { 隐藏头部: false },
            components:{
                default:home,
                底部:底部导航
            },
            children: [
                {
                    path: '/guidance',
                    component: () => import('./views/首页/新手指导.vue'),
                    meta: { 隐藏头部: true },
                },
            ]
        },



        {
            path: '/About',
            component: () => import('./views/关于我们/关于我们.vue'),
            meta: { 隐藏头部: true },
            children: [
                {
                    path: '',
                    component: () => import('./views/关于我们/app下载.vue'),
                    meta: { 隐藏头部: true },
                },
                {
                    path: '/jianjie',
                    component: () => import('./views/关于我们/公司简介.vue'),
                    meta: { 隐藏头部: true },
                },
                {
                    path: '/rongyu',
                    component: () => import('./views/关于我们/证件荣誉.vue'),
                    meta: { 隐藏头部: true },
                }, {
                    path: '/contactUs',
                    component: () => import('./views/关于我们/联系我们.vue'),
                    meta: { 隐藏头部: true },
                }, {
                    path: '/recruit',
                    component: () => import('./views/关于我们/人才招募.vue'),
                    meta: { 隐藏头部: true },
                },
             
            ]
        },


        {
            path: '/information',
            name: 'information',
            components:{
                default: () => import('./views/配资/配资.vue'),
                底部:底部导航
            },
            meta:{
                需要登录:true
            }
        },
        {
            path: '/pzjl',
            name: '',
            component: () => import('./views/配资/配资记录.vue'),
        },
        {
            path: '/position',
            name: 'position',
            component: () => import('./views/配资/合约持仓.vue'),
        },
        {
            path: '/pzxq/:contractCode',
            name: '',
            component: () => import('./views/配资/配资详情.vue'),
        },
    
        {
            path: '/service',
            name: '',
            meta: { 隐藏头部: true },
            components:{
                default: () => import('./views/客服/home.vue'),
                底部:底部导航
            },
        },
        {
            path: '/my',
            name: 'my',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/我的/我的.vue'),
                底部:底部导航
            }
        },
        {
            path: '/my/withdrawals',
            name: '',
            component: () => import('./views/我的/提现.vue'),
        },
        {
            path: '/my/rechargeAutonym',
            name: '/my/rechargeAutonym',
            component: () => import('./views/我的/实名认证.vue'),
        },
      
        {
            path: '/my/recharge',
            name: '',
            component: () => import('./views/我的/充值.vue'),
        },
        {
            path: '/my/rechargeInternetbank',
            name: '/my/rechargeInternetbank',
            component: () => import('./views/我的/网银转账.vue'),
        },
        {
            path: '/my/rechargeAlipay',
            name: '/my/rechargeAlipay',
            component: () => import('./views/我的/支付宝扫码.vue'),
        },
        {
            path: '/my/rechargeWechat',
            name: '/my/rechargeWechat',
            component: () => import('./views/我的/微信扫码.vue'),
        }, 
        {
            path: '/my/zhzc',
            name: '',
            component: () => import('./views/我的/账户资产.vue'),
        },
        {
            path: '/my/zjls',
            name: '',
            component: () => import('./views/我的/资金流水.vue'),
        },


        {
            path: '/register',
            name: 'register',
            component: () => import('./views/注册/注册.vue'),
            meta: { 隐藏头部: true, 隐藏尾部导航: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/登录/登录.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/task',
            name: 'task',
            component: () => import('./views/新手任务/新手任务.vue'),
            meta: { 隐藏头部: true },
        },

        // =======帮助中心开始=========================
        {
            path: '/helps',
            name: 'helps',
            component: () => import('./views/帮助中心/帮助中心.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/novia',
            name: '/helps/novia',
            component: () => import('./views/帮助中心/新手指南.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/issue',
            name: '/helps/issue',
            component: () => import('./views/帮助中心/常见问题.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/issueText',
            name: '/helps/issueText',
            component: () => import('./views/帮助中心/常见问题详情.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/withfunding',
            name: '/helps/withfunding',
            component: () => import('./views/帮助中心/配资相关.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/withfundingText',
            name: '/helps/withfundingText',
            component: () => import('./views/帮助中心/配资相关详情.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/helps/registerAgreement',
            name: '/helps/registerAgreement',
            component: () => import('./views/帮助中心/注册协议.vue'),
            meta: { 隐藏头部: true },
        },
       

        // =======帮助中心结束=========================
 

        {
            path: '/news',
            name: 'news',
            component: () => import('./views/行业资讯/行业资讯.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/announcement',
            name: 'announcement',
            component: () => import('./views/最新公告/最新公告.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path: '/APP',
            name: 'APP',
            component: () => import('./views/APP下载/APP下载.vue'),
            meta: { 隐藏头部: true },
        },
        {
            path:"/czjl",
            component: () => import('./views/充值提现/充值记录.vue')
        },
        {
            path:"/txjl",
            component: () => import('./views/充值提现/提现记录.vue')
        },
        {
            path:"/my/yhk",
            component: () => import('./views/我的/银行卡.vue')
        },
        {
            path:"/my/dlpassword",
            component: () => import('./views/我的/登录密码.vue')
        },
        {
            path:"/my/zfpassword",
            component: () => import('./views/我的/提现密码.vue')
        },
        {
            path:"/znxx",
            component: () => import('./views/站内消息/站内消息.vue')
        },
        {
            path:"/znxxText",
            component: () => import('./views/站内消息/站内消息详情.vue')
        },
       
      
        // ============ 股市开始 ============
        {
            path:'/gp',
            components:{ 
                default:()=>import('./views/股市/股市首页.vue'),
                底部:底部导航
            }
        },
        {
            path:'/gp/optional',
            components:{
                default:()=>import('./views/股市/自选股.vue'),
                底部:底部导航
            }
        },
        {
            path:'/gp/market',
            components:{
                default:()=>import('./views/股市/股票行情.vue'),
                // 底部:底部导航
            }
        },
        {
            path:'/gp/buy',
            components:{
                default:()=>import('./views/股市/股票买入.vue'),
                // 底部:底部导航
            }
        },
        {
            path:'/gp/sell',
            components:{
                default:()=>import('./views/股市/股票卖出.vue'),
                // 底部:底部导航
            }
        },
        {
            path:'/gp/revoke',
            components:{
                default:()=>import('./views/股市/股票撤单.vue'),
                // 底部:底部导航
            }
        },
        {
            path:'/gp/entrust',
            components:{
                default:()=>import('./views/股市/股票委托.vue'),
                // 底部:底部导航
            }
        },
        // ============ 股市结束 ============
        {
            path:"/test",
            component:()=>import('./views/test.vue')
        },
        {
            path:"*",
            component:()=>import('./views/error.vue')
        },
    ]
})
