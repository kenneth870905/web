<template>
    <div class="底部">

        <div class="购物车">
            <div class="内容">
                <i class="关闭 iconfont icon-guanbi1" @click="官方购物车.show=false"></i>
                <!-- <span class="清空">清空</span> -->
                <div class="header_1">订单确认</div>
                <ul class="mui-table-view list1">
                    <li v-if="官方玩法投注.相乘赔率" class="mui-table-view-cell item">
                        <div class="号码">{{官方玩法投注.list.length}} 串 1</div>
                        <span class="赔率 红色字体">赔率:{{官方玩法投注.相乘赔率}}</span>
                        <span class="金额">{{官方购物车.金额}}元</span>
                        <!-- <span class="icon_box" @click="删除(item)" v-if="item.code"><i class="icon iconfont icon-jian"></i></span> -->
                    </li>

                    <li class="mui-table-view-cell item" v-for="(item, index) in 选号配置.官方玩法投注.newlist" :key="index">
                        <div class="号码" v-if="item.parentkey">{{item.parentkey}}</div>
                        <div class="号码">
                            <!-- <span v-for="(item1, index) in item.name.split(',')" :key="index">{{item1}},</span> -->
                            {{item.name}}
                        </div>
                        <span class="赔率 红色字体">赔率:{{item.赔率}}</span>
                        <span class="金额" v-show="!官方玩法投注.相乘赔率">{{官方购物车.金额}}元</span>
                        <span class="icon_box" @click="删除(item)" v-if="item.code"><i class="icon iconfont icon-jian"></i></span>
                    </li>
                </ul>
                <ul class="详情">
                    <li>期数：{{即将开奖.IssueCode}}</li>
                    <li>注数：<span class="红色字体">{{选号配置.官方玩法投注.注数}}</span>注</li>
                    <li>总额：<span class="红色字体">{{总金额}}</span>元</li>
                    <li class="item">
                        <span>单注：</span>
                        <input min="0" type="number" v-model="官方购物车.金额">
                        <span>元</span>
                    </li>
                </ul>
                <ul class="btn_1">
                    <li @click="官方购物车.show=false">取消</li>
                    <li @click="确认投注()">确认投注</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import { api_官方投注 } from "@/api/游戏彩票接口.js";
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            userinfo: x => x.user.userinfo,
            官方购物车: x => x.投注.官方购物车,
            即将开奖: x => x.投注.即将开奖,
            选号配置: x => x.投注.选号配置,
            彩票id: x => x.投注.彩票id
        }),
        总金额() {
            return this.官方购物车.金额 * this.选号配置.官方玩法投注.注数
        },
        官方玩法投注() {
            return this.选号配置.官方玩法投注
        }
    },
    methods: {
        ...mapMutations({
            加载中: "加载中",
        }),
        ...mapActions({
            getUserInfo:'user/getUserInfo'
        }),
        删除(item) {
            item.active = false
        },
        清空() {
            this.选号配置.list.forEach(item => {
                item.选号.forEach(x => {
                    // x.active=false;
                    this.$set(x, 'active', false)
                })
            });
        },
        确认投注() {
            if (this.选号配置.官方玩法投注.list.length == 0) {
                this.$toast('请选择号码')
                return
            }
            var orderList = [];
            this.选号配置.官方玩法投注.list.forEach(item => {
                orderList.push({ 
                    key: item.code, 
                    price: this.官方购物车.金额 ,
                    // content:''
                })
            });
            // model[issueCode]: 20190904176
            // model[lotteryCode]: 70000
            // model[methodCode]: 102
            // model[isTeamBuy]: false
            // model[orderList][0][key]: B_No09
            // model[orderList][0][price]: 3
            // model[orderList][1][key]: B_No25
            // model[orderList][1][price]: 3
            var obj = {
                model: {
                    issueCode: this.即将开奖.IssueCode,
                    lotteryCode: this.彩票id,
                    methodCode: this.选号配置.玩法.Code,
                    orderList: this.选号配置.官方玩法投注.orderlist ? this.选号配置.官方玩法投注.orderlist : orderList ,
                    price: this.官方购物车.金额,
                },
                teamBuyOdds: 0
            }
            this.加载中(true)
            api_官方投注(obj).then(x => {
                console.log(x)
                if (x.data.code == 0) {
                    this.$toast('下注成功');
                    this.官方购物车.show = false;
                    this.清空()
                    this.getUserInfo();
                } else {
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err => {
                this.加载中(false)
                this.$toast('系统错误，稍后再试')
            })

        }
    },
}
</script>

<style lang="scss" scoped>
.mui-table-view:after {
    display: inline;
}
.底部 {
    flex-shrink: 0;
}
.footer_1 {
    border-top: 1px solid #f2f2f2;
    flex-shrink: 0;
    display: flex;
    height: _vw(50);
    background: #ffffff;
    align-items: center;
    .left1 {
        height: 100%;
        flex-shrink: 0;
        width: _vw(80);
        // font-size: _vw(14);
        color: #ffffff;
        text-align: center;
        background: #404247;
        // border-top-left-radius: _vw(40);
        // border-bottom-left-radius: _vw(40);
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            font-size: _vw(26);
        }
        > div {
            position: relative;
            span {
                position: absolute;
                font-size: _vw(10);
                top: 0px;
                left: 75%;
                background: red;
                color: #ffffff;
                line-height: _vw(10);
                border-radius: _vw(10);
                text-align: center;
                padding: 0px _vw(2);
            }
        }
    }
    .金额 {
        height: 100%;
        flex-grow: 1;
        text-align: center;
        font-size: _vw(14);
        background: #2a2d32;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
            color: $color;
            margin: 0px 2px;
        }
    }
    .投注按钮 {
        height: 100%;
        width: _vw(80);
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: _vw(14);
        color: #ffffff;
        text-align: center;
        background: linear-gradient(90deg, #ff7a00, #fe560a);
        // border-top-right-radius: _vw(40);
        // border-bottom-right-radius: _vw(40);
    }
}
.购物车 {
    position: fixed;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    padding: _vw(60) _vw(20);
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    .内容 {
        background: #ffffff;
        border-radius: 10px;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .关闭 {
        position: absolute;
        right: _vw(10);
        top: _vw(10);
        z-index: 10;
        color: #969696;
        font-size: _vw(20);
    }
    .清空 {
        position: absolute;
        top: 0px;
        left: _vw(10);
        line-height: _vw(44);
        font-size: _vw(14);
        color: #fe560a;
    }
    .header_1 {
        line-height: _vw(44);
        font-size: _vw(16);
        text-align: center;
        flex-shrink: 0;
        border-bottom: 1px solid #cccccc;
    }
    .list1 {
        flex-grow: 1;
        overflow: auto;
        border-bottom: 1px solid #cccccc;
        font-size: _vw(14);
        .item {
            display: flex;
            align-items: center;
        }
        .号码 {
            font-size: _vw(14);
            color: #404247;
            margin: 0px _vw(5) 0px 0px;
            word-break: break-all;
        }
        .赔率 {
            font-size: _vw(14);
            color: $color;
            flex-grow: 1;
            white-space: nowrap;
        }
        .金额 {
            font-size: _vw(14);
            text-align: center;
            white-space: nowrap;
            flex-shrink: 0;
            margin: 0px _vw(10);
        }
        .icon_box {
            font-size: _vw(14);
            text-align: right;
            color: #ff7a00;
        }
    }
    .详情 {
        padding: 10px 15px;
        font-size: _vw(14);
        li {
            margin: _vw(5) 0px;
        }
        .item {
            display: flex;
            white-space: nowrap;
            align-items: center;
        }
        input {
            margin: 0px;
            padding: 0px;
            height: auto;
            text-align: center;
            width: _vw(100);
            border: none;
            border-bottom: 1px solid #cccccc;
            border-radius: 0px;
        }
    }
    .btn_1 {
        line-height: _vw(44);
        display: flex;
        text-align: center;
        li {
            width: 50%;
        }
        li:nth-child(1) {
            font-size: _vw(14);
            background: #4a4a4a;
            color: #ffffff;
            border-bottom-left-radius: 10px;
        }
        li:nth-child(2) {
            font-size: _vw(14);
            @include bgcolor;
            color: #ffffff;
            border-bottom-right-radius: 10px;
        }
    }
}
.红色字体 {
    color: $color;
}
</style>
