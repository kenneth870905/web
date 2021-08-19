import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ()=>import('@/views/Home.vue'),
        children:[
            {
                path:"/userList",
                component:()=>import('@/views/user/userList.vue')
            }
            ,{
                path:"/yuanquList",
                component:()=>import('@/views/园区/yuanquList.vue')
            },
            {
                path:"/danyuanList",
                component:()=>import('@/views/单元/danyuanList.vue')
            },
            {
                path:"/danyuan",
                component:()=>import('@/views/单元/danyuan.vue')
            }
            ,
            {
                path:"/dingdanList",
                component:()=>import('@/views/订单/dingdanList.vue')
            }
        ]
    },
    {
        path:"/login",
        component:()=>import('@/views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
