import axios from './newaxios.js'
import qs from 'qs'

/**
 * 参数
    Id: 0
    Type: 1
    groupId: 3  Online 获取的 Notices 里面的 Group
 */
const api_隐藏公告 = (obj) => {
  return axios.post(config.api_url + '/Members/Info/ClickNotice', qs.stringify(obj))
}
const api_首页公告 = (obj) => {
  return axios.post(config.api_url + '/Systems/Notice/InfoGetList', qs.stringify(obj))
}
const api_首页公告详情 = (obj) => {
  return axios.post(config.api_url + '/Systems/Notice/GetContent', qs.stringify(obj))
}

export {
  api_隐藏公告,
  api_首页公告,
  api_首页公告详情
}
