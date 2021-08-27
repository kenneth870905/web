import Vue from 'vue'
import Router from 'vue-router'
import home from './views/首页/home.vue'
import minhom from './components/首页默认展示组件/首页默认展示组件.vue'
import 底部导航 from './components/底部导航/底部导航.vue'
Vue.use(Router)
export default new Router({

    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'electron',
            meta: { 
                keepAlive:true
            },
            components:{
                default:home,
                底部:底部导航,
            },
            children: [
                {
                    path: '',
                    components:{
                        default:minhom,
                        底部:底部导航,
                    },
                },
                {
                    path: '/ship',
                    name: 'ship',
                    components:{
                        default: () => import('./components/视频/视频.vue'),
                        底部:底部导航
                    },
                },
                {
                    path: '/manhua',
                    name: 'manhua',
                    components:{
                        default: () => import('./components/漫画/漫画.vue'),
                        底部:底部导航
                    },
                },
                {
                    path: '/xiaoshuo',
                    name: 'xiaoshuo',
                    components:{
                        default: () => import('./components/小说/小说.vue'),
                        底部:底部导航
                    },
                 
                },
                {
                    path: '/youshenXS',
                    name: 'youshenXS',
                    components:{
                        default: () => import('./components/有声小说/有声小说.vue'),
                        底部:底部导航
                    },
                 
                },
                {
                    path: '/dyzz',
                    name: 'dyzz',
                    components:{
                        default: () => import('./components/电影种子/电影种子.vue'),
                        底部:底部导航
                    },
                 
                },
                {
                    path: '/dslr',
                    name: 'dslr',
                    components:{
                        default: () => import('./components/低俗内容/低俗内容.vue'),
                        底部:底部导航
                    },
                 
                },
                
            ]
        },

        {
            path: '/NavClass',
            name: 'NavClass',
            components:{
                default: () => import('./views/导航分类/导航分类.vue'),
                底部:底部导航
            },
         
        },
// ==========================================小说====================================================
        { 
            path: '/fiction',
            name: 'fiction',
            components:{
                default: () => import('./views/小说/小说.vue'),
                底部:底部导航
            },
         
        },
        {
            path: '/fictionDetails', 
            name: 'fictionDetails',
            components:{
                default: () => import('./views/小说/小说详情.vue'),
                // 底部:底部导航
            },
         
        },
        {
            path: '/fictionContent', 
            name: 'fictionContent',
            components:{
                default: () => import('./views/小说/小说内容.vue'),
            },
         
        },
//===================================有声小说==========================================
        {
            path: '/videoFiction', 
            name: 'videoFiction',
            components:{
                default: () => import('./views/有声小说/有声小说 暂时用不上.vue'), 
            },
        },
        {
            path: '/videoFictionDetails', 
            name: 'videoFictionDetails',
            components:{
                default: () => import('./views/有声小说/有声小说详情页.vue'), 
            },
         
        },
        {
            path: '/videoFictionXQ', 
            name: 'videoFictionXQ',
            components:{
                default: () => import('./views/有声小说/有声小说内容页.vue'), 
            },
         
        },

//=======================================================视频=============================================
        {
            path: '/Videl',
            name: 'Videl',
            components:{
                default: () => import('./views/视频/视频.vue'),
                底部:底部导航
            },
        },
        {
            path: '/videoContent',
            name: 'videoContent',
            components:{
                default: () => import('./views/视频/视频详情页.vue'),
                // 底部:底部导航
            },
         },
      
// ===========================================漫画============================================
        {
            path: '/cartoon',  
            name: 'cartoon',
            components:{
                default: () => import('./views/漫画/漫画.vue'),
                底部:底部导航
            },
        },
        {
            path: '/cartoonDetails',
            name: 'cartoonDetails',
            components:{
                default: () => import('./views/漫画/漫画详情页.vue'),
                // 底部:底部导航
            },
        },
      
        {
            path: '/cartoonContent',
            name: 'cartoonContent',
            components:{
                default: () => import('./views/漫画/漫画内容.vue'),
           
            },
         
        },
//======================电影种子====================
{
    path: '/filmSeed',
    name: 'filmSeed',
    components:{
        default: () => import('./components/电影种子/电影种子详情页.vue'),
    },
 
},
//======================低俗内容====================
{
    path: '/vulgar',
    name: 'vulgar',
    components:{
        default: () => import('./components/低俗内容/低俗内容详情页.vue'),
   
    },
 
},
//==============================其他=========================================
        {
            path: '/generalize',
            name: 'generalize',
            components:{
                default: () => import('./views/发现/发现.vue'),
                底部:底部导航
            },
         
        },
        {
            path: '/generalizeDetails',
            name: 'generalizeDetails',
            components:{
                default: () => import('./views/发现/专题详情.vue'),
                底部:底部导航
            },
  
        },

        {
            path: '/vip',
            name: 'vip',
            components:{
                default: () => import('./views/vip/vip.vue'),
                底部:底部导航
            },
          
        },
          
        {
            path: '/historyjl', 
            name:  'historyjl',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/播放记录.vue'),
                底部:底部导航
            }
        },
        {
            path: '/jurisdiction', 
            name:  'jurisdiction',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/任务列表.vue'),
                底部:底部导航
            }
        },
     

        {
            path: '/CreditsLog', 
            name:  'CreditsLog',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/兑换记录.vue'),
                底部:底部导航
            }
        },
        {
            path: '/NewGuidelines', 
            name:  'NewGuidelines',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/新手指引.vue'),
                底部:底部导航
            }
        },
        {
            path: '/Recharge', 
            name:  'Recharge',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/元宝充值.vue'),
                底部:底部导航
            }
        },

        {
            path: '/announcement', 
            name:  'announcement',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/公告/公告.vue'),
                底部:底部导航 
            }
        },
        {
            path: '/discounts', 
            name:  'discounts',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/优惠/优惠.vue'),
                底部:底部导航 
            }
        },


        {
            path: '/login', 
            name: 'login',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/登录/登录.vue'),
            }
        },

        {
            path: '/register', 
            name: 'register',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/注册/注册.vue'),
            }
        },


        {
            path:"*",
            component:()=>import('./views/error.vue')
        },


//  ======================================我的================================
        
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
            path: '/SignIn', 
            name:  'SignIn',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/我的/每天签到.vue'),
                底部:底部导航
            }
        },
        {
            path: '/changeDatum', 
            name:  'changeDatum',
            meta: { 隐藏头部: true },
            components:{
                default:() => import('./views/我的/修改资料.vue'),
                底部:底部导航
            }
        },
        {
            path: '/collection', 
            name:  'collection',
            meta: { 隐藏头部: true },
            components:{
            default:() => import('./views/我的/我的收藏.vue'),
                底部:底部导航
            }
        },








      
    
    ]
})
