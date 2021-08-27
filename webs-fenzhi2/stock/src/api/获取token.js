import axios from 'axios';
import qs from 'qs'

const api_刷新token=(str)=>{
    return axios.post(config.api_url + '/api/Account/RefreshToken?refreshToken='+str);
}

export {
    api_刷新token
}