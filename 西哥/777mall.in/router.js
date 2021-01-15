import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerBeforeEach:(to, from, next) => {
        // 每次导航触发前都会执行这个，比所有守卫都先执行
		console.log('routerBeforeEach')
        next();
    },
	routes: [
		...ROUTES
	]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	console.log(123)
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log('跳转结束')
})

export {
	router,
	RouterMount
}
