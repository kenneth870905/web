import axios from 'axios';
import qs from 'qs'

/**
 * 包含 会员 可用收益 总收益
 */
const api_最新中奖=()=>{
    return axios.post(config.api_url+'/mapi/home/WinList')
}

const api_入款排行=()=>{
    return axios.post(config.api_url+'/mapi/chat/GetDepositRank')
}

const api_盈利排行=()=>{
    return axios.post(config.api_url+'/mapi/chat/GetProfitRank')
}

export {
    api_最新中奖,
    api_入款排行,
    api_盈利排行
}