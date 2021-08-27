
import { api_获取投注列表 , api_获取汇总 , api_今日昨日统计} from "@/api/游戏彩票接口.js";
import { Toast } from 'vant';

var 初始数据={
    query:{
        page: 1,
        rows: 20,
        state: "",   //'' 全部 1表示未结算 2 表示已中奖 3 表示未中奖 4 未开奖
        type: "",   //平台 ag kg by ky mg
        date: "",
    },
    list:[],
    total:0,
    loading:true,
    统计:{
        todayAmount:"0",  //今日
        yesterdayAmount:"0"   //昨日
    }
}
export default {
    namespaced:true,
    state:{
        订单:{
            query:{
                page: 1,
                rows: 20,
                state: "",   //'' 全部 1表示未结算 2 表示已中奖 3 表示未中奖 4 未开奖
                type: "",   //"" 平台 ag kg by ky mg
                date: "",
            },
            list:[],
            total:0,
            loading:true,
            统计:{
                todayAmount:0,  //今日
                yesterdayAmount:0   //昨日
            }
        },
        汇总:{
            query:{
                totalType:1,
                type:"",    //选中的平台
            },
            list:[],
            footer:[]
        },
        查看汇总详情:false,
        选中平台:{
            'value':"",
            'text':'系统彩票',
        },
        滚动条位置:0
    },
    getters:{

    },
    mutations:{
        修改state(state,[key,value]){
            state[key]=value;
        }
    },
    actions:{
        初始化({state},[state1,type]){
            // state.订单=Object.assign({},初始数据);
            state.订单=JSON.parse(JSON.stringify(初始数据));
            state.订单.query.state=state1;
            state.订单.query.type=type;
        },
        获取汇总({state,commit}){
            commit('加载中', true, { root: true })
            api_获取汇总(state.汇总.query).then(x=>{
                state.汇总.list=x.data.rows;
                state.汇总.footer=x.data.footer;
                commit('加载中', false, { root: true })
            }).catch(err=>{
                Toast('系统错误稍后再试');
                commit('加载中', false, { root: true })
            })
        },
        获取七天汇总({state , dispatch}){
            state.汇总.query.totalType=2;
            dispatch('获取汇总')
        },
        获取汇总详情({state , dispatch},item){
            console.log(item);
            state.查看汇总详情=true;
            state.订单=JSON.parse(JSON.stringify(初始数据));
            state.订单.query.date=item.Date;
            dispatch('获取数据');
        },
        获取数据({state}){
            state.订单.loading=true;
            api_获取投注列表(state.订单.query).then(x=>{
                if(x.data.rows){
                    state.订单.list=state.订单.list.concat(x.data.rows);
                    state.订单.total=x.data.total;
                }else{
                    state.订单.total=0;
                }
                state.订单.loading=false;
            }).catch(err=>{
                console.log(err);
                state.订单.loading=false;
            })
            if(state.订单.query.type){
                api_今日昨日统计(state.订单.query).then(x=>{
                    state.订单.统计.todayAmount=x.data.todayAmount;
                    state.订单.统计.yesterdayAmount=x.data.yesterdayAmount;
                }).catch(err=>{})
            }
        },

        下一页({state,dispatch}){
            if(state.订单.list.length<state.订单.total){
                state.订单.query.page++;
                dispatch('获取数据');
            }
        },
    }
}