import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: () =>import( /* webpackChunkName: "about" */ "./views/Home.vue")
        },
        {
            path: "/sports", //体育彩票
            component: () => import( /* webpackChunkName: "about" */ "./views/sports.vue")
        },
        {
            path: "/visual", //真人荷官
            component: () => import( /* webpackChunkName: "about" */ "./views/visual.vue")
        },
        {
            path: "/sxjs/:type/:gid",
            component: () => import( /* webpackChunkName: "about" */ "./views/视讯简介/视讯简介.vue")
        },
        {
            path: "/game", //娱乐场 电子游戏
            component: () => import( /* webpackChunkName: "about" */ "./views/game.vue")
        },
        {
            path: "/lottery", //彩票
            component: () => import( /* webpackChunkName: "about" */ "./views/lottery.vue")
        },
        {
            path: "/activity", //优惠活动
            component: () => import( /* webpackChunkName: "about" */ "./views/activity.vue")
        },
        {
            path: "", //备用网址
            component: () => import( /* webpackChunkName: "about" */ "./views/router1.vue"),
            children: [
                {
                    path: "/bywz",
                    component: () => import( /* webpackChunkName: "about" */ "./views/备用网址.vue")
                },
                {
                    path: "/agent",
                    component: () => import( /* webpackChunkName: "about" */ "./views/agent.vue")
                },
                {
                    path: "/register", //注册
                    component: () => import( /* webpackChunkName: "about" */ "./views/register.vue")
                },
                {
                    path: "/ContactUs",
                    component: () => import( /* webpackChunkName: "about" */ "./views/联系我们.vue")
                },
                {
                    path: "/AboutUs",
                    component: () => import( /* webpackChunkName: "about" */ "./views/关于我们.vue")
                },
                {
                    path: "/AccessHelp",
                    component: () => import( /* webpackChunkName: "about" */ "./views/存款帮助.vue")
                },
                {
                    path: "/guizi",
                    component: () => import( /* webpackChunkName: "about" */ "./views/规则条款.vue")
                },
                {
                    path: "/caipiaozeren",
                    component: () => import( /* webpackChunkName: "about" */ "./views/彩票责任.vue")
                },
                {
                    path: "/cjwt",
                    component: () => import( /* webpackChunkName: "about" */ "./views/常见问题.vue")
                }
            ]
        },
        {
            path: "/phone",
            component: () => import(/* webpackChunkName: "about" */ "./views/phone.vue")
        },
        {
            // type 请参考 iframe.vue 参数
            path: "/iframe/:type",
            meta: {
                需要登录: true
            },
            component: () => import(/* webpackChunkName: "about" */ "@/views/iframe.vue")
        }
    ]
});
