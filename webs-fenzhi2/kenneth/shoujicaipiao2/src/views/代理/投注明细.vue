<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">投注明细</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="search">
                <div class="类型" @click="选择彩票类型()">
                    {{当前彩种 ? 当前彩种.title : '全部彩种'}}
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>
                <input type="text" v-model="query.MemberId" placeholder="会员名">
                <div class="查找框" @click="查找()">
                    <span class="iconfont icon-weibiaoti--"></span>
                    <span>搜索</span>
                </div>
            </div>
            <div class="search">
                <div class="类型" @click="选择开奖类型()">
                    <span v-if="query.state==''">全部开奖</span>
                    <span v-if="query.state==2">已中奖</span>
                    <span v-if="query.state==3">未中奖</span>
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>
                <input class="mui-text-center" placeholder="开始时间" type="text" readonly v-model="query.StartDate" @click="选择时间('StartDate')">
                <span class="至">至</span>                    
                <input class="mui-text-center" placeholder="结束时间" type="text" readonly v-model="query.EndDate" @click="选择时间('EndDate')">
                <!-- <div class="time_date" @click="time()">
                    {{dateTime}}&nbsp;
                    <span class="iconfont icon-icon-arrow-bottom2"></span>
                </div> -->
            </div>

            <div class="内容">
                <!-- <table class="table_1 table_2">
                    <thead>
                        <tr>
                            <td class="会员">会员</td>
                            <td class="彩种">彩种</td>
                            <td class="金额">投注金额</td>
                            <td class="金额">返利</td>
                            <td class="时间">时间</td>
                        </tr>
                    </thead>
                </table>
                <table class="table_1">
                    <tbody>
                        <tr v-for="(item, index) in list" :key="index">
                            <td class="会员">{{item.MemberId}}</td>
                            <td class="彩种">{{item.LotteryName}}</td>
                            <td class="金额">{{item.Price}}</td>
                            <td class="金额">{{item.Point}}</td>
                            <td class="时间">
                                <div>{{item.Createtime | filter_time('yyyy.MM.dd')}}</div>
                                <div>{{item.Createtime | filter_time('hh:mm')}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <van-list v-model="loading" :finished="!loading && total<=list.length" finished-text="没有更多了" @load="onLoad" >
                   <ul class="list_2" >
                        <li v-for="(item, index2) in list" :key="index2">
                        <!-- <li v-for="(item, index2) in list" @click="$router.push('/order?code='+item.Code)" :key="index2"> -->
                            <div class="img_box">
                                <img :src="config.img_url+'static/image/home/caipiao/'+item.LotteryCode+'.png'" alt="" srcset="">
                            </div>
                            <div class="text_box">
                                <div>
                                    <span class="标题">{{item.LotteryName}}（{{item.LotteryType}}）</span>
                                    <span class="未结算" v-if="item.Cancel">
                                        <i class="icon iconfont icon-dengdai"></i>
                                        <span>已撤单</span>
                                    </span>
                                    <span class="未结算" v-else-if="item.ResultMoney== null">
                                        <i class="icon iconfont icon-dengdai"></i>
                                        <span>未结算</span>
                                    </span>
                                    <span class="未中奖" v-else-if="item.ResultMoney==0">
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
                                    <span class="投注号码">
                                    {{item.PlatformType ? item.PlatformType : ''}} {{(item.Count > 1 ? '(复式) ' : '')}}{{item.Content}}
                                    </span>
                                    <span>{{item.MethodName}}</span>
                                </div>
                                <div>
                                    <span class="时间">{{item.Createtime | ft}}</span>
                                    <span>投注<span class="钱">￥{{item.Price}}</span></span>
                                </div>
                                <div>
                                    <span class="时间">会员：<span class="红色字体">{{item.MemberId}}</span> </span>
                                    <span>返利<span class="钱 红色字体">￥{{item.Point}}</span></span>
                                </div>
                            </div>
                        </li>
                    </ul>

                </van-list>
            </div>
        </div>

        <!-- 点击今天弹出层 -->
        <!-- <van-popup v-model="show" position="bottom" :overlay="true">
            <van-picker :columns="columns" @cancel="onCancel" @confirm="onConfirm" show-toolbar />
        </van-popup> -->
        <!-- 选择时间弹出层 -->
        <van-popup v-model="showTime" position="bottom" :overlay="true">
            <!-- <van-datetime-picker v-model="query[时间类型]" type="date" @cancel="时间取消" :min-date="minDate" @confirm="完成时间()" /> -->
            <van-datetime-picker v-model="currentDate" type="date" @cancel="时间取消" @confirm="完成时间()" />
        </van-popup>
        <!-- 头部 -->
    </div>
</template>

<script>
import moment from 'moment'
import { 时间格式化 } from "@/assets/js/通用.js";
import { api_获取下级投注 } from "@/api/代理接口.js";
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            nowIndex: 0,//默认第一个tab为激活状态
            show: false,
            currentDate: new Date(),
            showTime:false,
            minDate:null,
            时间类型:'StartDate',     //0 表示开始时间
            当前彩种:"",

            query:{
                StartDate:"",
                EndDate:"",
                DomainId:"",        //代理线
                LotteryCode:"",     //彩票代码
                MemberId:"",        // 会员名
                state:"",   // "" 全部 1 已中奖 2 未中奖
                page:1,
                rows:20
            },
            list:[],
            loading:true,
            total:0
        };
    },
    created() {
        
    },
    filters:{
        filter_time(time,type){
            return 时间格式化(type,time)
        },
        ft(t) {
            return moment(t).format('YYYY.MM.DD HH:mm')
        }
    },
    computed: {
        ...mapState({
            config:"config"
        }),
        ...mapGetters({
            彩票类型:"全部彩票类型"
        }),
        彩票类型1(){
            var obj=this.彩票类型.find(x=>x.title=='所有彩种');
            if(obj){
                var list=obj.children.filter(x=>x.title!='代理加盟');
                    list.forEach(item => {
                        item.text=item.title
                    });
                    list.unshift({'text':'全部彩种','title':'全部彩种',id:""});
                return list
            }else{
                return []
            }
        }
    },
    methods: {
        ...mapActions({
            获取游戏彩票:"获取游戏彩票"
        }),
        onLoad(){
            console.log(132)
            this.query.page++;
            this.获取投注();
        },
        选择开奖类型(){
            var 选择器 = new mui.PopPicker();
            选择器.setData([
                {value:"",text:"全部开奖"},
                {value:2,text:"已中奖"},
                {value:3,text:"未中奖"},
            ]);
            选择器.show((items) => {
                this.query.state=items[0].value;
                this.list=[];
                this.获取投注()
                选择器.dispose();
                选择器 = null;
            });
        },
        选择彩票类型(){
            var 选择器 = new mui.PopPicker();
            选择器.setData(this.彩票类型1);
            选择器.show((items) => {
                this.query.LotteryCode=items[0].id;
                this.当前彩种=items[0]
                this.list=[];
                this.获取投注()
                选择器.dispose();
                选择器 = null;
            });
        },
        选择时间(type){
            this.时间类型=type
            this.showTime=true;
        },
        完成时间(){
            this.showTime=false;
            if(this.时间类型=='StartDate'){
                this.query.StartDate=时间格式化('yyyy-MM-dd',this.currentDate);
            }else{
                this.query.EndDate=时间格式化('yyyy-MM-dd',this.currentDate);
            }
            this.list=[];
            this.获取投注()
        },
        时间取消(){
            this.showTime=false;
        },
        查找(){
            this.query.page=1;
            this.list=[];
            this.获取投注()
        },
        获取投注(){
            this.loading=true
            api_获取下级投注(this.query).then(x=>{
                this.loading=false
                this.list = [...this.list , ...x.data.rows]  ;
                this.total=x.data.total;
            }).catch(err=>{
                this.loading=false;
            })
        }
    },
    mounted() {
        this.获取投注();

        if(this.彩票类型.length==0){
            this.获取游戏彩票();
        }
    },
};
</script>


