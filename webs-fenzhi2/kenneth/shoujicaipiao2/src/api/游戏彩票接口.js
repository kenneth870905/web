import axios from 'axios';
import qs from 'qs'

const api_获取游戏彩票=()=>{
    // return axios.get(config.img_url+'static/json/home.json')
    return axios.get(config.img_url+'webConfig/json/home.json')
}

//pc 版
const api_投注记录=(obj)=>{
    return axios.post(config.api_url+'/Members/Info/GetOrderList',qs.stringify(obj));
}

/**
 * 主要用于彩票大厅 开奖列表
 * menuCode: shishicai   
 **/
const api_GetLotteryInfos=(obj)=>{
    return axios.post(config.api_url+'/M/Lottery/GetLotteryInfos',qs.stringify(obj))
}

const api_获取投注列表=(query)=>{
    return axios.post(config.api_url+'/M/Money/OrdersGetList',qs.stringify(query))
}

const api_彩票订单详情=(code)=>{
    return axios.post(config.api_url+'/MApi/Orders/GetOrderInfo?code='+code)
}

/*
 *  code:'',
    用于获取彩票详情 查询具体投注
 */
const api_彩票订单投注详情=(query)=>{
    return axios.post(config.api_url+'/M/Money/GetOrderInfoNums',qs.stringify(query))
}

/**
 * totalType:  1 表示 今天 2 表示 近七天
    type: 
 */
const api_获取汇总=(query)=>{
    return axios.post(config.api_url+'/M/Money/OrderSummary',qs.stringify(query))
}

/**
    page: 1
    rows: 20
    state: 
    type: ag
    date: 
    
    获取下单今日昨日汇总统计
 */
const api_今日昨日统计=(query)=>{
    return axios.post(config.api_url+'/M/Money/GetSumToday',qs.stringify(query));
}

/**
 * lotteryCode: 70000 彩票Id
    type: 2  1 官方玩法 2 信用玩法
 */
const api_获取彩票配置=(query)=>{
    return axios.post(config.api_url+'/Lottery/Bet/GetPageInfo',qs.stringify(query))
}

// lotteryCode: 70001
// state: 0 
const api_获取近期开奖=(query)=>{
    return axios.post(config.api_url+'/M/Lottery/GetBetResults',qs.stringify(query))
}

//非低频彩 记录
// 低频彩 https://0698aa.com/Results/30001/年/年.json
// 普通   https://0698aa.com/Results/30002/年/年月日.json
const api_开奖记录=(id,year,date)=>{
    return axios.get(config.api_url+'/Results/'+id+'/'+year+'/'+date+'.json')
}

const api_开奖公告=()=>{
    return axios.post(config.api_url+'/Lottery/Home/GetInfo')
}

const api_获取合买列表=(query)=>{
    return axios.post(config.api_url+'/M/TeamBuy/MyGetList',qs.stringify(query))
}

const api_获取合买详情=(code)=>{
    return axios.post(config.api_url+'/MApi/TeamBuy/Info',qs.stringify({code:code}))
}

// {teamBuyId:""}
const api_修改合买是否公开=(obj)=>{
    return axios.post(config.api_url+'/M/TeamBuy/HideContent',qs.stringify(obj))
}

// {teamBuyId:"id",amount:"金额"}
const api_参与合买=(obj)=>{
    return axios.post(config.api_url+'/M/TeamBuy/BuyContent',qs.stringify(obj))
}

// lotteryCode:彩票id
// issueCode: 即将开奖.IssueCode
// orderList: 列表
const api_投注=(obj)=>{
    return axios.post(config.api_url+'/Lottery/Bet/YuanBetting',qs.stringify(obj));
}

//官方玩法投注
// model[issueCode]: 20190904176
// model[lotteryCode]: 70000
// model[methodCode]: 102
// model[isTeamBuy]: false
// model[orderList][0][key]: B_No09
// model[orderList][0][price]: 3
// model[orderList][1][key]: B_No25
// model[orderList][1][price]: 3
// teamBuyOdds: 0
const api_官方投注=(obj)=>{
    return axios.post(config.api_url+'/Lottery/Bet/CreditBetting',qs.stringify(obj))
}

// page: 1
// rows: 20
// typeId: 4
const api_六合资料=(query)=>{
    return axios.post(config.api_url+'/M/System/NewsGetList',qs.stringify(query))
}

export{
    api_获取游戏彩票,
    api_投注记录,
    api_GetLotteryInfos,
    api_获取投注列表,
    api_彩票订单详情,
    api_彩票订单投注详情,
    api_获取汇总,
    api_今日昨日统计,
    api_获取彩票配置,
    api_获取近期开奖,
    api_开奖记录,
    api_开奖公告,
    api_获取合买列表,
    api_获取合买详情,
    api_修改合买是否公开,
    api_参与合买,
    api_投注,
    api_官方投注,
    api_六合资料
}
