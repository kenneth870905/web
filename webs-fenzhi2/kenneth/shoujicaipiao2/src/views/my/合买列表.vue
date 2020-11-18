<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">合买记录</h1>
        </header>
        <div class="mui-content">
            <ul class="header_1">
                <li :class="{'active':query.state==1}" @click="切换类型(1)">我发起的</li>
                <li :class="{'active':query.state==2}" @click="切换类型(2)">我参与的</li>
            </ul>

            <!-- <van-list v-model="loading" :finished="!loading && total<=list.length" finished-text="没有更多了" @load="onLoad"> -->
            <van-list v-model="loading" :finished="!loading && total<=list.length" finished-text="没有更多了" @load="onLoad">
                <ul class="list">
                    <li v-for="(item, index) in list" :key="index" @click="$router.push('/my/hmxq/'+item.Code)">
                        <div class="img_box">
                            <img :src="config.img_url+'static/image/home/caipiao/'+item.LotteryCode+'.png'" alt="" srcset="">
                        </div>
                        <div class="彩票">
                            <div class="title_1">{{item.LotteryName+'('+item.IssueCode+')'}}</div>
                            <div class="开奖">{{item.MethodName+'：'+item.Content}}</div>
                            <div class="赔率">
                                <span v-if="query.state == '1'">{{'赔率：'+item.Odds+' / '+item.UpdateOdds}}</span>
                                <span v-else>{{'赔率：'+item.UpdateOdds}}</span>
                            </div>
                            <div class="时间">{{item.Createtime}}</div>
                        </div>
                        <div class="金额人数">
                            
                            <div class="未结算" v-if="item.ResultMoney == null">
                                <i class="icon iconfont icon-dengdai"></i>
                                未结算
                            </div>
                            <div class="未中奖" v-else-if="item.ResultMoney == 0">
                                <i class="icon iconfont icon-guanbi1"></i>
                                未中奖
                            </div>
                            <div class="中奖" v-else>
                                <i class="icon iconfont icon-libao"></i>
                                中奖{{item.ResultMoney}}
                            </div>
                            <div>{{item.Money}}元</div>
                            <div>{{item.Count}}人</div>
                        </div>
                    </li>
                </ul>
                
            </van-list>

            

        </div>
    </div>
</template>

<script>
import { api_获取合买列表 } from "@/api/游戏彩票接口.js";
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            loading:true,
            finished:false,
            query:{
                page: 1,
                rows: 20,
                state: 1,
            },
            list:[],
            total:0
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        onLoad(){
            this.query.page++;
            this.获取列表()
        },
        切换类型(type){
            this.query.page=1;
            this.query.state=type;
            this.list=[];
            this.获取列表()
        },
        获取列表(){
            this.loading=true
            api_获取合买列表(this.query).then(x=>{
                if(x.data.rows){
                    this.list=[...this.list , ...x.data.rows];
                    this.total=x.data.total;
                }
                this.loading=false;
            }).catch(err=>{
                this.loading=false;
            })
        }
    },
    mounted() {
        this.获取列表();
    },

}
</script>

<style lang="scss" scoped>
.header_1{
    display: flex;
    background: #ffffff;
    line-height: _vw(44);
    font-size: _vw(14);
    border-bottom: 1px solid #ccc;
    position: fixed;
    top: 44px;
    left: 0px;
    width: 100%;
    li{
        width: 50%;
        text-align: center;
    }
    .active{
        border-bottom: 1px solid $color;
        color: $color;
    }
}
.list{
    margin: _vw(47) 0px 0px;
    li{
        background: #ffffff;
        border-bottom: 1px solid #cccccc;
        display: flex;
        padding: _vw(5) _vw(15);
        .img_box{
            flex-shrink: 0;
            width: _vw(30);
            height: _vw(30);
            margin: _vw(5) _vw(5) 0px 0px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .彩票{
            flex-grow: 1;
            color: #8f8f94;
            >div{
                margin: _vw(4) 0px;
            }
            .title_1{
                color: #000;
                font-weight: bold;
                font-size: _vw(14);
            }
            .开奖{
                font-size: _vw(12);
            }
            .赔率{
                color: $color;
                font-size: _vw(12);
            }
            .时间{
                font-size: _vw(12);
            }
        }
        .金额人数{
            font-size: _vw(12);
            color: #8f8f94;
            text-align: right;
            >div{
                margin: _vw(4) 0px;
            }
            .中奖{
                font-size: _vw(14);
                color: $color;
            }
            .未结算{
                font-size: _vw(14);
                color: #28a745 ;
            }
        }

    }
}
</style>
