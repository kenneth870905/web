import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'Home',
      component: ()=>import('@/views/home.vue')
    },
    {
        path:"/kitten",
        name:"",
        component:()=>import('@/views/幼猫/kitten.vue')
    },
    {
        path:"/kittenDetails",
        name:"",
        component:()=>import('@/views/幼猫/kittenDetails.vue')
    },
    {
        path:"/CatCafe",
        name:"",
        component:()=>import('@/views/CatCafe.vue')
    },{
        path:"/SafeGuard",
        name:"",
        component:()=>import('@/views/SafeGuard.vue')
    },{
        path:"/shop",
        name:"",
        component:()=>import('@/views/shop.vue')
    },{
        path:"/shopDetails",
        name:"",
        component:()=>import('@/views/shopDetails.vue')
    },{
        path:"/about",
        name:"",
        component:()=>import('@/views/about.vue')
    },{
        path:"/news",
        name:"",
        component:()=>import('@/views/news.vue')
    },{
        path:"/newsDetails",
        name:"",
        component:()=>import('@/views/newsDetails.vue')
    }
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
]

const router = new VueRouter({
    routes
})

export default router
