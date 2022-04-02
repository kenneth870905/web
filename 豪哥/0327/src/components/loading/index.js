import { createApp } from 'vue'
import loading from './loading.vue'
import 'ant-design-vue/dist/antd.css';
import ant from 'ant-design-vue';

let div = document.createElement('div')
    document.body.appendChild(div)
let loadingApp = createApp(loading).use(ant).mount(div)
export {
    loadingApp
}

export default {
    install(app){
        app.config.globalProperties.Loading = loadingApp
    }
}
