import axios from 'axios';
import qs from 'qs'

const api_添加银行卡=(obj)=>{
    return axios.post(config.api_url+'/M/Member/AddBankCard',qs.stringify(obj))
}
const api_银行卡列表=()=>{
    return axios.post(config.api_url+'/M/Member/ListBankCard')
}

const api_删除银行卡=(id)=>{
    return axios.post(config.api_url+'/M/Member/DeleteBankCard',qs.stringify({Id:id}))
}

const api_设置默认银行卡=(obj)=>{
    return axios.post(config.api_url+'/M/Member/SetDefaultBankCard',qs.stringify(obj))
}

const api_根据id查询银行卡=(id)=>{
    return axios.post(config.api_url+'/M/Member/GetBankCard',qs.stringify({Id:id}))
}

export {
    api_添加银行卡,
    api_银行卡列表,
    api_删除银行卡,
    api_设置默认银行卡,
    api_根据id查询银行卡
}