
import { api_开奖记录 , api_获取近期开奖 } from "@/api/游戏彩票接口.js";
import { 时间格式化 } from "@/assets/js/通用.js";
var 初始数据={
    query:{
        page: 1,
        rows: 20,
        type: ""    // 查看类型 和 当前类型对应
    },
    list:[],
    loading:true,
    total:0,
    时间:""
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
        获取开奖记录({state,dispatch}){
            if(!state.时间){
                console.log('没有时间')
                var date=new Date();
            }else{
                console.log('有时间')
                var date=new Date(state.时间);
            }
            //开奖频率较低 按年计算
            if(state.当前彩票.id=='30001' || state.当前彩票.id=='30000' || state.当前彩票.id=='70001' || state.当前彩票.id=='70002' || state.当前彩票.id=='70003'){
                var day=date.getFullYear();
            }else{
                var month = 时间格式化('MM',date);
                console.log(month)
                var 日 = 时间格式化('dd',date)
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
                dispatch('获取最近开奖')
            }).catch(err=>{
                state.开奖记录=[]
            })
        },
        获取最近开奖({state}){
            let obj={
                    lotteryCode: state.当前彩票.id,
                    state: 1
                }
            api_获取近期开奖(obj).then(x=>{
                console.log(x)
                var list = x.data.Top5 || [];
                list.forEach(item=>{
                    let IssueCode = item.IssueCode
                    let obj = state.开奖记录.find(item1 => item1.IssueCode==IssueCode);
                    if(obj){
                        if(item.Content){
                            obj.Content = item.Content.join('|')
                            obj.开奖号码=item.Content
                        }
                    }
                })
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}