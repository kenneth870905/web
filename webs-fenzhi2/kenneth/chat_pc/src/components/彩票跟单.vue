<template>
    <el-dialog title="彩票详情" :visible.sync="跟单彩票.show" width="33%">
        <div class="跟单">
            <div class="order-info">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell item">
                        <div class="img_box"><img :src="'static/image/home/caipiao/'+跟单彩票.obj.LotteryCode+'.png'"></div>
                        <div class="text_1">
                            <div>{{跟单彩票.obj.LotteryName}}</div>
                            <div>期号:{{跟单彩票.obj.IssueCode ? 跟单彩票.obj.IssueCode.substring(跟单彩票.obj.IssueCode.length-3) : ''}}期</div>
                        </div>
                        <div class="rt">
                            <span>封盘时间：</span>
                            <div>{{倒计时.h}}:{{倒计时.m}}:{{倒计时.s}}</div>
                            <!-- <van-count-down :time="跟单彩票.obj.Timer*1000" @finish="finish" /> -->
                        </div>
                        <i @click="关闭()" class="关闭 icon iconfont icon-guanbi"></i>
                    </li>
                    <li class="mui-table-view-cell item">
                        <span>投注玩法</span>
                        <span class="name 红色">{{跟单彩票.obj.MethodName}}</span>
                    </li>
                    <li class="mui-table-view-cell item">
                        <span>投注内容</span>
                        <span class="name 红色">
                            {{跟单彩票.obj.Content}}
                        </span>
                    </li>
                    <li class="mui-table-view-cell item">
                        <span>投注注数</span>
                        <span class="name 红色">x{{跟单彩票.obj.Nums}}</span>
                    </li>
                    <li class="mui-table-view-cell item">
                        <span>总金额</span>
                        <span class="name 红色">{{ Math.round(跟单彩票.obj.Price*跟单彩票.obj.Nums * 100) / 100}}</span>
                    </li>
                    <li class="mui-table-view-cell item">
                        <span>当前余额</span>
                        <span class="name 余额">{{ userinfo.Money }}</span>
                    </li>
                    <li class="mui-table-view-cell">
                        <div>单注金额</div>
                        <ul class="item_1">
                            <li class="input_box">
                                <span>￥</span>
                                <input class="红色" @input="input1()" type="number" v-model.number="跟单彩票.obj.Price" />
                            </li>
                            <li :class="{结束:结束}" class="btn_1" @click="跟单()">跟单</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { 开奖倒计时 } from "@/assets/js/通用.js";
