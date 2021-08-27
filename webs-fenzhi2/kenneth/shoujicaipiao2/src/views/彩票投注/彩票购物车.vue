<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">彩票购物车</h1>
            <!-- <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">类型</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="flex1">
                <div class="title_1">
                    第 {{即将开奖.IssueCode}} 期
                    <!-- <span class="红色字体">00:00:00</span> -->
                    <div class="红色字体" v-if="即将开奖.showTimer">
                       即将开奖：{{即将开奖.showTimer.h}}时{{即将开奖.showTimer.m}}分{{即将开奖.showTimer.s}}秒
                    </div>
                </div>
                <div class="btn_list">
                    <button type="button" class="mui-btn" @click="随机一注()">
                        <i class="mui-icon mui-icon-plusempty"></i>
                        机选一注
                    </button>
                    <button type="button" class="mui-btn" @click="购物车随机投注(5)">
                        <i class="mui-icon mui-icon-plusempty"></i>
                        机选五注
                    </button>
                </div>
            </div>
            <div class="flex2">
                <ul class="list_1">
                    <li v-for="(item, index) in 购物车列表" :key="index">
                        <div class="left_1">
                            <div>
                                <div class="title_2">玩法：</div>
                                <div>[{{item.玩法}}]</div>
                            </div>
                            <div>
                                <div class="title_2">号码：</div>
                                <div class="号码">{{item.content}}</div>
                            </div>
                            <div>
                                <div class="title_2">合计：</div>
                                <div>
                                    共<span class="红色字体">{{item.nums}}</span>注，金额<span class="红色字体">{{item | 计算金额}}</span>元，返利<span>{{item.point}}</span>%
                                </div>
                            </div>
                        </div>
                        <div class="right_1" @click="删除(index)">
                            <van-icon name="close" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="底部">
            <button type="button" class="mui-btn 清空" @click="清空()">清空</button>
            <div class="合计">合计<span class="红色字体">{{金额注数.注数}}</span>注<span class="红色字体">{{金额注数.金额}}</span>元</div>
            <button type="button" class="mui-btn 投注" @click="投注()">投注</button>
        </div>
    </div>
</template>

<script>
import { api_投注 } from "@/api/游戏彩票接口.js";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    filters:{
        计算金额(item){
            var 单位=['',1,0.1,0.01]
            var 金额 = item.price * item.nums * 单位[item.mode];
                金额 = Math.round(金额*10000) / 10000
            return 金额
        }
    },
    computed: {
        ...mapState({
            即将开奖:x=>x.投注.即将开奖,
            购物车列表:x=>x.投注.购物车列表,
            选号配置: x => x.投注.选号配置,
            彩票id:x=>x.投注.彩票id
        }),
        金额注数(){
            var 单位=['',1,0.1,0.01]
            var n = 0;
            var n2 = 0
            this.购物车列表.forEach(item => {
                n += Math.round(item.price * item.nums * 单位[item.mode]*100)/100 ;
                n = Math.round(n*100)/100
                n2 += item.nums
            });
            return {
                金额:n,
                注数:n2
            };
        }
    },
    created() {
        if(!this.即将开奖.IssueCode){
            history.back();
        }
    },
    methods: {
        ...mapActions({
            购物车随机投注:'投注/购物车随机投注',
            getUserInfo:'user/getUserInfo',
        }),
        ...mapMutations({
            加载中:"加载中"
        }),
        投注(){
            var obj={
                    lotteryCode:this.彩票id,
                    issueCode:this.即将开奖.IssueCode,
                    orderList:this.购物车列表
                }
            this.加载中(true)
            api_投注(obj).then(x=>{
                console.log(x)
                if(x.data.code==0){
                    history.back();
                    this.$toast('下注成功');
                    this.购物车列表.splice(0,this.购物车列表.length);
                    this.getUserInfo();
                }else{
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err=>{
                this.加载中(false)
                this.$toast('系统错误稍后再试')
            })
        },
        随机一注(){
            this.购物车随机投注();
        },
        删除(index){
            this.购物车列表.splice(index,1)
        },
        清空(){
            mui.confirm('是否要删除全部投注？','温馨提示',['取消','确定'],(value)=>{
                if(value.index==1){
                    this.购物车列表.splice(0,this.购物车列表.length);
                }
            },'div')
        }
    },
}
</script>

<style lang="scss" scoped>
.红色字体{
    @include textcolor;
}
.title_1{
    font-size: _vw(14);
    padding: _vw(5) _vw(10);
    background: #ffffff;
    border-bottom: 1px solid #d8d8d8;
}
.btn_list{
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    padding: _vw(5) _vw(10);
    font-size: _vw(12);
}

.mui-content{
    display: flex;
    flex-direction: column;
    .flex1{
        flex-shrink: 0;
    }
    .flex2{
        overflow: auto;
        padding-bottom: _vw(50);
        margin: _vw(10) 0px 0px 0px;
    }
}

.list_1{
    font-size: _vw(14);
    >li{
        display: flex;
        background: #ffffff;
        border-bottom: 1px solid #cccccc;
        padding: _vw(5) _vw(5) _vw(5) _vw(10);
        margin: _vw(5) 0px;
    }
    .left_1{
        width: 100%;
        >div{
            margin: _vw(5) 0px;
            display: flex;
            .title_2{
                color:#6f6f6f;
                white-space: nowrap;
                flex-shrink: 0;
            }
            .号码{
                width: 100%;
                word-break: break-all;
                padding: 0px _vw(10) 0px 0px;
            }
        }
    }
    .right_1{
        width: _vw(80);
        flex-shrink: 0;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: _vw(20);
        width: _vw(40);
    }

}

.底部{
    box-shadow: 0px 0px 2px 1px #cecece;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: _vw(5) _vw(10);
    button{
        flex-shrink: 0;
    }
    .合计{
        text-align: center;
        width: 100%;
    }
    .清空{
        @include textcolor;
        @include border-full(1px);
    }
    .投注{
        color: #ffffff;
        @include bgcolor;
    }
}


</style>