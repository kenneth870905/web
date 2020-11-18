import axios from 'axios';
import qs from 'qs'


// const 登录接口=(obj)=>{
//     return axios.post(config.api_url+'/admin/Applogin/dologin',qs.stringify(obj))
// }
// const 获取手机验证码=(obj)=>{
//     return axios.post(config.api_url+'/admin/Applogin/dologin',qs.stringify(obj))
// }
const 退出登录=()=>{
    return axios.post(config.api_url+'/admin/Applogin/loginOut')
}
// const 登录状态=()=>{
//     return axios.post(config.api_url+'/admin/Appuserinformation/loginstatus')
// }

const  获取验证码=(obj)=>{
    return axios.post(config.api_url+'/admin/Applogin/send',qs.stringify(obj))
}
const  注册接口=(obj)=>{
    return axios.post(config.api_url+'/admin/Applogin/register',qs.stringify(obj))
}
const  登录接口=(obj)=>{
    return axios.post(config.api_url+'/admin/Applogin/dologin',qs.stringify(obj))
}
export {
    获取验证码,
    注册接口,
    登录接口,
    退出登录
}