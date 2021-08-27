// import nav from '@/views/nav.vue';
import nav from '../components/nav.vue';
import 个人资料 from './个人资料/个人资料.js'
const list=[
    ...个人资料,
    {
        path:"/my",
        components:{
            default:()=>import(/* webpackPrefetch: true  */'@/views/my/my.vue'),
            nav:nav
        },
        meta:{
            不能返回:true,
            需要登录:true,
            index:5
        }
    },
    {
        path:"/my/czjl",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/充值记录.vue'),
        meta:{
            需要登录:true
        }
    },
    {
        path:"/my/tghb",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/推广海报.vue'),
        meta:{
            需要登录:true
        }
    },
    {
        path:"/my/chongzhi",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/充值类型.vue'),
        meta:{
            需要登录:true
        }
    },
    {
        path:"/my/zxkf",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/在线客服.vue'),
    },
    {
        path:"/my/personage",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/个人资料.vue'),
        meta:{
            需要登录:true
        }
    },
    {
        path:"/my/zhmx",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/账号明细'),
        meta:{
            需要登录:true
        }
    },{
        path:"/my/tixian",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/提款.vue'),
        meta:{
            需要登录:true
        }
    },{
        path:"/my/viplist",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/vip列表.vue'),
    },{
        path:"/my/hm",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/合买列表.vue'),
    },{
        path:"/my/hmxq/:id",
        component:()=>import(/* webpackChunkName: "my" */'@/views/my/合买详情.vue'),
    },{
        path:"/my/feedback",
        component:()=>import('@/views/my/意见反馈.vue')
    },{
        path:"/my/addfeedback",
        component:()=>import('@/views/my/添加反馈.vue')
    }
]
export default list