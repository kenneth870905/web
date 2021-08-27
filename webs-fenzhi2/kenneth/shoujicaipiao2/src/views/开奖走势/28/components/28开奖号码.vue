<template>
    <div>
        <ul class="开奖号" >
            <li class="定位">
                <div class="时间">时间</div>
                <div class="期数">期数</div>
                <div class="item item1">
                    <div >号码</div>
                    <div >大小单双</div>
                    <div >色波</div>
                </div>
            </li>
            <van-list :offset="10" v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li v-if="item.Content && index<查看条数" v-for="(item, index) in 开奖记录" :key="index">
                    <div class="时间">{{item.ResultDatetime | 时间}}</div>
                    <div class="期数">{{item.IssueCode}}</div>
                    <div class="item item2">
                        <div class="号码列表" v-if="type==0">
                            <div><span class="号码 蓝球">{{item.开奖号码[0]}}</span></div>
                            <div>+</div>
                            <div><span class="号码 蓝球">{{item.开奖号码[1]}}</span></div>
                            <div>+</div>
                            <div><span class="号码 蓝球">{{item.开奖号码[2]}}</span></div>
                            <div>=</div>
                            <div><span class="号码 红球">{{求和(item.开奖号码).和值}}</span></div>
                            <div>{{求和(item.开奖号码).大小}}{{求和(item.开奖号码).单双}}</div>
                            <div :class="色波(item.开奖号码)">{{色波(item.开奖号码)}}</div>
                        </div>
                    </div>
                </li>
            </van-list>
        </ul>
    </div>
</template>

<script>
import { 时间格式化 } from "@/assets/js/通用.js";
import { mapState } from 'vuex';
export default {
    name:"",
    components:{
    },
    data() {
        return {
            type:0,
            loading1:false,
            查看条数:0
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录
        })
    },
    filters:{
        时间(time){
            return 时间格式化('hh:mm',time)
        }
    },
    methods: {
        onLoad1(){
            setTimeout(() => {
                this.查看条数=this.查看条数+20;
                this.loading1=false;
            }, 500);
        },
        求和(list){
            var 和值= list.reduce((n,m) => parseInt(n) + parseInt(m) );
            return {
                和值:和值,
                大小:和值>13 ? '大' : "小",
                单双:和值%2==0 ? '双' :"单"
            }
        },
        色波(list){
            var number=list.reduce((n,m) => parseInt(n) + parseInt(m) );
            var 绿波号码=[1,4,7,10,16,19,22,25];
            var 蓝波号码=[2,5,8,11,17,20,23,26]
            var 红波号码=[3,6,9,12,15,18,21,24]
            var 灰波号码=[0,13,14,27]
            if(绿波号码.find(x=>x == number)){
                return '绿'
            }else if(蓝波号码.find(x=>x == number)){
                return '蓝'
            }else if(红波号码.find(x=>x == number)){
                return '红'
            }else if(灰波号码.find(x => x == number)){
                return '灰'
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖号{
    background: #ffffff;
    text-align: center;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    li{
        padding: _vw(10) _vw(5);
        display: flex;
        align-items: center;
        // border-block:
        border-bottom: 1px solid #efeff4;
    }
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
        color: #999999;
        font-size: _vw(13);
    }
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .item1{
        color: #212121;
        font-size: _vw(14);
        div{
            height: _vw(26);
            line-height: _vw(26);
            border-radius: _vw(26);
            padding: 0px _vw(10);
        }
        .active{
            color: #ffffff;
            background: #ff7614;
        }
    }
}

.号码{
    width: _vw(24);
    height: _vw(24);
    border-radius: 5px;
    text-align: center;
    font-size: _vw(12);
    line-height: _vw(24);
    border-radius: 100%;
    display: inline-block;
    color: #ffffff;
}
.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    font-size: _vw(14);
    .红球{
        background: $color;
        // background-image: url('~@/assets/bg/k3bg.png');
        // background-size: _vw(200) auto;
    }
    .蓝球{
        background: #0064ec;
    }
    .红{
        color: $color;
    }
    .蓝{
        color: #0064ec
    }
    .绿{
        color: #11c619;
    }
    .灰{
        color:#989899
    }
}


</style>
