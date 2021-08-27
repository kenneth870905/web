
import axios from 'axios';
import qs from 'qs'

const api_首页轮播=(obj)=>{
    return axios.post(config.api_url + '/Systems/Activity/InfoGetList', qs.stringify(obj))
}

const api_首页轮播点击详情=(obj)=>{
    return axios.post(config.api_url +'/Systems/Activity/GetContent',qs.stringify(obj))
}

const api_优惠类型 = (obj) => {
    return axios.post(config.api_url + '/Systems/Activity/InfoGetCls', qs.stringify(obj))
}

export {
    api_首页轮播,
    api_首页轮播点击详情,
    api_优惠类型
}