import axios from 'axios';
import qs from 'qs'

const api_领取=()=>{
    return axios.post(config.api_url+'/Activities/BetPhone/SignInReward')
}

const api_获取=()=>{
    return axios.post(config.api_url+'/Activities/BetPhone/GetRewardTimes')
}

export{
    api_领取,
    api_获取
}