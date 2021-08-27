import axios from 'axios';
import qs from 'qs'


const 有声小说大分类 =()=>{          
    return axios.post(config.api_url+'/admin/Apphot/homexiaoshuoyousheng')
}
 
const 有声小说内容页面 =(obj)=>{
    return axios.post(config.api_url+'/admin/Apphomeid/xiaoshuoidyousheng',qs.stringify(obj))
}
 
export {
    有声小说大分类,
    有声小说内容页面
}

