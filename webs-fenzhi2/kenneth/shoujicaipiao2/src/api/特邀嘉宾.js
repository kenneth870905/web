import axios from 'axios';
import qs from 'qs'

const api_领取=()=>{
    return axios.post(config.api_url+'/Activities/BetPhone/SignInReward',qs.stringify({url:'/Activities/BetPhone/SignInReward'}))
}

const api_获取=()=>{
    return axios.post(config.api_url+'/Activities/BetPhone/GetRewardTimes')
}

const api_特邀状态=()=>{
    return axios.post(config.api_url + '/MApi/Activity/Post',qs.stringify({url:'/Activities/Vip3/Receive'}))
}

const api_特邀getinfo=()=>{
    return axios.post(config.api_url + '/MApi/Activity/Post',qs.stringify({url:'/Activities/Vip3/getinfo'}))
}

const api_是否进入游戏=()=>{
    return axios.post(config.api_url + '/other/play/IsOldPlayer')
}

const api_查看vip引导 = ()=>{
    return axios.post(config.api_url + '/other/play/HasGuideVip')
}
const api_设置vip引导 = (type) =>{
    return axios.post(config.api_url + '/other/play/SetGuideVip',qs.stringify({stat:type}))
}

export{
    api_领取,
    api_获取,
    api_特邀状态,
    api_特邀getinfo,
    api_是否进入游戏,
    api_查看vip引导,
    api_设置vip引导
}