<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
}

.search {
    flex-shrink: 0;
    background: #fff;
    border-bottom: 1px solid #efeff4;
    height: _vw(50);
    width: 100%;
    display: flex;
    align-items: center;
    padding: _vw(10);
    .类型{
        white-space: nowrap;
        font-size: _vw(12);
        flex-shrink: 0;
        background: #f2f2f2;
        height: _vw(30);
        line-height: _vw(30);
        padding: 0px _vw(10);
        border-radius: _vw(30);
        margin: 0px _vw(5) 0px 0px;
        i{
            color: #ff6700;
        }
    }
    input {
        flex-grow: 1;
        height: _vw(30);
        border-radius: _vw(30);
        font-size: _vw(12);
        background-color: #f2f2f2;
        border: none;
        outline: medium;
        margin: 0px;
        padding: 0px 10px;
    }
    .查找框 {
        flex-shrink: 0;
        white-space: nowrap;
        background: #ff6700;
        height: _vw(30);
        padding: 0px _vw(10);
        border-radius: _vw(30);
        text-align: center;
        color: #ffffff;
        margin: 0px 0px 0px _vw(10);
        font-size: _vw(12);
        display: flex;
        align-items: center;
        .icon-weibiaoti-- {
            font-size: _vw(18);
        }
    }
    .至{
        margin: 0px _vw(10);
    }
}
   
.内容 {
    flex-grow: 1;
    overflow: auto;
}

.table_2{
    position: sticky;
    top: 0px;
}
.table_1{
    width: 100%;
    text-align: center;
    font-size: _vw(13);
    td{
        padding: _vw(5);
        border-top: 1px solid #f5f5f5;
    }
    .会员{
        width: _vw(60);
    }
    .彩种{
    }
    .时间{
        width: _vw(85);
        white-space: nowrap;
    }
    .金额{
        width: _vw(70);
    }
    td:not(:nth-child(1)){
        border-left: 1px solid #f5f5f5;
    }
    thead{
        background: #cccccc
    }
    tbody{
        tr:nth-child(2n-1){
            background: #ffffff;
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
        .红色字体{
            color: red;   
        }
    }
}
</style>