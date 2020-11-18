// import nav from '@/views/nav.vue';

var list=[
    {
        path:"/yeb/yeb",
        component:()=>import('@/views/余额宝/余额宝.vue')
    },{
        path:"/yeb/zc",
        component:()=>import('@/views/余额宝/余额宝转出.vue')
    },{
        path:"/yeb/bdk",
        component:()=>import('@/views/余额宝/绑定银行卡.vue')
    },{
        path:"/yeb/zr",
        component:()=>import('@/views/余额宝/余额宝转入.vue')
    },{
        path:"/yeb/szmx",
        component:()=>import('@/views/余额宝/余额宝明细.vue')
    },
]

export default list;