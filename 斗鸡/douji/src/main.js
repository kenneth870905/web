import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/lib/theme-chalk/display.css';


const app = createApp(App)
app.use(ElementPlus)

app.use(store).use(router).mount('#app')


