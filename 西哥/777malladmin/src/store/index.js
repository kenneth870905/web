import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios'
import router from '@/router'
Vue.use(Vuex)

import layout from '@/views/layout.vue'
// 路由列表
import {verification as pathList ,navlist} from '@/router/pathList.js'

export default new Vuex.Store({
    plugins:[
        createPersistedState({
            key:"777mallAdmin",
            reducer:(value)=>{
                return {
                    token:value.token,
                    nav:value.nav
                }
            }
        }),
        createPersistedState({
            key:"777mallAdmin",
            storage:window.sessionStorage,
            reducer:(value)=>{
                return {
                    tag:value.tag,
                }
            }
        })
    ],
    state: {
        //需要缓存
        token:"",
        nav:{},
        // sessionStorage
        tag:[],
        //不需要缓存
        navList:[
            // {
            //     path:"...",
            //     meta:{title:""},
            //     children:[]
            // }
        ],
        navList2:[...navlist],
        defaultPath:"/",

        BjTime:{
            show:true
        }
    },
    mutations: {
        setToken(state,value){
            state.token=value
        },
        setNav(state,value){
            state.nav = value
        },
        addTag(state,value){
            state.tag.push(value)
        },
        deleteTag(state,index){
            state.tag.splice(index,1)
        },
        // 主要用于退出
        init(state){
            state.token = ''
            state.nav = []
            state.tag = []
        }
    },
    actions: {
        addNav({state}){
            let list = []
            var path = {
                    path: '/',
                    component: layout,
                    redirect: '',
                    children: [
                        // 每个路由
                    ]
                }

            for (const key1 in state.nav) {
                if(state.nav[key1].constructor === String){
                    if(pathList.find(x=>x.name==key1)){
                        if(!path.redirect){
                            path.redirect = pathList.find(x=>x.name==key1).path
                            state.defaultPath = pathList.find(x=>x.name==key1).path
                        }
                        path.children.push(pathList.find(x=>x.name==key1))
                        list.push(pathList.find(x=>x.name==key1))
                    }else{
                        list.push({ path:'/'+key1,meta: { title:state.nav[key1] }})
                    }
                }else if(state.nav[key1].constructor ===  Object){
                    let obj = {
                        meta:{
                            title:key1
                        },
                        children:[]
                    }
                    Object.keys(state.nav[key1]).forEach(key2=>{
                        if(pathList.find(x=>x.name==key2)){
                            obj.children.push(pathList.find(x=>x.name==key2))
                            path.children.push(pathList.find(x=>x.name==key2))
                        }else{
                            obj.children.push( {path:"/"+key2, meta: { title:state.nav[key1][key2] } })
                        }
                    })
                    list.push(obj)
                }
            }
            router.addRoute(path)
            router.addRoute(
                {
                    path: '*',
                    component: ()=>import('@/views/404.vue'),
                }
            )
            state.navList = list
            new Promise((resolve, reject) => {
                resolve()
            });
        },
        getNav({state,dispatch,commit}){
            axios.post('Nav','').then(async res => {
                if(!res.result) return
                commit('setNav',res.data)
                await dispatch('addNav')
                router.push(state.defaultPath)                                        
            }).catch(err => {
                console.error(err); 
            })
        }
    },
    modules: {
    }
})
