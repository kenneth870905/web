import axios from 'axios';
import qs from 'qs'

const api_获取刮刮乐剩余=()=>{
    return axios.post(config.api_url+'/M/ScratchCard/GetNotOpen')
}

const api_购买刮刮乐=(obj)=>{
    return axios.post(config.api_url+'/M/ScratchCard/BuyCard',qs.stringify(obj))
}

//totalType 
const api_刮刮乐汇总=(query)=>{
    return axios.post(config.api_url+'/M/ScratchCard/OrderSummary',qs.stringify(query))
}

const api_刮刮乐列表=(query)=>{
    return axios.post(config.api_url+'/M/ScratchCard/OrdersGetList',qs.stringify(query))
}

export{
    api_获取刮刮乐剩余,
    api_购买刮刮乐,
    api_刮刮乐汇总,
    api_刮刮乐列表
}