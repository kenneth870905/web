import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ()=>import('@/views/Home.vue'),
        children:[
            {
                path:"/",redirect:"/dingdanList"
            },
            {
                path:"/userList",
                component:()=>import('@/views/user/userList.vue'),
                meta:{
                    title:"用户管理"
                }
            }
            ,{
                path:"/yuanquList",
                component:()=>import('@/views/园区/yuanquList.vue'),
                meta:{
                    title:"园区管理"
                }
            },
            {
                path:"/danyuanList",
                component:()=>import('@/views/单元/danyuanList.vue'),
                meta:{
                    title:"单元管理"
                }
            },
            {
                path:"/danyuan",
                component:()=>import('@/views/单元/danyuan.vue'),
                meta:{
                    title:"单元详情"
                }
            }
            ,
            {
                path:"/dingdanList",
                component:()=>import('@/views/订单/dingdanList.vue'),
                meta:{
                    title:'订单管理'
                }
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
