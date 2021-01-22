import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path:"/login",
        name:"",
        component:()=>import('@/views/login.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children:[
            {
                path:"",
                component:()=>import('@/views/充值审核.vue'),
                meta:{
                    menuPath:"/",
                    //面包屑
                    breadcrumb:[
                        {name:"充值审核"},
                        // {name:"充值审核",path:"/userList"},
                        // {name:"用户管理测试",path:"/userList"},
                        // {name:"用户管理测试2"},
                    ]
                }
            },
            {
                path:"userList",
                component:()=>import('@/views/用户/userList.vue'),
                meta:{
                    menuPath:"/userList",
                    breadcrumb:[
                        {name:"用户管理"}
                    ]
                }
            },
            {
                path:"user",
                component:()=>import('@/views/用户/用户详情.vue'),
                meta:{
                    menuPath:"/userList",
                    breadcrumb:[
                        {name:"用户管理",path:'/userList'},
                        {name:"用户详情"}
                    ]
                }
            },
            {
                path:"deviceType",
                component:()=>import('@/views/设备类型.vue'),
                meta:{
                    menuPath:"/deviceType",
                    breadcrumb:[
                        {name:"设备类型"}
                    ]
                }
            },{
                path:'DepositCard',
                component:()=>import('@/views/入款卡号.vue'),
                meta:{
                    menuPath:'/DepositCard',
                    breadcrumb:[
                        {name:"入款卡号管理"}
                    ]
                }
            }
        ]
    },
]


const router = new VueRouter({
    routes
})



export default router
