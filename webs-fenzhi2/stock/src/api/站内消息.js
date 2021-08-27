import axios from 'axios';
import qs from 'qs'
 
const api_站内消息通知公告=(obj)=>{ 
    return axios.post(config.api_url +'/api/Message/GetMessageList',obj)
}


const api_更改消息状态为已读=(MsgCode)=>{ 
    return axios.post(config.api_url +'/api/Message/UpdateState?code='+MsgCode)
}


export {
    api_站内消息通知公告,
    api_更改消息状态为已读,
}      