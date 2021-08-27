import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import axios from "axios";
Vue.prototype.axios = axios;

import "swiper/dist/css/swiper.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

const 守卫 = (to, next) => {
  let userinfo = store.state.user.userinfo;
  if (to.meta.需要登录) {
    if (!userinfo.UserId) {
      router.push("/");
    } else {
      try {
        next();
      } catch (error) {}
    }
  } else {
    try {
      next();
    } catch (error) {}
  }
};

// 前置守卫
router.beforeEach((to, from, next) => {
  守卫(to, next);
});
//解析守卫
router.beforeResolve((to, from, next) => {
  守卫(to, next);
});
//后置守卫
router.afterEach((to, from) => {
  守卫(to);
});
