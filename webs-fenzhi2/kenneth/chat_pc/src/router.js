import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path:"/",
            component:()=>import('@/views/聊天首页.vue'),
            children:[
                {
                    path:'',
                    component:()=>import('@/views/群聊入口.vue')
                },
                {
                    path:'/chat/:id',
                    component:()=>import('@/views/群聊入口.vue')
                },
                {
                    path:'/privateChat',
                    component:()=>import('@/views/私聊/私聊.vue')
                },
                {
                    path:'/personal',
                    component:()=>import('@/views/个人资料/个人资料.vue'),
                    meta:{
                        login:true
                    }
                }
            ]
        }
    ]
})
