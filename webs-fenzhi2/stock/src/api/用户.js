import axios from 'axios';
import qs from 'qs'

const api_退出=(refresh_token)=>{
    return axios.post(config.api_url + '/api/Account/Logout?refreshToken='+refresh_token)
}

const api_用户余额=()=>{  
    return axios.get(config.api_url + '/api/MemberFun/GetMemberMoney');
    // return axios.get('123465/api/MemberFun/GetMemberMoney',obj);
}


const api_实名认证=(obj)=>{
    return axios.post(config.api_url+'/api/Account',obj)
}
// const api_实名认证_短信验证码=(obj)=>{
//     return axios.post( config.api_url+"/api/Account/AuthenticationSendCode?mobile="+phone)
      
// }
 

const api_修改提款密=(obj)=>{  
     
    return axios.post( config.api_url+"/api/Account/ChangeMoneyPwd?code="+obj.code+"&mobile="+obj.mobile+"&moneyPwd="+obj.moneyPwd)
}
const api_修改提款密_发送验证码=(mobile)=>{  
     
    return axios.post( config.api_url+"/api/Account/SendChangeMoneyPwd?mobile="+mobile)
}





export {
    api_退出,
    api_用户余额,
    api_实名认证,
    api_修改提款密,
    api_修改提款密_发送验证码,
    // api_实名认证_短信验证码,
}      