import axios from './newaxios.js'
import qs from 'qs'

const api_获取优惠列表 = (obj) => {
    return axios.post(config.api_url + '/Systems/Activity/InfoGetList', qs.stringify(obj))
}

const api_获取优惠详情 = (Id) => {
    return axios.post(config.api_url + '/Systems/Activity/GetContent', qs.stringify({ 'id': Id }))
}

const api_优惠类型 = (obj) => {
    return axios.post(config.api_url + '/Systems/Activity/InfoGetCls', qs.stringify(obj))
}

export {
    api_获取优惠列表,
    api_获取优惠详情,
    api_优惠类型
}
