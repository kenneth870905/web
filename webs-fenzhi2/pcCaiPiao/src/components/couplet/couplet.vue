<template>
    <div class="couplet" v-show="coupletAPP">
        <div class="couplet_righe">
            <div class="couplet_close" @click="outclose()"> </div>
            <div class="couplet_text">
                <div class="bz_box" v-popover:popover1 v-if="技术支持"><span class="icon_技术支持 iconfont icon-bianjiekuaisu"></span>&nbsp;<span>技术支持</span></div>
                <el-popover v-if="技术支持" popper-class="纸飞机弹框" ref="popover1" placement="right-start" trigger="click" width="150">
                    <a :href="config.telegram.a ? config.telegram.a : 'javascript:;'" target="view_window">
                        <div class="icon_box">
                            <i class="iconfont icon-bianjiekuaisu"></i>
                        </div>
                        <div class="text_1">
                            <div>技术支持-Telegram</div>
                        </div>
                    </a>
                    <div class="text_2">
                        <span>{{config.telegram ? config.telegram.number : ''}}</span>
                    </div>
                    <a :href="config.telegram.a ? config.telegram.a : 'javascript:;'" target="view_window">
                        <div>欢迎加入我们</div>
                    </a>
                </el-popover>

                <div class="sw_box" @click="在线客服()"><span class="iconfont icon-kefu"></span>&nbsp;<span>{{config.coupletRightTopText}}</span></div>
                <div class="bz_box" v-if="!隐藏qq" @click="QQ客服()"><span class="iconfont icon-QQ"></span>&nbsp;<span>QQ客服</span></div>
                <div class="bz_box" v-if="!隐藏qq" v-show="config.QQ2" @click="QQ客服2()"><span class="iconfont icon-QQ"></span>&nbsp;<span>QQ客服2</span></div>
                <div class="wx_ewm" v-if="站点配置.appUrl"><img :src="站点配置.appUrl" alt=""></div>
                <div class="img_a" @click="couplet_imgUrl('right')" v-show="config.couplet">
                    <div class="img_a_box"><img :src="config.coupletImgRight" alt=""></div>
                    <p>扫一扫</p>
                    <p>下载APP</p>
                </div>
            </div>
            <div class="backTop_box">
                <div class="backTop" @click="goTop()" v-show="app滚动条位置>80"><i class="el-icon-upload2"></i><span>返回顶部</span></div>
            </div>
        </div>

        <div class="couplet_left">
            <!-- <div class="couplet_close" @click="playTest()"> </div> -->
            <div class="couplet_close" @click="outclose()"> </div>
            <div class="couplet_text">
                <div class="bz_box" v-popover:popover2 v-if="技术支持"><span class="icon_技术支持 iconfont icon-bianjiekuaisu"></span>&nbsp;<span>技术支持</span></div>
                <el-popover v-if="技术支持" popper-class="纸飞机弹框" ref="popover2" placement="left-start" trigger="click" width="150">
                    <a :href="config.telegram.a ? config.telegram.a : 'javascript:;'" target="view_window">
                        <div class="icon_box">
                            <i class="iconfont icon-bianjiekuaisu"></i>
                        </div>
                        <div class="text_1">
                            <div>技术支持-Telegram</div>
                        </div>
                    </a>
                    <div class="text_2">
                        <span>{{config.telegram ? config.telegram.number : ''}}</span>
                    </div>
                    <a :href="config.telegram.a ? config.telegram.a : 'javascript:;'" target="view_window">
                        <div>欢迎加入我们</div>
                    </a>
                </el-popover>

                <div class="sw_box">
                    <span class="iconfont icon-youxi"></span>&nbsp;
                    <span v-if="!userInfo.UserId" @click="playTest()">免费试玩</span>
                    <span v-if="userInfo.UserId"><a :href="config.api_url+'/Members/Money/Recharge'">充值提款</a></span>
                </div>
                <div class="bz_box" @click="go('/helpCenter')"><span class="iconfont icon-bangzhuzhongxin"></span>&nbsp;帮助中心</div>
                <div class="wx_ewm" v-if="站点配置.appUrl"><img :src="站点配置.appUrl" alt=""></div>
                <div class="img_a" @click="couplet_imgUrl('left')" v-show="config.couplet">
                    <div class="img_a_box"><img :src="config.coupletImgLeft" alt=""></div>
                    <p>扫一扫</p>
                    <p>下载APP</p>
                </div>
            </div>

            <div class="backTop_box">
                <div class="backTop" @click="goTop()" v-show="app滚动条位置>80"><i class="el-icon-upload2"></i><span>返回顶部</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import { api_登录试玩 } from "@/api/请求登录的接口.js";
