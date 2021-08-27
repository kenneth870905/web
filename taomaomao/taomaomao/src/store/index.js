import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        轮播图:[],
        kittenType:[]
    },
    mutations: {
    },
    actions: {
        获取轮播图({state}){
            axios.post('Slideshow/getList',{}).then(res => {
                if(res.data.code==1){
                    state.轮播图=res.data.data
                }
            }).catch(err => {})
        },
        获取猫类型({state}){
            axios.post('Kitten/selectList','').then(res => {
                if(res.data.code==1)
                state.kittenType = res.data.data
            }).catch(err => {})
        }
    },
    modules: {
    }
})
