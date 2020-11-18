<template>
    <div class="确认弹框">
        <div>
            <ul class="内容">
                <van-icon class="关闭" name="clear" @click="设置state(['显示确认投注',false])"/>
                <li class="期数">
                    <div>{{即将开奖.IssueCode}}</div>
                    <div class="红色字体">{{即将开奖.showTimer.h+':'+即将开奖.showTimer.m+':'+即将开奖.showTimer.s}}</div>
                </li>
                <li class="text_1"><span class="title_2">选号：</span><span class="红色字体 text_2">{{待确认投注.content}}</span></li>
                <li class="滑块">
                    <van-slider v-model="待确认投注.point" :step="1" :max="13" :min="0"></van-slider>
                    <span v-show="拖动中" :style="{'left':待确认投注.point/13*100+'%'}">{{待确认投注.point}}</span>
                </li>
                <li class="text_1">返利：<span class="红色字体">{{待确认投注.point}}</span></li>
                <li class="text_1">赔率：<span class="红色字体">{{赔率}}</span></li>
                <li class="圆角分">
                    <div class="title_1">注单金额</div>
                    <div class="金额">
                        <van-stepper class="单价" v-model="待确认投注.price" :integer="true"/>
                        <div class="单位">
                            <span @click="待确认投注.mode=1" :class="{'active':待确认投注.mode==1}">元</span>
                            <span @click="待确认投注.mode=2" :class="{'active':待确认投注.mode==2}">角</span>
                            <span @click="待确认投注.mode=3" :class="{'active':待确认投注.mode==3}">分</span>
                        </div>
                    </div>
                </li>
                <li class="text_1">注数：<span class="红色字体">{{注数}}</span>注</li>
                <li class="text_1">总额：<span class="红色字体">{{总金额}}</span>元</li>
                <li class="btn_1" @click="确定()">
                    确定
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
    name:"",
    data() {
        return {
            拖动中:false,
            滑块定时器:"",
            lotteryCode: "",    //彩票编号
            issueCode: ""       //期数
        }
    },
    computed: {
        ...mapState({
            待确认投注:x=>x.投注.待确认投注,
            玩法三级:x=>x.投注.玩法三级,
            即将开奖:x=>x.投注.即将开奖,
            选号配置:x=>x.投注.选号配置
        }),
        ...mapGetters({
            注数:'投注/注数',
            总金额:'投注/总金额' 
        }),
        赔率(){
            if(typeof this.玩法三级.Odds=='string'){
                var number = this.玩法三级.Odds * (100 - this.待确认投注.point) / 100
                return Math.round(number*1000)/1000
            }else if(typeof this.玩法三级.Odds=='object'){
                var this_1=this;
                var list=JSON.parse(JSON.stringify(this.玩法三级.Odds));
                for (let i = 0; i < list.length; i++) {
                    list[i]=list[i] * (100 - this_1.待确认投注.point) / 100
                    list[i] = Math.round(list[i]*1000)/1000
                }
                return list
            }else if(typeof this.玩法三级.OddKeys){
                console.log(this.选号配置.获取投注)
                var this_1=this;
                var list=[];
                this.选号配置.获取投注.list.forEach(item => {
                    var 计算后赔率 = item.赔率*(100 - this_1.待确认投注.point ) / 100;
                        计算后赔率 = Math.round(计算后赔率*1000)/1000
                    list.push(item.name+':' +  计算后赔率)
                });
                return list.join('|')
            }
        }
    },
    methods: {
        ...mapMutations({
            设置state:'投注/设置state' 
        }),
        ...mapActions({
            添加至购物车:'投注/添加至购物车'
        }),
        确定(){
            console.log('确定')
            var 待确认投注 = Object.assign({},this.待确认投注)
            this.添加至购物车(待确认投注)
            this.$parent.清空();
            this.$router.push('/shopping')
            console.log('跳转')
        }
    },
    watch: {
        '待确认投注.point'(){
            try {
                clearTimeout(this.滑块定时器)
            } catch (error) {}
            this.拖动中=true;
            this.滑块定时器 = setTimeout(() => {
                this.拖动中=false;                    
            }, 1000);
        }
    },
}
</script>

<style lang="scss" scoped>
.确认弹框{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    >div{
        overflow: auto;
        width: 100%;
        max-height: 100%;
        overflow: auto;
        padding: 10px 0px;
    }
}
.内容{
    margin: 0px auto;
    width: _vw(300);
    background: #ffffff;
    border-radius: _vw(10);
    padding: _vw(10);
    font-size: _vw(15);
    position: relative;
    .关闭{
        position: absolute;
        right: _vw(5);
        top: _vw(5);
        color: #656565;
        font-size: _vw(25);
    }
    .期数{
        font-size: _vw(14);
        text-align: center;
        font-weight: bold;
        padding: _vw(5) 0px _vw(5);
        border-bottom: 1px solid #cccccc;
        margin: 0px 0px _vw(5);
    }
    .红色字体{
        @include textcolor;
    }
    .滑块{
        position: relative;
        margin: _vw(20) 10px;
        /deep/ .van-slider__button{
            background: #1989fa;
        }
        span{
            position: absolute;
            background: rgba(255,255,255,0.9);
            border-radius: 5px;
            font-size: _vw(30);
            line-height: _vw(40);
            border: 1px solid #cccccc;
            width: _vw(40);
            text-align: center;
            bottom: _vw(20);
            margin-left: _vw(-20);
        }
    }
    .圆角分{
        margin: _vw(10) 0px;
        .title_1{
            margin: 0px 0px _vw(5);
        }
        /deep/ .van-stepper__input{
            // width: 32px;
            height: _vw(28);
            margin: 0 2px;
            font-size: _vw(14);
            padding: 0;
            background-color: #f2f3f5;
            border: none;
        }
        /deep/ .van-stepper__minus, 
        /deep/ .van-stepper__plus{
            width: _vw(28);
            height: _vw(28);
            flex-shrink: 0;
        }
        .金额{
            display: flex;
            .单价{
                width: 50%;
                display: flex;
            }
        }
        .单位{
            width: 50%;
            margin: 0px 0px 0px _vw(10);
            background: #f2f3f5;
            line-height: _vw(28);
            text-align: center;
            span{
                display: inline-block;
                width: calc(100% / 3);
            }
            .active{
                @include bgcolor;
                color: #ffffff;        
            }
        }
    }
    .btn_1{
        @include bgcolor;
        text-align: center;
        padding: _vw(8);
        color: #ffffff;
        margin: _vw(10) 0px 0px;
    }
    .text_1{
        display: flex;
        .title_2{
            flex-shrink: 0;
            white-space: nowrap;
        }
        .text_2{
            width: 100%;
            word-break: break-all;
            max-height: _vw(50);
            overflow: auto;
        }
    }
}
</style>