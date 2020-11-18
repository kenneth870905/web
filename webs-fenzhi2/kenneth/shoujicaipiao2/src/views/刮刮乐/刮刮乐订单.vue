<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">刮刮乐订单</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="header_1">
                <li v-if="!查看汇总详情" @click="切换类型('')" :class="{'active':订单.query.state==''}">汇总</li>
                <li v-if="查看汇总详情" @click="切换类型(-1)" :class="{'active':订单.query.state==''}">返回</li>

                <li @click="切换类型(1)" :class="{'active':订单.query.state==1}">未刮开</li>
                <li @click="切换类型(2)" :class="{'active':订单.query.state==2}">已中奖</li>
                <li @click="切换类型(3)" :class="{'active':订单.query.state==3}">未中奖</li>
            </ul>

            <ul class="list_1" v-if="订单.query.state=='' && 选中平台.value=='' && !查看汇总详情">
                <li class="mui-card" v-for="(item, index1) in 汇总.list" :key="index1" @click="获取汇总详情(item)">
                    <div class="mui-card-header">
                        <span>{{item.Date}} 05:00</span>
                        <span class="pull-right"><i class="icon iconfont icon-you"></i></span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="mui-row">
                                <div class="mui-col-xs-6"><label>购买张数：</label> <span class="数量">{{item.OrderCount}}</span></div>
                                <div class="mui-col-xs-6"><label>购买金额：</label> <span class="数量">{{item.Total}}</span></div>
                                <div class="mui-col-xs-6"><label>会员盈亏：</label> <span class="数量 红色">{{item.ShuYing}}</span></div>
                                <div class="mui-col-xs-6"><label>未刮张数：</label> <span class="数量">{{item.NotResultCount}}</span></div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="mui-card 近七天" v-if="汇总.list.length>1">
                    <div class="mui-card-header">
                        <span>近七天汇总</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="mui-row">
                                <div class="mui-col-xs-6"><label>购买张数：</label> <span class="数量">{{汇总.footer.length>0 ? 汇总.footer[0].OrderCount : 0}}</span></div>
                                <div class="mui-col-xs-6"><label>购买金额：</label> <span class="数量">{{汇总.footer.length>0 ? 汇总.footer[0].Total : 0}}</span></div>
                                <div class="mui-col-xs-6"><label>会员盈亏：</label> <span class="数量 红色">{{汇总.footer.length>0 ? 汇总.footer[0].ShuYing : 0}}</span></div>
                                <div class="mui-col-xs-6"><label>未刮张数：</label> <span class="数量">{{汇总.footer.length>0 ? 汇总.footer[0].NotResultCount : 0}}</span></div>
                            </div>
                        </div>
                    </div>
                </li>
                <li v-if="汇总.list.length==1" class="btn_1" @click="获取七天汇总()">
                    <button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined">近7天汇总</button>
                </li>
            </ul>

            <div v-if="订单.query.type" class="昨日统计" a='132'>
                今日汇总:{{订单.统计.todayAmount}}，昨日汇总：{{订单.统计.yesterdayAmount}}。
            </div>

            <van-list v-if="订单.query.state!='' || 查看汇总详情 || 选中平台.value!=''" v-model="订单.loading" :finished="!订单.loading && 订单.total<=订单.list.length" :finished-text="订单.total==0 ? '暂无数据' : '没有更多了'" @load="xiayiye">
                <ul class="list_2" >
                    <li v-for="(item, index2) in 订单.list" @click="$router.push('/guaguale/open1/'+item.Type+'/'+item.Id)" :key="index2">
                        <div class="img_box">
                            <img v-if="item.Type==1" :src="config.img_url+'static/image/guaguale/bg_5.jpg'" />
                            <img v-if="item.Type==2" :src="config.img_url+'static/image/guaguale/bg_6.jpg'" />
                            <!-- <i v-if="选中平台.value" class="icon iconfont icon-94"></i> -->
                        </div>
                        <div class="text_box">
                            <div>
                                <span class="标题">{{item.Name}} 卡号：{{item.Id}}</span>
                                <span class="未结算" v-if="!item.IsOpen">
                                    <i class="icon iconfont icon-dengdai"></i>
                                    <span>未刮开</span>
                                </span>
                                <span class="未中奖" v-else-if="item.IsOpen && item.ResultMoney == 0">
                                    <i class="icon iconfont icon-guanbi1"></i>
                                    <span>未中奖</span>
                                </span>
                                <span class="中奖" v-else>
                                    <i class="icon iconfont icon-libao"></i>
                                    <span>
                                        中奖{{item.ResultMoney}}
                                    </span>
                                </span>
                            </div>
                            <div>
                                <span class="时间">{{item.Createtime}}</span>
                                <span>金额<span class="钱">￥{{item.TotalPrice}}</span></span>
                            </div>
                            <div>
                                {{item.Content? item.Content :'(未刮奖)'}}
                            </div>
                        </div>
                    </li>

                </ul>
            </van-list>
            
        </div>

        <router-view></router-view>
    </div>
