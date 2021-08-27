const list=[
    {
        path:"/home/qiandao",
        component:()=>import('@/views/home/签到.vue'),
        meta:{
            title:"VIP签到",
            // 不显示顶部:true
        }
    },
    {
        path:"/home/discounts", //优惠页面
            // 不显示顶部:true
        component:()=>import('@/views/home/discounts.vue'),
        meta:{
            title:"活动优惠",
            不能返回: true,
        }
    }
]
export default list