import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/home/home.vue')
    },{
        path:"/sports",
        component: () => import('@/views/sports/sports.vue')
    },
    {
        path:"/athletics",
        component: () => import('@/views/竞技/竞技.vue')
    },
    {
        path:"/realbet",
        component: () => import('@/views/真人/真人.vue')
    },
    {
        path:"/lottery",
        component: () => import('@/views/lottery/lottery.vue')
    }
    
]

const router = new VueRouter({
    routes
})

export default router
