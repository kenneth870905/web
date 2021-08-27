import axios from 'axios';
import qs from 'qs'

const 低俗内容分类标题 =()=>{  
    return axios.post(config.api_url+'/admin/Apphome/homedisu')
}
const 低俗内容分类内容列表 =(obj)=>{  
    return axios.post(config.api_url+'/admin/Appclass/disu_class',qs.stringify(obj))
}

const 关键字搜索 =(obj)=>{  
    return axios.post(config.api_url+'/admin/Appsearch/disu',qs.stringify(obj))
}

export {
    低俗内容分类标题,
    低俗内容分类内容列表,
    关键字搜索,
}