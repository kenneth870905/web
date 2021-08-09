import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ()=>import('@/views/Home.vue')
    },
    {
        path:"/Discount",
        component:()=>import('@/views/优惠.vue')
    },
    {
        path:"/alliance",
        component:()=>import('@/views/合作伙伴.vue')
    },
    // sv388 和 digmaan 说明
    {
        path:"/infoDetail/:type",
        component:()=>import('@/views/infoDetail.vue')
    },
    {
        path:"/aboutUs",
        component:()=>import('@/views/aboutUs.vue')
    },
    {
        path:"/rule",
        component:()=>import('@/views/rule.vue')
    },
    {
        path:"/responsible",
        component:()=>import('@/views/节制.vue')
    },
    {
        path:"/policy",
        component:()=>import('@/views/隐私策略.vue')
    },
    {
        path:"/contactUs",
        component:()=>import('@/views/contactUs.vue')
    },{
        path:"/personal",
        component:()=>import('@/views/personal.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
