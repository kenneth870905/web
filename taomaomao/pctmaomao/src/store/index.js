import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        轮播图:[],
        kittenType:[],
        newsType:[]
    },
    mutations: {
    },
    actions: {
        获取轮播图({state}){
            axios.get('/tmm/public/index.php/Slideshow/getList','')
            .then(res => {
                state.轮播图 = res.data.data
            })
            .catch(err => {
            })
        },
        getKittenType({state}){
            axios.get('/tmm/public/index.php/kitten/selectList','')
            .then(res => {
                state.kittenType = res.data.data
            })
            .catch(err => {
            })
        },
        getNewsType({state}){
            axios.get('/tmm/public/index.php/news/getType','')
            .then(res => {
                state.newsType = res.data.data
            })
            .catch(err => {})
        }
        // http://161.117.234.28/tmm/public/index.php/Slideshow/getList
    },
    modules: {
    }
})
