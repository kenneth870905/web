import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/zhuce',
        component: () => import('@/views/zhuce/zhuce.vue'),
        meta:{}
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
    },
    {
        path: '/',
        meta:{
            login:true,
        },
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                meta:{name:"打卡",login:true,root:0}
            },{
                path: 'personal',
                component: () => import('@/views/personal/personal.vue'),
                meta:{name:"个人中心",login:true,root:0}
            },
            {
                path: 'duizhang',
                component: () => import('@/views/对账系统/对账系统.vue'),
                meta:{name:"对账系统",login:true,root:0}
            },

            {
                path: 'userlist',
                component: () => import('@/views/userlist/userlist.vue'),
                meta:{name:"人员管理",login:true,root:1}
            },
            {
                path: 'kaoqinjilv',
                component: () => import('@/views/kaoqin/考勤记录.vue'),
                meta:{name:"考勤记录",login:true,root:1}
            },
            {
                path: 'zhangmuhuizong',
                component: () => import('@/views/账目汇总/账目汇总.vue'),
                meta:{name:"b币汇总",login:true,root:1}
            },
            
            {
                path: 'VipList',
                component: () => import('@/views/vip管理/viplist.vue'),
                meta:{name:"vip管理",login:true,root:0}
            },
            {
                path: 'VipDetails',
                component: () => import('@/views/vip管理/vipDetails.vue'),
                meta:{name:"vip详情",login:true,root:0}
            },
            // {
            //     path: 'zhangmu/fabi',
            //     component: () => import('@/views/账目汇总/法币汇总.vue'),
            //     meta:{name:"法币汇总",login:true,root:1}
            // },
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
