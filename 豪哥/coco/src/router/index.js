import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path:"/login",
        name:"",
        component:()=>import('@/views/login.vue')
    },
    {
        path:"/register",
        name:"",
        component:()=>import('@/views/注册.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children:[
            {
                path:"device",
                component:()=>import('@/views/云机列表.vue')
            },
            {
                path:"borderList",
                component:()=>import('@/views/订单/订单列表.vue')
            },
            {
                path:"TransactionRecord",
                component:()=>import('@/views/充值记录.vue')
            },
            {
                path:"TransactionRecord",
                component:()=>import('@/views/充值记录.vue')
            },{
                path:"statistics",
                component:()=>import('@/views/云机统计.vue')
            }
        ]
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     component: function () {
    //         return import(/* webpackChunkName: "about" */ '../views/About.vue')
    //     }
    // }
]

const router = new VueRouter({
    routes
})

export default router
