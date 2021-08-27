<template>
    <div>
        <ul class="开奖号" >
            <li class="定位">
                <div class="时间">时间</div>
                <div class="期数">期数</div>
                <div class="item item1">
                    <div @tap="type=0" :class="{'active':type==0}">号码</div>
                    <!-- <div @tap="type=1" :class="{'active':type==1}">大小</div> -->
                    <!-- <div @tap="type=2" :class="{'active':type==2}">
                        单双
                    </div> -->
                    <div @tap="type=1" :class="{'active':type==1}">
                        总和/形态
                    </div>
                </div>
            </li>
            <van-list :offset="10" v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li v-if="item.Content && index<查看条数" v-for="(item, index) in 开奖记录" :key="index">
                    <div class="时间">
                        {{item.ResultDatetime | 时间(当前彩票)}}
                    </div>
                    <div class="期数">{{item.IssueCode.substring(4)}}</div>
                    <div class="item item2">
                        <div class="号码列表" v-if="type==0">
                            <span class="号码 红球" v-for="(item1 , index1) in item.开奖号码" :key="index1">{{item1}}</span>
                        </div>
                        <div class="龙虎列表" v-if="type==1">
                            <span class="红色">{{计算和值(item.开奖号码).和值}}</span>
                            <span :class="{'红色':计算和值(item.开奖号码).大小=='大'}">{{计算和值(item.开奖号码).大小}}</span>
                            <span :class="{'红色':计算和值(item.开奖号码).单双=='双'}">{{计算和值(item.开奖号码).单双}}</span>
                            <!-- <span class="红色字体">9</span>
                            <span class="红色字体">5</span> -->
                        </div>
                    </div>
                </li>
            </van-list>

        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { 时间格式化 } from "@/assets/js/通用.js";

export default {
    name:"",
    data() {
        return {
            type:0,
            loading1:false,
            查看条数:0
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录,
            当前彩票:x=>x.开奖走势.当前彩票
        })
    },
    filters:{
        时间(time,当前彩票){
            if(当前彩票.id=='30001' || 当前彩票.id=='30000'){
                return 时间格式化('MM.dd',time)
            }else{
                return 时间格式化('hh:mm',time)
            }
        }
    },
    methods: {
        onLoad1(){
            this.查看条数=this.查看条数+20;
            this.loading1=false
        },
        计算和值(list){
            var 和值= list.reduce((n,m) => parseInt(n) + parseInt(m) );
            var 大小=和值>13 ? '大':"小";
            var 单双=和值%2==0 ? '双' : "单";
            return {
                和值,
                大小,
                单双
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖号{
    background: #ffffff;
    text-align: center;
    margin: 0;
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

.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    .号码{
        width: _vw(22);
        height: _vw(22);
        border-radius: 5px;
        border-radius: 100%;
        text-align: center;
        font-size: _vw(12);
        line-height: _vw(22);
        color: #ffffff;
        // text-shadow: 0px 1px 0px #000000;
    }
    .蓝球{
        background: #0064ec;
    }
    .红球{
        background: $color;
    }
}

.龙虎列表,
.单双列表,
.大小列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.龙虎列表{
    font-size: _vw(14);
    span{
        width: 30%;

    }
    .红色{
        color: $color;
    }
}

</style>
