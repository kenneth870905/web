import Vue from 'vue'
import Router from 'vue-router'
import index from './components/index.vue'
import tabbar from './components/tabbar/tabbar.vue'

// 注册路由(使用路由)
Vue.use(Router)

export default new Router({
    routes :[
        {
            path:'/',
            name:'index',
            component: index
        },
        {
            path:'/tabbar',
            name:'tabbar',
            component: tabbar
        },
        {
            path: '/exam01',
            name: 'exam01',
            component: () => import('./components/exam01.vue')// demo
          },
          {
            path: '/login',
            name: 'login',
            component: () => import('./pages/login/login.vue')// 登录
          },
    ]
})