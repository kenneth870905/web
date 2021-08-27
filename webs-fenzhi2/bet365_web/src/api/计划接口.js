import axios from 'axios'
import qs from 'qs'

const api_获取计划列表=(obj)=>{
    // return axios.get(config.api_url + '/MApi/LotteryPlan/GetPlanList',{params:obj})
    return axios.post(config.api_url + `/MApi/LotteryPlan/GetPlanList?lotteryCode=${obj.lotteryCode}&method=${obj.method}`)
}

export{
    api_获取计划列表
}