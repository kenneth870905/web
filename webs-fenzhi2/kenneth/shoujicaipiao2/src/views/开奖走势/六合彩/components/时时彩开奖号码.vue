<template>
    <div>
        <ul class="开奖号" >
            <li class="定位">
                <div class="期数">期数</div>
                <div class="item item1">
                    <div @tap="type=0" :class="{'active':type==0}">号码</div>
                    <div @tap="type=1" :class="{'active':type==1}">总合</div>
                    <div @tap="type=2" :class="{'active':type==2}">特码</div>
                </div>
            </li>
            <!-- <li class="定位">
                <div class="期数">期数</div>
                <div class="item item2">正码</div>
                <div class="特码">特码</div>
                <div class="色波">色波</div>
                <div class="五行">生肖</div>
            </li> -->
            <van-list :offset="10" v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <li class="顶部2" v-if="type==0">
                    <div class="期数">期数</div>
                    <div class="item item2">正码</div>
                    <div class="特码">特码</div>
                    <div class="色波">色波</div>
                    <div class="五行">五行</div>
                </li>
                <li v-if="item.Content && index<查看条数" v-for="(item, index) in 开奖记录" :key="index">
                    <!-- <div class="时间">{{item.ResultDatetime | 时间}}</div> -->
                    <div class="期数 期数2">{{item.IssueCode.substring(4)}}{{item.IssueCode.length<11 ? '期' : ""}}</div>
                    <div class="item item2">
                        <div class="号码列表" v-if="type==0">
                            <div v-if="index1<item.开奖号码.length-1" v-for="(item1, index1) in item.开奖号码" :key="index1">
                                <span class="号码" :class="getColor(item1).color">{{item1}}</span>
                                <div class="生肖">{{getColor(item1).sx}}</div>
                            </div>
                        </div>
                        <div class="大小列表" v-if="type==1">
                            <span class="">{{求和(item.开奖号码).和值}}</span>
                            <span class="号码" :class="{active:求和(item.开奖号码).大小=='大'}">{{求和(item.开奖号码).大小}}</span>
                            <span class="号码" :class="{active:求和(item.开奖号码).单双=='双'}">{{求和(item.开奖号码).单双}}</span>
                        </div>
                        <div class="单双列表" v-if="type==2">
                            <span class="">{{item.开奖号码[6]}}</span>
                            <span :class="{红:item.开奖号码[6] >24}" >{{item.开奖号码[6] >24 ? '大' : "小"}}</span>
                            <span :class="{红:item.开奖号码[6]%2==0}">{{item.开奖号码[6]%2==0 ? '双' : "单"}}</span>
                            <span class="">{{getColor(item.开奖号码[6]).sx}}</span>
                            <span :class="getColor(item.开奖号码[6]).color">{{getColor(item.开奖号码[6]).color}}波</span>
                        </div>
                    </div>
                    <div class="特码" v-if="type==0">
                        <div>
                            <span class="号码" :class="getColor(item.开奖号码[item.开奖号码.length-1]).color">{{item.开奖号码[item.开奖号码.length-1]}}</span>
                            <div class="生肖">{{getColor(item.开奖号码[item.开奖号码.length-1]).sx}}</div>
                        </div>
                    </div>
                    <div class="色波 font14" v-if="type==0" :class="getColor(item.开奖号码[6]).color">
                        {{getColor(item.开奖号码[6]).color}}波
                    </div>
                    <div class="五行 font14" v-if="type==0">
                        {{getColor(item.开奖号码[item.开奖号码.length-1]).wu}}
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
    components:{
    },
    data() {
        return {
            type:0,
            查看条数:0,
            loading1:false
        }
    },
    filters:{
        时间(time){
            return 时间格式化('hh:mm',time)
        }
    },
    computed: {
        ...mapState({
            marSixNums:x=>x.marSixNums,
            开奖记录:x=>x.开奖走势.开奖记录
        })
    },
    methods: {
        onLoad1(){
            setTimeout(() => {
                this.查看条数=this.查看条数+20;
                this.loading1=false
            }, 500);
        },
        getColor(number){
            var colorCode=this.marSixNums.nums[number];
            return colorCode;
        },
        求和(list){
            var 和值= list.reduce((n,m) => parseInt(n) + parseInt(m) );
            return {
                和值:和值,
                大小:和值 >=175 ? '大' :'小',
                单双:和值%2==0 ? '双':"单",

            }
        }
    },
    mounted() {
        console.log(this.求和([1,1,2,3,4]))
    },
}
</script>

<style lang="scss" scoped>
.顶部2{
    background: #eee;
    font-size: _vw(14);
    height: 32px;
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
.定位{
    position: sticky;
    top: 0px;
    font-size: _vw(14);
    background: #ffffff;
    height: 38px;
}
li{
    // padding: _vw(10) _vw(5);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #efeff4;
    height: _vw(56);
    >div{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    >div:not(:nth-child(1)){
        border-left: 1px solid #efeff4;
    }
}
.开奖号{
    background: #ffffff;
    text-align: center;
    
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
    }
    .期数2{
        color: #999999;
        font-size: _vw(12);
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
    &.蓝{
        background: #51abf0;
    }
    &.绿{
        background: #6acc7b;
    }
    &.红{
        background: $color;
    }
    &.生肖{
        font-size: _vw(12);
    }
}
.特码{
    width: _vw(40);
}
.色波{
    width: _vw(40);
}
.五行{
    width: _vw(40);
}

.生肖{
    font-size: _vw(12);
}
.font14 {
    font-size: _vw(14);
}


.单双列表,
.大小列表{
    display: flex;
    justify-content: space-between;
    font-size: _vw(14);
    .号码{
        background: #b2b2b2;
        color: #ffffff;
    }
    .号码.active{
        background: #ff7614;
    }
    .红色字体{
        color: $color;
    }
    .蓝色字体{
        color: #0064ec
    }
    .绿色字体{
        color: #11c619;
    }
}




.龙虎列表,
.单双列表,
.大小列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
}
.大小,
.单双{
    width: _vw(22);
    height: _vw(22);
    border-radius: 5px;
    text-align: center;
    font-size: _vw(12);
    line-height: _vw(22);
    color: #ffffff;
    background: #b2b2b2;
    &.active{
        background: #ff7614
    }
}
.龙虎列表{
    .active{
        color: #ff7614;        
    }
    span{
        font-size: _vw(14);
    }
}

</style>
