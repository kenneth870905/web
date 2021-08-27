import axios from 'axios';
import qs from 'qs'



const 登录接口 = (obj) => {
    return axios.post(configUrl.api_url+'vx.php?action=login','user='+obj.user+'&pwd='+obj.pwd)
}

const 绑定数量 = (obj) => {
    return axios.get(configUrl.api_url+'vx.php?action=bind&num='+obj.num+'&token='+obj.token)
   
}

const 请求会员列表 = (token) => { 
    return axios.get(configUrl.api_url+'vx.php?action=rmsg&token='+token)
}


const 聊天对话群= (obj) => {
    return axios.post(configUrl.api_url+'vx.php?action=smsg&token='+obj.token,'vxid='+obj.vxid+'&cvxid='+ obj.cvxid+'&type='+obj.type+'&msg='+obj.msg+'&qunid='+obj.qunid)
}

const 聊天对话个人= (obj) => {
    return axios.post(configUrl.api_url+'vx.php?action=smsg&token='+obj.token,'vxid='+obj.vxid+'&cvxid='+ obj.cvxid+'&type='+obj.type+'&msg='+obj.msg)
}



const 踢出群聊= (obj) => {
    return axios.post(configUrl.api_url+'vx.php?action=smsg&token='+obj.token,'vxid='+obj.vxid+'&cvxid='+obj.cvxid+'&qunid='+obj.qunid+'&type='+obj.type+'&msg='+obj.msg)
}

// const 下载语音= (obj) => {
//     return axios.post(configUrl.api_url+'vx.php?action=smsg&token='+obj.token,'vxid='+obj.vxid+'&cvxid='+obj.cvxid+'&qunid='+obj.qunid+'&type='+obj.type+'&msg='+obj.msg)
// }



export {
    登录接口,
    绑定数量,
    请求会员列表,
    聊天对话群,
    // 测试,
    聊天对话个人,
    踢出群聊,
    // 下载语音
}