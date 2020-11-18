import axios from 'axios';
import qs from 'qs'

/**
 * 包含 会员 可用收益 总收益
 */
const api_代理统计=()=>{
    return axios.post(config.api_url+'/MApi/Agent/MemberInfo')
}

const api_获取推广链接=()=>{
    return axios.post(config.api_url+'/Members/Agent/PromotionGetDomains')
}

const api_获取下级投注=(query)=>{
    return axios.post(config.api_url+'/MApi/Agent/LotteryInfoList',qs.stringify(query))
}

const api_获取下级交易明细=(query)=>{
    return axios.post(config.api_url+'/MApi/Agent/AccountTransfer',qs.stringify(query))
}


export {
    api_代理统计,
    api_获取推广链接,
    api_获取下级投注,
    api_获取下级交易明细
}