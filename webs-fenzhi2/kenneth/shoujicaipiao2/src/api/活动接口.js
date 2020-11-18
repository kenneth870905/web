import axios from 'axios';
import qs from 'qs'

const api_奥发棋牌闯关=()=>{
    return axios.post(config.api_url+'/Activities/ChessCard/ChessCardReceive')
}

export{
    api_奥发棋牌闯关
}