//@click="go('/helpCenter')"
import { mapGetters, mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            coupletAPP: true,
            app滚动条位置: 0,
        }
    },
    computed: {
        ...mapState({
            config: "config",
            技术支持: '技术支持',
        }),
        ...mapGetters({
            userInfo: "userInfo",
            站点配置: '站点配置',
        }),
        隐藏qq(){
            return this.站点配置.qq ===false
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: "getUserInfo"
        }),
        playTest() { //点击试玩触发得函数
            // this.显示试玩弹框=true;
            api_登录试玩().then(x => {
                if (x.data.code == 0) {
                    this.getUserInfo()
                } else {
                    this.$message.success(x.data.msg);
                }
            }).catch(err => {
                console.log(err);
            })
            //点击试玩体验触发的函数
            // alert("点击试玩体验触发的函数");
        },
        在线客服() {
            if (this.站点配置.online_chat) {
                window.open(this.站点配置.online_chat)
            } else {
                window.open(this.config.zaixianUrl)
            }
        },
        QQ客服() {
            //点击QQ客服触发的函数
            if (this.站点配置.qq) {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.站点配置.qq + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${this.站点配置.qq}`)
            } else {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.config.QQ + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${this.config.QQ}`)
            }
        },
        QQ客服2() {
            //点击QQ客服触发的函数
            if (this.站点配置.qq2) {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.站点配置.qq + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${this.站点配置.qq2}`)
            } else {
                // window.open('http://wpa.qq.com/msgrd?v=3&uin=' + this.config.QQ + '&site=qq&menu=yes')
                window.open(`tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=${this.config.QQ2}`)
            }
        },
        couplet_imgUrl(orientation) {//点击中间图片的链接
            if (orientation == "left") {
                if(this.config.coupletUrlLeft.startsWith('#')){
                    this.$router.push(this.config.coupletUrlLeft.substring(1))
                }else{
                    window.open(this.config.coupletUrlLeft)
                }
            } else if (orientation == "right") {
                if(this.config.coupletUrlRight.startsWith('#')){
                    this.$router.push(this.config.coupletUrlRight.substring(1))
                }else{
                    window.open(this.config.coupletUrlRight)
                }
            }
        },
        //每100毫秒获取一次app窗口向上的距离
        goTop() {
            $('body,html').animate({ scrollTop: 0 }, 300);
        },
        outclose() {
            this.coupletAPP = false
        },
        go(url) {
            this.$router.history.push(url);
        },
    },
    mounted: function () {
        var this_1 = this
        // 实现返回顶部得功能
        $(document).scroll(function (e) {
            this_1.app滚动条位置 = $(this).scrollTop();
        })
    }
}
</script>
<style lang="scss" scoped>
.纸飞机弹框 {
    text-align: center !important;
    padding: 0px 0px 10px !important;
    * {
        text-align: center;
    }
    a {
        color: #000;
    }
    .icon_box {
        color: #1296db;
        flex-shrink: 0;
        i {
            font-size: 50px;
        }
    }
    .text_1 {
        font-size: 12px;
    }
    .text_2 {
        font-size: 16px;
        color: #1296db;
        font-weight: bold;
    }
}
.activeA {
    background: green;
}
.couplet_left {
    width: 126px;
    position: fixed;
    z-index: 22;
    bottom: 100px;
    bottom: calc((100vh - 540px) / 2);
    left: 0px;
}
.couplet_righe {
    width: 126px;
    right: 0px;
    position: fixed;
    bottom: 100px;
    bottom: calc((100vh - 540px) / 2);
    z-index: 4;
}
.couplet_left,
.couplet_righe {
    z-index: 22;
    .couplet_close {
        cursor: pointer;
        height: 18px;
        width: 126px;
        background: url("../../assets/images/css_3.png") no-repeat;
        background-size: 100% 100%;
    }
    .couplet_text {
        .iconfont {
            font-size: 18px;
        }
        // height: 440px;
        border: 4px solid #e94335;
        .icon_技术支持 {
            color: #636363;
        }
        .sw_box {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #ffffff;
            font-size: 14px;
            span {
                a {
                    color: #000000;
                }
            }
        }
        .bz_box {
            cursor: pointer;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #ffffff;
            border: 4px solid #e94335;
            border-left: 0px;
            border-right: 0px;
            font-size: 14px;
        }
        .wx_ewm {
            height: 116px;
            border-bottom: 4px solid #e94335;
            border-top: 4px solid #e94335;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .img_a {
            text-align: center;
            background: #e94335;
            .img_a_box {
                cursor: pointer;
                height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            p {
                margin: 0px;
                font-size: 14px;
                line-height: 22px;
                color: #6b3200;
            }
        }
    }
    .backTop_box {
        .backTop {
            cursor: pointer;
            margin-top: 6px;
            background: #ffffff;
            height: 35px;
            text-align: center;
            background: #e94335;
            line-height: 35px;
            color: #fff;
            font-size: 14px;
            .el-icon-upload2 {
                font-weight: 1000;
                margin-right: 3px;
                font-size: 18px;
            }
        }
    }
}
</style>
  