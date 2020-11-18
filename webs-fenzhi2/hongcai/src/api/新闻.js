
 import axios from 'axios';
 import qs from 'qs'

 
const  新闻资讯=(obj)=>{
    return axios.post(config.api_url+'/admin/Appnews/list',qs.stringify(obj))
}
const  新闻详情=(obj)=>{
    return axios.post(config.api_url+'/admin/Appnews/newsid',qs.stringify(obj))
}


export {
    新闻资讯,
    新闻详情
}