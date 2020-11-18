<template>
    <div>
        <Header />
        
        <!-- 轮播图 -->
        <div class="lunbo w1000">
            <!-- <el-carousel :interval="2000" indicator-position="outside"> -->
            <el-carousel :autoplay="false">
                <el-carousel-item v-for="item in resData" :key="item.id">
                    <img :src="item.Img" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 中间左边 -->
        <!-- <div class="middle-left">
            <a href="javascript:;" class="zx">
                <img src="static/index_img/news_bg.png" alt />
            </a>
            <a href="javascript:;" class="cjcj">
                <img src="static/index_img/prize_bg.png" alt />
            </a>
        </div> -->
        
        <!-- <div v-for="(item,index) in config.roll_text " :key="index">
            <p class="news-title">{{item.title}}</p>
            <div class="gundong_txt" style="color:#FFF;font-size:13px; ">
                <marquee scrollamount="3" scrolldelay="150" direction="up" height="70" onmouseover="this.stop();" onmouseout="this.start();" style="cursor:pointer;">{{item.text}}</marquee>
            </div>
        </div> -->
        <!-- 中间右边 -->
        <div class="first-game-wrap w1000">
            <!-- 中间左边 -->
            <div class="middle-left">
                <a href="javascript:;" class="zx">
                    <img src="static/index_img/news_bg.png" />
                    <div class="title_1">最新消息</div>
                    <div class="滚动字幕">
                        <marquee scrollamount="3" scrolldelay="150" direction="up" height="70" onmouseover="this.stop();" onmouseout="this.start();" style="cursor:pointer;">
                            <span v-for="(item,index) in config.roll_text " :key="index">
                                {{item.text}}
                            </span>
                        </marquee>
                    </div>
                </a>
                <a href="javascript:;" class="cjcj">
                    <img src="static/index_img/prize_bg.png" alt />
                    <span class="金额">{{userInfo.Money ? userInfo.Money : 0}}</span>
                    <div class="title_2">超级彩金</div>
                </a>
            </div>

            <div class="fn" @click="$router.push('/tiyusaishi')">
                <img src="static/index_img/f1.png" alt="" srcset="">
                <img src="static/index_img/f1on.png" alt="" srcset="">
            </div>
            <div class="fn" @click="$router.push('/shixunzhibo')">
                <img src="static/index_img/f2.png" alt="" srcset="">
                <img src="static/index_img/f2on.png" alt="" srcset="">
            </div>
            <div class="fn" @click="$router.push('/caipiaoyouxi')">
                <img src="static/index_img/f3.png" alt="" srcset="">
                <img src="static/index_img/f3on.png" alt="" srcset="">
            </div>
            <div class="fn" @click="$router.push('/dianziyouyi')">
                <img src="static/index_img/f4.png" alt="" srcset="">
                <img src="static/index_img/f4on.png" alt="" srcset="">
            </div>
            <div class="cb"></div>
        </div>
        <div class="first-middle-bottom w1000">
            <div id="btnreg">
                <a href="#/lijikaihu"></a>
            </div>
            <div id="btnyouhui">
                <a href="#/youhuihuodong"></a>
            </div>
            <div id="btnkefu">
                <!-- <el-button  type="text" @click="open2"> -->
                <a :href="config.online_chat" class="popupkefu" target="_blank"></a>
                <!-- </el-button> -->
            </div>
        </div>

        <Fotter />
    </div>
</template>

<style scoped>
.cjcj img {
    cursor: pointer;
    transition: all 0.6s;
}
.zx img {
    cursor: pointer;
    transition: all 0.6s;
}
.addclass {
    color: red;
}
#top_login img {
    width: 58px;
    height: 21px;
    position: absolute;
    top: 45px;
    left: 1195px;
}
#zhibo_menu ul li {
    float: left;
    background: #3c2a22;
    padding: 0 5px;
    height: 17px;
    padding: 10px;
}
#zhibo_menu {
    width: 1200px;
    height: 25px;
    position: absolute;
    top: 139px;
    z-index: 999;
    color: white;
    left: 162px;
    text-decoration: none;
    font-size: 12px;
    border-radius: 20px;
}
#dianzi_menu li {
    float: left;
    padding-left: 5px;
    background: #3c2a22;
}
.dianzi:hover #dianzi_menu {
    display: block;
}
.el-carousel__arrow {
    background: #007251;
}
/deep/ .el-carousel__container {
    /* height: 300px; */
    height: calc( 268 / 750 * 1200px );
    overflow: hidden;
}

