import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/all',
        component: ()=>import('@/views/all.vue')
    },{
        path: '/productList',
        component: ()=>import('@/views/productList.vue')
    },
    {
        path:"/detail",
        component:()=>import('@/views/detail.vue')
    },
    {
        path:"/login",
        component:()=>import('@/views/login.vue')
    },
    {
        path:"/register",
        component:()=>import('@/views/注册.vue')
    },
    {
        path:"/my",
        component:()=>import('@/views/my/my.vue'),
        children:[
            {
                path:"",
                component:()=>import('@/views/my/个人资料.vue')
            },{
                path:"address",
                component:()=>import('@/views/my/address.vue')
            },
            {
                path:"addressDetails",
                component:()=>import('@/views/my/addressDetails.vue')
            },
            {
                path:"orderlist",
                component:()=>import('@/views/order/orderlist.vue')
            },
            {
                path:"evaluate",
                component:()=>import('@/views/my/评价.vue')
            }
        ]
    },
    {
        path:"/cart",
        component:()=>import('@/views/cart.vue')
    },
    {
        path:"/buy",
        component:()=>import('@/views/buy.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
