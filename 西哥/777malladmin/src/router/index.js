import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: ()=>import('@/views/login.vue'),
        hidden:true     //不在导航栏显示
    },
    {path: '/', redirect: '/user',hidden:true},
    {
        path: '/user',
        component: layout,
        redirect: '/user/Online',
        meta:{
            title:"会员管理"
        },
        children: [
            {
                path: 'Online',
                component: () => import('@/views/会员/在线会员.vue'),
                meta: { title: '在线会员'}
            },
            {
                path: 'list',
                component: () => import('@/views/会员/会员列表.vue'),
                meta: { title: '会员列表'}
            },
            {
                path: 'level',
                component: () => import('@/views/会员/会员分成.vue'),
                meta: { title: '会员分成'}
            },
            {
                path: 'money',
                component: () => import('@/views/会员/资金明细.vue'),
                meta: { title: '资金明细'}
            }
        ]
    },
    {
        path: '/Lottery',
        component: layout,
        redirect: '/Lottery/order',
        meta:{
            title:"彩票"
        },
        children:[
            {
                path: 'order',
                component: () => import('@/views/彩票/订单.vue'),
                meta: { title: '订单'}
            },
            {
                path: 'record',
                component: () => import('@/views/彩票/开奖管理.vue'),
                meta: { title: '开奖管理'}
            }
        ]
    },
    {
        path: '/money',
        component: layout,
        redirect: '/money/ManualAccess',
        meta:{
            title:"资金管理"
        },
        children:[
            {
                path: 'sdcqk',
                component: () => import('@/views/资金管理/手动存取款.vue'),
                meta: { title: '手动存取款'}
            },
            {
                path: 'cksh',
                component: () => import('@/views/资金管理/存款审核.vue'),
                meta: { title: '存款审核'}
            },
            {
                path: 'ckls',
                component: () => import('@/views/资金管理/存款历史.vue'),
                meta: { title: '存款历史'}
            },
            {
                path: 'qksh',
                component: () => import('@/views/资金管理/取款审核.vue'),
                meta: { title: '取款审核'}
            },
            {
                path: 'qkls',
                component: () => import('@/views/资金管理/取款历史.vue'),
                meta: { title: '取款历史'}
            },
            {
                path: 'zxzf',
                component: () => import('@/views/资金管理/在线支付订单.vue'),
                meta: { title: '在线支付订单'}
            },
            {
                path: 'zmhz',
                component: () => import('@/views/资金管理/账目汇总.vue'),
                meta: { title: '账目汇总'}
            },
            {
                path: 'zmayhz',
                component: () => import('@/views/资金管理/账目按月汇总.vue'),
                meta: { title: '账目按月汇总'}
            },
        ]
    },
    {
        path: '/bbhz',
        component: layout,
        redirect: '/bbhz/day',
        meta:{
            title:"报表汇总"
        },
        children:[
            {
                path: 'day',
                component: () => import('@/views/报表汇总/报表按天汇总.vue'),
                meta: { title: '报表按天汇总'}
            },
            {
                path: 'month',
                component: () => import('@/views/报表汇总/报表按月汇总.vue'),
                meta: { title: '报表按月汇总'}
            }
        ]
    },
    {
        path: '/agent',
        component: layout,
        redirect: '/agent/userlist',
        meta:{
            title:"代理商管理"
        },
        children:[
            {
                path: 'user',
                component: () => import('@/views/代理商管理/代理商列表.vue'),
                meta: { title: '代理商列表'}
            },
            {
                path: 'pyramid',
                component: () => import('@/views/代理商管理/代理金字塔.vue'),
                meta: { title: '代理金字塔'}
            },
            {
                path: 'domain',
                component: () => import('@/views/代理商管理/代理商域名.vue'),
                meta: { title: '代理商域名'}
            },
            {
                path: 'backProgram',
                component: () => import('@/views/代理商管理/退水方案.vue'),
                meta: { title: '退水方案'}
            },
            {
                path: 'backDetails',
                component: () => import('@/views/代理商管理/退水明细.vue'),
                meta: { title: '退水明细'}
            }
        ]
    },
    {
        path: '/system',
        component: layout,
        redirect: '/system/blacklist',
        meta:{
            title:"系统设置"
        },
        children:[
            {
                path: 'blacklist',
                component: () => import('@/views/系统设置/拉黑名单.vue'),
                meta: { title: '拉黑名单'}
            },
            {
                path: 'notice',
                component: () => import('@/views/系统设置/公告设置.vue'),
                meta: { title: '公告设置'}
            },
            {
                path: 'activity',
                component: () => import('@/views/系统设置/活动设置.vue'),
                meta: { title: '活动设置'}
            },
            {
                path: 'administrator',
                component: () => import('@/views/系统设置/管理员账号.vue'),
                meta: { title: '管理员账号'}
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
