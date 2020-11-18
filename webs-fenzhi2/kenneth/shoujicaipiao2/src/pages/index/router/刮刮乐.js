const list=[
    {
        path:"/guaguale/buy",
        component:()=>import(/* webpackChunkName: "guaguale" */'@/views/刮刮乐/购买刮刮乐.vue'),
        children:[
            {
                path:"/guaguale/gz/:type",
                component:()=>import(/* webpackChunkName: "guaguale" */'@/views/刮刮乐/玩法规则.vue'),
            },{
                path:"/guaguale/open/:type/:id",
                component:()=>import(/* webpackChunkName: "guaguale" */'@/views/刮刮乐/刮奖')
            }
        ]
    },
    {
        path:"/guaguale/orders",
        component:()=>import(/* webpackChunkName: "guaguale" */'@/views/刮刮乐/刮刮乐订单.vue'),
        children:[
            {
                path:"/guaguale/open1/:type/:id",
                component:()=>import(/* webpackChunkName: "guaguale" */'@/views/刮刮乐/刮奖')
            }
        ]
    }
]
export default list