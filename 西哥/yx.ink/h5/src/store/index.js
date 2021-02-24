import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
    plugins: [createPersistedState({
            // storage: window.sessionStorage,
            key: 'yxh5',  //yxadmin
            reducer(val) {
                return {
                    userInfo:val.userInfo,
                    token:val.token
                    // user: {
                    //     token:val.user.token
                    // }
                }
            }
        }),
        createPersistedState({
            storage: window.sessionStorage,
            key: 'yxh5gwc',  //yxadmin
            reducer(val) {
                return {
                    购物车:val.购物车,
                    立即购买:val.立即购买
                }
            }
        }),
    ],
    state: {
        token:"",
        userInfo:{},
        goodsType:[],
        购物车:[
            // {
            //     sp:{
            //         id:"",
            //         cover:"",
            //         title:"",
            //     },
            //     规格:{
            //         color:"",
            //         size:"",
            //         price:""
            //     },
            //     数量:"",
            //     gid:随机数用于后面删除
            // }
        ],
        立即购买:{
            type:0, //0立即购买 1 购物车过来的
            list:[
                // sp:{
                //         id:"",
                //         cover:"",
                //         title:"",
                //     },
                //     规格:{
                //         color:"",
                //         size:"",
                //         price:""
                //     },
                //     数量:"",
                // }
            ]
        },
        选中收货地址:"",
        basic:[]
    },
    mutations: {
        setValue(state,[key,value]){
            state[key]=value
        },
        添加购物车(state,value){
            state.购物车.push(value)
        },
        删除购物车(state,gid){
            for (let i = state.购物车.length-1; i >= 0; i--) {
                if(gid==state.购物车[i].gid){
                    state.购物车.splice(i,1)
                }
            }
        }
    },
    actions: {
        获取商品类型({state}){
            axios.post('/Goods/getGoodsType','').then(res => {
                state.goodsType = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        获取基础信息({state}){
            axios.post('/Basic/get','').then(res => {
                if(res.code==1){
                    state.basic = res.data
                }
            }).catch(err => {
                console.error(err); 
            })
        }
    },
    modules: {
    }
})
