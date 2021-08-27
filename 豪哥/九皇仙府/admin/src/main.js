import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementPlus  ,  { ElLoading  , ElMessageBox  , ElMessage }from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App)
app.use(store).use(router)
.use(ElementPlus)
.mount('#app')

axios.defaults.baseURL = 'https://soft.jiuhuangxianfu.com/api'
app.config.globalProperties.$axios = axios
app.config.globalProperties.$api_url = 'https://soft.jiuhuangxianfu.com/api'
app.config.globalProperties.$message=(msg)=>{
    ElMessage({ ...msg ,offset: 100 ,showClose: true })
}
app.config.globalProperties.$back=()=>{
    history.back()
}



// 添加请求拦截器
let loadingInstance = ''
let axiosTotal=0
let closeLoading = ()=>{
    axiosTotal--
    if(axiosTotal==0){
        // setTimeout(() => {
        loadingInstance.close()            
        // }, 500);
    }
}
axios.interceptors.request.use(function (config) {
    loadingInstance = ElLoading.service({
        background:'rgba(0,0,0,.3)',
        text:"正在加载"
    });
    axiosTotal++
    // let urlList = ['/api/auth/loginadmin'];
    let url = config.url
    if(url!='/api/auth/loginadmin'){
        let token = store.state.loginInfo.token
        config.headers['X-Token'] = token ? token : ''; 
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    // console.log('错误1')
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    closeLoading()
    // 对响应数据做点什么
    var data =response.data
    if(data.code==1001){
        ElMessageBox ({
            title:"提示",
            message:"登录过期，请重新登录",
            type:"error",
            showClose:false,
            closeOnClickModal:false,
            confirmButtonText: '确定',
            callback: action => {
                router.push('/login')
            }
        });
    }
    return data
}, function (error) {
    closeLoading()
    // console.log('错误2')
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
        next()
        return
    }
    if(to.path!='/login' && !store.state.loginInfo.id){
        next('/login')
        return
    }
    next()
    // return
    // let path = to.path
    // let roles = store.getters.roles
    // let isok = false
    // let newpath = ''
    // if(roles.Admin){
    //     isok = true
    // }else if(path == '/index/wuquan'){
    //     next()
    //     return
    // }else{
    //     let pathList = {
    //         //订单
    //         '/index/orderList':roles.OrderRead || roles.OrderWrite,
    //         //会员
    //         '/index/userList':roles.UserRead || roles.UserWrite,
    //         '/index/user':roles.UserWrite,
    //         //商品
    //         '/index/productCategory':roles.ProductRead || roles.ProductWrite,
    //         'index/productList':roles.ProductRead || roles.ProductWrite,
    //         '/index/product':roles.ProductWrite,
    //         '/index/miaosha':roles.ProductRead || roles.ProductWrite,
    //         '/index/miaoshaXQ':roles.ProductWrite,
    //     }
    //     if(pathList.hasOwnProperty(path)){
    //         isok = pathList[path]
    //         if(!isok){
    //             // let key = 
    //             for (const key in pathList) {
    //                 console.log(pathList[key])
    //                 if(pathList[key]){
    //                     newpath = key
    //                     break
    //                 }
    //             }
    //         }
    //     }else{
    //         isok = true
    //     }
    // }
    // if(isok){
    //     next()
    // }else{
    //     console.log(newpath)
    //     if(from.path == '/login' && newpath){
    //         router.push(newpath)
    //     }else{
    //         router.push('/index/wuquan')
    //     }
    // }
})
