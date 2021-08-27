<template>
    <div class="开奖码号">
        <div class="头部"> 
            <ul class="开奖号" >
                <li class="定位">
                    <div class="时间">时间</div>
                    <div class="期数">期数</div>
                    <div class="item item1">
                        <div @tap="type=0" :class="{'active':type==0}">号码</div>
                        <div @tap="type=1" :class="{'active':type==1}">大小</div>
                        <div @tap="type=2" :class="{'active':type==2}">
                            单双
                        </div>
                        <div @tap="type=3" :class="{'active':type==3}">
                            冠军/龙虎
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="内容1">
            <van-list :offset="10" v-model="loading1" :finished="开奖记录.length<=查看条数" :finished-text="开奖记录.length==0 ? '暂无相关数据' : '没有更多了'" @load="onLoad1">
                <ul class="开奖号" >
                    <li v-if="查看条数>index && item.Content" v-for="(item, index) in 开奖记录" :key="index">
                        <div class="时间">{{item.ResultDatetime | 时间}}</div>
                        <div class="期数">{{item.IssueCode.substring(4)}}</div>
                        <div class="item item2">
                            <div class="号码列表" v-if="type==0">
                                <i class="号码" :class="'号码'+item1" v-for="(item1, index1) in item.开奖号码" :key="index1">{{item1}}</i>
                            </div>
                            <div class="大小列表" v-if="type==1">
                                <span class="大小" :class="{'active':item1>=6}" v-for="(item1 , index1) in item.开奖号码" :key="index1">{{item1 >= 6 ? '大' :"小"}}</span>
                            </div>
                            <div class="单双列表" v-if="type==2">
                                <span class="单双" :class="{'active':item1%2 ==0}" v-for="(item1 , index1) in item.开奖号码" :key="index1">{{item1%2==0 ? '双' :"单"}}</span>
                            </div>
                            <div class="龙虎列表" v-if="type==3">
                                <span>{{求和(item.开奖号码).和值}}</span>
                                <span :class="{'红色':求和(item.开奖号码).大小=='大'}">{{求和(item.开奖号码).大小}}</span>
                                <span :class="{'红色':求和(item.开奖号码).单双=='双'}">{{求和(item.开奖号码).单双}}</span>
                                <span class="单双" :class="{'active':item2=='龙'}" v-for="(item2, index2) in 求和(item.开奖号码).龙虎" :key="index2">{{item2}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
        
    </div>
</template>

<script>
import { 时间格式化 } from "@/assets/js/通用.js";
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            loading1:false,
            type:0,
            查看条数:0
        }
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
            var 和值= parseInt(list[0]) + parseInt(list[1]) ;
            // list.forEach(item => {
            //     和值=和值+parseInt(item)
            // });
            return {
                和值:和值,
                大小:和值>=12 ? '大':"小",
                单双:和值%2==0 ? '双':"单",
                龙虎:[
                    list[0]>list[9] ? '龙':'虎',
                    list[1]>list[8] ? '龙':'虎',
                    list[2]>list[7] ? '龙':'虎',
                    list[3]>list[6] ? '龙':'虎',
                    list[4]>list[5] ? '龙':'虎',
                ]
            }
        }
    },
    computed: {
        ...mapState({
            开奖记录:x=>x.开奖走势.开奖记录 
        })
    },
}
</script>

<style lang="scss" scoped>
.红色{
    color: red;
}
.开奖码号{
    height: 100%;
    display: flex;
    flex-direction: column;
    .头部{
        flex-shrink: 0;
    }
    .内容1{
        height: 100%;
        flex-grow: 1;
        overflow: auto;
    }
}

.开奖号{
    background: #ffffff;
    text-align: center;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    >li{
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
        // background-image: url('~@/assets/bg/pk10.png');
        // background-size: auto _vw(24);
        border-radius: 5px;
        text-align: center;
        font-size: _vw(12);
        line-height: _vw(22);
        color: #ffffff;
        // font-style:italic
        padding-right: _vw(3);
        text-shadow: 0px 1px 0px #000000;
    }
    $colorlist: #eedd0f #0092dd #4b4b4b #ff7600 #17e2e5 #5234ff #bfbfbf #ff2600 #780b00 #07bf00 ;
    @each $color1 in $colorlist{
        $i:index($colorlist, $color1);
        @if ($i<10){
            $i:'0'+$i
        }
        .号码#{$i}{
            background: $color1;
        }
    }
    // .号码01{
    //     background-position: _vw(-178) 0px;
    // }
    // .号码02{
    //     background-position: _vw(-153) 0px;
    // }
    // .号码03{
    //     background-position: _vw(-127) 0px;
    // }
    // .号码04{
    //     background-position: _vw(-102) 0px;
    // }
    // .号码05{
    //     background-position: _vw(-1) 0px;
    // }
    // .号码06{
    //     background-position: _vw(-26) 0px;
    // }
    // .号码07{
    //     background-position: _vw(61) 0px;
    // }
    // .号码08{
    //     background-position: _vw(-51) 0px;
    // }
    // .号码09{
    //     background-position: _vw(-77) 0px;
    // }
    // .号码10{
    //     background-position: _vw(35) 0px;
    // }
    
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
    span{
        width: _vw(22);
        font-size: _vw(14);
    }
}

</style>
