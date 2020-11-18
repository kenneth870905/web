
 import axios from 'axios';
 import qs from 'qs'

 
const  首页数据=()=>{
    return axios.post(config.api_url+'/admin/Apphome/home')
}

const  首页专家列表=(obj)=>{
    return axios.post(config.api_url+'/admin/Apphome/homePlan',qs.stringify(obj))
}



export {
    首页数据,
    首页专家列表,
   
}