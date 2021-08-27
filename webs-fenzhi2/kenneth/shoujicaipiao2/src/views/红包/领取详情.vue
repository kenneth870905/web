<template>
    <div>
        
        <div class="mui-content mui-fullscreen">
            <header class="mui-bar mui-bar-nav">
                <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">红包详情</h1>
            </header>
            <div class="占位"></div>
            <div class="半圆">
                <by />
            </div>
            <div class="hader_1">
                <div class="img_1">
                    <img v-if="详情.ImgId" :src="`${config.img_url}static/image/touxiang/${详情.ImgId}`" alt="" srcset="">
                    <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="" srcset="">
                </div>
                <div class="name">
                    <span>{{详情.Nickname}}</span>
                    <span v-if="type==5">拼</span>
                </div>
                <div class="提示1" v-if="type==5">{{详情.Note}}</div>
                <div class="提示1" v-if="type==6">{{详情.Amount+'-'+详情.Bomb}}</div>
                <div class="text1" v-if="type==8">￥{{详情.Amount.toFixed(2)}}-{{详情.Quantity}}包-[{{详情.Bomb}}]</div>

                <div v-if="本人领取">
                    <div class="金额">￥{{本人领取.Amount.toFixed(2)}}</div>
                    <div class="提示2" v-if="type==5">已存入零钱，可用于购彩</div>
                </div>
            </div>
            
            <div class="title_1">
                <div v-if="领取列表.length<详情.Quantity">
                    已领取{{领取列表.length}}/{{详情.Quantity}} 个，共{{总额}}/{{详情.Amount}}元
                </div>
                <div v-else>
                    {{详情.Quantity}}个红包共{{详情.Amount}}元
                </div>
            </div>

            <ul class="mui-table-view list_1">
				<li class="mui-table-view-cell" v-for="(item, index) in 领取列表" :key="index">
                    <template v-if="type!=6 || (type==6 && item.Status!=3) ">
					    <img v-if="item.ImgId" class="img_1" :src="`${config.img_url}static/image/touxiang/${item.ImgId}`" />
                        <img v-else class="img_1" :src="`${config.img_url}static/image/touxiang/wutu.jpg`" />
                    </template>
                    <template v-else>
                        <img class="img_1" :src="`${config.img_url}static/image/hbgame/miansijinpai.jpg`" />
                    </template>
                    <img v-if="type==6 && item.Status==2" class="炸弹" :src="config.img_url+'static/image/hbgame/炸弹.png'" />
                    <ul>
                        <li>
                            <div :class="{'红色字体':item.IsSelf}">{{item.Nickname ? item.Nickname : "暂无昵称" }}</div>
                            <div :class="{'红色字体':item.Status==2}">{{item.Amount.toFixed(2)}}元</div>
                        </li>
                        <li>
                            <div class="time">{{item.ReceiveDate}}</div>
                            <div class="手气王" v-if="item.Amount == 最大">
                                <img :src="`${config.img_url}static/image/liaotian/huanguan.png`" />
                                手气最佳
                            </div>
                        </li>
                    </ul>
				</li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { api_群红包领取状态} from "@/api/红包接口.js";
import { api_游戏明细 , api_禁抢详情 } from "@/api/红包游戏.js";
import by from "@/components/半圆.vue";
import { mapState, mapActions } from 'vuex';
export default {
    name:"",
    components:{
        by
    },
    data() {
        return {
            id:"",
            type:"",
            MemberId:'',
            Nickname:"",
            详情:{
                Amount:0,
                MyBonus:null,
                BonusLogs:[],

                // 扫雷 雷数 主要用于扫雷
                Bomb:0
            },
        }
    },
    filters:{
        ft(t){
            return moment(t).format('H:mm');
        }
    },
    computed: {
        ...mapState({
            config:'config',
            Person:x=>x.个人资料.Person
        }),
        领取列表(){
            if(this.type==6 || this.type==8){
                return this.详情.GameLogs || []
            }else {
                return this.详情.BonusLogs || []
            }
        },
        本人领取(){
            if(this.type==6){
                return this.详情.MyLog
            }else{
                return this.详情.MyBonus
            }
        },
        总额(){
            let n = 0;
            this.领取列表.forEach(x => n += x.Amount );
            return Math.round(n*100)/100
        },
        最大(){
            var list = JSON.parse(JSON.stringify(this.领取列表));
            let list1 = list.sort((a,b)=>{
                return b.Amount - a.Amount;
            })
            return list1[0].Amount;
        }
    },
    methods: {
        
    },
    mounted() {
        this.id = this.$route.query.b;
        this.type = this.$route.query.t || 5
        if(this.type == 6){
            api_游戏明细(this.id).then(x=>{
                this.详情 = x.data.msg
            }).catch(err=>{})
        }else if(this.type == 5){
            api_群红包领取状态({bonusId : this.id}).then(x=>{
                this.详情= x.data.msg;
            }).catch(err=>{})
        }else if(this.type == 8){
            api_禁抢详情(this.id).then(x=>{
                this.详情= x.data.msg;
            }).catch(err=>{})
        }

    },
}
</script>

<style lang="scss" scoped>
.mui-bar{
    position: relative;
}
.红色字体{
    color: red;
}
.mui-bar-nav{
    box-shadow: none;
}
.mui-content{
    background: #ffffff;
}
.占位{
    height: 20px;
    @include bgcolor;
}
.半圆{
    height: _vw(40);
}
.hader_1{
    text-align: center;
    margin-top: -25px;
    position: relative;
    border-bottom: _vw(10) solid #eeee;
    padding: 0px 0px 15px;
    .img_1{
        width: _vw(50);
        height: _vw(50);
        margin: 0px auto;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .name{
        margin: _vw(10) 0px 0px;
        font-size: _vw(16);
        span:nth-child(1){
            font-weight: bold;
        }
        span:nth-child(2){
            margin: 0px 0px 0px 5px;
            width: 22px;
            text-align: center;
            display: inline-block;
            background: #eeb54b;
            color: #ffffff;
        }
    }
    .提示1{
        font-size: _vw(14);
        color: #4e4e4e;
        margin: _vw(15) 0px _vw(15);
    }
    .金额{
        font-size: _vw(40);
        font-weight: bold;
    }
    .提示2{
        color: #506dd8;
        font-size: _vw(14);
        margin: _vw(15) 0px 0px;
    }
}

.title_1{
    padding: 0px _vw(10);
    line-height: _vw(50);
    font-size: _vw(14);
    color: #8e8e8e;
    border-bottom: 1px solid #efefef;
}
.list_1{
    font-size: _vw(15);
    >li{
        display: flex;
        position: relative;
    }
    .炸弹{
        position: absolute;
        width: _vw(30);
        left: 60%;
        top: 0px;
        bottom: 0px;
        margin: auto;
    }
    .img_1{
        width: _vw(50);
        height: _vw(50);
        object-fit: cover;
        border-radius: 100%;
        margin: 0px _vw(5) 0px 0px;
    }
    ul{
        width: calc(100% - #{_vw(55)});
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        >li{
            display: flex;
            align-items: center;
            div{
                white-space: nowrap;
                &:nth-child(1){
                    width: 0;
                    flex-grow: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                &:nth-child(2){
                    flex-shrink: 0;
                }
            }
        }
    }
    .time{
        font-size: _vw(12);
        color: #ababab;
    }
    .手气王{
        color: #ffa802;
        font-size: _vw(14);
        display: flex;
        align-items: center;
        img{
            width: _vw(20);
        }
    }

}

.text1{
    font-size: 16px;
    margin: 10px 0px 0px;
    font-weight: bold;
}

</style>