import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path:'/login',
        component:()=>import('@/views/login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
