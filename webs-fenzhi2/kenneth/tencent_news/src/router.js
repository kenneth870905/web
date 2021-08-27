import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home/home.vue'

import { Toast } from 'vant';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        }, {
            path: '/login',
            name: '',
            component: () => import('./views/login/login.vue')
        }, {
            path: '/register',
            name: '',
            component: () => import('./views/注册/注册.vue')
        }, {
            path: "/video",
            // component:()=>import('./views/视频/视频.vue')
            component: resolve => {
                Toast.loading({mask: true,duration:0});
                require.ensure([], () => {
                    resolve(require('./views/视频/视频.vue'))
                    setTimeout(() => Toast.clear(), 300);
                })
            }
        }, {
            path: "/recommend",
            component: () => import('./views/推荐/推荐.vue')
        }, {
            path: "/my",
            component: () => import('./views/我的/我的.vue'),
            meta:{
                testTonken:true
            }
        }, 
        {
            path: '/new',
            component: () => import('./views/新闻详情/新闻详情.vue')
        }, {
            path: "/pl",
            component: () => import('./views/评论/评论.vue')
        }, {
            path: "/cbs",
            component: () => import('./views/出版社/出版社.vue')
        }, 
        {
            path: "/my/sc",
            component: () => {
                Toast.loading({mask: true,duration:0});
                return import('./views/我的/收藏/收藏.vue')
            },
            meta:{
                testTonken:true
            }
        },
        {
            path: "/my/personal",
            component: () => {
                Toast.loading({mask: true,duration:0});
                return import('./views/我的/个人资料/个人资料.vue')
            },
            meta:{
                testTonken:true
            }
        },
        {
            path: "/my/gz",
            component: () => {
                Toast.loading({mask: true,duration:0});
                return import('./views/我的/关注/关注.vue')
            }
        }, {
            path: "/my/xiaoxi",
            component: () =>{
                Toast.loading({mask: true,duration:0});
                return import('./views/我的/消息/消息.vue')
            } 
        },{
            path:"/fk",
            component:()=>{
                Toast.loading({mask: true,duration:0});
                return import('./views/反馈/反馈.vue')
            }
        },{
            path:"/pingdao",
            component:()=>{
                Toast.loading({mask: true,duration:0}) 
                return import('./views/全部频道/全部频道.vue')
            }
        },{
            path:"/newType",
            component:()=>{
                Toast.loading({mask: true,duration:0});
                return import('./views/新闻频道/新闻频道.vue')
            }
        },{
            path:"/test",
            component:()=>import('./views/test.vue')
        }
    ]
})