.logo_img {
    position: absolute;
    width: 200px;
    height: 200px;
    top: 27px;
}
.top {
    width: 1000px;
    height: 81px;
    margin-left: 451px;
}
.top img {
    width: 230px;
    height: 45px;
}
.top_txt img {
    width: 70px;
    height: 15px;
}
.top_txt {
    margin-left: 800px;
    margin-top: 20px;
    margin-bottom: 4px;
}
.top_txt a {
    font-size: 12px;
    color: white;
    margin-left: 2px;
}
#top_login {
    margin-left: 326px;
}

#top_login input {
    color: #80a298;
    background-color: #0a5e46;
    border: 1px solid #054432;
    float: left;
    margin-left: 10px;
    margin-top: 0.2px;
    display: block;
    width: 137px;
    height: 20px;
    font-size: 12px;
    padding: 0 0 0 10px;
    outline: none;
}
#top_login a {
    float: left;
    width: 80px;
    height: 20px;
    line-height: 22px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #064533;
    background-color: #d7e4e0;
    color: #015f44;
    font-size: 1px;
    margin-left: 4px;
}
#top_login a:hover {
    background: #ffe31b;
}
#out_login a {
    color: white;
    font-size: 13px;
    position: relative;
    left: 570px;
    padding-left: 6px;
}
#out_login a:hover {
    color: yellow;
}
.nav {
    width: 100%;
    height: 38px;
    background: #333333;
}
.nav ul {
    margin-left: 23%;
    background: #333333;
}
.nav ul li a {
    width: 99px;
    height: 38px;
    line-height: 38px;
    display: block;
    text-decoration: none;
    text-align: center;
    color: #e3e3e3;
    overflow: hidden;
    float: left;
    font-size: 13px;
    background: #333333;
}
/* .nav ul li a:hover {
    color: yellow;
} */
.rid-content img {
    width: 400px;
    height: 300px;
}
/* 轮播 */
.lunbo {
    margin: 0px auto;
}
.lunbo img {
    width: 100%;
}
.middle-left {
    position: absolute;
    z-index: 100;
    left: 0px;
    bottom: 0px;
    width: 325px;
}
.middle-left .title_1{
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    left: 15px;
    color: #fff;
    top: 47%;
}
.middle-left .title_2{
    font-size: 16px;
    font-weight: bold;
    position: absolute;
    top: 10%;
    left: 15px;
    color: #fff;
} 
.middle-left .金额{
    position: absolute;
    top: 54%;
    font-weight: bold;
    right: 41%;
    color: #fff;
    font-size: 25px;
}
 

.middle-left .滚动字幕{
    position: absolute;
    width: 100%;
    top: 61%;
    color: #fff;
    font-size: 13px;
    padding: 5px;
    box-sizing: border-box;
    height: 36%;
}
.middle-left .滚动字幕 marquee{
    height: 100%;
}
.middle-left>a>img{
    width: 100%;
}
.middle-left>a{
    display: block;
    position: relative;
}
.news-title {
    height: 36px;
    line-height: 36px;
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 2px;
    position: absolute;
    top: 439px;
    left: 443px;
    z-index: 101;
    color: #fff;
    /* background: #035e3f; */
    opacity: 0.9;
}
.p-title {
    height: 36px;
    line-height: 36px;
    color: #fff;
    font-size: 20px;
    font-weight: bolder;
    position: absolute;
    top: 561px;
    left: 445px;
    z-index: 101;
    /* background: #035e3f; */
}

