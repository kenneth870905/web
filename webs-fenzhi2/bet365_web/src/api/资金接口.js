import axios from 'axios';
import qs from 'qs'
const api_资金明细列表=(query)=>{
    return axios.post(config.api_url+'/M/Money/LogsGetList',qs.stringify(query));
}

/**
 * 
 * @param {
 *      page: 1
 *      rows: 20
 *      type: 2  1 在线充值 2 转账记录
 * } query
 */
const api_获取充值记录=(query)=>{
    return axios.post(config.api_url+'/Members/Money/RechargeLogGetList',qs.stringify(query))
}

//无参数
const api_获取充值类型接口=()=>{
    return axios.post(config.api_url+'/MApi/Recharge/GetPayList')
}

//无参数
const api_获取网银卡=()=>{
    return axios.post(config.api_url+'/Members/Money/RechargeBankGetInfo')
}
//type: 支付宝
const api_电子转账账号=(query)=>{
    return axios.post(config.api_url+'/Members/Money/RechargeAlipayGetInfo',qs.stringify(query))
}
// type: 网银支付
const api_在线充值账号=(query)=>{
    return axios.post(config.api_url+'/Members/Money/OnlinePayGetInfo',qs.stringify(query));
}

const api_网银转账=(obj)=>{
    return axios.post(config.api_url+'/Members/Money/SubmitAuditRecharge',qs.stringify(obj))
}

const api_在线充值=(obj)=>{
    return axios.post(config.api_url+'/Members/Money/OnlinePayReq',qs.stringify(obj))
}


const api_领取首充赠送=()=>{
    return axios.post(config.api_url+'/Activities/ShouChong/ExcuteGift')
}

const api_获取提款卡=()=>{
    return axios.post(config.api_url+'/Members/Money/GetWithdrawInfo')
}

// amount:钱
// pwd:密码
const api_提现=(obj)=>{
    return axios.post(config.api_url+'/Members/Money/AuditWithdraw',qs.stringify(obj))
}

const api_余额宝详情=(obj)=>{
    return axios.post(config.api_url+'/M/Money/GetUserYuBaoDetails')
}
const api_余额宝详情2 =()=>{
    return axios.post(config.api_url+'/M/Money/GetUserYuBaoInfo')
}

// 转入转出一个接口
const api_余额宝转入=(obj)=>{
    return axios.post(config.api_url+'/M/Money/PostYuBaoTransfer',qs.stringify(obj))
}
const api_余额宝明细=(obj)=>{
    return axios.post(config.api_url+ '/M/Money/GetPageYuBaoTransferLog',qs.stringify(obj))
}

export {
    api_资金明细列表,
    api_获取充值记录,
    api_获取充值类型接口,
    api_获取网银卡,
    api_网银转账,
    api_电子转账账号,
    api_在线充值账号,
    api_在线充值,
    api_领取首充赠送,
    api_获取提款卡,
    api_提现,
    api_余额宝详情,
    api_余额宝转入,
    api_余额宝详情2,
    api_余额宝明细
}