<template>
    <div
        style="background-image:url('image/index/bg.jpg'); 
  width:100%;height:900px;
    overflow: hidden;"
    >
        <van-nav-bar title="欢迎登录使用" left-arrow @click-left="onClickLeft" style="background:#cdcdcd" />
        <div class="login">
            <ul>
                <li>
                    <img src="image/my/icon-user.png" alt />
                    <span style="padding-left:6px;">账号：</span>
                    <input type="text" placeholder="请输入账号或手机号"  v-model="user.uid"/>
                </li>
                <li>
                    <img src="image/my/icon-pwd.png" alt v-if="!isphone"  />
                     <span v-if="!isphone"  style="padding-left:6px;">密码：</span>
                    <input type="password" placeholder="请输入密码"   v-model="user.pwd" v-if="!isphone" />

                    <div @click="改变验证码()" class="验证码地址 van-icon van-icon-certificate" style="font-size:15px" v-if="!isphone">
                        <span>验证码:</span>
                        <span>
                            <input
                                class="inp3"
                                type="text"
                                v-model="user.code"
                                @focus="focus1"
                                @keyup.enter="登录()"
                                placeholder="请输入验证码"
                            />
                        </span>
                         <img v-if="验证码地址" :src="验证码地址" />
                    </div>
                     <span v-if="isphone">
                <input class="inp4" v-model="user.sms" type="password" placeholder="短信验证码" />
                <b class="login_sms" @click="getSms()">{{时间>0 ? 时间+'s' : '获取短信'}}</b>
            </span>
                </li>
            </ul>
            <button class="login_dl" @click="登录()">登录</button>
            <button class="btn_4" @click="$router.push('/registered')">马上注册</button>
            <button class="btn_4">免费试玩</button>
            <button class="btn_4">电脑版</button>
            <button class="btn_4" @click="$router.push('/')">返回首页</button>
        </div>
    </div>
</template>

<script>
import {
    api_密码登录,
    api_Online,
    api_获取短息验证码,
    api_短息登录
} from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
import axios from "axios";
import JSEncrypt from "jsencrypt";
import { Toast } from "vant";

export default {
    data() {
        return {
            config: config,
            验证码地址: "",
            user: {
                uid: "",
                pwd: "",
                code: "",
                sms: "" //短息验证码
            },
            定时器: "",
            时间: 0
        };
    },
    computed: {
        ...mapState({
            userInfo: "userInfo"
        }),
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid);
        }
    },
    methods: {
        ...mapMutations({
            修改state: "修改state"
        }),
        ...mapActions({
            Online: "Online",
            获取平台余额: "获取平台余额"
        }),

        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.$router.push("/registered");
        },
        getSms() {
            if (this.时间 != 0) {
                return;
            }
            this.时间 = 60;
            this.定时器 = setInterval(() => {
                this.时间--;
                if (this.时间 <= 0) {
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_获取短息验证码({ uid: this.user.uid })
                .then(x => {
                    if (x.data.code == 0) {
                        Toast("短信发送成功");
                    } else {
                        Toast(x.data.msg);
                    }
                })
                .catch(err => {});
        },
        focus1() {
            if (!this.验证码地址) {
                this.验证码地址 =
                    config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            this.验证码地址 =
                config.api_url + "/Home/Verify?v=" + Math.random();
        },
        登录() {
            if (this.isphone) {
                var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!phoneTest.test(this.user.uid)) {
                    Toast("请输入电话号码");
                    return;
                } else if (!this.user.sms) {
                    Toast("请输入验证码");
                    return;
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                };
                api_短息登录(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            localStorage.setItem(
                                "islogin",
                                JSON.stringify(this.formInline)
                            );
                            Toast("登录成功");
                            this.getUserInfo().then(() => {
                                // this.$router.push('/my')
                                history.back();
                            });
                        } else {
                            Toast(x.data.msg);
                        }
                    })
                    .catch(err => {
                        this.改变验证码();
                        Toast("网络异常稍后再试");
                    });
            } else {
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
                if (!this.user.uid) {
                    Toast("请输入用户名");
                    return;
                } else if (!this.user.pwd) {
                    Toast("请输入密码");
                    return;
                } else if (!this.user.code) {
                    Toast("请输入验证码");
                    return;
                }
                api_密码登录(obj).then(x => {
                    if (x.data.code == 0) {
                        Toast.success("登录成功");
                        this.$router.push("/");
                        this.Online();
                    } else {
                        Toast.fail("密码错误");
                    }
                });
            }
        }
    }
};
</script>
<style  scoped>
/* .inp3{
    margin-top: 10px;
} */
.login_sms {
    position: relative;
    right: 64px;
}
.验证码地址{
    border-top: 1px solid white;
    width: 100%;
    height: 45px;
}
.验证码地址 img {
    position: relative;
    float: right;
    top: -33px;
    width: 80px !important;
    height: 30px !important;
    right: 40px !important;
}
.验证码地址 i {
    left: 80px;
}
.login {
    margin-top: 20px;
}
.login ul li {
    width: 90%;
    border: 1px solid #fff;
    background: #dedede;
    margin: 0 auto;
}
.login ul li:first-child {
    border-radius: 2px 2px 0 0;
    border-bottom: 0px;
}
.login ul li:last-child {
    border-radius: 0 0 2px 2px;
}
.login input {
    width: 80%;
    background: #dedede;
    border: 0px;
    margin-bottom: 0px;
}
.login ul li img {
    width: 16px;
    height: 16px;
}
.login_dl {
    width: 90%;
    height: 50px;
    background: #1e87ff;
    margin: 19px;
    color: white;
    font-size: 15px;
}
.btn_4 {
    width: 90%;
    height: 34px;
    background: #ececec;
    color: #579cec;
    font-size: 15px;
    margin: 10px 0px 0 18px;
}
.van-nav-bar__title{
    font-size: 18px;
    color: #444444;
    font-weight: bold;
}
.van-nav-bar .van-icon{
    color: #444444;
}
</style>