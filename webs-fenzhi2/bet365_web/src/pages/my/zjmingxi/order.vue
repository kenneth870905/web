<template>
    <div>
        <header class="mui-bar mui-bar-nav" style="    background: #ec0909;">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white;"></a>
            <h1 class="mui-title" style="color: white;">订单详情</h1>
            <!-- <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">类型</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="semicircle">
                <div></div>
            </div>
            <div class="box_1">
                <div class="img_box"><img :src="config.img_url+'image/home/caipiao/'+彩票.LotteryCode+'.png'" alt="" srcset=""></div>
                <div class="标题"> {{彩票.LotteryName}}{{彩票.LotteryType}}</div>
                <div class="期数">
                    第 {{彩票.IssueCode}} 期
                </div>

                
                <!-- <yqoqiu /> -->
                <router-view :is="彩票样式" :list="彩票.Content"></router-view>
                <!-- <router-view :is="彩票样式" :list="['01','03','05','07','09']"></router-view> -->
                <!-- <ul class="购买号码">
                    <li v-for="(item, index) in 彩票.Content" :key="index">
                        {{item}}
                    </li>
                </ul> -->
            </div>

            
            <ul class="mui-table-view 详情">
                <li class="mui-table-view-cell item">
                    <div class="title_1">注单单号</div>
                    <div class="text_1">{{code}}</div>
                </li>
                <li class="mui-table-view-cell item">
                    <div class="title_1">投注时间</div>
                    <div class="text_1">{{彩票.Createtime}}</div>
                </li>
                <li class="mui-table-view-cell item">
                    <div class="title_1">玩法名称</div>
                    <div class="text_1">{{彩票.MethodName}}</div>
                </li>
                <li class="mui-table-view-cell item2">
                    <span>下注号码</span>
                    <span v-if="彩票.Count>1">共:{{彩票.Count}}注</span>
                </li>
            </ul>

            <ul class="mui-table-view 详情">
                <li class="mui-table-view-cell item3" v-for="(item, index) in 彩票.List" :key="index">
                    <div>
                        <div><b>{{item.Content}}</b></div>
                        <div class="中奖" v-if="item.ResultMoney>0"><i class="icon iconfont icon-libao"></i>{{item.ResultMoney}}</div>
                        <div class="未中奖" v-if="item.ResultMoney==0"><i class="icon iconfont icon-guanbi1"></i>未中奖</div>
                        <div class="未结算" v-if="item.ResultMoney==null"><i class="icon iconfont icon-dengdai"></i>未结算</div>
                    </div>
                    <div>
                        <div class="赔率">
                            赔率:
                            <span class="红色">{{item.Odds}}</span>
                            返利
                            <span class="红色">{{item.Point}}%</span>
                        </div>
                        <div class="投注">
                            投注{{item.Amount}}
                        </div>
                    </div>
                </li>
                <li class="mui-table-view-cell item4" @click="查看更多()" v-if="彩票.List && 彩票.Count>彩票.List.length">
					<a class="mui-navigate-right">
                        查询更多号码
					</a>
                </li>
            </ul>


        </div>
    </div>
</template>

<script>


import { api_彩票订单详情 , api_彩票订单投注详情 } from "@/api/游戏彩票接口.js";
import { mapState } from 'vuex';

export default {
    name:"",
    components:{
    },
    data() {
        return {
            彩票:{},
            code:"",
            彩票样式:""
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        查看更多(){
            var obj={
                    code:this.code
                }
            api_彩票订单投注详情(obj).then(x=>{
                this.彩票.List=this.彩票.List.concat(x.data);
            }).catch(err=>{})
        },
        设置彩票样式(){
            // 10:时时彩
            // 20:pk10
            // 30:低频彩
            // 40:快三
            // 50:pc单单
            // 60::11选5
            // 70:六合彩
            var LotteryCode=this.彩票.LotteryCode;
                LotteryCode=LotteryCode.toString();
            var code = LotteryCode.substring(0,2);
            if(code==10 || code==30 || code==60){
                this.彩票样式=()=>import('./components/圆球列表.vue')
            }else if(code==20){
                this.彩票样式=()=>import('./components/pk10.vue')
            }else if(code==40){
                this.彩票样式=()=>import('./components/快3.vue')
            }else if(code==50){
                this.彩票样式=()=>import('./components/pc蛋蛋.vue')
            }else if(code==70){
                this.彩票样式=()=>import('./components/六合彩.vue')
            }
        }
    },
    mounted() {
        this.code=this.$route.query.code;
        api_彩票订单详情(this.code).then(x=>{
            this.彩票=x.data;
            this.设置彩票样式()
        }).catch(err=>{})
        var a=40004;

    },
}
</script>

<style lang="scss" scoped>
.semicircle{
    position: absolute;
    top: 44px;
    left: 0px;
    width: 100%;
    height: _vw(60);
    overflow: hidden;
    div{
        // width: 120%;
        width: 120vw;
        position: absolute;
        height: _vw(146);
        // height: 130px;
        // top: -46px;
        // bottom: 60px;
        // bottom: _vw(-60);

        bottom: 0px;
        left: -50%;
        right: -50%;
        margin: auto;
        // background: $color;
        @include bgcolor;
        border-radius: 50%;
    }
}
.mui-bar-nav{
    box-shadow: none;
}
.box_1{
    position: relative;
    z-index: 1;
    padding: _vw(20);
    text-align: center;
    .img_box{
        width: _vw(70);
        height: _vw(70);
        margin: 0px auto;
        img{
            // width: 100%;
            // height: 100%;
            box-shadow: 1px 1px 6px 2px rgba(131, 114, 114, 0.5);
            border-radius: 100%;
        }
    }
    .标题{
        font-size: _vw(15);
        font-weight: bold;
        margin: _vw(5) 0px 0px;
    }
    .期数{
        font-size: _vw(13);
        color: #8f8f94;
        margin: _vw(5) 0px 0px;
    }
    
}

.详情{
    .item{
        display: flex;
        color:#3e3e3e;
        font-size: _vw(14); 
        .title_1{
            width: _vw(96);
        }
    }
    .item2{
        font-size: _vw(15);
        background: #efeff4;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .item3{
        font-size: _vw(14);
        >div{
            display: flex;
            justify-content: space-between;
        }
        .中奖{
            color: red;
        }
        .未中奖{
            color:#6c757d;
        }
        .未结算{
            color: #28a745;
        }
        .红色{
            color: red;
        }
        .赔率{
            font-size: _vw(12);
            color: #949494;
        }
        .投注{
            color: #8f8f94;
        }
    }
    .item4{
        color: #3e3e3e;
        font-size: _vw(14);
    }
}
</style>
