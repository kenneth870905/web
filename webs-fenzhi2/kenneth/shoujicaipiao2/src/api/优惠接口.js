import axios from 'axios';
import qs from 'qs'

// "home": true, type: "bet"
const api_获取优惠列表=(obj)=>{ 
    return axios.post(config.api_url+'/Systems/Activity/InfoGetList',qs.stringify(obj))
}

const api_优惠列表详情=(obj)=>{
    return axios.post(config.api_url + '/Systems/Activity/GetContent',qs.stringify(obj))
}

const api_优惠类型=(obj)=>{
    return axios.post(config.api_url + '/Systems/Activity/InfoGetCls',qs.stringify(obj))
}

export {
    api_获取优惠列表,
    api_优惠列表详情,
    api_优惠类型
}