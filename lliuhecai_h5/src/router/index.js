import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        component: Home
    },{
        path: '/DrawHistory',
        component: ()=>import('@/views/开奖公告.vue')
    },{
        path: '/video',
        component: ()=>import('@/views/开奖视频.vue')
    },{
        path: '/faq',
        component: ()=>import('@/views/FAQ.vue')
    },{
        path: '/about',
        component: ()=>import('@/views/关于我们.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
