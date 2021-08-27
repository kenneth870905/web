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
            name: 'home',
            components:{
                default:home,
                底部:底部导航
            },
        },

        {
            path: '/expert',
            name: 'expert',
            components:{
                default: () => import('./views/专家/专家.vue'),
                底部:底部导航
            },
        },
        {
            path: '/login',
            name: 'login',
            components:{
                default: () => import('./views/登录/登录.vue'),
            },
        },
        {
            path: '/register',
            name: 'register',
            components:{
                default: () => import('./views/注册/注册.vue'),
            },
        },

        {
            path: '/message',
            name: 'message',
            components:{
                default: () => import('./views/资讯/资讯.vue'),
                底部:底部导航
            },
        },
        {
            path: '/msgParticulars',
            name: 'msgParticulars',
            components:{
                default: () => import('./views/资讯详情/资讯详情.vue'),
                底部:底部导航
            },
        },

        {
            path: '/PlanDetails',
            name: 'PlanDetails',
            components:{
                default: () => import('./views/方案详情/方案详情.vue'),
                // 底部:底部导航
            },
        },
         
        {
            path: '/Competition',
            name: 'Competition',
            components:{
                default: () => import('./views/赛事/赛事.vue'),
                底部:底部导航
            },
        },
        {
            path: '/CompParticulars',
            name: 'CompParticulars',
            components:{
                default: () => import('./views/赛事详情/赛事详情.vue'),
                // 底部:底部导航
            },
        },
        {
            path: '/ExpertsDetails',
            name: 'ExpertsDetails',
            components:{
                default: () => import('./views/专家详情/专家详情.vue'),
                // 底部:底部导航
            },
        },

        {
            path: '/scheme',
            name: '/scheme',
            components:{
                default: () => import('./views/收藏方案/收藏方案.vue'),
                底部:底部导航
            },
        },

        {
            path: '/my',
            name: 'my',
            components:{
                default: () => import('./views/我的/我的.vue'),
                底部:底部导航
            },
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
