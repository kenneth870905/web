import axios from "axios";

import { loadingApp } from "@/components/loading/index.js";
import { message } from 'ant-design-vue';
import store from "@/vuex/index.js";
import router from "@/router/index.js";

axios.defaults.baseURL = "//119.91.237.113"

axios.interceptors.request.use((config)=>{
    loadingApp.open()
    if(config.url!='/api/auth/login'){
        let token = store.state.user.userInfo.token
        config.headers['X-Token'] = token; 
    }
    return config
},error=>{
    loadingApp.close()
    return Promise.reject(error)
})


axios.interceptors.response.use(res=>{
    loadingApp.close()
    if(res.data){
        if(res.data.code===0){
            return res.data
        }
        // else if(res.data.message=='Invalid argument'){
        //     message.error('登录失效请重新登录');
        //     router.push('/login')
        //     return Promise.reject(res.data.message)
        // }
        else{
            message.error(res.data.message);
            return Promise.reject(res.data.message)
        }
    }else{
        message.error('系统错误稍后再试');
        return Promise.reject('系统错误稍后再试')
    }
},error=>{
    message.error('系统错误稍后再试!');
    loadingApp.close()
    return Promise.reject(error)
})

export default axios