import axios from 'axios';
import qs from 'qs'


const 视频大分类 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appclass/homehotvideo_class',qs.stringify(obj))
}
const 视频播放页 =(obj)=>{
    return axios.post(config.api_url+'/admin/Apphomeid/videoid',qs.stringify(obj))
}
const 视频热词搜索 =()=>{
    return axios.post(config.api_url+'/admin/Appclassword/video')
}
const 视频轮播图 =()=>{
    return axios.post(config.api_url+'/admin/Appslide/video')
}
const 视频热门=()=>{
    return axios.post(config.api_url+'/admin/Apphot/video')
}

export {
     视频大分类,
     视频热词搜索,
     视频轮播图,
     视频播放页,
     视频热门
}