<template>
    <div>
        <div class="top_bg">
            <div class="top w1000">
                <img v-if="config.showlog && config.getConfig==3" class="logo_img" src="static/webConfig/image/logo1.png" alt="logo" />
                <img v-if="config.showlog && config.getConfig==1" class="logo_img" :src="config.logo" alt="logo" />

                <div class="top_txt">
                    <a href="#/shoujixiazhu">手机下注 |</a>
                    <a href="javascript:;" @click="shoucang()">加入收藏</a>
                    <img src="../../assets/index_img/langs.png" alt />
                </div>
                <div id="login" v-if="!userInfo.UserId">
                    <input v-model="user.uid" @keyup.enter="登录()" type="text" placeholder="账号" />
                    <input v-model="user.pwd" @keyup.enter="登录()" type="password" placeholder="密码" />
                    <input type="text" v-model="user.code" @focus="focus1" @keyup.enter="登录()" placeholder="请输入验证码" />
                    <img v-if="验证码地址" :src="验证码地址" />
                    <div @click="改变验证码()" class="验证码地址">
                        <a href="#" @click="登录()">登入</a>
                        <!-- <a href="#">加入会员</a> -->
                        <a href="#/lijikaihu">注册</a>
                    </div>
                </div>
                <!-- 退出 -->
                <div id="out_login_header" v-if="userInfo.UserId">
                    <a href="javascript:;">欢迎您：{{userInfo.UserId}}</a>
                    <a href="javascript:;">余额：{{userInfo.Money}}</a>
                    <a href="#/member?t=person">会员中心</a>
                    <a href="#/member?t=deposit">存款</a>
                    <a href="#/member?t=withdrawal">取款</a>
                    <a href="#/member?t=orders">投注记录</a>
                    <a href="#" @click="login_out()">退出</a>
                    <div class="cb"></div>
                </div>

                <div class="cb"></div>
            </div>
        </div>
        <!-- 导航栏 -->
        <div class="nav">
            <ul class="w1000">
                <li @mouseenter="移入(item)" @mouseleave="移出(item)" v-for="(item, index) in config.navigation_list" :key="index">
                    <a href="javascript:;" @click="选中颜色(index,item)" :style="{'color':path === item.url?'yellow':''}">{{item.name}}</a>

                    <div class="zhibo_menu_header" v-if="item.children && item.show">
                        <ul v-if="item.children.length>0">
                            <li v-for="(item1, index) in item.children" :key="index">{{item1.ename}}</li>
                        </ul>
                    </div>
                </li>
                <div class="cb"></div>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.logo_right{
    float: right;
}
.跳转 {
    font-size: 20px;
}
.addclass {
    border-bottom: 3px solid #fb7299;
    color: #fb7299;
}
#out_login_header{
    display: flex;
    justify-content: flex-end;
}
#out_login_header a {
    color: white;
    font-size: 13px;
    position: relative;
    padding-left: 6px;
}
#out_login_header a:hover {
    color: yellow;
}
#login{
    display: flex;
    justify-content: flex-end;
}
#login img {
    height: 21px;
    margin: 0px 0px 0px 5px;
}
.zhibo_menu_header ul li {
    float: left;
    background: #3c2a22;
    padding: 0 10px;
    height: 17px;
    padding: 10px;
}
.zhibo_menu_header {
    width: 1200px;
    height: 25px;
    position: absolute;
    top: 125px;
    z-index: 999;
    color: white;
    left: 162px;
    text-decoration: none;
    font-size: 12px;
    border-radius: 20px;
}
#zhibo_menu_header {
    display: none;
    position: absolute;
    width: 520px;
    height: 25px;
    top: 115px;
    left: 12px;
    z-index: 999;
    padding: 0 10px;
    color: #ffffe4;
    text-decoration: none;
    font-size: 12px;
    background: #3c2a22;
    padding-top: 7px;
    border-radius: 5px;
}
#zhibo_menu_header li {
    float: left;
    padding-left: 5px;
    background: #3c2a22;
}
.zhibo:hover #zhibo_menu_header {
    display: block;
}
/*  */
#dianzi_menu {
    display: none;
    position: absolute;
    width: 659px;
    height: 25px;
    top: 115px;
    left: 12px;
    z-index: 999;
    padding: 0 10px;
    color: #ffffe4;
    text-decoration: none;
    font-size: 12px;
    background: #3c2a22;
    padding-top: 7px;
    border-radius: 5px;
}
#dianzi_menu li {
    float: left;
    padding-left: 5px;
    background: #3c2a22;
}
.dianzi:hover #dianzi_menu {
    display: block;
}
.top_bg {
    background: #007251;
}

a {
    text-decoration: none;
}
ul li {
    list-style: none;
}
.logo_img {
    float: left;
    height: 45px;
}
.top {
    min-height: 81px;
    padding: 20px 0px 20px;
    box-sizing: border-box;
}
.top_txt img {
    width: 70px;
    height: 15px;
}
.top_txt {
    text-align: right;
    margin-bottom: 4px;
}
.top_txt a {
    font-size: 12px;
    color: white;
    margin-left: 2px;
}
#login {
    margin-left: 326px;
}
#login input {
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
#login a {
    float: left;
    width: 80px;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    text-align: center;
    border: 1px solid #064533;
    background-color: #d7e4e0;
    color: #015f44;
    font-size: 1px;
    margin-left: 4px;
}
#login a:hover {
    background: yellow;
}
.login a {
    float: left;
    width: 65px;
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
.login a:hover {
    background: #ffe31b;
}
.nav {
    width: 100%;
    height: 38px;
    background: #333333;
}
.nav ul {
    background: #333333;
}
.nav ul li{
    float: left;
}
.nav ul li a{
    width: 99px;
    height: 38px;
    line-height: 38px;
    display: block;
    text-decoration: none;
    text-align: center;
    color: #e3e3e3;
    overflow: hidden;
    /* float: left; */
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
import { mapState, mapActions } from "vuex";
import { constants } from "fs";
export default {
    data() {
        return {
            activeindex: "",
            验证码地址: "",
            user: {
                uid: "",
                pwd: "",
                code: ""
            }
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo",
            config:'config'
        }),
        path() {
            return this.$route.path;
        }
    },
    methods: {
        选中颜色: function (n, x) {
            this.activeindex = n;
            console.log(n)
            if (x.style == 1) {
                window.open(x.url)
            } else {
                this.$router.push(x.url)
            }
        },
        shoucang() {
            alert("请使用Ctrl+D进行添加！");
        },
        ...mapActions({
            Online: "Online"
        }),
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
                        showClose: true,
                        message: "登录成功",
                        type: "success"
                    });
                    this.Online();
                } else {
                    this.改变验证码();
                    this.$message({
                        showClose: true,
                        message: x.data.msg,
                        type: 'error'
                    });
                }
            });
            // .catch(err => {
            //   this.改变验证码();
            //   alert("网络异常稍后再试");
            // });
        },
        login_out() {
            api_退出登录().then(result => {
                console.log(result.data.code);
                this.Online();
                if (result.data.code == 0) {
                    this.$message({
                        showClose: true,
                        message: "退出成功",
                        type: "success"
                    });
                }
            });
        },
        focus1() {
            if (!this.验证码地址) {
                this.验证码地址 =config.api_url+ "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            this.验证码地址 =config.api_url+ "/Home/Verify?v=" + Math.random();
        }
    }
};
</script>
