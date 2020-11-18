const list=[
    
    {
        path:"/agent",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/推广代理.vue'),
    },
    {
        path:"/agent/agencyExplain",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/代理说明.vue'),
        meta:{
            title:"推广代理"
        }
    },
    {
        path:"/agent/agencyCommission",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/代理佣金.vue'),
        meta:{
            title:"代理佣金"
        }
    },
    {
        path:"/agent/generalizeAdmin",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/推广管理.vue'),
        meta:{
            title:"推广管理"
        }
    },
    {
        path:"/agent/betDetail",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/投注明细.vue'),
        meta:{
            title:"投注明细"
        }
    },
    {
        path:"/agent/detail",
        component:()=>import(/* webpackChunkName: "daili" */'@/views/代理/交易明细.vue'),
        meta:{
            title:"交易明细"
        }
    },
]

export default list
