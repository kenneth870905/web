import axios from 'axios'

// axios.defaults.baseURL=config.api_url;
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
axios.defaults.withCredentials = true

var load = ''
// 请求拦截器
var 白名单 = ['Members/Info/Online', 'App_Upload/Agents/Json/','/Systems/Activity/InfoGetCls']
axios.interceptors.request.use(function (config) {
    // console.log(config)
    var url = config.url
    var obj = 白名单.find(x => url.includes(x))
    if (!obj) {
        // 在发起请求请做一些业务处理  1
        // setTimeout(()=>{
        //     load =Loading.service({
        //         fullscreen: true,
        //         text: '拼命加载中···',
        //         // spinner: 'el-icon-loading',
        //         background: 'rgba(0, 0, 0, 0.7)'
        //     });
        // },100)
    }
    // config.headers.Authorization = "...."
    // config.headers.cooki="111111111111111111111111111111111111"
    return config
}, function (error) {
    //   console.log(error)
    // 对请求失败做处理
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response)
    // 对响应数据做处理
    setTimeout(() => {
        try {
            load.close()
        } catch (error) { }
    }, 500)
    // console.log('响应拦截器关闭')
    if (response.data.code == 0) {
        return response
    } else if (response.data.msg && response.data.msg != '成功') {
        // Message.error(response.data.msg)
        Message({
            showClose: true,
            message: response.data.msg,
            type: 'error',
            duration:1500
        })
        return Promise.reject(response)
    }
    return response
}, function (error) {
    console.log('error', error)
    // console.log('响应拦截器关闭')
    setTimeout(() => {
        try {
            load.close()
        } catch (error) { }
    }, 500)

    // Message.error('链接异常，稍后再试')
    // Message({
    //     showClose: true,
    //     message: '系统错误稍后再试.',
    //     type: 'error',
    //     duration:1500
    // })
    // 对响应错误做处理
    return Promise.reject(error)
})

export default axios
