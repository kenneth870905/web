import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import common from './modules/common.js'
import center from './modules/center.js'

const routes = [
    ...common,
    ...center
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: Home
    // }
]

const router = new VueRouter({
    routes
})

export default router
