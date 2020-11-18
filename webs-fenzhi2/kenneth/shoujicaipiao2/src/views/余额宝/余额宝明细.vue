<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">资金明细</h1>
            <!-- <a class="mui-btn mui-btn-link mui-pull-right">筛选</a> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="总金额" ref="总金额">
                <div>
                    <div>
                        <div class="title_1">总金额</div>
                        <div class="钱 红色">￥{{profit.YuBaoMoney}}</div>
                    </div>
                    <div>
                        <div class="title_1">累计收益</div>
                        <div class="钱">￥{{profit.AllProfit}}</div>
                    </div>
                </div>
            </div>
            
            <van-sticky :offset-top="44" :z-index="1">
                <ul class="筛选条件">
                    <li class="类型">
                        <!-- 全部
                        <i class="icon iconfont icon-icon-arrow-bottom2"></i> -->
                        <van-dropdown-menu>
                            <van-dropdown-item @change="change1()" v-model="query.transferType" :options="option1" />
                        </van-dropdown-menu>
                    </li>
                    <!-- <li class="时间">
                        <span>选择时间</span>
                        <span>至</span>
                        <span class="提示语">选择时间</span>
                    </li> -->
                </ul>
            </van-sticky>

            <van-list v-model="loading" :finished="!loading && list.length>=total" :finished-text="total == 0 ? '暂无相关数据':'没有更多了'" @load="onLoad">
                <ul class="list mui-table-view">
                    <li class="mui-table-view-cell" v-for="(item, index) in list" :key="index">
                        <div>
                            <span>{{item.TransferType}}</span>
                            <span>{{item.Money}}</span>
                            <span>{{item.AfterMoney}}</span>
                        </div>
                        <div>
                            <span>
                                <!-- {{item.AfterMoney}} -->
                                收益：{{item.Interest}}
                            </span>
                            <span>{{item.TransferTime}}</span>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
import { api_余额宝明细 , api_余额宝详情2 } from "@/api/资金接口.js";
import { mapState, mapMutations } from "vuex";
export default {
    name: "",
    data() {
        return {
            option1: [
                { text: '全部', value: '' },
                { text: '转入', value: 1 },
                { text: '转出', value: 2 },
                { text: '自动', value: 3 }
            ],
            loading:true,
            list:[],
            total:0,
            query:{
                page:1,
                rows:10,
                transferType: '' //' 全部 1 转入 2转出
            },
            profit:{}
        }
    },
    computed: {
        
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        change1(){
            this.total=0
            this.query.page=1;
            this.list=[]
            this.获取数据();
        },
        onLoad(){
            this.query.page++;
            this.获取数据();
        },
        设置字体(){
            var w1=this.$refs.总金额.clientWidth;
            var w2=this.$refs.总金额.querySelector('.总金额>div').clientWidth
            if(w2>w1){
                var div=this.$refs.总金额.querySelectorAll('.钱');
                for (let i = 0; i < div.length; i++) {
                    div[i].style.zoom=(w1 - 30) /w2
                }
            }
        },
        async 获取数据(){
            this.加载中(true)
            try {
                var r=await api_余额宝明细(this.query)    
            } catch (error) {
                this.loading=false
                this.加载中(false);
                this.$toast('系统错误稍后再试')
                return
            }
            this.list=[...this.list , ...r.data.rows];
            this.total=r.data.total;
            this.loading=false         
            this.加载中(false);
        },
        查询余额宝(){
            api_余额宝详情2().then(x=>{
                this.profit=x.data;
                this.$nextTick(()=>{
                    this.设置字体()
                })
            }).catch(err=>{
                this.$toast('系统错误，稍后再试！')
            })
        }
    },
    mounted() {
        this.获取数据()
        // this.loading=false
        this.查询余额宝()

    },
}
</script>

<style lang="scss" scoped>
.筛选条件 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px _vw(10);
    height: _vw(50);
    font-size: _vw(14);
    background: #efeff4;
    .类型 {
        height: 100%;
        .van-dropdown-menu{
            height: 100%;
            background-color: inherit;
            align-items: center;
        }
        /deep/ .van-dropdown-menu__item{
            height: _vw(30);
            padding: 0px _vw(20) 0px _vw(15);
            background: #ffffff;
            border-radius: _vw(30);
        }
        /deep/ .van-dropdown-menu__title::after{
            top:6px;
        }
        /deep/ .van-dropdown-menu__title--down::after{
            top: 9px;
        }
        // padding: _vw(3) _vw(10);
        // background: #ffffff;
        // border-radius: _vw(25);
        // i{
        //     font-size: _vw(12);
        // }
    }
    .时间 {
        padding: _vw(3);
        border: 1px solid #eecccc;
        span:nth-child(1),
        span:nth-child(3) {
            width: _vw(80);
            text-align: center;
            display: inline-block;
            font-size: _vw(12);
        }
        .提示语 {
            color: #9e9e9e;
        }
    }
}
.总金额{
    background: #ffffff;
    padding: 10px;
    >div{
        // width:fit-content;
        display: flex;
        justify-content: space-between;
        min-width: 100%;
        >div{
            &:nth-child(1){
                margin-right: _vw(10);
            }
        }
    }
    .title_1{
        font-size: _vw(14);
    }
    .钱{
        // font-size: _vw(36);
        font-size: _vw(18);
        display: block;
        margin: _vw(5) 0px 0px;
    }
    .红色{
        color: #f95700;
    }
}

.list{
    >li{
        >div{
            display: flex;
            align-items: center;
            &:nth-child(1){
                font-size: _vw(16);
                margin: 0px 0px _vw(2) 0px;
                
            }
            span:nth-child(1){
                margin: 0px 10px 0px 0px;
            }
            span:last-child{
                flex-grow: 1;
                text-align: right;
            }
            &:nth-child(2){
                font-size: _vw(12);
                color: #989898;
            }
        }
    }
}
</style>
