import axios from 'axios';
import qs from 'qs'


const 签到接口 =()=>{
    return axios.post(config.api_url+'/admin/Appsign/sign')
}
const 连续签到次数查询接口 =()=>{
    return axios.post(config.api_url+'/admin/Appsign/sign_continue_count') 
}
const 任务列表 =()=>{
    return axios.post(config.api_url+'/admin/Apptaskweek/taskList') 
}
const 点击领取积分接口 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appsign/hand_sign_points',qs.stringify(obj)) 
}

const 历史记录 =()=>{
    return axios.post(config.api_url+'/admin/Apphistory/list') 
}



export {
    签到接口,
    连续签到次数查询接口,
    点击领取积分接口,
    历史记录,
    任务列表
}