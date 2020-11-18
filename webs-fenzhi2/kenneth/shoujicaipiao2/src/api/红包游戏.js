import axios from 'axios'
import qs from 'qs'

const api_获取游戏房间 = (gameType) => {
    return axios.post(config.api_url + '/MApi/Game/GetGameRoom', qs.stringify({ gameType: gameType }))
}

const api_发布游戏红包 = (obj) => {
    return axios.post(config.api_url + '/MApi/Game/StartGame', qs.stringify(obj))
}

const api_查询游戏状态 = (gameId) => {
    return axios.post(config.api_url + '/MApi/Game/GetGameStatus', qs.stringify({ gameId: gameId }))
}

const api_参加游戏 = (obj) => {
    return axios.post(config.api_url + '/MApi/Game/JoinGame', qs.stringify(obj))
}

const api_游戏明细 = (gameId) => {
    return axios.post(config.api_url + '/MApi/Game/GetGameLog', qs.stringify({ gameId: gameId }))
}

const api_扫雷记录 = (query) => {
    return axios.post(`${config.api_url}/MApi/Game/GetAllLog`, qs.stringify(query))
}

const api_扫雷汇总 = (date) => {
    // date 格式为 2019-12-27
    return axios.post(`${config.api_url}/Game/GetUserSummary?targetdate=${date}`)
}

const api_禁抢房间 = (gameType) => {
    return axios.post(`${config.api_url}/MApi/GameBan/GetGameRoom`, qs.stringify({ gameType: gameType }))
}
const api_发布禁抢 = (obj) => {
    return axios.post(`${config.api_url}/MApi/GameBan/StartGame`, qs.stringify(obj))
}
const api_禁抢状态 = (gameId) => {
    return axios.post(`${config.api_url}/MApi/GameBan/GetGameBanStatus`, qs.stringify({ gameBanId: gameId }))
}
const api_禁抢详情 = (gameId) => {
    return axios.post(`${config.api_url}/MApi/GameBan/GetGameBanLog`, qs.stringify({ gameBanId: gameId }))
}
const api_禁抢记录 = (query) => {
    return axios.post(`${config.api_url}/MApi/GameBan/GetAllLog`, qs.stringify(query))
}
const api_禁抢汇总 = (date) => {
    return axios.post(`${config.api_url}/MApi/GameBan/GetUserSummary?targetdate=${date}`)
}

//牛牛
const api_发布牛牛红包 = (q) => {
    return axios.post(`${config.api_url}/MApi/GameNiuniu/RedEnvelope`, qs.stringify(q))
}
const api_查询牛牛状态 = (id) => {
    return axios.post(`${config.api_url}/MApi/GameNiuniu/GetGameStatus`, qs.stringify({ gameId: id }))
}
const api_领取牛牛 = (q) => {
    return axios.post(`${config.api_url}/MApi/GameNiuniu/Robbery`, qs.stringify(q))
}
const api_牛牛详情 = (id) => {
    return axios.post(`${config.api_url}/MApi/GameNiuniu/GetGameLog`,qs.stringify({gameId:id}))
}
const api_牛牛记录=(q)=>{
    return axios.post(`${config.api_url}/MApi/GameNiuniu/GetAllLog`,qs.stringify(q))
}
const api_牛牛汇总 = (date) => {
    // date 格式为 2019-12-27
    return axios.post(`${config.api_url}/MApi/GameNiuniu/GetUserSummary?targetdate=${date}`)
}


export {
    api_获取游戏房间,
    api_发布游戏红包,
    api_查询游戏状态,
    api_参加游戏,
    api_游戏明细,
    api_扫雷记录,
    api_扫雷汇总,

    api_禁抢房间,
    api_发布禁抢,
    api_禁抢状态,
    api_禁抢详情,
    api_禁抢记录,
    api_禁抢汇总,

    api_发布牛牛红包,
    api_查询牛牛状态,
    api_领取牛牛,
    api_牛牛详情,
    api_牛牛记录,
    api_牛牛汇总
}
