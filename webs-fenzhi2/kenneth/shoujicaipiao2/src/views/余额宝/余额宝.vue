<template>
    <div>
        <div class="mui-content mui-fullscreen">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">余额宝</h1>
                <!-- <a @click="说明()" class="mui-btn mui-btn-link mui-pull-right">
                    <i class="icon iconfont icon-wenhao-"></i>
                </a> -->
                <a @click="$router.push('/yeb/szmx')" class="mui-btn mui-btn-link mui-pull-right">
                    <i class="icon_记录 icon iconfont icon-1"></i>
                </a>
            </header>
            <div class="内容">
                <div class="白底">
                    <div class="title_1">
                        总金额(元)
                        <van-icon :name="查看 ? 'eye-o' : 'closed-eye'" @click="查看=!查看"/>
                        <!-- closed-eye -->
                    </div>
                    <div class="金额">
                        {{查看 ? profit.YuBaoMoney : '****'}}
                    </div>
                    <div class="昨日收益">
                        当前收益<b>{{查看 ? profit.TodayProfit : '****'}}</b>元
                    </div>
                    <div>
                        <div class="昨日收益">
                            收益时长：
                            <span v-if="计算时间.天数!=0"><b>{{计算时间.天数}}</b>天</span>
                            <span v-if="计算时间.天数!=0 || 计算时间.小时!=0"><b>{{计算时间.小时}}</b>小时</span>
                            <span><b>{{计算时间.分钟}}</b>分钟</span>
                        </div>
                    </div>
                    <div class="收益">
                        <div>
                            <div>累计收益(元)</div>
                            <div>{{查看 ? profit.AllProfit : '****'}}</div>
                        </div>
                        <div>
                            <div>年化收益率(%)</div>
                            <div>{{ profit.AnnualizedRate}}</div>
                        </div>
                    </div>
                    <div class="btn_list">
                        <div @click="$router.push('/yeb/zr?t=2')">转出</div>
                        <div @click="$router.push('/yeb/zr?t=1')">转入</div>
                    </div>
                </div>
            </div>

            <div class="说明">
                <div class="title_1 mui-text-center">收益说明</div>
                <div class="text_1">
                    <div class="红色 mui-text-center">本余额宝收益每分钟结算一次</div>
                    <div>
                        <div>①&nbsp;收益计算方式：</div>
                        <div class="indent">转入金额 x 每分钟收益率 x 分钟数</div>
                    </div> 
                    <div>
                        <div>②&nbsp;每分钟收益率为：</div>
                        <div class="indent">年收益率 ÷ 365天 ÷ 24小时 ÷ 60分钟</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_余额宝详情 , api_余额宝详情2} from "@/api/资金接口.js";
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name: "",
    data() {
        return {
            profit: {},
            echartsDict: [],
            查看:true,
            定时器:""
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo 
        }),
        计算时间(){
            if(this.profit.Minutes){
                var 分钟=this.profit.Minutes;
            }else{
                var 分钟=0
            }
            var 一天 = 24 * 60 //一天的时间
            var 一小时 = 60;
            var 天数= parseInt(分钟 /一天)
            var 小时= parseInt( (分钟-一天*天数)  /一小时) 
            var 分钟1 = 分钟 - 一天*天数 - 小时*一小时;
            return {
                天数:天数,
                小时:小时,
                分钟:分钟1
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        说明(){
            var html='<div style="text-align:left">'+
                        '<div style="font-size: 17px;">本余额宝收益每分钟结算一次</div>'+
                        '<div style="margin: 8px 0px;"><div>收益计算方式：</div>转入金额 x 每分钟收益率 x 分钟数</div> '+
                        '<div><div>每分钟收益率为：</div>年收益率 ÷ 365天 ÷ 24小时 ÷ 60分钟</div> '+
                    '</div>'
            mui.alert(html,'收益说明','确定',()=>{},'div')
        },
        initChart() {
            this.chart = echarts.init(this.$refs.myEchart);
            // 把配置和数据放这里
            this.chart.setOption({
                // color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    // data: ['1', '2', '3', '4', '5', '6', '7'],
                    data:this.echartsDict.category,
                    axisLine: {
                        lineStyle: {
                            color: 'red',
                        }
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: 'red',
                        }
                    },
                }],
                series: [{
                    name: '金额',
                    type: 'line',
                    // barWidth: '60%',
                    data:this.echartsDict.series
                    // data: [10, 52, 200, 334, 390, 330, 220]
                }]
            })
        },
        初始化(){
            api_余额宝详情2().then(x=>{
                this.profit = x.data;
                this.加载中(false)
            }).catch(err=>{
                this.$toast('系统错误，稍后再试！')
                this.加载中(false)
            })
        }
    },
    mounted() {
        this.加载中(true)
        this.初始化();

        this.定时器 =  setInterval(() => {
            this.初始化();
        }, 1000 * 60);
    },
    destroyed() {
        try {
            clearInterval(this.定时器)
        } catch (error) {}
    },
}
</script>

<style lang="scss" scoped>
.icon_记录{
    font-size: _vw(20)
}
.红色{
    color: red;
}
.indent{
    text-indent: _vw(20);
}

.mui-bar-nav{
    box-shadow: none;
    position: relative;
}
.mui-content{
    background: #ffff;
}

.内容{
    background: linear-gradient(180deg,#ec0909,#ffffff);
    @for $i from 1 through length($colorList) {
        $item:  nth($colorList, $i );
        .C_#{map-get($item, class)} & {
            // background-color: map-get($map: $item, $key:color )
            background: linear-gradient(180deg,map-get($map: $item, $key:color ) ,#ffffff);
        }
    }
    // linear-gradient(45deg, black, transparent)
    padding: _vw(10) _vw(10) 0px;
    text-align: center;
    .白底{
        // background:rgba(255,255,255,0.9);
        background: #ffffff;
        padding: 50px 10px 20px;
        border-radius: 5px;
        box-shadow: 0px 2px 5px 1px #d2d2d2;
    }
    .title_1{
        color: #7d7d7d;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 20px;
            margin: 0px 0px 0px 10px;
        }
    }
    .金额{
        font-size: 30px;
        margin: 10px;
    }
    .昨日收益{
        padding: 0px 20px;
        font-size: 14px;
        line-height: _vw(30);
        display: inline-block;
        margin: 0px auto;
        color: #7d7d7d;
        background: #ecebea;
        border-radius: _vw(30);
        margin: 0px 0px 5px 0px;
        b{
            color: #ec0909;
        }
    }
}

.收益{
    display: flex;
    margin: 60px 0px 35px 0px;
    >div{
        width: 50%;
        >div:nth-child(1){
            font-size: 14px;
            color: #ababab;
            margin: 0px 0px 5px 0px;
        }
        >div:nth-child(2){
            font-weight: bold;
            font-size: 15px;
        }
    }
}

.btn_list{
    display: flex;
    >div{
        width: 50%;
        line-height: 44px;
        margin: 0px 5px;
        border-radius: 3px;
    }
    >div:nth-child(1){
        background: #f3e8df;
        color: #fe7c26;
    }
    >div:nth-child(2){
        @include bgcolor;
        color: #ffff;
    }
}

.说明{
    padding: 10px 10px 10px;
    font-size: 14px;
    margin: _vw(20) _vw(10) _vw(10) _vw(10);
    border-radius: _vw(5);
    border:1px solid #ecebea;
    background: #fbfbfb;
    .title_1{
        font-size: 18px;
        margin: 0px 0px 3px;
    }
    .text_1{
        color: #585858;
    }
}

</style>
