import axios from 'axios';
import qs from 'qs'


const 添加评论 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appdiscuss/add',qs.stringify(obj))
}


const 评论列表=(obj)=>{
    return axios.post(config.api_url+'/admin/Appdiscuss/list',qs.stringify(obj))
}



export {
    添加评论,
    评论列表
}