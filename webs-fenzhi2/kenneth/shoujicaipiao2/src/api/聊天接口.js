import axios from 'axios'
import qs from 'qs'

const api_添加好友=(id)=>{      
    //好友Id
    return axios.post(`${config.api_url}/Contact/SendRequest?friendId=${id}`)
}

const api_获取好友列表=()=>{
    return axios.post(`${config.api_url}/Contact/GetContacts`)
}

const api_待验证请求=()=>{
    return axios.post(`${config.api_url}/Contact/GetPendingRequest`)
}

const api_更新好友状态=(obj)=>{
    // requesterId =申请人Id
    // status = 1 确认 2 = 拒绝
    return axios.post(`${config.api_url}/Contact/UpdateRequest`,qs.stringify(obj))
}

const api_搜索人员=(q)=>{
    //friendId = 名称 huhu02类似这样的
    return axios.post(`${config.api_url}/MApi/Contact/GetSearchFriends`,qs.stringify(q))
}

export{
    api_添加好友,
    api_获取好友列表,
    api_待验证请求,
    api_更新好友状态,
    api_搜索人员
}