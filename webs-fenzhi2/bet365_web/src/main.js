import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
import store from './store'
Vue.prototype.$axios = axios;


import { Swipe, SwipeItem, Tabbar, TabbarItem, NoticeBar, Field, NavBar, Tab, Tabs, Row, Col, Button, Grid, GridItem, Toast, Checkbox, CheckboxGroup, Collapse, CollapseItem, Cell, CellGroup, Tag, Sticky, DropdownMenu, DropdownItem, List, Divider ,Popup,DatetimePicker} from 'vant';
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Cell).use(CellGroup);
Vue.use(Grid).use(GridItem);
Vue.use(Tab).use(Tabs);
Vue.use(Row).use(Col);
Vue.use(NoticeBar);
Vue.use(NavBar);
Vue.use(Button);
Vue.use(Sticky);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Tag);
Vue.use(List);
Vue.use(Divider);
Vue.use(Popup);
Vue.use(DatetimePicker);

import { Search } from 'vant';
Vue.use(Search);
import { PasswordInput, NumberKeyboard } from 'vant';
Vue.use(NumberKeyboard).use(PasswordInput);
import { Step, Steps } from 'vant';

import { CountDown } from 'vant';
Vue.use(CountDown);
import { Icon } from 'vant';
Vue.use(Icon);

Vue.use(Step).use(Steps);
import { Switch } from 'vant';
import { Image } from 'vant';
import { SwipeCell } from 'vant';
import { Lazyload } from 'vant';
import { Skeleton } from 'vant';
Vue.use(Skeleton);
Vue.use(SwipeCell);
import { Picker } from 'vant';
Vue.use(Picker);
Vue.use(Image);

Vue.use(Switch);

Vue.config.productionTip = false

var Options = {
  loading: 'image/loading.gif',
  error: 'image/imgloading2.jpg'
}
Vue.use(Lazyload, Options)
//复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

//vue-blu ui库
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import { timeout } from 'q'
Vue.use(VueBlu)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

//路由守卫
router.beforeEach((to, from, next) => {
  var userInfo = store.state.userInfo.UserId;
  if (to.meta.需要登录) {
    if (!userInfo) {
      Toast("请先登录")
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
});
