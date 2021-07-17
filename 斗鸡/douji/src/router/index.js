import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: ()=>import('@/views/Home.vue')
    },
    // 斗鸡
    {
        path:"/cockfighting",
        component:()=>import('@/views/cockfighting.vue')
    },
    {
        path:"/Discount",
        component:()=>import('@/views/优惠.vue')
    },
    {
        path:"/alliance",
        component:()=>import('@/views/合作伙伴.vue')
    },

    // sv388 和digmaan 说明
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
        path:"/register",
        component:()=>import('@/views/register.vue')
    },
    
    
    
    {
        path:"/user",
        component:()=>import('@/views/user/user.vue'),
        children:[
            {path: '', redirect: '/user/recharge'},
            {
                path:"recharge",
                component:()=>import('@/views/user/充值.vue'),
                meta:{title:"充值"}
            },
            {
                path:"withdraw",
                component:()=>import('@/views/user/提现.vue'),
            },
            {
                path:"TransactionRecord",
                component:()=>import('@/views/user/交易记录.vue'),
            },
            {
                path:"Agent",
                component:()=>import('@/views/user/代理商.vue'),
            },
            {
                path:"Account",
                component:()=>import('@/views/user/账户.vue'),
            },
            {
                path:"Conversion",
                component:()=>import('@/views/user/额度转换.vue'),
            },
            {
                path:"bank",
                component:()=>import('@/views/user/银行卡.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
