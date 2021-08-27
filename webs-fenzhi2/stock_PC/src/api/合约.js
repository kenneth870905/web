import axios from 'axios';
import qs from 'qs'


const api_创建合约=(obj)=>{  
    return axios.post(config.api_url+'/api/Contract/CreateContract',obj);
}
 
const api_利息配置=()=>{ 
    return axios.get(config.api_url+'/api/Contract/GetInterests',);
}


const api_获取历史合约=(query)=>{
    return axios.post(config.api_url+'/api/Contract/GetContractList', query)
}

const api_获取有效合约=(obj)=>{
    return axios.post(config.api_url+'/api/Contract/GetEffectiveList',obj)
}

const api_合约详情=(contractCode)=>{
    return axios.post(config.api_url + '/api/Contract/GetContractDetails?contractCode='+contractCode)
}

// contractCode=123 &amount=100
const api_扩大配资=(obj)=>{
    return axios.post(config.api_url+'/api/Contract/AddFunds?contractCode='+obj.contractCode+'&amount='+obj.amount )
}

const api_追加保证金=(obj)=>{
    return axios.post(config.api_url + '/api/Contract/AddPurchasing?contractCode='+obj.contractCode+'&amount='+obj.amount );
}

const api_终止合约=(contractCode)=>{
    return axios.post(config.api_url+'/api/Contract/ContractSettlement?contractCode='+contractCode)
}

const api_提取盈利=(contractCode)=>{
    return axios.post(config.api_url+'/api/Contract/WithdrawProfits?contractCode='+contractCode)
}

export {
    api_创建合约,
    api_利息配置,
    api_获取历史合约,
    api_获取有效合约,
    api_合约详情,
    api_扩大配资,
    api_追加保证金,
    api_终止合约,
    api_提取盈利
}