import Vue from 'vue'
import Router from 'vue-router'
import home from './views/主页/主页.vue'
import 底部导航 from './components/底部导航/底部导航.vue'

Vue.use(Router)

export default new Router({

    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'electron',
            meta: { 隐藏头部: false },
            components:{
                default:home,
                底部:底部导航
            },
            // children: [
            //     {
            //         path: '/guidance',
            //         component: () => import('./views/首页/新手指导.vue'),
            //         meta: { 隐藏头部: true },
            //     },
            // ]
        },

        {
            path: '/documentary',
            name: 'documentary',
            components:{
                default: () => import('./views/跟单/跟单.vue'),
                底部:底部导航
            },
         
        },

        {
            path: '/open',
            name: 'open',
            components:{
                default: () => import('./views/开奖/开奖.vue'),
                底部:底部导航
            },
          
        },


        {
            path:'/buy',
            components:{ 
                default:()=>import('./views/购彩/购彩.vue'),
                底部:底部导航
            }
        },
        
        {
            path: '/my',
            name: 'my',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/我的/我的.vue'),
                底部:底部导航
            }
        },
        {
            path: '/register', 
            name: 'register',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/注册/注册.vue'),
                // 底部:底部导航
            }
        },

        {
            path:"/test",
            component:()=>import('./views/test.vue')
        },
        {
            path:"*",
            component:()=>import('./views/error.vue')
        }

    
    ]
})
