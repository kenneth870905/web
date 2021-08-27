export default [
    {
        path: '/',
        name: '',
        component: () => import('@/views/center.vue'),
        children:[
            {path: '/', redirect: 'home'},
            {
                path:"home",
                name:"home",
                component:()=>import('@/views/modules/home/index.vue')
            },
            {
                path:"asset/deposit",
                name:"deposit",
                component:()=>import('@/views/modules/asset/deposit.vue')
            },
            {
                path:"asset/drawMoney",
                name:"drawMoney",
                component:()=>import('@/views/modules/asset/drawMoney.vue')
            },
            {
                path:"asset/transform",
                name:"transform",
                component:()=>import('@/views/modules/asset/transform.vue')
            }
        ]
    }
]