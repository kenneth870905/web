
import { api_资金明细列表 } from "@/api/资金接口.js";
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
        数据:{
            query:{
                page: 1,
                rows: 20,
                type: ""    // 查看类型 和 当前类型对应
            },
            list:[],
            loading:false,
            total:0
        },
        滚动条位置:0
    },
    getters:{},
    mutations:{},
    actions:{
        设置滚动条位置({state},number){
            state.滚动条位置=number
        },
        进入资金明细({state,dispatch},type){
            if(type!==state.数据.query.type){
                dispatch('切换类型',type)
            }
            router.push('/my/zhmx')
        },
        切换类型({state,dispatch},type){
            state.滚动条位置=0;
            state.数据=Object.assign({},初始数据);
            state.数据.query.type=type;
            dispatch('获取数据')
        },
        获取数据({state}){
            state.数据.loading=true;
            api_资金明细列表(state.数据.query).then(x=>{
                console.log(x);
                state.数据.list=state.数据.list.concat(x.data.rows);
                state.数据.total=x.data.total;
                state.数据.loading=false;
            }).catch(err=>{
                state.数据.loading=false;
            })
        },
        下一页({state , dispatch}){
            if(state.数据.list.length < state.数据.total){
                state.数据.query.page++
                dispatch('获取数据')
            }
        }
    }
}