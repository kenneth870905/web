import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// axios.defaults.baseURL= process.env.NODE_ENV =='development' ? '/apis' : ''

// axios.defaults.baseURL= process.env.NODE_ENV =='development' ? 'http://172.247.253.212:9527' : ''
// axios.defaults.baseURL= process.env.NODE_ENV =='development' ? 'http://00853.app' : ''
axios.defaults.baseURL= process.env.NODE_ENV =='development' ? 'http://127.0.0.1/php/aomenlhc' : ''


const app=createApp(App);

app.use(store).use(router).mount('#app')

// 设置全局变量
app.config.globalProperties.$axios=axios;

