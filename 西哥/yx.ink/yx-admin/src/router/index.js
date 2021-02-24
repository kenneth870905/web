import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/orders',
        children: [{
            path: '',
            component: () => import('@/views/订单列表.vue'),
            meta: { title: '订单列表', icon: 'el-icon-menu' }
        }]
    },
    {
        path: '/userList',
        component: Layout,
        redirect: '/userList',
        children: [{
            path: '/userList',
            component: () => import('@/views/会员列表.vue'),
            meta: { title: '会员列表', icon: 'el-icon-menu' }
        }]
    },

    {
        path: '/goods',
        component: Layout,
        redirect: '/goodsType',
        meta: { title: '商品管理', icon: 'el-icon-s-help' },
        children: [
            {
                path: '/goodsType',
                component: () => import('@/views/商品/商品分类'),
                meta: { title: '商品分类', icon: 'table' }
                // meta: { title: 'Table', icon: 'table' ,breadcrumb:false}
            },
            {
                path: '/goodsList',
                component: () => import('@/views/商品/商品列表'),
                meta: { title: '商品列表', icon: 'tree' }
            },
            {
                path: '/goodsDetails',
                component: () => import('@/views/商品/商品详情.vue'),
                hidden: true ,
                meta: { title: '商品详情', icon: 'tree' }
            }
            
        ]
    },
    {
        path: '/carousel',
        component: Layout,
        redirect: '/carousel',
        children: [{
            path: '',
            component: () => import('@/views/轮播图.vue'),
            meta: { title: '轮播图设置', icon: 'el-icon-menu' }
        }]
    },
    
    {
        path: '/comment',
        component: Layout,
        redirect: '/comment',
        children: [{
            path: '',
            component: () => import('@/views/评论列表.vue'),
            meta: { title: '评论列表', icon: 'el-icon-menu' ,数量:0}
        }]
    },
    {
        path: '/basics',
        component: Layout,
        redirect: '/basics',
        children: [{
            path: '',
            component: () => import('@/views/基本信息.vue'),
            meta: { title: '基本信息', icon: 'el-icon-menu' }
        }]
    },
    {
        path: '/adminList',
        component: Layout,
        redirect: '/adminList',
        children: [{
            path: '',
            component: () => import('@/views/管理员账号.vue'),
            meta: { title: '管理员账号', icon: 'el-icon-menu' }
        }]
    },

    // {
    //     path: '/form',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Form',
    //             component: () => import('@/views/form/index'),
    //             meta: { title: 'Form', icon: 'form' }
    //         }
    //     ]
    // },

    // {
    //     path: '/nested',
    //     component: Layout,
    //     redirect: '/nested/menu1',
    //     name: 'Nested',
    //     meta: {
    //         title: 'Nested',
    //         icon: 'nested'
    //     },
    //     children: [
    //         {
    //             path: 'menu1',
    //             component: () => import('@/views/nested/menu1/index'), // Parent router-view
    //             name: 'Menu1',
    //             meta: { title: 'Menu1' },
    //             children: [
    //                 {
    //                     path: 'menu1-1',
    //                     component: () => import('@/views/nested/menu1/menu1-1'),
    //                     name: 'Menu1-1',
    //                     meta: { title: 'Menu1-1' }
    //                 },
    //                 {
    //                     path: 'menu1-2',
    //                     component: () => import('@/views/nested/menu1/menu1-2'),
    //                     name: 'Menu1-2',
    //                     meta: { title: 'Menu1-2' },
    //                     children: [
    //                         {
    //                             path: 'menu1-2-1',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //                             name: 'Menu1-2-1',
    //                             meta: { title: 'Menu1-2-1' }
    //                         },
    //                         {
    //                             path: 'menu1-2-2',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //                             name: 'Menu1-2-2',
    //                             meta: { title: 'Menu1-2-2' }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     path: 'menu1-3',
    //                     component: () => import('@/views/nested/menu1/menu1-3'),
    //                     name: 'Menu1-3',
    //                     meta: { title: 'Menu1-3' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'menu2',
    //             component: () => import('@/views/nested/menu2/index'),
    //             name: 'Menu2',
    //             meta: { title: 'menu2' }
    //         }
    //     ]
    // },

    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //             meta: { title: 'External Link', icon: 'link' }
    //         }
    //     ]
    // },

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
