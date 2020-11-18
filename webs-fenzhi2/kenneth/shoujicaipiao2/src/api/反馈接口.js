import axios from 'axios';
import qs from 'qs'

const api_获取反馈记录=(obj)=>{
    console.log(obj)
    return axios.post(config.api_url + '/Mapi/Member/GetFeedBackList' , qs.stringify(obj))
}

const api_添加反馈 =(obj)=>{
    return axios.post(config.api_url + '/Mapi/Member/SaveFeedBack',qs.stringify(obj))
}

export{
    api_获取反馈记录,
    api_添加反馈
}