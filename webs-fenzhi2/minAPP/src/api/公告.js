import axios from 'axios';
import qs from 'qs'


const 获取公告 =(obj)=>{
    return axios.post(config.api_url+'/admin/Apphome/notice')
}
export {
    获取公告,
}