/* first-game-wrap  体育赛事.....*/
.first-game-wrap {
    margin: 30px auto;
    /* width: 720px; */
    box-sizing: border-box;
    position: relative;
    display: flex;
    padding-left: 350px;
}
.first-game-wrap .fn{
    margin: 0px 10px;
    width: 25%;
    cursor: pointer;
}
.first-game-wrap .fn img{
    width: 100%;
}
.first-game-wrap .fn:hover >img:nth-child(1){
    display: none;
}
.first-game-wrap .fn:hover >img:nth-child(2){
    display: block;
}
.first-game-wrap .fn>img:nth-child(2){
    display: none;
}

/* 注册 VIP 在线客服 */
.first-middle-bottom {
    height: 120px;
    margin: 10px auto 20px auto;
    background-image: url(../assets/index_img/c_bg.png);
    background-size: 100% 100%;
    /* position: absolute; */
    top: 713px;
    left: 456px;
}
#btnreg {
    float: left;
    width: 33.3%;
    height: 120px;
}
#btnreg a {
    display: block;
    width: 100%;
    height: 120px;
    background: url(../assets/index_img/btn_join_us.png) no-repeat;
}
#btnreg a:hover {
    background: url(../assets/index_img/btn_join_us.png) no-repeat left bottom;
}

#btnyouhui {
    float: left;
    width: 33.3%;
    height: 120px;
}
#btnyouhui a {
    display: block;
    width: 100%;
    height: 120px;
    background: url(../assets/index_img/btn_vip.png) no-repeat;
}
#btnyouhui a:hover {
    background: url(../assets/index_img/btn_vip.png) no-repeat left bottom;
}

#btnkefu {
    float: left;
    width: 33.3%;
    height: 120px;
}
#btnkefu a {
    display: block;
    width: 100%;
    height: 120px;
    background: url(../assets/index_img/btn_online_service.png) no-repeat;
}
#btnkefu a:hover {
    background: url(../assets/index_img/btn_online_service.png) no-repeat left
        bottom;
}

