import axios from 'axios';
import qs from 'qs'
const api_请求随机姓名金额=(obj)=>{
    
    return axios.post(config.api_url +'/mapi/home/WinList',qs.stringify(obj))
}
export {
    api_请求随机姓名金额,
}