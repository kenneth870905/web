import axios from 'axios';
import qs from 'qs'

/*
    question: 您学号(工号)  问题
    answer: T307  回答
*/
const api_修改安全问题=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/AnswerEditReq',qs.stringify(obj))
}

// qq: ...
const api_修改qq=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/InfoEditReq',qs.stringify(obj));
}

// 获取安全问题 银行卡等信息
const api_GetPersonInfo=()=>{
    return axios.post(config.api_url+'/Members/Info/GetPersonInfo')
}
const api_设置银行=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/BankEditReq',qs.stringify(obj))
}

/*
    pwd:"",
    newPwd:""
*/
const api_修改登录密码=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/PwdEditReq',qs.stringify(obj))
}

const api_修改安全密码=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/QkPwdEditReq',qs.stringify(obj))
}

const api_获取等级=(obj)=>{
    return axios.post(config.api_url+'/MAPI/member/GetLevel')
}

const api_修改昵称=(str)=>{
    return axios.post(config.api_url+'/Members/Info/SetNickname',qs.stringify({Nickname:str}))
}

const api_修改头像=(str)=>{
    return axios.post(config.api_url+'/Members/Info/SetimgId',qs.stringify({imgid:str}))
}


export {
    api_修改安全问题,
    api_GetPersonInfo,
    api_设置银行,
    api_修改qq,
    api_修改登录密码,
    api_修改安全密码,
    api_获取等级,
    api_修改昵称,
    api_修改头像
}