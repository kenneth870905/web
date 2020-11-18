import axios from 'axios';
import qs from 'qs'


const api_资金流水=(obj)=>{
    return axios.post(config.api_url + '/api/MemberFun/GetPageMemberFundDetails' , obj)
}

const api_充值记录=(obj)=>{  
    return axios.post(config.api_url+'/api/MemberFun/GetCashInList',obj);
}
const api_提现记录=(obj)=>{  
    return axios.post(config.api_url+'/api/MemberFun/GetCashOutList',obj);
}
const api_充值首页=()=>{  
    return axios.post(config.api_url+'/api/MemberFun/GetRechargeList');
}
const api_确认充值=(obj)=>{  
    return axios.post(config.api_url+'/api/MemberFun/AddCashIn',obj);
}



export {
    api_资金流水,
    api_充值记录,
    api_提现记录,
    api_充值首页, 
    api_确认充值,
}