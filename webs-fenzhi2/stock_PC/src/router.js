import Vue from 'vue'
// 引入路由
import Router from 'vue-router'

// 引入组件
import index from './pages/index/index.vue';
// import Home from './pages/Home/Home.vue'
// 注册路由(使用路由)
Vue.use(Router)

// 导出路由实例对象
export default new Router({
    // mode: "history",
    routes: [
        {
            path: '/login',  // 路径
            name: 'login', // 名字
            component: () => import('./pages/login/LOGIN.vue'),  //登陆路径对应的组件名
            meta:{
                title:"登录"
            }
        },
        {
            path: '/registered',  // 路径
            name: 'registered', // 名字
            component: () => import('./pages/registered/REGISTERED.vue')  // 引入注册中心组件
        },
        {
            path: '/',  // 路径
            name: 'index', // 名字
            component: index, //引入首页组件
            meta: {
                title: "首页"
            },
        },
        {
            path:"/pz/:type",
            name:"",
            component:()=>import('./pages/配资/配资.vue'),
            meta:{
                title:"配资"
            }
        },
        {
            path: '/interes',  // 路径
            name: 'interes', // 名字
            component: () => import('./pages/interest/interest.vue') //免息配资
        },
        {
            path: '/day',  // 路径
            name: 'day', // 名字
            component: () => import('./pages/day/day.vue') //按天配资
        },
        {
            path: '/week',  // 路径
            name: 'week', // 名字
            component: () => import('./pages/week/week.vue') //按周配资
        },
        {
            path: '/month',  // 路径
            name: 'month', // 名字
            component: () => import('./pages/month/month.vue') //按月配置
        },
        {
            path: '/software',  // 路径
            name: 'software', // 名字
            component: () => import('./pages/software/software.vue') //软件下载
        },
        {
            path: '/generalize',  // 路径
            name: 'generalize', // 名字   
            component: () => import('./pages/generalize/generalize.vue'), //推广赚钱
            meta: {
                需要登录: true
            },
        },
        {
            path: '/findPwd',  // 路径
            name: 'find', // 名字
            component: () => import('./pages/findPwd/findPwd.vue') //找回密码
        },
        {
            path: '*',  // 路径
            name: 'index', // 名字
            component: index, //没有找到的路由都跳到首页
        },

        // {
        //     path: '/service',  // 路径
        //     name: 'service', // 名字
        //     component: () => import('./pages/、。。。。.vue'), 
        // },

        {
            path: '/about',  // 路径
            name: 'about', // 名字
            component: () => import('./pages/about/about.vue'), //关于我们
            children: [
                {
                    path: '',
                    component: () => import('./pages/Home/Home.vue') //公司简介默认页面
                },
                {
                    path: 'home',
                    component: () => import('./pages/Home/Home.vue') //公司简介默认页面
                },
                {
                    path: 'fundSecurity',
                    component: () => import('./pages/fundSecurity/fundSecurity.vue') //我是资金安全页面
                },
                {
                    path: 'stockOperation',
                    component: () => import('./pages/stockOperation/stockOperation.vue') //操盘细则
                },
                {
                    path: 'HelpTitle',
                    component: () => import('./pages/HelpCenter/HELPCENTER.vue') //我是帮助中心问题的标题页面 也是默认页面
                },
                {
                    path: 'HelpCenter',
                    component: () => import('./pages/HelpCenter/helpDetail.vue') //我是帮助中心问题的详情页面
                },
                {
                    path: 'helpDetail',
                    component: () => import('./pages/HelpCenter/helpDetail.vue') //帮助中心明细 
                },
                {
                    path: 'contact',
                    component: () => import('./pages/Contact/Contact.vue') //联系我们
                },
                {
                    path: 'messageDetails',
                    component: () => import('./pages/message/messageTitle.vue') //资讯中心
                },
                {
                    path: 'messageDetails',
                    component: () => import('./pages/message/messageDetails.vue') //资讯中心
                },
                
                {
                    path: 'news',
                    component: () => import('./pages/new/newTitle.vue') //新闻标题页
                },
                {
                    path: 'new',
                    component: () => import('./pages/new/newDetails.vue') //新闻详情页
                },


            ]
        }
    ]

})