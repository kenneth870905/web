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
                    <img v-if="详情.ImgId" :src="`${config.img_url}static/image/touxiang/${详情.ImgId}`" />
                    <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" />
                </div>
                <div class="name">
                    <span>{{详情.Nickname}}</span>
                    <!-- <span>拼</span> -->
                </div>
                <div class="提示1">{{详情.TotalAmount.toFixed(2)}}-{{详情.TotalQuantity}}</div>

                <div v-if="详情.MyLog" class="我的">
                    <img class="胜负" v-show="详情.MyLog.Profit>0" :src="`${config.img_url}static/image/hbgame/ic_cow_victory.png`">
                    <img class="胜负" v-show="详情.MyLog.Profit<0" :src="`${config.img_url}static/image/hbgame/ic_cow_defeate.png`">
                    <div class="金额">
                        <span>
                            ￥{{详情.MyLog.Number.toFixed(2)}}
                        </span>
                        <img :src="`${config.img_url}static/image/hbgame/ic_cow_${详情.MyLog.Niu}.png`" alt="" srcset="">
                    </div>
                </div>
                <div class="庄闲">
                    <span>庄家{{详情.BankWin}}</span>
                    <span>闲赢{{详情.PlayWin}}</span>
                </div>
                <div class="提示2" v-if="详情.Status==1">本包游戏已领完</div>
                <div class="提示2" v-else-if="详情.Status==2">本包游戏已截止</div>
            </div>
            
            <div class="title_1">
                <div v-if="详情.ListBonusGrab.length<详情.TotalQuantity">
                    已领取{{详情.ListBonusGrab.length}}/{{详情.TotalQuantity}} 个，共{{领取总额}}/{{详情.TotalAmount}}元
                </div>
                <div v-else>
                    {{详情.TotalQuantity}}个红包共{{详情.TotalAmount}}元
                </div>
            </div>

            <ul class="mui-table-view list_1">
				<li class="mui-table-view-cell" v-for="(item, index) in 详情.ListBonusGrab" :key="index">
                    <img v-if="item.ImgId" class="img_1" :src="`${config.img_url}static/image/touxiang/${item.ImgId}`" />
                    <img v-else class="img_1" :src="`${config.img_url}static/image/touxiang/wutu.jpg`" />
                    <!-- <img v-if="type==6 && item.Status==2" class="炸弹" :src="config.img_url+'static/image/hbgame/炸弹.png'" /> -->
                    <ul>
                        <li>
                            <div class="name">
                                {{item.NickName ? item.NickName : '未设置'}}
                                <span class="庄家" v-show="item.NickName==详情.Nickname">庄家</span>
                            </div>
                            <div class="金额2">
                                {{item.Number.toFixed(2)}}
                                <img :src="`${config.img_url}static/image/hbgame/ic_cow_${item.Niu}.png`"/>
                            </div>
                        </li>
                        <li>
                            <div class="time">{{item.ReceiveDate}}</div>
                            <div class="盈亏" :class="{红色字体:item.ProfitLoss>0,绿色字体:item.ProfitLoss<0}">盈亏：{{item.ProfitLoss}}</div>
                            <!-- <div class="手气王" v-if="item.Number == 最大">
                                <img :src="`${config.img_url}static/image/liaotian/huanguan.png`" />
                                手气最佳
                            </div> -->
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
import { api_游戏明细 , api_禁抢详情 , api_牛牛详情 } from "@/api/红包游戏.js";
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
                
                //----根据不同情况设置 防止 toFixed 报错
                TotalAmount:0,
                Number:0,
                ListBonusGrab:[],
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
        领取总额(){
            if(!this.详情.ListBonusGrab) return 0
            let n = 0;
            this.详情.ListBonusGrab.forEach(x => n += x.Number );
            return Math.round(n*100)/100
        },
        // 最大(){
        //     var list = JSON.parse(JSON.stringify(this.领取列表));
        //     let list1 = list.sort((a,b)=>{
        //         return b.Amount - a.Amount;
        //     })
        //     return list1[0].Amount;
        // }
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
        }else{
            api_牛牛详情(this.id).then(x=>{
                this.详情 = x.data.msg;
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
    color: #bd3058;
}
.绿色字体{
    color: #2e9143;
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
        font-size: _vw(15);
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
        font-size: _vw(15);
        font-weight: bold;
        color: #4e4e4e;
        margin: _vw(5) 0px _vw(5);
    }
    .金额{
        font-size: _vw(40);
        font-weight: bold;
        img{
            width: _vw(16);
        }
    }
    .庄闲{
        display: flex;
        justify-content: space-evenly;
        margin: 6px;
        font-size: _vw(14);
        color: #656565;
    }
    .提示2{
        font-size: _vw(14);
        margin: 0px 0px 0px;
    }
}

.title_1{
    padding: 0px _vw(10);
    line-height: _vw(50);
    font-size: _vw(14);
    color: #8e8e8e;
    border-bottom: 1px solid #efefef;
}
.我的{
    position: relative;
    .胜负{
        position: absolute;
        width: _vw(44);
        left: _vw(60);
        top: _vw(-10);
    }
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
                &.name{
                    width: 0;
                    flex-grow: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: flex;
                    align-items: center;
                }
                &.金额2{
                    flex-shrink: 0;
                    img{
                        width: _vw(20);
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .庄家{
        background: linear-gradient(45deg, #fe5345, #feb850);
        padding: 2px 7px;
        color: #fff;
        border-radius: 20px;
        font-size: 12px;
        margin: 0px 0px 0px 5px;
    }
    .time{
        font-size: _vw(12);
        color: #ababab;
        flex: 1;
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
    .盈亏{
        font-size: _vw(12);
    }
}

</style>
