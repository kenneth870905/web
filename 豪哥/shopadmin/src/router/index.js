import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/index'},
	{
		path:"/login",
		name:"",
		component:()=>import('@/views/login.vue')
	},
	{
		path: '/index',
		name: 'index',
		component: ()=>import('@/views/index.vue'),
		children:[
			{path: '/', redirect: 'orderList'},
			//商品
			{
				path:"productList",
				name:"",
				component:()=>import('@/views/商品/商品列表.vue'),
			},
			{
				path:"product",
				name:"",
				component:()=>import('@/views/商品/商品详情.vue')
			},
			{
				path:"productCategory",
				name:"",
				component:()=>import('@/views/商品/商品分类.vue')
			},
			{
				path:"miaosha",
				name:"",
				component:()=>import('@/views/商品/秒杀商品.vue')
			},
			{
				path:"miaoshaXQ",
				name:"",
				component:()=>import('@/views/商品/秒杀详情.vue')
			},
			// 会员
			{
				path:"userList",
				name:"",
				component:()=>import('@/views/会员/会员列表.vue')
			},
			{
				path:"user",
				name:"",
				component:()=>import('@/views/会员/会员详情.vue')
			},
			//订单
			{
				path:"orderList",
				name:"",
				component:()=>import('@/views/订单/订单列表.vue')
			},
			{
				path:"orderSp",
				name:"",
				component:()=>import('@/views/订单/普通商品.vue')
			},
			{
				path:"orderMsSp",
				name:"",
				component:()=>import('@/views/订单/秒杀商品.vue')
			},
			//基础信息
			{
				path:"basicInfo",
				name:"",
				component:()=>import('@/views/基础信息.vue')
			},
			//操作记录
			{
				path:"operating",
				name:"",
				component:()=>import('@/views/操作记录.vue')
			},
			//操作记录
			{
				path:"lunbo",
				name:"",
				component:()=>import('@/views/首页轮播.vue')
			},
			//意见反馈
			{
				path:"fankui",
				name:"",
				component:()=>import('@/views/反馈列表.vue')
			},
			//管理员
			{
				path:"adminList",
				name:"",
				component:()=>import('@/views/管理员/管理员列表.vue')
			},
			{
				path:"admin",
				name:"",
				component:()=>import('@/views/管理员/管理员详情.vue')
			},
			//无权限
			{
				path:"wuquan",
				name:"",
				component:()=>import('@/views/无权访问.vue')
			},
			//文章
			{
				path:"articleCategory",
				name:"",
				component:()=>import('@/views/文章/文章类型.vue')
			},
			{
				path:"article",
				name:"",
				component:()=>import('@/views/文章/文章.vue')
			},
			{
				path:"articleDetails",
				name:"",
				component:()=>import('@/views/文章/文章详情.vue')
			},
			// 班级
			{
				path:"classList",
				name:"",
				component:()=>import('@/views/班级设置.vue')
			},
			// 学校
			{
				path:"school",
				component:()=>import('@/views/学校设置.vue')
			}
		]
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	routes
})

export default router
