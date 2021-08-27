import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app=createApp(App);



import axios from 'axios'
// axios.defaults.baseURL= process.env.NODE_ENV =='development' ? '/apis' : ''
// axios.defaults.baseURL= process.env.NODE_ENV =='development' ? 'http://00853.app' : ''
axios.defaults.baseURL= process.env.NODE_ENV =='development' ? 'http://127.0.0.1/php/aomenlhc' : ''

// http://172.247.253.212:9527/api.php?action=new
// 设置全局变量
app.config.globalProperties.$axios=axios;

app.use(store).use(router).mount('#app')
