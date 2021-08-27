import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: index
    },
    {
        // type 请参考 iframe.vue 参数
        path: '/iframe/:type',
        name: '',
        meta: {
            需要登录: true
        },
        component: () => import('@/views/iframe/iframe.vue')
    },
    {
        path: '/register',
        component: () => import('@/views/register/REGISTER.vue')// 注册
    },
    {
        path: '/About',
        name: 'About',
        component: () => import('@/views/About/About.vue')// 关于我们
    },
    {
        path: '/chess',
        name: 'chess',
        component: () => import('@/views/chess/CHESS.vue')// 棋牌
    },
    {
        path: '/discounts',
        name: 'discounts',
        component: () => import('@/views/discounts/DISCOUNTS.vue')// 优惠
    },
    {
        path: '/electron',
        name: 'electron',
        component: () => import('@/views/electron/ELECTRON.vue')// 电子游艺
    },
    {
        path: '/fish',
        name: 'fish',
        component: () => import('@/views/fish/FISH.vue')// 扑鱼
    },
    {
        path: '/immortal',
        name: 'immortal',
        component: () => import('@/views/immortal/IMMORTAL.vue')// 真人娱乐
    },
    {
        path: '/LotteryRules',
        name: 'lottery',
        component: () => import('@/views/LotteryRules/LotteryRules.vue') // 彩票
    },
    {
        path: '/lottery',
        name: 'lottery',
        component: () => import('@/views/lottery/LOTTERY.vue')// 彩票
    },
    {
        path: '/phone',
        name: 'phone',
        component: () => import('@/views/phone/PHONE.vue')// 手机
    },
    {
        path: '/sports',
        name: 'sports',
        component: () => import('@/views/sports/SPORTS.vue')// 体育
    },
    {
        path: '/street',
        name: 'street',
        component: () => import('@/views/street/STREET.vue')// 街机游戏
    },
    {
        path:"/quweigame",
        name:"",
        component:()=>import('@/views/趣味游戏.vue')
    },
    {
        path: '*', 
        redirect: '/'
    }
]

const router = new VueRouter({
    routes
})

export default router
