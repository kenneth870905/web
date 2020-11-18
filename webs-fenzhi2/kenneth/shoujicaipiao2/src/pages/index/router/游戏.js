import store from '@/store'

var list = [
     {
        path: "/qbcz",
        component: () => import('@/views/游戏大厅/全部彩种')
    },
    {
        path: "/buyLottery",
        component: (resolve) =>{
            store.commit('加载中', true);
            // import('@/views/彩票投注/buyLottery.vue')
            resolve(require('@/views/彩票投注/buyLottery.vue'))
            setTimeout(() => {
                store.commit('加载中', false);                
            }, 300);
        } 
    },
    {
        path: '/cpiframe',
        component: () => import('@/views/彩票投注/iframe.vue')
    },
    {
        path:"/shopping",
        component:() => import('@/views/彩票投注/彩票购物车.vue')
    }
]

export default list;