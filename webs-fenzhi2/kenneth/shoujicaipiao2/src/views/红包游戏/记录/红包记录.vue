<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">红包记录</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="title">
                <li @click="show1=true">
                    <div class="img_1">
                        <img :src="config.img_url+'static/image/hbgame/jilu_1.jpg'" alt="" srcset="">
                    </div>
                    <div>{{typeList[query.type].name}}</div>
                </li>
                <li>
                    <div class="img_1">
                        <img :src="config.img_url+'static/image/hbgame/jilu_2.jpg'" alt="" srcset="">
                    </div>
                    <div>
                        <div>余额</div>
                        <div class="money">￥{{userinfo.Money}}</div>
                    </div>
                </li>
            </ul>
            <ul class="title">
                <li @click="show=true">
                    <div class="img_1">
                        <img :src="`${config.img_url}static/image/hbgame/icon_wait_update.png`" alt="" srcset="">
                    </div>
                    <div>
                        {{name1}}
                        <van-icon name="arrow-down" />
                    </div>
                </li>
                <li>
                    <div class="huizong" @click="汇总详情()">
                        <div class="img_1">
                            <img :src="config.img_url+'static/image/hbgame/huizong3.jpg'" alt="" srcset="">
                        </div>
                        <div>
                            <div>今日盈亏</div>
                            <div class="money">￥{{huizong.total ? huizong.total : 0}}</div>
                        </div>
                        <div>
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </li>
            </ul>

            <div class="list">
                <van-list :offset="10" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                    <ul>
                        <li @click="xq(item)" v-for="(item, index) in list" :key="index">
                            <div>
                                <span>{{text[type].Status[item.Status]}}</span>
                                <span :class="{赚:item.Amount>0,亏:item.Amount<=0 }">{{item.Amount}}</span>
                            </div>
                            <div>
                                <span>
                                    {{text[type].msg[item.Status]}}
                                </span>
                                <span class="time">{{item.Date | ft}}</span>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </div>

        </div>
        <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" />
        <van-action-sheet v-model="show1" :actions="typeList" cancel-text="取消" @select="onSelect1" />
    </div>
</template>

<script>
import { api_扫雷记录 , api_扫雷汇总 , api_禁抢记录 ,api_禁抢汇总,api_牛牛记录 , api_牛牛汇总 } from "@/api/红包游戏.js";
import { mapState } from "vuex";
import moment from 'moment'

