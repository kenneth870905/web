import axios from 'axios'
import qs from 'qs'

const api_发布群红包 = (obj) => {
    return axios.post(config.api_url + '/Mapi/bonus/sendBonus', qs.stringify(obj))
}

const api_领取群红包 = (obj) => {
    return axios.post(config.api_url + '/Mapi/bonus/receiveBonus', qs.stringify(obj))
}

// bonusId  包含领取人员
const api_群红包领取状态 = (obj) => {
    return axios.post(config.api_url + '/Mapi/bonus/getusedbonus', qs.stringify(obj))
}

//判断是否还有红包
const api_查询状态=(bonusId)=>{
    return axios.post(config.api_url + '/Mapi/bonus/GetBonusStatus',qs.stringify({bonusId:bonusId}))
}

export {
    api_发布群红包,
    api_领取群红包,
    api_群红包领取状态,
    api_查询状态
}