.middle-bottom {
    position: absolute;
    top: 710px;
    left: 417px;
    background: #04442e;
    margin-left: 30px;
    margin-top: -4px;
}
.middle-bottom1 {
    position: absolute;
    top: 710px;
    left: 800px;
}
.middle-bottom2 {
    position: absolute;
    top: 710px;
    left: 1100px;
}
.middle-bottom {
    background: url(../assets/index_img/btn_join_us.png) center top no-repeat;
    width: 308px;
    height: 120px;
}
.middle-bottom1 {
    background: url(../assets/index_img/btn_online_service.png) center top
        no-repeat;
    width: 308px;
    height: 120px;
}
.middle-bottom2 {
    background: url(../assets/index_img/btn_join_us.png) center top no-repeat;
    width: 308px;
    height: 120px;
}
.bg_img {
    width: 998px;
    height: 120px;
    position: absolute;
    top: 706px;
    left: 448px;
}
#footer {
    width: 100%;
    height: 90px;
    background: #004532;
    position: relative;
    top: 390px;
}
#honlogo {
    background: url(../assets/index_img/honlogo.png) no-repeat;
    height: 50px;
    margin-left: 430px;
    margin-top: 20px;
}
.foter_txt {
    font-size: 12px;
    position: absolute;
    top: 40px;
    left: 860px;
    background: #004532;
}
.foter_txt a {
    background: #004532;
    color: #80a298;
    padding-left: 10px;
}
.foter_txt a:hover {
    color: #64c399;
}
.foter_txt span {
    display: block;
    margin-top: 10px;
    margin-left: 325px;
    background: #004532;
    color: #80a298;
}
.gundong_txt {
    width: 273px;
    height: 50px;
    position: absolute;
    top: 476px;
    left: 444px;
    z-index: 100;
    opacity: 0.8;
}
/* 两侧广告*/
.left_advertising {
    position: absolute;
    top: -739px;
    z-index: 100;
}
.right_advertising {
    position: absolute;
    top: -739px;
    left: 1738px;
    z-index: 100;
}
/* 导航栏闪烁字体 */
.nav ul li .blink {
    color: yellow;
}
@keyframes blink {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
/* 定义blink类*/
.blink {
    color: red;
    animation: blink 1s linear infinite;
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
</style>
<script>
import { api_密码登录, api_Online, api_退出登录 } from "@/api/登录接口.js";
import JSEncrypt from "jsencrypt";
import axios from "axios";

import Header from "@/components/Header/Header.vue";
import Fotter from "@/components/Fotter/Fotter.vue";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            show: true,
            show_right: true,
            activeindex: "",
            验证码地址: "",
            active: -1,
            resData: [],
            // userInfo:[],
            user: {
                uid: "",
                pwd: "",
                code: ""
            }
        };
    },
    components: {
        Header, //注册组件
        Fotter,
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            config:'config'
        }),
        path() {
            return this.$route.path
        }
    },
    methods: {
        del() {
            this.show_right = !this.show_right
        },
        show1() {
            this.show = !this.show
        },
        选中颜色: function (n, x) {
            this.activeindex = n;
            if (x.style == 1) {
                window.open(x.url);
            } else {
                this.$router.push(x.url);
            }
        },
        shoucang() {
            alert("请使用Ctrl+D进行添加！");
        },
        AddFavorite(url, title) {
            try {
                if (document.all) {
                    window.external.AddFavorite(url, title);
                } else if (window.sidebar && window.sidebar.addPanel) {
                    window.sidebar.addPanel(title, url, "");
                } else if (window.external) {
                    window.external.AddFavorite(url, title);
                } else if (window.opera && window.print) {
                    return true;
                }
            } catch (e) {
                alert("加入收藏失败，\n请使用Ctrl+D进行添加！");
            }
        },
        open2() {
            this.$confirm("即将接入客服中心, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "接入成功!"
                    });
                    window.location.href =
                        "https://ssl-f588e8cb.smoothconv.com/dist/standalone.html?eid=143504";
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消接入"
                    });
                });
        },
        ...mapActions({
            Online: "Online",
            获取平台余额: "获取平台余额"
        }),
        ...mapMutations({
            修改state: "修改state"
        }),
        显示游戏弹框() {
            //第一步
            this.修改state(["显示进入游戏弹框", true]);
            // 第二部
            this.修改state(["待进入游戏", { name: "name" }]);
            //第三步

            this.获取平台余额({ type: "" })
                .then(x => {
                    console.log(x);
                    // this.修改state(['Moneymin',x.data.msg]);
                })
                .catch(err => { });
        },
        //鼠标移入移出显示二级菜单列表
        移入(item) {
            this.$set(item, "show", !item.show);
        },
        移出(item) {
            this.$set(item, "show", !item.show);
        },
        登录() {
            var publicKey =
                "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB";

            var layout_encrypt = new JSEncrypt();
            layout_encrypt.setPublicKey(publicKey);
            var pwd = layout_encrypt.encrypt(this.user.pwd);
            var obj = {
                uid: this.user.uid,
                pwd: pwd,
                code: this.user.code
            };
            api_密码登录(obj).then(x => {
                if (x.data.code == 0) {
                    this.$message({
                        message: "登录成功",
                        type: "success"
                    });
                    this.Online();
                } else {
                    this.$message("密码错误");
                }
            });
            // .catch(err => {
            //   this.改变验证码();
            //   console.log("网络异常稍后再试");
            // });
            //获取用户登录信息
            // api_Online(obj).then(result => {
            //   console.log(result.data);
            //   this.userInfo = result.data
            // });
        },
        login_out() {
            api_退出登录().then(result => {
                console.log(result.data.code);
                this.Online();
                if (result.data.code == 0) {
                    this.$message({
                        message: "退出成功",
                        type: "success"
                    });
                }
            });
        },
        focus1() {
            if (!this.验证码地址) {
                this.验证码地址 =
                    config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            console.log(111);
            this.验证码地址 =
                config.api_url + "/Home/Verify?v=" + Math.random();
        }
    },
    created: function () {
        var this_1 = this;
        var url = config.api_url + "/Systems/Activity/InfoGetList";
        axios.post(url, { home: true }).then(res => {
            this.resData = res.data;
        });
    }
};
</script>

