import axios from 'axios';
import qs from 'qs'

/** 
 * 参数
    Id: 0       
    Type: 1     
    groupId: 3  Online 获取的 Notices 里面的 Group
 */
const api_隐藏公告=(obj)=>{
    return axios.post(config.api_url + '/Members/Info/ClickNotice',qs.stringify(obj))
}


const api_获取公告列表=(obj)=>{
    return axios.post(config.api_url + '/Systems/Notice/InfoGetList',qs.stringify(obj))
}

// id:""
const api_公告详情=(obj)=>{
    return axios.post(config.api_url + '/Systems/Notice/GetContent',qs.stringify(obj))
}

const api_获取消息列表=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/MessageGetList')
}

export{
    api_隐藏公告,
    api_获取公告列表,
    api_公告详情,
    api_获取消息列表
}
