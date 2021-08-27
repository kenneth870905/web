import axios from 'axios';
import qs from 'qs'

const api_彩票跟单=(id)=>{
    return axios.post(config.api_url+'/Mapi/Chat/ChatOrderInfo?orderId='+id)
}

const api_分享到聊天室=(id)=>{
    return axios.post(config.api_url+'/Mapi/Chat/ChatOrderAdd?orderId='+id)
}

const api_投注跟单=(obj)=>{
    return axios.post(config.api_url+'/Mapi/Chat/ChatOrderBuy?orderId='+obj.Id+'&amount='+obj.amount+'&LotteryCode='+obj.LotteryCode)
}

const api_获取房间列表=()=>{
    return axios.post(config.api_url+'/Mapi/Chat/GetChatRoomList')
}

const api_禁言=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/setismute',qs.stringify(obj));
}

const api_聊天记录=(chatId)=>{
    return axios.post(config.api_url+'/MApi/Chat/GetChatInitList?chatId='+chatId)
}

const api_房间禁言=(obj)=>{
    return axios.post(config.api_url+'/mapi/Chat/MuteRoom',qs.stringify(obj))
}

const api_房间是否禁言=(obj)=>{
    return axios.post(config.api_url+'/mapi/Chat/IsMuteRoom',qs.stringify(obj))
}


const api_在线人数=(obj)=>{
    return axios.post(config.api_url+'/Mapi/Chat/GetOnlineMemberCount')
}
const api_获取在线会员=(obj)=>{
    return axios.post(config.api_url+'/Mapi/Chat/GetOnlineMemberInfo')
}
const api_撤回消息 = (id, chatId) => {
    return axios.post(config.api_url + `/MApi/Chat/DeleteRoomChat/${id}?chatId=${chatId}`)
}

const api_会员详情=(obj)=>{
    return axios.post(config.api_url+'/MApi/Chat/GetUserInfo',qs.stringify(obj))
}

const api_获取计划时间=(obj)=>{
    return axios.post(config.api_url + '/MApi/Chat/GetBetResultInfo',qs.stringify(obj))
}

const api_已设计划 =()=>{
    return axios.post(config.api_url + '/MApi/LotteryPlan/GetLotteryPlanConfigSets')
}
const api_更新计划=(obj)=>{
    return axios.post(`${config.api_url}/MApi/LotteryPlan/LotteryPlanConfigUpdate?configs=${JSON.stringify(obj)}`,qs.stringify(obj));
    // return axios.post(config.api_url + `/MApi/LotteryPlan/LotteryPlanConfigUpdate?configs=${JSON.stringify(obj)}`);
    // return axios.post(config.api_url + '/MApi/LotteryPlan/LotteryPlanConfigUpdate',obj);
}

const api_获取计划设置 =(q)=>{
    return axios.post(config.api_url + '/MApi/LotteryPlan/GetAllLotteryPlanConfigsets',qs.stringify(q))
}

const api_删除计划=(obj)=>{
    return axios.post(config.api_url+'/MApi/LotteryPlan/LotteryPlanConfigDelete',qs.stringify(obj))
}
const api_启用计划=(obj)=>{
    return axios.post(config.api_url+'/MApi/LotteryPlan/LotteryPlanConfigStart',qs.stringify(obj))
}

const api_redis初始化=()=>{
    return axios.post(config.api_url+'/MApi/LotteryPlan/LotteryPlanConfigInit')
}

export{
    api_彩票跟单,
    api_分享到聊天室,
    api_投注跟单,
    api_获取房间列表,
    api_禁言,
    api_聊天记录,
    api_房间禁言,
    api_房间是否禁言,
    api_在线人数,
    api_获取在线会员,
    api_撤回消息,
    api_会员详情,
    api_获取计划时间,
    api_已设计划,
    api_更新计划,
    api_获取计划设置,
    api_删除计划,
    api_启用计划,
    api_redis初始化
}