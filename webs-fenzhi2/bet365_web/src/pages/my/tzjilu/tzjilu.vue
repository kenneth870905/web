<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a v-if="显示返回按钮" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 @click="选择类型()" class="mui-title">{{选中平台.text}}</h1>
            <button
                @click="选择类型()"
                class="mui-btn mui-btn-blue mui-btn-link mui-pull-right"
                style="border:0;"
            >
                类型
                <i class="van-icon van-icon-arrow-down"></i>
            </button>
        </header>
        <div ref="mui_content" class="mui-content mui-fullscreen" @scroll="scroll_1($event)">
            <ul class="header_1">
                <li
                    v-if="!查看汇总详情"
                    @click="切换类型('')"
                    :class="{'active':订单.query.state==''}"
                >{{选中平台.value=='' ? '汇总' : '全部' }}</li>
                <li v-if="查看汇总详情" @click="切换类型(-1)" :class="{'active':订单.query.state==''}">返回</li>

                <li @click="切换类型(1)" v-if="!选中平台.value" :class="{'active':订单.query.state==1}">未结算</li>
                <li @click="切换类型(2)" :class="{'active':订单.query.state==2}">已中奖</li>
                <li @click="切换类型(3)" :class="{'active':订单.query.state==3}">未中奖</li>
                <li @click="切换类型(4)" :class="{'active':订单.query.state==4}">未开奖</li>
            </ul>

            <ul class="list_1" v-if="订单.query.state=='' && 选中平台.value=='' && !查看汇总详情">
                <li
                    class="mui-card"
                    v-for="(item, index1) in 汇总.list"
                    :key="index1"
                    @click="获取汇总详情(item)"
                >
                    <div class="mui-card-header">
                        <span>{{item.Date}} 05:00</span>
                        <span class="pull-right">
                            <i class="icon iconfont icon-you"></i>
                        </span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="mui-row">
                                <div class="mui-col-xs-6">
                                    <label>下注单数：</label>
                                    <span class="数量">{{item.OrderCount}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>下注金额：</label>
                                    <span class="数量">{{item.Total}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>会员盈亏：</label>
                                    <span class="数量 红色">{{item.ShuYing}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>未结单数：</label>
                                    <span class="数量">{{item.NotResultCount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="mui-card 近七天" v-if="汇总.list.length>1">
                    <div class="mui-card-header">
                        <span>近七天汇总</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="mui-row">
                                <div class="mui-col-xs-6">
                                    <label>下注单数：</label>
                                    <span
                                        class="数量"
                                    >{{汇总.footer.length>0 ? 汇总.footer[0].OrderCount : 0}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>下注金额：</label>
                                    <span class="数量">{{汇总.footer.length>0 ? 汇总.footer[0].Total : 0}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>会员盈亏：</label>
                                    <span
                                        class="数量 红色"
                                    >{{汇总.footer.length>0 ? 汇总.footer[0].ShuYing : 0}}</span>
                                </div>
                                <div class="mui-col-xs-6">
                                    <label>未结单数：</label>
                                    <span
                                        class="数量"
                                    >{{汇总.footer.length>0 ? 汇总.footer[0].NotResultCount : 0}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- <li class="mui-card 近七天" v-for="(item, index) in 汇总.footer">
                    <div class="mui-card-header">
                        <span>近七天汇总</span>
                    </div>
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <div class="mui-row">
                                <div class="mui-col-xs-6"><label>下注单数：</label> <span class="数量">{{item.OrderCount}}</span></div>
                                <div class="mui-col-xs-6"><label>下注金额：</label> <span class="数量">{{item.Total}}</span></div>
                                <div class="mui-col-xs-6"><label>会员盈亏：</label> <span class="数量 红色">{{item.ShuYing}}</span></div>
                                <div class="mui-col-xs-6"><label>未结单数：</label> <span class="数量">{{item.NotResultCount}}</span></div>
                            </div>
                        </div>
                    </div>
                </li>-->
                <li v-if="汇总.list.length==1" class="btn_1" @click="获取七天汇总()">
                    <!-- <button type="button" class=" mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">近7天汇总</button> -->
                    <button
                        type="button"
                        class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
                    >近7天汇总</button>
                </li>
            </ul>
            <div
                v-if="订单.query.type"
                class="昨日统计"
                a="132"
            >今日汇总:{{订单.统计.todayAmount}}，昨日汇总：{{订单.统计.yesterdayAmount}}。</div>
            <van-list
                v-if="订单.query.state!='' || 查看汇总详情 || 选中平台.value!=''"
                v-model="订单.loading"
                :finished="!订单.loading && 订单.total<=订单.list.length"
                finished-text="没有更多了"
                @load="xiayiye"
            >
                <ul class="list_2">
                    <li v-for="(item, index2) in 订单.list" :key="index2">
                        <div class="img_box" @click="彩票详情(item)">
                            <img
                                v-if="!选中平台.value"
                                :src="config.img_url+'image/home/caipiao/'+item.LotteryCode+'.png'"
                                alt
                                srcset
                            />
                            <i v-if="选中平台.value" class="icon iconfont icon-94"></i>
                        </div>
                        <div class="text_box" @click="彩票详情(item)">
                            <div>
                                <span class="标题">{{item.LotteryName}}</span>
                                <span class="未结算" v-if="item.Cancel">
                                    <i class="icon iconfont icon-dengdai"></i>
                                    <span>已撤单</span>
                                </span>
                                <span class="未结算" v-else-if="item.ResultMoney== null">
                                    <i class="icon iconfont icon-dengdai"></i>
                                    <span>未结算</span>
                                </span>
                                <span class="未中奖" v-else-if="item.ResultMoney==0">
                                    <i class="icon iconfont icon-guanbi1"></i>
                                    <span style="float:right;">未中奖</span>
                                </span>
                                <span class="中奖" v-else>
                                    <i class="icon iconfont icon-libao"></i>
                                    <span>中奖{{item.ResultMoney}}</span>
                                </span>
                            </div>
                            <div>
                                <span
                                    class="投注号码"
                                >{{item.PlatformType ? item.PlatformType : ''}} {{(item.Count > 1 ? '(复式) ' : '')}}{{item.Content}}</span>
                                <!-- 系统彩票 -->
                                <p
                                    v-if="!选中平台.value"
                                   style="margin-left:186px;"   
                                >{{item.MethodName}}</p>
                                <!-- 第三方 -->
                                <span v-if="选中平台.value">{{item.PlayType}}</span>
                            </div>
                            <div>
                                <span class="时间">{{item.Createtime}}</span>
                                <span style="margin-left:130px;">
                                    投注
                                    <span class="钱">￥{{item.TotalPrice}}</span>
                                </span>
                            </div>
                        </div>
                        <!-- <div class="分享" @click="分享(item)" v-if="聊天室user.IsSend">
                            <i class="icon iconfont icon-fenxiang"></i>
                        </div>-->
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
// import { api_分享到聊天室 } from "@/api/聊天室接口.js";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    name: "",
    data() {
        return {
            显示返回按钮: false
        };
    },
    computed: {
        ...mapState({
            config: "config",
            订单: state => state.投注订单.订单,
            汇总: x => x.投注订单.汇总,
            选中平台: state => state.投注订单.选中平台,
            查看汇总详情: x => x.投注订单.查看汇总详情,
            滚动条位置: x => x.投注订单.滚动条位置
            //聊天室user:x=>x.聊天室.user
        })
    },
    filters: {
        时间格式(time) {}
    },
    methods: {
        ...mapMutations({
            修改state: "投注订单/修改state",
            聊天室key: "聊天室/设置key"
        }),
        ...mapActions({
            初始化: "投注订单/初始化",
            获取汇总: "投注订单/获取汇总",
            获取七天汇总: "投注订单/获取七天汇总",
            获取数据: "投注订单/获取数据",
            下一页: "投注订单/下一页",
            获取汇总详情: "投注订单/获取汇总详情"
        }),
        xiayiye() {
            this.下一页();
        },
        切换类型(type) {
            if (type == -1) {
                this.修改state(["查看汇总详情", false]);
            } else {
                this.修改state(["查看汇总详情", false]);
                this.初始化([type, this.订单.query.type]);
                this.获取数据();
            }
        },
        选择类型() {
            var this_1 = this;
            var 选择器 = new mui.PopPicker();
            选择器.setData([
                {
                    value: "",
                    text: "系统彩票"
                },
                {
                    value: "ag",
                    text: "AG平台"
                },
                {
                    value: "kg",
                    text: "KG平台"
                },
                {
                    value: "by",
                    text: "BBIN平台"
                },
                {
                    value: "ky",
                    text: "KY平台"
                },
                {
                    value: "mg",
                    text: "MG平台"
                },
                {
                    value: "ss",
                    text: "三昇体育"
                },
                {
                    value: "mg",
                    text: "MG平台"
                },
                {
                    value: "fg",
                    text: "FG平台"
                },
                {
                    value: "fy",
                    text: "泛亚电竞"
                },
                {
                    value: "bg",
                    text: "BG平台"
                },
                {
                    value: "vr",
                    text: "VR平台"
                },
                {
                    value: "gm",
                    text: "GM平台"
                }
            ]);

            选择器.show(items => {
                this.修改state(["选中平台", items[0]]);
                this.初始化([this.订单.query.state, items[0].value]);
                this.获取数据();
                // this_1.彩票类型 = items[0];

                选择器.dispose();
                选择器 = null;
            });
        },
        scroll_1(event) {
            // console.log(event.target.scrollTop)
            // console.log(event.currentTarget.scrollTop);
            this.修改state(["滚动条位置", event.target.scrollTop]);
        },
        彩票详情(item) {
            if (!this.选中平台.value) {
                this.$router.push("/order?code=" + item.Code);
            }
        }
    },
    mounted() {
        if (this.订单.list.length == 0 && this.订单.query.state != "") {
            this.获取数据();
        }
        if (this.订单.query.state == "") {
            this.获取汇总();
        }
        if (this.滚动条位置) {
            this.$refs.mui_content.scrollTop = this.滚动条位置 + 40;
            // document.documentElement.scrollTop=this.滚动条位置
        }
        if (this.$route.query.state) {
            if (this.订单.query.state != this.$route.query.state) {
                this.初始化([this.$route.query.state, this.订单.query.type]);
                this.获取数据();
            }
        }
        if (this.$route.query.back) {
            this.显示返回按钮 = true;
        }
        console.log(this.$route.query);
    }
};
</script>

<style  scoped>
.mui-pciker-list li.highlight {
    color: red;
}
.mui-pciker-list li {
    background: white !important;
}
.mui-fullscreen {
    overflow: auto;
}
.昨日统计 {
    background: #ffffff;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #6b6b6b;
}
.header_1 {
    position: sticky;
    z-index: 1;
    top: 0px;
    height: 40px;
    line-height: 40px;
    display: flex;
    background: #ffffff;
    font-size: 14px;
    color: #333333;
    text-align: center;
    border-bottom: 1px solid #efeff4;
}
.header_1 li {
    transition: all 0.3s;
    width: calc(100% / 5);
    flex-grow: 1;
}
.header_1 .active {
    color: red;
    border-bottom: 2px solid red;
}


.list_1 li:last-child{
        margin-bottom: 80px;
    }
.list_1 .mui-card-header {
    background: #ec0909;
    font-size: 14px;
    color: #ffffff;
    padding: 5px 10px;
    min-height: auto;
}
.list_1 .mui-card-content-inner {
    padding: 8px 8px;
}
.list_1 .数量 {
    color: #007aff;
}
.list_1 .数量.红色 {
    color: red;
}
.list_1 .btn_1 {
    margin: 30px 10px 10px;
}
.list_1 button {
    padding: 0px;
    height: 30px;
    font-size: 15px;
    background: #ffffff;
    border-radius: 30px;
}

.list_2 .分享 {
    flex-shrink: 0;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
    color: red;
    font-size: 20px;
    margin: 0px 0px 0px 10px;
}
.list_2 li {
    background: #ffffff;
    display: flex;
    margin: 10px 0px 0px 0px;
    padding: 3px;
}
.list_2 .img_box {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    margin: 10px;
    text-align: center;
}
.list_2 i {
    font-size: 2px;
    color: red;
}
.list_2 img {
    width: 100%;
    height: 100%;
}

.list_2 .text_box {
    padding: 10px 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #8f8f94;
}
.list_2 div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: baseline;
    margin: 2px 0px;
}
.list_2 .标题 {
    font-weight: bold;
    color: #000000;
}
.list_2 .未结算 {
    color: #28a745;
}
.list_2 .中奖 {
    color: red;
}
.list_2 .未中奖 {
    color: #949494;
    float: right;
    margin-left: 158px;
}
.list_2 .时间 {
    font-size: 12px;
}
</style>