import axios from 'axios';
import qs from 'qs'


const 获取首页轮播优惠 =()=>{ 
    return axios.post(config.api_url+'/admin/Apphome/appslide')
}
const 热门推荐三部=(obj)=>{
    return axios.post(config.api_url+'/admin/Apphome/getTuiJian',qs.stringify(obj))
}

const 添加收藏 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/add_collect',qs.stringify(obj))
}
const 删除收藏 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/del_collect',qs.stringify(obj))
}
const 收藏列表 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/list',qs.stringify(obj))
}

const 热门漫画 =()=>{
    return axios.post(config.api_url+'/admin/Apphot/homemanhua')
}
const 热门小说 =()=>{
    return axios.post(config.api_url+'/admin/Apphot/homexiaoshuo')
}
const 热门视频 =()=>{
    return axios.post(config.api_url+'/admin/Apphot/video')
}



export {
    获取首页轮播优惠,
    热门推荐三部,
    添加收藏,
    删除收藏,
    收藏列表,
    热门漫画,
    热门小说,
    热门视频,
}