import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue')
    },{
        path: '/Kitten',
        name: '',
        component: () => import('@/views/幼猫/幼猫.vue')
    },
    {
        path: '/Kitten/:id',
        name: '',
        component: () => import('@/views/幼猫/幼猫.vue')
    },
    {
        path: '/KittenDetails',
        name: '',
        component: () => import('@/views/幼猫/猫咪详情.vue')
    },
    {
        path: '/CatCafe',
        name: '',
        component: () => import('@/views/猫咖.vue')
    },
    {
        path:"/SafeGuard",
        name:"",
        component:()=>import('@/views/保障.vue')
    },
    {
        path:"/shop",
        name:"",
        component:()=>import('@/views/体验馆.vue')
    },
    {
        path:"/shopDetails",
        name:"",
        component:()=>import('@/views/体验馆详情.vue')
    },
    {
        path:"/about",
        name:"",
        component:()=>import('@/views/about.vue')
    },{
        path:"/news",
        name:"",
        component:()=>import('@/views/百科.vue')
    },{
        path:"/newsDetails",
        name:"",
        component:()=>import('@/views/百科详情.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
