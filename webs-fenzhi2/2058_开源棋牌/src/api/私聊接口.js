import axios from 'axios';
import qs from 'qs'

const api_发送消息=(obj)=>{
    return axios.post(config.api_url+'/MApi/PrivateChat/SendMsg',qs.stringify(obj))
}

const api_获取所有消息=(senderCode)=>{
    return axios.post(config.api_url+'/MApi/PrivateChat/GetAllMsg',qs.stringify({senderCode:senderCode}) )
}

const api_获取最新消息=(senderCode)=>{
    return axios.post(config.api_url+'/MApi/PrivateChat/GetNewMsg' , qs.stringify({senderCode:senderCode}))
}

const api_撤销消息=(obj)=>{
    return axios.post(config.api_url+'/MApi/PrivateChat/DeleteMsg',qs.stringify(obj));
}

const api_获取菜单=()=>{
    return axios.post(config.api_url+'/MApi/PrivateChat/GetChatMenu')
}

export {
    api_发送消息,
    api_获取所有消息,
    api_获取最新消息,
    api_撤销消息,
    api_获取菜单
}