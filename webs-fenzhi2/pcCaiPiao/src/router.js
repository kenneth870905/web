import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index/index.vue'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
        },
        {
          path:"/cp",
          component:()=>import('@/views/彩票/彩票.vue')
        },
        {
            path:"/contactus",
            component:()=>import('@/views/联系我们/联系我们.vue')
        },
        {
            path: '/phone',
            name: 'phone',
            component: () => import('./views/phone/phone.vue')//手机购彩
        },
        {
            path: '/discounts',
            name: 'discounts',
            component: () => import('./views/discounts/discounts.vue')//优惠活动   
        },
        {
            path: '/notice',
            name: 'notice',
            component: () => import('./views/notice/notice.vue')//开奖公告
        },
        {
            path: '/playRule',
            name: 'playRule',
            component: () => import('./views/playRule/playRule.vue')//玩法规则
        },
        {
            path: '/newGuidance',
            name: 'newGuidance',
            component: () => import('./views/newGuidance/newGuidance.vue')//新手指导
        },
        {
            path: '/newtext',
            name: 'newtext',
            component: () => import('./views/newtext/newtext.vue')//新闻详情
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/register/register.vue')//注册页面
        },
        {
            path: '/recharge',
            name: 'regiter',
            component: () => import('./views/交易目录/充值.vue')//充值
        },
        {
            path: '/drawings',
            name: 'drawings',
            component: () => import('./views/交易目录/取款.vue')//提款  
        },
        {
            path: '/BettingRecord',
            name: 'BettingRecord',
            meta: { dqym: "12" },
            component: () => import('./views/交易目录/投注记录.vue')//投注记录
        },
        {
            path: '/MemberCenter',
            name: 'MemberCenter',
            component: () => import('./views/交易目录/会员中心.vue')//会员中心
        },
        {
            path: '/helpCenter',
            name: 'helpCenter',
            meta: {},
            component: () => import('./views/helpCenter/helpCenter.vue')//帮助中心
        },
        {
            path: '/chess',
            name: 'chess',
            component: () => import('./views/chess/chess.vue')// 棋牌
          },
          {
            path: '/immortal',
            name: 'immortal',
            component: () => import('./views/immortal/immortal.vue')// 真人娱乐
          },
          {
            path: '/fish',
            name: 'fish',
            component: () => import('./views/fish/fish.vue')// 扑鱼
          },
          {
            path: '/sports',
            name: 'sports',
            component: () => import('./views/sports/sports.vue')// 体育
          },
          {
            path: '/electron',
            name: 'electron',
            component: () => import('./views/electron/electron.vue')// 电子游艺
          },
          // {
          //   path: '/street',
          //   name: 'street',
          //   component: () => import('./views/street/street.vue')// 街机游戏
          // },
        {
            path: '/buyLobby',
            name: 'buyLobby',
            meta: { 隐藏头部: true },
            component: () => import('./views/buyLobby/buyLobby.vue'),//购彩大厅
            children: [
                {
                    path: '',
                    component: () => import('./views/投注页面/Home.vue'),
                    meta: { 隐藏头部: true },
                },
                {
                    path: '/sanfen',
                    name: 'sanfen',
                    component: () => import('./views/投注页面/三分彩.vue'),
                    meta: { 隐藏头部: true },
                },
             
                {
                    path: '/shishicai',
                    name: 'shishicai',
                    component: () => import('./views/投注页面/时时彩.vue'),
                    meta: { 隐藏头部: true },
                },
                {
                  path: '/PKshi',
                  name: 'PKshi',
                  component: () => import('./views/投注页面/PK10.vue'),
                  meta: { 隐藏头部: true },
              },
              {
                path: '/feiting',
                name: 'feiting',
                component: () => import('./views/投注页面/飞艇.vue'),
                meta: { 隐藏头部: true },
              },
              {
                path: '/liuhecai',
                name: 'liuhecai',
                component: () => import('./views/投注页面/六合彩.vue'),
                meta: { 隐藏头部: true },
              },
              {
                path: '/kauisan',
                name: 'kauisan',
                component: () => import('./views/投注页面/快3.vue'),
                meta: { 隐藏头部: true },
              },
              {
                path: '/PCdd',
                name: 'PCdd',
                component: () => import('./views/投注页面/PC蛋蛋.vue'),
                meta: { 隐藏头部: true },
              },
              {
                path: '/llxuanwu',
                name: 'llxuanwu',
                component: () => import('./views/投注页面/11选5.vue'),
                meta: { 隐藏头部: true },
              },
              {
                path: '/dipingcai',
                name: 'dipingcai',
                component: () => import('./views/投注页面/低频彩.vue'),
                meta: { 隐藏头部: true },
              },
            
            ],
        },
    ]
})
