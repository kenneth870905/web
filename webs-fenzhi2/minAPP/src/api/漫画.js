import axios from 'axios';
import qs from 'qs'


const 漫画大分类类型文字 =()=>{ 
    return axios.post(config.api_url+'/admin/Apphome/homemanhua')
}

const 漫画大分类类型内容 =(obj)=>{ 
    return axios.post(config.api_url+'/admin/Appclass/homemanhua_class',qs.stringify(obj))
}


const 漫画详情页=(obj)=>{
    return axios.post(config.api_url+'/admin/Apphomeid/manhuaid',qs.stringify(obj))
}

const 热门漫画=()=>{
    return axios.post(config.api_url+'/admin/Apphot/homemanhua')
}
const 漫画轮播=()=>{
    return axios.post(config.api_url+'/admin/Appslide/video')
}
const 漫画搜索=(obj)=>{
    return axios.post(config.api_url+'/admin/Appsearch/manhua',qs.stringify(obj))
}

export {
    漫画大分类类型文字,
    漫画大分类类型内容,
    漫画详情页,
    热门漫画,
    漫画轮播,
    漫画搜索
}