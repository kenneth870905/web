
 import axios from 'axios';
 import qs from 'qs'

 const  比赛时间=()=>{
    return axios.post(config.api_url+'/admin/Apprace/RaceList_time')
}

const  比赛列表=(obj)=>{
    return axios.post(config.api_url+'/admin/Apprace/RaceList',qs.stringify(obj))
}

const  赛事搜索词=()=>{  
    return axios.post(config.api_url+'/admin/Apprace/raceClass')
}
const  赛事详情=(obj)=>{
    return axios.post(config.api_url+'/admin/Apprace/RaceListinfo',qs.stringify(obj))
}
const 关注的赛事=(obj)=>{
    return axios.post(config.api_url+'/admin/Appcollect/list_collect_race',qs.stringify(obj))
}
const 赛事详情比赛方案=(obj)=>{
    return axios.post(config.api_url+'/admin/Appplan/planAboutRaceList',qs.stringify(obj))
}
export {
    比赛列表,
    比赛时间,
    赛事搜索词,
    赛事详情,
    关注的赛事,
    赛事详情比赛方案
}