import axios from 'axios'
import qs from 'qs'

const api_用户登录 = (obj) => {
  return axios.post(config.api_url + '/Home/LoginReq', qs.stringify(obj))
}

const api_短息登录 = (obj) => {
  return axios.post(config.api_url + '/Home/SmsLogin', qs.stringify(obj))
}

const api_获取短息验证码 = (obj) => {
  return axios.post(config.api_url + '/Home/GetSmsCode', qs.stringify(obj))
}
const api_登录试玩 = (obj) => {
  return axios.post(config.api_url + '/Home/TryPlayReq')
}

const api_退出登录 = () => {
  return axios.post(config.api_url + '/Home/ExitReq')
}

const api_Online = (obj) => {
  return axios.post(config.api_url + '/Members/Info/Online', qs.stringify(obj))
}

export {
  api_用户登录,
  api_短息登录,
  api_获取短息验证码,
  api_登录试玩,
  api_退出登录,
  api_Online
}
