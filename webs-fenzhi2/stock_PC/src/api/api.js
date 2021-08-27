import axios from 'axios'

// // 引入qs
import qs from 'qs';

const  banner=()=>{
    return axios.get(CONFING.apiUrl+"img")
}
const  logoImg=()=>{
    return axios.get(CONFING.logImg+"logoimg")
}
 
// 设置默认请求服务器根目录
// axios.defaults.baseURL = 'http://172.16.9.254:666';
// const IP = 'http://172.16.9.254:666';

// 封装get方法 和 post方法
export default {
    get (url , params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    },
    post (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
        })
    }
}

// const IP = 'http://10.10.27.122:8066/' 
// //  请求login的参数
// const postInfo=()=>{
//     return axios.post(IP+"Account/Login")
// }

// 请求登陆页的参数
// export var getInfo = () => {
//     return axios.get(IP + 'api/goods')
// }

// 调用
// 比如在  indexe.vue 中使用
// import { 测试接口1 } from "@/api/测试接口.js";
// import qs from 'qs'
// postInfo(qs.stringify(params)).then(x=>{
//     console.log(x)  x就是返回数据
// }).catch(err=>{

// })

// async test(){
//     try {
//         var a= await 测试接口1(123)
//     } catch (error) {
//         console.log(error)
//     }
// }



// export default {
//     get (url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.get(url, {
//                 params
//             })
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(err => {
//                 reject(err);
//             })
//         })
//     },
//     post (url, params = {}) {
//         return new Promise((resolve, reject) => {
//             axios.post(url, qs.stringify(params))
//             .then(response => {
//                 resolve(response.data);
//             })
//             .catch(err => {
//                 reject(err);
//             })
//         })
//     }
// }

 
// 暴露对象 
export{  
    banner,
    logoImg,
    // postInfo,
}