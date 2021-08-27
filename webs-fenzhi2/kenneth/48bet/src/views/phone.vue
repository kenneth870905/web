<template>
    <div id="mwebbox">
        <div class="setcmid">
            <div class="sect1 w1200">
                <div class="flex_box">
                    <div>
                        <div class="sect1title">手机Web版</div>
                        <div class="mwebleft">
                            <h3>
                                多元化移动娱乐平台、精彩随时随地、一切尽在掌中！美女荷官相伴，刺激不打烊
                            </h3>
                            <div class="inner">
                                <div class="mqr-code fl">
                                    <div class="mqr-code-box" id="code-box">
                                        <div id="qrcode" class="qrcode">
                                            <img :src="站点配置.appUrl" alt="" srcset="" />
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                    <div class="s2qrtxt" style="padding-top:1px; ">
                                        UC 浏览器扫一扫
                                    </div>
                                </div>
                                <div class="mwinfo">
                                    <span class="ft1">
                                        <font color="#c6d20a">一机在手</font>，娱乐无穷。视讯/电子/彩票/体育，即时下注，让您
                                        <font color="#c6d20a">走到哪玩到哪</font>！
                                        <br />手机浏览器输入
                                        <!-- <a class="mwtxt" href="javascript:;" target="_blank">{{config.mobile_url}}</a> -->
                                    </span>
                                </div>
                                <div class="cb"></div>
                            </div>
                        </div>
                    </div>
                    <div class="img_box">
                        <img src="static/image/phone/mobile_web_img1_2.png" alt="" srcset="" />
                    </div>
                </div>
            </div>
        </div>

        <div class="setcmid noneborder">
            <div class="sect0">
                <div>
                    <img src="static/image/phone/sect0.png" alt="" srcset="" />
                </div>
                <div>
                    <div class="sect0top">
                        <span>APP客户端</span>
                        <span class="appico">
                            <img src="static/image/phone/appico.png" alt="" srcset="" />
                        </span>
                    </div>
                    <div class="sect2top">
                        <div class="sect2left">
                            <div class="s2qr">
                                <div id="qrcode" class="qrcode">
                                    <img :src="站点配置.appUrl" alt="" srcset="" />
                                </div>
                            </div>
                            <div class="clear"></div>
                            <div class="s2qrtxt">UC 浏览器扫一扫</div>
                        </div>
                        <div class="sect2right" style="width:405px">
                            <p>①&nbsp;&nbsp;手机浏览器扫描二维码，进入下载页面，点击下载</p>
                            <p>
                                ②&nbsp;&nbsp;APP安装和授权
                                <a href="javascript:;" @click="显示ios教程 = true">点此查看IOS版教程</a>
                            </p>
                            <p>
                                ③&nbsp;&nbsp;&nbsp;
                                <a :href="站点配置.app_download ? 站点配置.app_download :'javascript:;'" target="_blank">点此下载客户端</a>
                            </p>
                            <p>
                                ④&nbsp;&nbsp;注册会员和登录
                                <!-- <a href="javascript:;">点击查看</a> -->
                            </p>
                        </div>
                    </div>
                    <div class="sect0info">
                        <font color="#f00">推荐使用谷歌，QQ，和手机自带浏览器下载</font>
                        <br />
                        <font color="#f5fe02">注意：</font>第一步使用QQ扫描下载的用户，请在扫描后，点击“确认”即可下载，或者使用浏览器扫描下载。
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="sect2">
            <div class="sect2top">
                <div class="sect2left">
                    <div class="s2qr">
                        <div id="qrcode" class="qrcode">
                            <img :src="站点配置.appUrl" alt="" srcset="" />
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="s2qrtxt">UC 浏览器扫一扫</div>
                </div>
                <div class="sect2right">
                    <div class="se2rt">AG客户端下载</div>
                    <p>
                        <font color="#ebfa02">①</font>&nbsp;&nbsp;&nbsp;进入AG游戏大厅，找到左侧的手机标识，点击“立即体验”
                    </p>
                    <p>
                        <font color="#ebfa02">②</font>&nbsp;&nbsp;&nbsp;按照指南进行安装，并扫描二维码登录
                    </p>
                    <p>
                        <font color="#ebfa02">③</font>&nbsp;&nbsp;&nbsp;AG客户端安装指南
                        <a href="Ag/index.html" target="_blank">点击查看</a>
                    </p>
                </div>
            </div>
            <div class="img_box">
                <img src="static/image/phone/sect2.png" alt="" srcset="" />
            </div>
        </div> -->

        <el-dialog class="dialog_1" title="移动端APP授权教程" :visible.sync="显示ios教程" width="30%" @opened="opened">
            <span>
                <div class="swiper1 swiper-container" ref="ios教程">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="static/image/phone/ios_1.png" alt="" srcset="" />
                        </div>
                        <div class="swiper-slide">
                            <img src="static/image/phone/ios_2.png" alt="" srcset="" />
                        </div>
                        <div class="swiper-slide">
                            <img src="static/image/phone/ios_3.png" alt="" srcset="" />
                        </div>
                        <div class="swiper-slide">
                            <img src="static/image/phone/ios_4.png" alt="" srcset="" />
                        </div>
                        <div class="swiper-slide">
                            <img src="static/image/phone/ios_5.png" alt="" srcset="" />
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination swiper-pagination1"></div>
                </div>
            </span>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">好的</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
