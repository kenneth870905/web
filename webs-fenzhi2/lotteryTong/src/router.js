import Vue from 'vue'
import Router from 'vue-router'
import home from './views/主页/主页.vue'
import 底部导航 from './components/底部导航/底部导航.vue'

Vue.use(Router)

export default new Router({

    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'electron',
            components:{
                default:home,
                底部:底部导航
            },
            // children: [
            //     {
            //         path: '/guidance',
            //         component: () => import('./views/首页/新手指导.vue'),
            //         meta: { 隐藏头部: true },
            //     },
            // ]
        },

        {
            path: '/recommend',
            name: 'recommend',
            components:{
                default: () => import('./views/主页/资讯版/冰心推荐.vue'),
            },
        },
        {
            path: '/markSixSanito',
            name: 'markSixSanito',
            components:{
                default: () => import('./views/主页/资讯版/六合大神/六合大神.vue'),
            },
        },
        {
            path: '/markSixSanitoMin',
            name: 'markSixSanitoMin',
            components:{
                default: () => import('./views/主页/资讯版/六合大神/六合大神详情页.vue'),
            },
        },



        {
            path: '/markSixImg',
            name: 'markSixImg',
            components:{
                default: () => import('./views/主页/资讯版/六合图库.vue'),
            },
        },

        {
            path: '/formulaSelect',
            name: 'formulaSelect',
            components:{
                default: () => import('./views/主页/资讯版/公式杀号.vue'),
            },
        },
        {
            path: '/SinatvLottery',
            name: 'SinatvLottery',
            components:{
                default: () => import('./views/主页/资讯版/直播开奖.vue'),
            },
        },
        {
            path: '/historyLottery',
            name: 'historyLottery',
            components:{
                default: () => import('./views/主页/资讯版/历史开奖/历史开奖.vue'),
            },
              children: [
                {
                    path: '',
                    component: () => import('./views/主页/资讯版/历史开奖/历史开奖小.vue'),
                    
                },
                {
                    path: '/Lotterydetails',
                    component: () => import('./views/主页/资讯版/历史开奖/期次详情.vue'),
                    
                },
                {
                    path: '/LotteryTime',
                    component: () => import('./views/主页/资讯版/历史开奖/开奖日期.vue'),
                    
                },
            ]
        },
        {
            path: '/chatRoom',
            name: 'chatRoom',
            components:{
                default: () => import('./views/主页/资讯版/聊天室.vue'),
            },
        },
        {
            path: '/SelectAssistant',
            name: 'SelectAssistant',
            components:{
                default: () => import('./views/主页/资讯版/挑码助手.vue'),
            },
        },


        {
            path: '/documentary',
            name: 'documentary',
            components:{
                default: () => import('./views/跟单/跟单.vue'),
                // 底部:底部导航
            },
         
        },
        {
            path: '/documentary-history',
            name: 'documentary-history',
            components:{
                default: () => import('./views/跟单/跟单历史.vue'),
                底部:底部导航
            },
        },
        {
            path: '/specialist',
            name: 'specialist',
            components:{
                default: () => import('./views/跟单/申请专家.vue'),
                底部:底部导航
            },
        },





        {
            path: '/open',
            name: 'open',
            components:{
                default: () => import('./views/开奖/开奖.vue'),
                底部:底部导航
            },
          
        },

        {
            path:'/buyLottery',
            components:{ 
                default:()=>import('./views/购彩大厅/购彩.vue'),
                底部:底部导航
            }
        },

       
        





        {
            path: '/my',
            name: 'my',
            components:{
                default:() => import('./views/我的/我的.vue'),
                底部:底部导航
            }
        },
        {
            path: '/cash',
            name: 'cash',
            components:{
                default:() => import('./views/我的/马上提现.vue'),
            }
        },
        {
            path: '/recharge',
            name: 'recharge',
            components:{
                default:() => import('./views/我的/我要充值/我要充值.vue'),
            }
        },
        {
            path: '/bankCard',
            name: 'recharge',
            components:{
                default:() => import('./views/我的/我要充值/银行卡转账.vue'),
            }
        },
        {
            path: '/onlinePayment',
            name: 'recharge',
            components:{
                default:() => import('./views/我的/我要充值/在线支付.vue'),
            }
        },
        





        {
            path: '/detai',
            name: 'detai',
            components:{
                default:() => import('./views/我的/资金明细/资金明细.vue'),
            }
        },

        {
            path: '/ChangeAccount',
            name: 'ChangeAccount',
            components:{
                default:() => import('./views/我的/资金明细/钱包变账.vue'),
            }
        },
        {
            path: '/rechargeRecord',
            name: 'rechargeRecord',
            components:{
                default:() => import('./views/我的/资金明细/充值记录.vue'),
            }
        },
        {
            path: '/WithdrawalsRecords',
            name: 'WithdrawalsRecords',
            components:{
                default:() => import('./views/我的/资金明细/提款记录.vue'),
            }
        },
        {
            path: '/RebatesRecord',
            name: 'RebatesRecord',
            components:{
                default:() => import('./views/我的/资金明细/返点记录.vue'),
            }
        },







        {
            path:"/test",
            component:()=>import('./views/test.vue')
        },
        {
            path:"*",
            component:()=>import('./views/error.vue')
        }

    
    ]
})
