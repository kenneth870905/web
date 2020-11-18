import axios from 'axios';
import qs from 'qs'

const 小说大分类 =()=>{
    return axios.post(config.api_url+'/admin/Apphome/homexiaoshuo')
}
const 小说大分类对应的内容=(obj)=>{
    return axios.post(config.api_url+'/admin/Appclass/homexiaoshuo_class',qs.stringify(obj))
}
const 小说详情页 =(obj)=>{
    return axios.post(config.api_url+'/admin/Apphomeid/xiaoshuoid',qs.stringify(obj))
}

const 小说内容页 =(obj)=>{ 
    return axios.post(config.api_url+'/admin/Apphomeid/xiaoshuoidzj',qs.stringify(obj))
}

const 小说热门 =()=>{  
    return axios.post(config.api_url+'/admin/Apphot/homexiaoshuo')
}

const 推荐小说 =()=>{  
    return axios.post(config.api_url+'/admin/Apphometuijian/getTop')
}

const 小说搜索 =(obj)=>{  
    return axios.post(config.api_url+'/admin/Appsearch/xiaoshuo',qs.stringify(obj))
}





export {
    小说大分类,
    小说大分类对应的内容,
    小说详情页,
    小说内容页,
    小说热门,
    推荐小说,
    小说搜索
}