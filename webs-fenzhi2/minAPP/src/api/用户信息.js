import axios from 'axios';
import qs from 'qs'
// import qs from 'qs'

const 获取用户信息 =()=>{
    return axios.post(config.api_url+'/admin/Appuserinformation/getUser')
}
const 修改资料 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appuserinformation/modify',qs.stringify(obj))
}
 const 上传头像 =(obj)=>{
    return axios.post(config.api_url+'/admin/Appuserinformation/upload',qs.stringify(obj))
}
export {
    获取用户信息,
    修改资料,
    上传头像
}