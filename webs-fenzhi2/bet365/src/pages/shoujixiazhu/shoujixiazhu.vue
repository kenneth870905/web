<template>
    <div>
        <Header />

        <div id="mwebbox">
            <div id="mwebboxmid">
                <!--<div class="sectitle"></div>-->
                <div class="clear"></div>
                <div class="setcmid">
                    <div class="sect1">
                        <div class="sect1title">手机Web版</div>
                        <div class="mwebleft">
                            <h3>多元化移动娱乐平台、精彩随时随地、一切尽在掌中！美女荷官相伴，刺激不打烊</h3>
                            <div class="inner">
                                <div class="mqr-code fl">
                                    <div class="mqr-code-box" id="code-box">
                                        <div id="qrcode"></div>
                                        <!--动态生成二维码 创建一个div，并设置id为qrcode -->
                                    </div>
                                    <div class="clear"></div>
                                    <div class="s2qrtxt" style="padding-top:1px; ">UC 浏览器扫一扫</div>
                                </div>
                                <div class="mwinfo">
                                    <span class="ft1">
                                        <font color="#c6d20a">一机在手</font>，娱乐无穷。视讯/电子/彩票/体育，即时下注，让您
                                        <font color="#c6d20a">走到哪玩到哪</font>！
                                        <!-- <br />手机浏览器输入 -->
                                        <div class="mwtxt">
                                            <span class="wleft"></span>
                                            <!-- <a
                                                href="javascript:;"
                                                id="mobileurl"
                                                target="_blank"
                                            >m.t2209.com</a> -->
                                            <span class="wright"></span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
                <a id="1"></a>
                <div class="setcmid noborder">
                    <div class="sect0">
                        <div class="sect0top">
                            <span>APP客户端</span>
                            <span class="appico"></span>
                        </div>
                        <div class="sect2top" style="padding-left:0px; margin-top: 40px; ">
                            <div class="sect2left">
                                <div class="s2qr">
                                    <!-- <div id="qrcode"></div> -->
                                    <img class="appurl" :src="站点配置.appUrl" alt="" srcset="">
                                </div>
                                <div class="clear"></div>
                                <div class="s2qrtxt">UC 浏览器扫一扫</div>
                            </div>
                            <div class="sect2right" style="width:405px;  ">
                                <!--<p>①&nbsp;&nbsp;手机扫描二维码，进入APP下载页面，点击下载</p>-->
                                <p>①&nbsp;&nbsp;手机浏览器扫描二维码，进入下载页面，点击下载</p>
                                <p>
                                    ②&nbsp;&nbsp;APP安装和授权
                                    <a href="javascript:;" target="_blank">点此查看IOS版教程</a>
                                </p>
                                <!-- <p>
                                    ③&nbsp;&nbsp;APP注册的用户必填识别码,识别码为：
                                    <font class="agid">21596011</font>
                                </p> -->
                                <p>
                                    ④&nbsp;&nbsp;<a :href="站点配置.app_download" target="_blank">点此下载客户端</a>
                                </p>
                                <p>
                                    ③&nbsp;&nbsp;注册会员和登录
                                    <!-- <a href="javascript:;" target="_blank">点击查看</a> -->
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
                <div class="clear"></div>
                
                <!-- <div class="sect2">
                    <div class="sect2top">
                        <div class="sect2left">
                            <div class="s2qr">
                                <div id="qrcode"></div>
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
                                <a href="javascript:;" target="_blank">点击查看</a>
                            </p>
                        </div>
                    </div>
                </div> -->

            </div>
        </div>

        <Fotter />
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Fotter from "@/components/Fotter/Fotter.vue";
import { mapGetters } from "vuex";
import QRCode from 'qrcodejs2'
export default {
    data() {
        return {
            config: config
        };
    },
    components: {
        Header,
        Fotter
    },
    computed: {
        ...mapGetters({
            站点配置: "站点配置"
        })
    },
    mounted() {
        this.qrcode();
    },
    methods: {
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                width: 118,
                height: 118,
                text: 'https://0698aa.com', // 二维码地址
                colorDark: "#000",
                colorLight: "#fff",
            })
        },
    }
};
</script>

<style lang="scss" scoped>
.appurl{
    width: 100%;
    height: 100%;
}
#mwebbox {
    width: 100%;
    background: #232323;
    height: auto;
    overflow: hidden;
    min-width: 1000px;
    font-family: "微软雅黑", "Microsoft YaHei", "宋体";
    color: #fff;
}
#mwebboxmid {
    width: 100%;
    padding: 30px 0;
    height: auto;
    margin: 0 auto;
}

.setcmid {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
}
.setcmid:not(.noborder) {
    border-bottom: 1px solid #4d4d4d;
}
.sect0 {
    width: 555px;
    height: 400px;
    background: url(../../assets/shoujixiazhu/sect0.png) no-repeat left top;
    margin: 0 auto;
    margin-top: 30px;
    padding-left: 445px;
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
    background: url(../../assets/shoujixiazhu/appico.png) no-repeat left center;
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
    width: 1000px;
    height: 413px;
    background: url(../../assets/shoujixiazhu/mobile_web_img1_2.png) no-repeat
        right top;
    margin: 0 auto;
    margin-top: 30px;
}
.sect1title {
    height: 34px;
    line-height: 34px;
    font-size: 36px;
    padding-left: 65px;
}

.fr,
.right {
    float: right;
}
.fl,
.left {
    float: left;
}
.mwebleft {
    float: left;
    width: 520px;
    margin-left: 65px;
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
    position: absolute;
    top: 3px;
    left: 3px;
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
    padding-left: 20px;
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
.mwtxt a {
    display: block;
    float: left;
    color: #ffffff;
    font-weight: bold;
    padding: 0 10px 0 0px;
    height: 45px;
    line-height: 45px;
    background: url() repeat-x;
    text-align: center;
}

.sect2 {
    width: 1000px;
    height: 635px;
    background: url(../../assets/shoujixiazhu/sect2.png) no-repeat center bottom;
    margin: 0 auto;
    overflow: hidden;
}
.sect2top {
    margin-top: 60px;
    height: 180px;
    padding-left: 248px;
}
.sect2left {
    float: left;
    width: 130px;
}
.s2qr {
    float: left;
    border: 1px solid #575757;
    padding: 9px;
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