import Swiper from "swiper";
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            显示ios教程: false,
            swiper1: ""
        };
    },
    computed: {
        ...mapState({
            config: "config"
        }),
        ...mapGetters({
            站点配置: "站点配置"
        })
    },
    methods: {
        opened() {
            if (!this.swiper1) {
                this.swiper1 = new Swiper(this.$refs.ios教程, {
                    effect: "coverflow",
                    // grabCursor: true,    //手样式
                    centeredSlides: true,
                    slideToClickedSlide: true,
                    slidesPerView: "2",
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true //开启slide阴影
                    },
                    pagination: {
                        el: ".swiper-pagination1",
                        clickable: true
                    }
                });
            }
        }
    },
    mounted() { }
};
</script>

<style lang="scss" scoped>
.cb{
    clear: both;
}
.qrcode {
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
    }
}
.dialog_1 {
    /deep/ .el-dialog__header {
        background: #007aff;
    }
    /deep/ .el-dialog__title {
        color: #ffffff;
    }
    /deep/ .el-dialog__close {
        color: #fff;
    }
    /deep/ .el-dialog__body {
        padding: 10px;
    }
    .swiper-slide {
        img {
            width: 100%;
        }
    }
    /deep/ .swiper-pagination-bullet {
        width: 15px;
        height: 15px;
    }
}

#mwebbox {
    background: #232323;
    height: auto;
    overflow: hidden;
    min-width: 1200px;
    font-family: "微软雅黑", "Microsoft YaHei", "宋体";
    color: #fff;
    padding: 30px 0px;
}
#mwebboxmid {
    padding: 30px 0;
    height: auto;
    margin: 0 auto;
}

.setcmid {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    &:not(.noneborder){
        border-bottom: 1px solid #4d4d4d;
    }
}

