import axios from 'axios';
import qs from 'qs'


const VIP广告图 =()=>{
    return axios.post(config.api_url+'/admin/Appvip/show')
}
const VIP数据=()=>{
    return axios.post(config.api_url+'/admin/Appvip/inviteurl')
}

export {
    VIP广告图 ,
    VIP数据
}