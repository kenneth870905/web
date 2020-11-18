import axios from 'axios';
import qs from 'qs'

  
const 主题首页 =()=>{   
    return axios.post(config.api_url+'/admin/Apptheme/theme_image') 
}
export {
    主题首页,
    
}