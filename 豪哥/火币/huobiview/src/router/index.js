import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },{
        path:"/404",
        component:()=>import('@/views/404.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