.sect0 {
    width: 1200px;
    // background: url(~@/assets/shoujixiazhu/sect0.png) no-repeat left top;
    margin: 0 auto;
    margin-top: 60px;
    display: flex;
    // justify-content: space-between;
    padding-bottom: 40px;
    > div:nth-child(2) {
        margin-left: 30px;
    }
    .sect2top {
        margin-top: 60px;
        height: 180px;
    }
}
.sect0top {
    height: 38px;
    line-height: 38px;
    font-size: 28px;
}
.sect0top span {
    display: block;
    float: left;
    height: 38px;
    line-height: 38px;
    font-size: 36px;
    margin-right: 15px;
    color: #fff;
}
.sect0top span.appico {
    width: 90px;
    // background: url(~@/assets/shoujixiazhu/appico.png) no-repeat left center;
}
.sect0info {
    line-height: 22px;
    padding-top: 10px;
    padding-right: 10px;
    font-size: 13px;
    color: #ccc;
    line-height: 34px;
}
.sect0info a {
    color: #fff;
}
.sectitle {
    margin: 0;
    height: 110px;
    background: url() no-repeat center top;
}
.sect1 {
    margin: 0 auto;
    margin-top: 30px;
    padding: 0px 0px 0px 65px;
    box-sizing: border-box;
    .sect1title {
        height: 34px;
        line-height: 34px;
        font-size: 36px;
    }
    .flex_box {
        display: flex;
        justify-content: space-between;
    }
    .mwebleft {
        width: 520px;
    }
    .img_box {
        width: 320px;
        flex-shrink: 0;
    }
    .mwtxt {
        width: 190px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        background: linear-gradient(180deg, #006868, #00e1cf);
        border: 2px solid #03f9fa;
        font-weight: bold;
        color: #ffffff;
        text-decoration: none;
        display: block;
        transition: all 0.3s;
        &:hover {
            background: linear-gradient(180deg, #003838, #00ab9d);
        }
    }
}

.fr,
.right {
    float: right;
}
.fl,
.left {
    float: left;
}

#mwebboxmid h3 {
    font-size: 18px;
    color: #fff;
    padding-top: 25px;
    font-weight: normal;
    line-height: 32px;
}
#mwebboxmid .inner {
    padding-top: 20px;
    height: auto;
    overflow: hidden;
}
.mqr-code {
    float: left;
    width: 126px;
    height: auto;
    overflow: hidden;
}
.mqr-code-box {
    width: 118px;
    height: 118px;
    padding: 3px;
    border: 1px solid #575757;
    background: #fff;
    overflow: hidden;
    position: relative;
}
.mqr-code-box img {
    width: 100%;
    height: 100%;
}
.mqr-code p {
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 13px;
    color: #ff0;
}
.mwinfo {
    float: left;
    width: 365px;
    line-height: 22px;
    height: auto;
    overflow: hidden;
    padding: 20px 0px 0px 20px;
}
.mwinfo span.ft1 {
    font-size: 16px;
    line-height: 30px;
}
.mwtxt {
    margin: 0;
    height: 45px;
    line-height: 45px;
    margin-top: 10px;
}
.mwtxt span.wleft {
    float: left;
    display: block;
    width: 28px;
    height: 45px;
    background: url() no-repeat;
}
.mwtxt span.wright {
    float: left;
    display: block;
    width: 48px;
    height: 45px;
    background: url() no-repeat;
}

.sect2 {
    width: 1200px;
    // height: 635px;
    // background: url(~@/assets/shoujixiazhu/sect2.png) no-repeat center bottom;
    margin: 0 auto;
    overflow: hidden;
    padding: 60px 0px 0px;
    .sect2top {
        display: flex;
        justify-content: center;
    }
    .img_box {
        margin: 40px 0px 0px;
        text-align: center;
        img {
            max-width: 100%;
        }
    }
}

.sect2left {
    float: left;
    width: 130px;
}
.s2qr {
    float: left;
    border: 1px solid #575757;
    padding: 5px;
    width: 110px;
    height: 110px;
    background: #ffffff;
}
.s2qrtxt {
    line-height: 22px;
    text-align: center;
    color: #f5fe02;
    padding-top: 8px;
    font-size: 12px;
}
.sect2right {
    float: left;
    padding-left: 20px;
    width: 460px;
    height: auto;
    overflow: hidden;
}
.sect2right font.agid {
    background: #f00;
    color: #fff;
    line-height: 24px;
    padding: 3px;
}
.se2rt {
    font-size: 36px;
    color: #fff;
    height: 50px;
    line-height: 50px;
}
.sect2right p {
    line-height: 35px;
    font-size: 16px;
    color: #ccc;
    margin: 0px;
}
.sect2right p a {
    color: #ebfa02;
}
</style>