</template>

<script>

const 初始订单={
        query:{
            page: 1,
            rows: 10,
            state: "",   //'' 全部 1 未刮开 2 已中奖 3 未中奖
            date: "",
        },
        list:[],
        total:0,
        loading:true,
        统计:{
            todayAmount:0,  //今日
            yesterdayAmount:0   //昨日
        }
    }

import { api_刮刮乐汇总 , api_刮刮乐列表 } from "@/api/刮刮乐.js";
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
    name: "",
    data() {
        return {
            显示返回按钮:false,
            订单:{
                query:{
                    page: 1,
                    rows: 10,
                    state: "",   //'' 全部 1 未刮开 2 已中奖 3 未中奖
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
                    totalType:1,    //1表示今天 2 表示7天
                },
                list:[],
                footer:[]
            },
            查看汇总详情:false,
        }
    },
    computed: {
        ...mapState({
            config:'config',
            选中平台:state=>state.投注订单.选中平台,
            滚动条位置:x=>x.投注订单.滚动条位置
        })
    },
    filters:{
        时间格式(time){

        }
    },
    methods: {
        获取七天汇总(){
            this.汇总.query.totalType=2;
            this.获取汇总()
        },
        获取汇总(){
            api_刮刮乐汇总(this.汇总.query).then(x=>{
                this.汇总.list=x.data.rows;
                this.汇总.footer=x.data.footer;
            }).catch(err=>{
                this.$toast('系统错误稍后再试');
            })
        },
        获取汇总详情(item){
            this.查看汇总详情=true;
            this.订单=JSON.parse(JSON.stringify(初始订单));
            this.订单.query.date=item.Date;
            this.获取数据();
        },
        获取数据(){
            this.订单.loading=true;
            api_刮刮乐列表(this.订单.query).then(x=>{
                if(x.data.rows){
                    this.订单.list = [...this.订单.list , ...x.data.rows];
                    this.订单.total=x.data.total;
                }else{
                    this.订单.total=0;
                }
                this.订单.loading=false;
            }).catch(err=>{
                this.订单.loading=false;
            })
        },
        xiayiye() {
            this.订单.query.page++;
            this.获取数据();
        },
        切换类型(type){
            if(type==-1){
                this.查看汇总详情=false;
            }else{
                this.查看汇总详情=false;
                this.订单=JSON.parse(JSON.stringify(初始订单));
                this.订单.query.state=type
                this.获取数据();
            }
        },
    },
    mounted() {

        this.获取数据();
        this.获取汇总();
    },
    watch: {
        $route(){
            if(this.订单.query.state==1){
                this.订单=JSON.parse(JSON.stringify(初始订单));
                this.订单.query.state=1;
                this.获取数据();
            }   
        }
    },
}
</script>

<style lang="scss" scoped>
.mui-fullscreen{
    overflow: auto;
}
.昨日统计{
    background: #ffffff;
    text-align: center;
    padding: _vw(10);
    font-size: _vw(14);
    color: #6b6b6b;
}
.header_1 {
    position: sticky;
    z-index: 1;
    top: 0px;
    height: _vw(40);
    line-height: _vw(40);
    display: flex;
    background: #ffffff;
    font-size: _vw(14);
    color: #333333;
    text-align: center;
    border-bottom: 1px solid #efeff4;
    li {
        transition: all 0.3s;
        width: calc(100% / 5);
        flex-grow: 1;
    }
    .active {
        @include textcolor;
        @include border-full(2px ,bottom);
    }
}


.list_1{
    .近七天 {
        .mui-card-header{
            background: #5541f3
        }
    }
    .mui-card-header{
        @include bgcolor;
        font-size: 14px;
        color: #ffffff;
        padding: 5px 10px;
        min-height: auto;
    }
    .mui-card-content-inner{
        padding: 8px 8px;
    }
    .数量{
        color: #007aff;
    }
    .数量.红色{
        color: red;
    }
    .btn_1{
        margin: 30px 10px 10px;

        button{
            padding: 0px ;
            height: _vw(30);
            font-size: _vw(15);
            background: #ffffff;
            border-radius: _vw(30);
        }
    }
}

.list_2 {
    > li {
        background: #ffffff;
        display: flex;
        margin: _vw(10) 0px 0px 0px;
        padding: _vw(10);
        .img_box {
            width: _vw(26);
            height: _vw(26);
            flex-shrink: 0;
            margin: 0px _vw(10) 0px 0px;
            text-align: center;
            i{
                font-size: _vw(20);
                color: $color;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text_box {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            font-size: _vw(14);
            color: #8f8f94;
            > div {
                display: flex;
                align-items: center;
                justify-content: space-between;
                align-items: baseline;
                margin: 2px 0px;
            }
            .标题 {
                font-weight: bold;
                color: #000000;
            }
            .未结算{
                color: #28a745;
            }
            .中奖 {
                color: red;
            }
            .未中奖 {
                color: #949494;
            }
            .时间{
                font-size: _vw(12);
            }
            
        }
    }
}
</style>