<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">交易明细</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="search">
                <div class="类型" @click="选择彩票类型()">
                    {{当前类型.text}}
                    <i class="icon iconfont icon-tubiaozhizuo-"></i>
                </div>
                <input type="text" v-model="query.MemberCode" placeholder="会员名">
                <div class="查找框" @click="查找()">
                    <span class="iconfont icon-weibiaoti--"></span>
                    <span>搜索</span>
                </div>
            </div>
            <div class="search">
                <input class="mui-text-center" placeholder="开始时间" type="text" readonly v-model="query.StartDate" @click="选择时间('StartDate')">
                <span class="至">至</span>                    
                <input class="mui-text-center" placeholder="结束时间" type="text" readonly v-model="query.EndDate" @click="选择时间('EndDate')">
                <!-- <div class="time_date" @click="time()">
                    {{dateTime}}&nbsp;
                    <span class="iconfont icon-icon-arrow-bottom2"></span>
                </div> -->
            </div>

            <div class="内容">
                <van-list v-model="loading" :finished="error_1 ||  (!loading && total<=list.length)" finished-text="没有更多了" @load="onLoad" >
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell" @click="跳转(item)" v-for="(item, index) in list" :key="index">
                            <div class="mui-table">
                                <div class="mui-table-cell mui-col-xs-6">
                                    <h4 class="mui-ellipsis" :class="{'蓝色字体':item.Code}">({{item.SystemType}}){{item.Type}}</h4>
                                    <p>用户：<span class="红色字体">{{item.MemberId}}</span></p>
                                    <p class="mui-h6">{{item.Note}}</p>
                                </div>
                                <div class="mui-table-cell mui-col-xs-6 mui-text-right">
                                    <p class="mui-h6 mui-ellipsis">{{item.Createtime | filter_time}}</p>
                                    <span class="mui-h5" :class="getAmountColor(item)">{{item.Amount}}</span> 元
                                    
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
import { 时间格式化 } from "@/assets/js/通用.js";
import { api_获取下级交易明细 } from "@/api/代理接口.js";
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            分类:[
                {value: '',text: '全部类型'}, 
                {value: '0',text: '提款'},
                {value: '1',text: '存款'}, 
                {value: '2',text: '转出'}, 
                {value: '3',text: '转入'}, 
                {value: '4',text: '支出'}, 
                {value: '5',text: '派奖'}, 
                {value: '6',text: '优惠'}, 
                {value: '7',text: '返水'}, 
                {value: '8',text: '彩金'}, 
                {value: '9',text: '推荐'}, 
                {value: '10',text: '返点'}, 
                {value: '11',text: '返佣'}, 
                {value: '12',text: '撤单'}, 
            ],

            nowIndex: 0,//默认第一个tab为激活状态
            show: false,
            currentDate: new Date(),
            showTime:false,
            minDate:null,
            时间类型:'StartDate',     //0 表示开始时间
            当前彩种:"",
            error_1:false,

            query:{
                StartDate:"",
                EndDate:"",
                MemberCode:"",        // 会员名
                MemberMoneyLogType:"",   // 提款 0,存款 1,转出 2,转入 3,支出 4,派奖 5,优惠 6,返水 7,彩金 8,推荐 9,返点 10,返佣 11,撤单 12
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
            return 时间格式化('yyyy-MM-dd hh:mm',time)
        }
    },
    computed: {
        当前类型(){
            return this.分类.find(x=>x.value==this.query.MemberMoneyLogType);
        }
    },
    methods: {
        ...mapActions({
            获取游戏彩票:"获取游戏彩票"
        }),
        onLoad(){
            this.query.page++;
            this.获取数据();
        },
        getAmountColor(item){
            if (item.AuditState == null){
                return '红色字体';
            }else if (item.AuditState == dataPage.auditState0){
                return '蓝色字体';
            }else if (item.AuditState == dataPage.auditState2){
                return '灰色字体'
            }else{
                return '红色字体';
            }
        },
        选择彩票类型(){
            var 选择器 = new mui.PopPicker();
            选择器.setData(this.分类);
            选择器.show((items) => {
                this.query.MemberMoneyLogType=items[0].value
                this.list=[];
                this.获取数据()
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
            this.获取数据()
        },
        时间取消(){
            this.showTime=false;
        },
        查找(){
            this.query.page=1;
            this.list=[];
            this.获取数据();
        },
        获取数据(){
            this.loading=true
            this.error_1=false
            api_获取下级交易明细(this.query).then(x=>{
                console.log(x);
                this.list=[...this.list,...x.data.rows] ;
                this.total=x.data.total;
                this.loading=false
            }).catch(err=>{
                this.error_1=true
                this.loading=false;
            })
        }
    },
    mounted() {
        this.获取数据()
    },
};
</script>


<style lang="scss" scoped>

.蓝色字体{
    color: #007bff ;
}
.红色字体{
    color: $color;
}
.灰色字体{
    color: #6c757d;
}
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
        width: _vw(85);
        text-align: center;
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