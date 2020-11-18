import axios from 'axios'
import router from '@/router'
import { Dialog , Toast } from 'vant';

export default {
    namespaced: true,
    state: {
        userinfo: {},
        token有效: true,
        token:"",
        偏好频道: []
    },
    getters: {
    },
    mutations: {
        保存用户(state, user) {
            state.userinfo = user;
            state.token有效 = true;
            console.log(state.token有效)
        },
        设置默认频道(state, list) {
            state.偏好频道 = list;
        },
        添加频道(state, o) {
            state.偏好频道.push(o)
        },
        删除频道(state, o) {
            let i = state.偏好频道.findIndex(x => x.name == o.name)
            state.偏好频道.splice(i, 1)
        },
        修改state(state, [k, v]) {
            state[k] = v
        }
    },
    actions: {
        async 刷新token({ state, commit }) {
            try {
                var r = await axios.post('/user/testToken');
            } catch (error) {
                commit('修改state', ['token有效', false])
                return
            }
            if(r.data.code==0){
                commit('修改state', ['token有效', false])
                if (!router.history.current.meta) {
                    Dialog.alert({
                        title: '提示',
                        message: '登录信息失效，请重新登录'
                    }).then(() => {
                        router.push('/login')
                    });
                }
            }else{
                commit('保存用户', r.data.user)
                if(r.data.token){
                    commit('修改state',['token',r.data.token])
                }
            }
        },
        获取user({commit}){
            axios.post('/user/getUser').then(x=>{
                if(!x.data.message){
                    commit('修改state',['userinfo',x.data]);
                }else{
                    Toast(x.data.message);
                }
            }).catch(err=>{
                Toast('系统错误，稍后再试')
            })
        }
    },
    modules: {

    },
}