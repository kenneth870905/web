
 import axios from 'axios';
 import qs from 'qs'

 
const  登陆=(obj)=>{
    return axios.post(config.api_url+'/admin/Applogin/dologin',qs.stringify(obj))
}
const  注册=(obj)=>{
    return axios.post(config.api_url+'/admin/Applogin/register',qs.stringify(obj))
}
const  获取验证码=(obj)=>{          
    return axios.post(config.api_url+'/admin/Applogin/send',qs.stringify(obj))
}
const  退出登录=()=>{          
    return axios.post(config.api_url+'/admin/Applogin/loginOut')
}
const  判断是否登陆=(obj)=>{          
    return axios.post(config.api_url+'/admin/Applogin/isLogin',qs.stringify(obj))
}



 

export {
    登陆,
    注册,
    获取验证码,
    退出登录,
    判断是否登陆,
}