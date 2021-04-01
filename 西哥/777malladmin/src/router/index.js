import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout.vue'

import {NoVerification} from './pathList'


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: ()=>import('@/views/login.vue'),
        hidden:true     //不在导航栏显示
    },
    {
        path: '/layout',
        name:"layout",
        component: layout,
        // redirect:"",
        meta:{
            title:""
        },
        children: [
            ...NoVerification,
            {
                path: '/BillingDetails',
                component: () => import('@/views/结算.vue'),
                meta: { title: '结算详情'}
            },
            {
                path: '/ordersDetails',
                component: () => import('@/views/下单.vue'),
                meta: { title: '下单详情'}
            },
            {
                path:"/withdrawDetails",
                component: () => import('@/views/提现详情.vue'),
                meta: { title: '提现详情'}
            },{
                path:"/commission",
                component: () => import('@/views/佣金转入详情.vue'),
                meta: { title: '佣金转入'}
            }
        ]
    },

    
]

const router = new VueRouter({
    routes
})

export default router
