import Vue from 'vue'
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:"/",
            name:"index",
            component: () => import('./views/index.vue'),
            meta: {
                keepAlive: true 
              }
        },
        {
            path:"/ranking",
            name:"ranking",
            component: () => import('./views/ranking.vue'),
            meta: {
                keepAlive: true 
              }
        },
        {
            path:"/category",
            name:"category",
            component: () => import('./views/category.vue'),
            meta: {
                keepAlive: true 
              }
        },
        {
            path:"/CategoryDetails",
            name:"CategoryDetails",
            component: () => import('./views/CategoryDetails.vue'),
            meta: {
                keepAlive: true 
              }
        },
        {
            path:"/bookshelf",
            name:"bookshelf",
            component: () => import('./views/bookshelf.vue'),
            meta: {
                keepAlive: true 
              }
        },
        {
            path:"/details",
            name:"details",
            component: () => import('./views/details.vue')
        },
        {
            path:"/search",
            name:"search",
            component: () => import('./views/search.vue'),
        },
        {
            path:"/login",
            name:"login",
            component: () => import('./views/login.vue')
        },
        {
            path:"/comic",
            name:"comic",
            component: () => import('./views/comic.vue')
        },
        {
            path:"/MoreCatalog",
            name:"MoreCatalog",
            component: () => import('./views/MoreCatalog.vue')
        },
        {
            path:"/hot",
            name:"hot",
            component: () => import('./views/hot.vue')
        },
        {
            path:"/demo",
            name:"demo",
            component: () => import('./views/demo.vue')
        },
        
    ]
})