export default {
    name: "",
    data() {
        return {
            text:{
                0:{
                    msg:['','','扫雷包踩雷赔付','','扫雷包踩雷赔付','扫雷包踩雷赔付','',''],
                    Status:['','已领取','踩雷','特别奖','踩雷亏损','踩雷盈利','','发红包']
                },
                1:{
                    msg:['','','','','','','',''],
                    Status:['','已领取','踩雷','特别奖','踩雷亏损','踩雷盈利','','发红包']
                },
                7:{
                    msg:[],
                    Status:['','已领取','踩雷','发红包','踩雷亏损','踩雷盈利','','发红包']
                }
            },

            loading:false,
            finished:false,
            show1:false,
            typeList:[{name:'全部类型',i:0} ,{name:'进账',i:1},{name:'出账',i:2}],
            query:{
                page:0,     //默认从 1 开始
                rows:10,
                type:0      //0 全部 1 收入 2  支出
            },
            list:[],
            huizong:{},
            //下拉框
            type:0,     // 0 扫雷红包记录 1 禁抢红包 7 牛牛
            show: false,
            actions: [
                { name: '扫雷红包' ,t:0},
                { name: '禁抢红包' ,t:1},
                { name: '牛牛红包' ,t:7},
            ]
        }
    },
    filters:{
        ft(time){
            return moment(time).format('YYYY-MM-DD H:mm');
        }
    },
    computed: {
        ...mapState({
            config: "config",
            userinfo:x=>x.user.userinfo
        }),
        name1(){
            var o = this.actions.find(x=>x.t == this.type) 
            return o ? o.name : ""
        }
    },
    methods: {
        汇总详情(){
            if(this.type==0){
                this.$router.push('/hbStatistics?t=6');
            }else{
                this.$router.push('/hbStatistics?t=8');
            }
        },
        xq(item){
            if(this.type==0){
                this.$router.push(`/hbxq?b=${item.ChatGameId}&t=6`);
            }else if(this.type == 7){
                this.$router.push(`/hbGame/lqxq1?b=${item.ChatGameId}&t=8`);
            }else {
                this.$router.push(`/hbxq?b=${item.ChatGameId}&t=8`);
            }
        },
        onSelect1(item){
            this.show1 = false;
            this.query.type = item.i
            this.query.page = 1 
            this.list  = [];
            this.loading = true;
            this.finished = false;
            this.g1();
        },
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            console.log(item.t)
            this.type = item.t;
            this.query = {
                page:1,     //默认从 1 开始
                rows:10,
                type:0      //0 全部 1 收入 2  支出
            }
            this.list=[];
            this.finished=false
            this.loading = true;
            this.g1()
            this.g2()
        },
        onLoad(){
            // console.log('onLoad')
            this.query.page++;
            this.g1()
        },
        async g1(){
            if(this.type==0){
                try {
                    var x = await api_扫雷记录(this.query)
                } catch (error) {
                    this.finished = true;
                    this.list = []
                    return
                }
            }else if(this.type==1){
                try {
                    var x = await api_禁抢记录(this.query)
                } catch (error) {
                    this.finished = true;
                    this.list = []
                    return
                }
            }else if(this.type == 7){
                try {
                    var x = await api_牛牛记录(this.query);
                } catch (error) {
                    this.finished = true;
                    this.list = []
                    return
                }
            }
            
            if(this.type == 7){
                this.list = [...this.list , ...x.data.msg];
                if(x.data.msg.length<10){
                    this.finished = true;
                }
            }else{
                if(!Array.isArray(x.data)){
                    this.finished = true;
                }else{
                    this.list = [...this.list , ...x.data]
                    if(x.data.length<10){
                        this.finished = true
                    }
                }
            }
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        g2(){
            // api_禁抢汇总
            if(this.type==0){
                api_扫雷汇总(moment().format('YYYY-MM-DD')).then(x=>{
                    this.huizong = x.data
                }).catch(err=>{})
            }else if(this.type==1){
                api_禁抢汇总(moment().format('YYYY-MM-DD')).then(x=>{
                    this.huizong = x.data
                }).catch(err=>{ })
            }else if(this.type==7){
                api_牛牛汇总(moment().format('YYYY-MM-DD')).then(x=>{
                    console.log(x)
                    this.huizong = x.data
                }).catch(err=>{})
            }
        }
    },
    mounted() {
        this.g2()
    },
}
</script>

<style lang="scss" scoped>
.mui-content {
    display: flex;
    flex-direction: column;
}

.title {
    flex-shrink: 0;
    background: #ffffff;
    height: _vw(64);
    display: flex;
    font-size: _vw(14);
    border-bottom: 1px solid #efeff4;
    > li {
        width: 50%;
        &:nth-child(1) {
            border-right: 1px solid #efeff4;
        }
        padding-left: _vw(36);
        display: flex;
        align-items: center;
        // justify-content: center;
    }
    .img_1 {
        width: _vw(30);
        font-size: 0;
        margin: 0px 10px 0px 0px;
        img {
            width: 100%;
        }
    }
    .money {
        color: #b4264e;
        font-weight: bold;
    }
}
.huizong{
    display: flex;
    align-items: center;
    padding: 0px _vw(10) 0px 0px;
    font-size: _vw(14);
    width: 100%;
    height: 100%;
    .img_1{
        width: _vw(30);
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
        }
    }
    >div:nth-child(2){
        flex-grow: 1;
    }
    .money {
        color: #b4264e;
        font-weight: bold;
    }
}

.list {
    flex: 1;
    overflow: auto;
    padding: 0px _vw(8) _vw(8);
    font-size: _vw(14);
    margin: _vw(8) 0px 0px;
    li{
        background: #ffffff;
        margin: 0px 0px _vw(8) 0px;
        padding: 8px;
        border-radius: 8px;
        div{
            justify-content: space-between;
            display: flex;
            span:nth-child(1){
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            span:nth-child(2){
                white-space: nowrap;
            }
        }
        div:nth-child(1){
            margin: 0px 0px 5px 0px;
        }
        div:nth-child(2){
            font-size: _vw(12);
            color: #484848;
        }
        .赚{
            color: #bd3058;  
            font-weight: bold;
        }
        .亏{
            font-weight: bold;
            color: #2e9143;
        }
        .time{
            color: #b9b9b9;
        }
    }
}
</style>
