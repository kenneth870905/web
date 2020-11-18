import axios from 'axios'
import qs from 'qs'

var  config = "http://222.186.43.23:81"

const api_分类=(query)=>{
    return axios.post(`${config}/dongman/public/index/leibie`,qs.stringify(query))
}

const api_分类漫画=(query)=>{
    return axios.post(`${config}/dongman/public/Wenzhang/queryAll`,qs.stringify(query))
}

const api_分类漫画详情=(query)=>{
    return axios.post(`${config}/dongman/public/hua/huaDetails`,qs.stringify(query))
}

const api_漫画章节=(query)=>{
    return axios.post(`${config}/dongman/public/hua/huaList`,qs.stringify(query))
}

const api_文章详情=(query)=>{
    return  axios.post(`${config}/dongman/public/wenzhang/queryById`,qs.stringify(query))
}

export{
    api_分类,
    api_分类漫画,
    api_分类漫画详情,
    api_文章详情,
    api_漫画章节
}