import { api_投注跟单 } from "@/api/聊天室接口.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            dialogVisible:true,
            结束: false,
            // 单注金额:0
            倒计时:{
                h:"00",
                m:"00",
                s:"00"
            },
            定时器:""
        }
    },
    computed: {
        ...mapState({
            
            聊天室state:x=>x.聊天室,

            跟单彩票: x => x.聊天室.跟单彩票,
            userinfo: x => x.userinfo
        })
    },
    methods: {
        ...mapMutations({
            加载中: "加载中",
            设置跟单弹框: '聊天室/设置跟单弹框'
        }),
        ...mapActions({
            失败提示:"失败提示",
            成功提示:"成功提示",
            加载中:'加载中',
            getUserInfo: 'getUserInfo'
        }),
        关闭() {
            this.设置跟单弹框(false)
        },
        finish() {
            this.结束 = true;
        },
        input1() {
            if (this.跟单彩票.obj.Price && this.跟单彩票.obj.Price < 0) {
                this.跟单彩票.obj.Price = 0
            } else if (this.跟单彩票.obj.Price && this.跟单彩票.obj.Price > 0) {
                this.跟单彩票.obj.Price = parseInt(this.跟单彩票.obj.Price)
            }
        },
        跟单() {
            if (!this.跟单彩票.obj.Price || this.跟单彩票.obj.Price <= 0) {
                this.失败提示('请输入金额')
                return
            }
            var obj = {
                Id: this.跟单彩票.obj.Id,
                // amount:this.跟单彩票.obj.Price * this.跟单彩票.obj.Nums
                amount: this.跟单彩票.obj.Price,
                LotteryCode:this.跟单彩票.obj.LotteryCode

            }
            this.加载中(true)
            api_投注跟单(obj).then(x => {
                // x={"code":1,"msg":"无法参与自己订单"}
                // x='<div>服务器内部错误。。。</div>'
                if (x.data.code == 0) {
                    this.成功提示('跟单成功')
                } else {
                    this.失败提示(x.data.msg)
                }
                this.跟单彩票.show = false;
                this.getUserInfo();
                this.加载中(false)
            }).catch(err => {
                console.log(x)
                this.加载中(false)
                this.失败提示('系统错误，稍后再试！')
                this.跟单彩票.show = false
            })
        },
        计算倒计时(){
            try {
                clearInterval(this.定时器)
            } catch (error) {}
            const setVal=()=> {
                this.跟单彩票.obj.Timer--;
                if (this.跟单彩票.obj.Timer <= 0) {
                    //已到开奖时间
                    this.倒计时 = { h: '00', m: '00', s: '00' };
                    clearInterval(this.定时器);
                    this.定时器 = null;
                }else {
                    var h = '00' + Math.floor(this.跟单彩票.obj.Timer / 3600);
                    var m = '00' + Math.floor((this.跟单彩票.obj.Timer / 60 % 60));
                    var s = '00' + Math.floor((this.跟单彩票.obj.Timer % 60));
                    this.倒计时 = { h: h.substr(h.length - 2), m: m.substr(m.length - 2), s: s.substr(s.length - 2) };
                }
            }
            setVal();
            this.定时器 = setInterval(function () {
                setVal();
            }, 1000)
        }
    },
    mounted() {
        this.计算倒计时();
    },
    watch: {
        '跟单彩票.obj'(){
            this.计算倒计时();
        }
    },
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__body{
    padding-top: 0px;
}

.跟单 {
    // position: fixed;
    // width: 100%;
    // height: 100%;
    // background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    // display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #4e4e4e;
    .order-info {
        width: 100%;
        max-height: 100%;
        overflow: auto;
        background: #ffffff;
    }
    .mui-table-view-cell{
        padding: 10px 0px;
        min-height: 45px;
        box-sizing: border-box;
        &:not(:last-child){
            border-bottom: 1px solid #e8e8e8;
        }
    }
    .红色 {
        color: #fc7a11;
    }
    .余额 {
        color: #0055f7;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .img_box {
        width: 40px;
        height: 40px;
        margin: 0px 10px 0px 0px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .name {
        max-width: 70%;
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
    }
    .text_1 {
        flex-grow: 1;
        >div:nth-child(1){
            font-size: 16px;
        }
    }
    .rt {
        flex-basis: 0;
        white-space: nowrap;
        display: flex;
        align-items: center;
        font-size: 16px;
        div{
            color: #fc7a11;
        }
    }
    .关闭 {
        flex-shrink: 0;
        margin: 0px 0px 0px 10px;
        color: #a9a9a9;
    }
    .item_1 {
        margin: 5px 0px 0px;
        display: flex;
        align-items: center;
        input {
            padding: 0px 5px;
            border: none;
            height: 100%;
            border: none;
            outline: none;
            font-size: 18px;
        }
        .input_box {
            height: 36px;
            display: flex;
            align-items: center;
            font-size: 18px;
            border: 1px solid #ccc;
            color: #fc7a11;
            margin: 0px 10px 0px 0px;
            padding: 0px 5px;
        }
        .btn_1 {
            width: 100px;
            cursor: pointer;
            border-radius: 5px;
            line-height: 36px;
            background: #fc7a11;
            color: #ffffff;
            flex-shrink: 0;
            text-align: center;
            &:hover{
                opacity: 0.8;
            }
            &.结束 {
                background: #7b7b7b;
            }
        }
    }
}
</style>
