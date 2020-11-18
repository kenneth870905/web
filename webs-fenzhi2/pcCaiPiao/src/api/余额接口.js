import axios from './newaxios.js'
import qs from 'qs'

const api_转入金额 = (obj) => {
    return axios.post(config.api_url + '/Other/Play/TransfreIn', qs.stringify(obj))
}
const api_获取平台余额 = (obj) => {
    return axios.post(config.api_url + '/Other/Play/GetBalance', qs.stringify(obj))
}
const api_转出金额 = (obj) => {
    return axios.post(config.api_url + '/Other/Play/TransfreOut', qs.stringify(obj))
}

export {
    api_转入金额,
    api_获取平台余额,
    api_转出金额,
    // api_获取用户余额,
}
