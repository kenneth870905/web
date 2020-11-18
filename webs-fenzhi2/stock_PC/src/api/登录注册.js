import axios from 'axios'
import qs from 'qs';

import store from '@/store.js'


const api_注册=(obj)=>{
    return axios.post(config.api_url+'/api/Account/Register',obj)
}

const api_发送手机验证码=(phone)=>{
    return new Promise((resolve, reject) => {
        var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if(!phoneTest.test(phone)){
            store.dispatch('错误提示','手机号码格式不正确')
            resolve()
        }else{
            store.dispatch('加载中',true)
            axios.post(config.api_url+'/api/Account/GetSmsCode?mobile='+phone).then(x=>{
                if(x.data.code==200){
                    store.dispatch('成功提示','短信已发送，请注意查收')
                }else{
                    store.dispatch('错误提示',x.data.msg)
                }
                store.dispatch('加载中',false)
            }).catch(err=>{
                store.dispatch('加载中',false)
                store.dispatch('系统错误，请稍后再试',x.data.msg)
            })
        } 
    });
}

const api_登录接口=(obj)=>{
    return axios.post(config.api_url+"/api/Account/login",obj)
}

export {
    api_注册,
    api_发送手机验证码,
    api_登录接口
}