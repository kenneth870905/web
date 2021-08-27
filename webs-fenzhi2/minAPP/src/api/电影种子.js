import axios from 'axios';
import qs from 'qs'


const 电影种子=(obj)=>{ 
    return axios.post(config.api_url+'/admin/apphome/homezhongzi',qs.stringify(obj))
}
const 电影种子详情=(obj)=>{ 
    return axios.post(config.api_url+'/admin/Apphomeid/zhongziid',qs.stringify(obj))
}

const 电影种子分类数据=()=>{
    return axios.post(config.api_url+'/admin/apphome/homezhongziclass')
}


export {
    电影种子分类数据,
    电影种子,
    电影种子详情
}