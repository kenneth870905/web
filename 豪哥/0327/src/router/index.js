import { createWebHashHistory , createRouter } from 'vue-router'

import index from "@/views/index.vue"

import store from "@/vuex/index.js";


const list = [
    {
        path:"/",
        component:index,
        name:"用户管理",
        children:[
            {
                path: '',
                component: () => import('../views/user/userList.vue'),
                name: '用户列表',
                meta: { 
                    
                }
            }
        ]

    },
    {
        path:"/contentList",
        component:index,
        name:"内容管理",
        children:[
            {
                path: '',
                component: () => import('../views/content/contentList.vue'),
                name: '内容列表',
                meta: { 
                    
                }
            },
        ]
    },
    {
        path:"/changePassword",
        component:index,
        name:"密码设置",
        children:[
            {
                path: '',
                component: () => import('@/views/changePassword.vue'),
                name: '密码设置',
            },
        ]
    },

    {
        path:"/login",
        component:()=>import('../views/login.vue')
    }
]

let router = createRouter({
    history:createWebHashHistory(),
    routes:list
})

router.beforeEach((to, from) => {
    let token = store.state.user.userInfo.token
    if(to.path!=='/login'){
        if(token){
            return true
        }else{
            router.push('/login')
        }
    }else{
        return true
    }
})

export default  router