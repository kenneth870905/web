import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import tabber from '@/components/tabber.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // component: Home,
        components: {
            default: Home,
            tabber: tabber,
        }
    },{
        path:"/search",
        component:()=>import('@/views/search.vue')
    },
    {
        path:"/products",
        component:()=>import('@/views/商品/products.vue')
    },
    {
        path:"/typeList",
        // component:()=>import('@/views/typeList.vue'),
        components:{
            default:()=>import('@/views/typeList.vue'),
            tabber: tabber
        }
    },
    {
        path:"/my",
        // component:()=>import('@/views/typeList.vue'),
        components:{
            default:()=>import('@/views/my/我的.vue'),
            tabber: tabber
        }
    },
    {
        path:"/productList",
        component:()=>import('@/views/productList.vue')
    },
    {
        path:"/login",
        component:()=>import('@/views/login.vue')
    },
    {
        path:"/register",
        component:()=>import('@/views/register.vue')
    },
    {
        path:"/cart",
        components:{
            default:()=>import('@/views/购物车.vue'),
            // tabber:tabber
        }
    },
    {
        path:"/Checkout",
        component:()=>import('@/views/订单确认.vue')
    },{
        path:"/addrList",
        component:()=>import('@/views/my/addrList.vue')
    },{
        path:"/address",
        component:()=>import('@/views/my/address.vue')
    },{
        path:"/orderList",
        component:()=>import('@/views/my/orderList.vue')
    },
    {
        path:"/review",
        component:()=>import('@/views/my/review.vue')
    },
    {
        path:"/userInfo",
        component:()=>import('@/views/my/个人资料.vue')
    },
    {
        path:"/setCenter",
        component:()=>import('@/views/my/设置中心.vue')
    },
    {
        path:"/addPj",
        component:()=>import('@/views/评价/发表评价.vue')
    },
    {
        path:"/goodsComment",
        component:()=>import('@/views/评价/商品评价列表.vue')
    },
    {
        path:"/favorite",
        component:()=>import('@/views/my/收藏夹.vue')
    },
    {
        path:"/footprint",
        component:()=>import('@/views/my/足迹.vue')
    },
    {
        path:"/kefu",
        // component:()=>import('@/views/客服.vue')
        components:{
            default:()=>import('@/views/客服.vue'),
            tabber: tabber
        }
    },
]

const router = new VueRouter({
    routes
})

export default router
