import axios from "axios";
import qs from 'qs'

const api_获取优惠列表=(obj)=>{
    return axios.post(config.api_url+'/Systems/Activity/InfoGetList',qs.stringify(obj))
}

const api_获取优惠详情=(Id)=>{
    return axios.post(config.api_url+'/Systems/Activity/GetContent',qs.stringify({'id':Id}))
}

export {
    api_获取优惠列表,
    api_获取优惠详情
}