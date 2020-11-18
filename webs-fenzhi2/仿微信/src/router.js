import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'

Vue.use(Router)

export default new Router({
  
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            components:{
                default:login,
            },
           
        },
        {
            path: '/home',
            name: 'home',
            components:{
            default: () => import('./views/home.vue'),//购彩大厅
            },
        
           
        },




    
    ]
})
