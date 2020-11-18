
var list=[
    {
        path:"/wyxk",
        component:()=>import(/* webpackChunkName: "chongzhi" */'@/views/充值转账/网银选卡.vue')
    },{
        path:"/dzxk",
        component:()=>import(/* webpackChunkName: "chongzhi" */'@/views/充值转账/电子选卡.vue')
    },{
        path:"/zxxk",
        component:()=>import(/* webpackChunkName: "chongzhi" */'@/views/充值转账/在线选卡.vue')
    }
    
]

export default list;