
 import axios from 'axios';
 import qs from 'qs'

 
const  方案详情=(obj)=>{
    return axios.post(config.api_url+'/admin/Appplan/planDetailbyid',qs.stringify(obj))
}

const 专家历史方案=(obj)=>{
    return axios.post(config.api_url+'/admin/Appplan/expert_plan',qs.stringify(obj))
}
 
const 专家最新方案=(obj)=>{
    return axios.post(config.api_url+'/admin/Appplan/expert_plan_new',qs.stringify(obj))
}
 
const 收藏方案=(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/plan_collect',qs.stringify(obj))
}


export {
    方案详情,
    专家历史方案,
    专家最新方案,
    收藏方案,

}