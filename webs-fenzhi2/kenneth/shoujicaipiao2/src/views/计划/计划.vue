<template>
    <div class="活动">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title" @click.self="显示选房=false">
                <!-- <i class="icon iconfont icon-wenhao-"></i> -->
                <van-icon name="replay" class="刷新" @click="获取计划()"/>
                <van-button type="default" size="small" plain @click="显示选房=true">
                    {{计划.Title}}
                    <van-icon name="arrow-down" />
                </van-button>
            </h1>
            <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="showPicker=true">
                {{计划.method}}
                <van-icon name="arrow-down" />
            </button>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="list2 header1">
                <li>
                    <div>期号</div>
                    <div>号码</div>
                    <div>计划</div>
                    <div>当前码量</div>
                    <div>累计码量</div>
                    <div>赢/亏</div>
                    <div>时间</div>
                </li>
            </ul>
            <ul class="list2 box_1">
                <li v-for="(item, index) in 计划.list" :key="index">
                    <div>
                        {{item.IssueCode.substring(item.IssueCode.length-3)}}
                    </div>
                    <div>
                        <div v-if="item.Result">{{item.Result}}</div>
                        <div v-else class="待开">待开</div>
                    </div>
                    <div class="号码2">
                        <span v-for="(item1, index) in item.Plan.split('|')" :class="{中奖:是否中奖(item1,item)}" :key="index">{{item1}}</span>
                    </div>
                    <div>{{item.CurrentCost}}</div>
                    <div>{{item.TotalCost}}</div>
                    <div :class="item.ProfitLoss >=0 ? '赢':'亏'">
                        {{item.ProfitLoss}}
                    </div>
                    <div>
                         {{item.ResultDate | filter_t}}
                    </div>
                </li>
            </ul>
        </div>
        <div class="选房" v-show="显示选房">
            <div class="shade" @click="显示选房=false"></div>
            <ul class="list1">
                <li v-for="(item, index) in 计划.Lotterys" :key="index">
                    <div @click="选择彩票(item)">
                        {{item.LotteryName}}
                    </div>
                </li>
            </ul>
        </div>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker show-toolbar :columns="计划.Methods" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
    </div>
</template>

<script>
import { 时间格式化 } from "@/assets/js/通用.js";
import { mapState, mapActions , mapMutations} from "vuex";
export default {
    name: "",
    data() {
        return {
            显示选房: false,
            value: true,
            showPicker:false
        }
    },
    computed: {
        ...mapState({
            计划: x => x.计划
        }),
    },
    filters: {
        filter_t(time) {
            try {
                return 时间格式化('hh:mm', time)
            } catch (error) {
                return time
            }
        }
    },
    methods: {
        ...mapMutations({
            加载中:"加载中"
        }),
        ...mapActions({
            获取计划: "计划/获取计划"
        }),
        是否中奖(n,obj){
            if(!obj.Result){
                return false
            }
            var list = obj.Result.split('|');
            return list.includes(n)
        },
        onConfirm(value){
            console.log(value);
            this.计划.method=value;
            this.showPicker=false;
            this.获取计划();
        },
        选择彩票(item){
            console.log(item);
            this.显示选房 = false;
            this.计划.Title = item.LotteryName;
            this.计划.LotteryCode = item.LotteryCode;
            this.计划.method = '';
            this.获取计划();
        }
    },
    mounted() {
        this.获取计划();
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    display: flex;
    flex-direction: column;
    .header1{
        flex-shrink: 0;
    }
    .box_1{
        overflow: auto;
    }
}


.list2{
    &.header1{
        background: #ffffff;
    }
    li{
        display: flex;
        font-size: _vw(12);
        &:nth-child(2n){
            background: #ffffff;
        }
        >div{
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:not(:nth-child(1)){
                border-left: 1px solid #e0e0e0;
            }
            &:nth-child(1){
                width: 30px;
            }
            &:nth-child(2){
                width: 70px;
            }
            &:nth-child(3){
                // width: 90px;
                flex-grow: 1;
            }
            &:nth-child(4){
                width: 50px;
            }
            &:nth-child(5){
                width: 50px;
            }
            &:nth-child(6){
                width: 45px;
            }
            &:nth-child(7){
                width: 40px;
            }
        }
    }
    .待开 {
        color: #ec0022;
    }
    .中奖 {
        position: relative;
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        border: 1px solid #ec0022;
        border-radius: 100%;
        display: inline-block;
        &::after {
            position: absolute;
            content: "中";
            top: -10px;
            right: -10px;
            font-size: 12px;
            color: #ec0022;
        }
    }
    .赢{
        color: red;
    }
    .亏{
        color: #005dcc;
    }
    .号码2 {
        span {
            margin: 0px 2px;
        }
    }
}

.mui-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .icon-wenhao- {
        margin: 0px _vw(5) 0px 0px;
    }
    .刷新{
        margin: 0px 15px 0px 0px;
    }
    .van-button--plain {
        background: none;
        color: #ffffff;
    }
}

.选房 {
    position: absolute;
    top: 44px;
    left: 0px;
    width: 100%;
    bottom: 0px;
    .shade {
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
    .list1 {
        position: relative;
        z-index: 1;
        display: flex;
        flex-wrap: wrap;
        min-height: _vw(140);
        align-content: baseline;
        z-index: 1;
        background: #ffffff;
        font-size: _vw(12);
        color: #4e4e4e;

        li {
            width: calc(100% / 3);
            padding: 0px _vw(5);
            margin: _vw(5) 0px;
        }
        div {
            border: 1px solid #cccccc;
            text-align: center;
            padding: 5px;
        }
    }
}
</style>