import axios from 'axios';
import qs from 'qs'


const api_注册接口=(obj)=>{
    return axios.post( config.api_url+"/api/Account/Register",obj);
}


const api_获取短息验证码=(phone)=>{ 
     
    return axios.post( config.api_url+"/api/Account/AuthenticationSendCode?mobile="+phone)
}

const api_登录接口=(obj)=>{
     
    return axios.post(config.api_url+"/api/Account/login",obj)
}

const api_修改登陆密码=(obj)=>{
     
    return axios.post(config.api_url+"/api/Account/ChangePwd?code="+obj.code+"&mobile="+obj.mobile+"&newPwd="+obj.newPwd)
}
export {
    api_注册接口,
    api_获取短息验证码,
    api_登录接口,
    api_修改登陆密码,

}