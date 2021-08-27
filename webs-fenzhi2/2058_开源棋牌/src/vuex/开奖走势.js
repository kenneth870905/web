
import { api_开奖记录 } from "@/api/游戏彩票接口.js";
import router from '@/router'

var 初始数据={
    query:{
        page: 1,
        rows: 20,
        type: ""    // 查看类型 和 当前类型对应
    },
    list:[],
    loading:true,
    total:0
}
export default {
    namespaced:true,
    state:{
        彩票id:"",
        时间:"",
        当前彩票:{},
        开奖记录:[],
    },
    getters:{

    },
    mutations:{
        设置state(state,[key,value]){
            state[key]=value;
        }
    },
    actions:{
        async 初始化({state , dispatch , rootState , rootGetters },id){
            if(rootGetters['分类彩票'].length==0){
                await dispatch('获取游戏彩票','',{root:true})
            }
            new Promise((resolve, reject) => {
                var 分类彩票=rootGetters['分类彩票']
                state.时间='';
                if(!id){
                    if(!state.当前彩票.id){
                        state.当前彩票= 分类彩票[0].children[0]
                    }
                }else{
                    if(state.当前彩票.id!=id){
                        分类彩票.forEach(item => {
                            item.children.forEach(item_1=>{
                                if(item_1.id==id){
                                    state.当前彩票=item_1;
                                }
                            })
                        });
                    }
                }
                dispatch('获取开奖记录');
                resolve()
            });
        },
        获取开奖记录({state}){
            if(!state.时间){
                var date=new Date();
            }else{
                var date=new Date(state.时间);
            }



            //开奖频率较低 按年计算
            if(state.当前彩票.id=='30001' || state.当前彩票.id=='30000' || state.当前彩票.id=='70001'){
                var day=date.getFullYear();
            }else{
                var month=date.getMonth()
                    month=month>9 ? month+1 : '0'+(month+1);
                var 日= date.getDate()>9 ? date.getDate() : '0'+date.getDate();
                var day=date.getFullYear()+month+ 日
            }
            api_开奖记录(state.当前彩票.id , date.getFullYear() , day ).then(x=>{
                var data=x.data;
                    data.forEach(item=>{
                        if(item.Content){
                            item.开奖号码=item.Content.split('|')
                        }
                    })
                state.开奖记录=data
            }).catch(err=>{
                state.开奖记录=[]
            })
        }
    }
}