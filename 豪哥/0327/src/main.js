import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js'

import ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import vuex from './vuex/index.js';

import loading from '@/components/loading/index.js'


createApp(App).use(loading).use(router).use(vuex).use(ant).mount('#app')


