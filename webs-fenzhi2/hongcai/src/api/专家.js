
 import axios from 'axios';
 import qs from 'qs'

 
const  关注列表=(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/list',qs.stringify(obj))
}


const 添加关注=(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/add_collect',qs.stringify(obj))
}

const 取消关注=(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/del_collect',qs.stringify(obj))
}

const 所有专家数据=(obj)=>{
    return axios.post(config.api_url+'/admin/Appexpert/getData',qs.stringify(obj))
}
// const 关注的专家方案=()=>{
//     return axios.post(config.api_url+'/admin/Appcollect/plan_collect')
// }
const 关注的专家方案=()=>{
    return axios.post(config.api_url+'/admin/Appcollect/plan_collect_today')
}
const 专家详情=(obj)=>{
    return axios.post(config.api_url+'/admin/Appexpert/ExpertDetailShow',qs.stringify(obj))
}
 

export {
    关注列表,
    添加关注,
    取消关注,
    所有专家数据,
    关注的专家方案,
    专家详情,
}