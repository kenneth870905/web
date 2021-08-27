<template>
    <div class="bg">
        <van-nav-bar
            title="用户登录"
            left-arrow
            right-text="注册"
            @click-left="onClickLeft"
            @click-right="onClickRight"
            style="background:#717171;"
        />
        <img class="login_logo" src="webConfig/image/logo.png" alt />
        <div class="login_inp">
            <span class="spn1">
                <i class="van-icon van-icon-manager"></i>
                <input class="inp1" v-model="user.uid" type="text" placeholder="手机号或用户名" />
            </span>
            <span class="spn2" v-if="!isphone">
                <i class="van-icon van-icon-lock"></i>
                <input class="inp2" v-model="user.pwd" type="password" placeholder="密码" />
            </span>
            <div @click="改变验证码()" class="验证码地址" v-if="!isphone">
                <span>
                    <img v-if="验证码地址" :src="验证码地址" />
                    <i class="van-icon van-icon-success"></i>
                    <input
                        class="inp3"
                        type="text"
                        v-model="user.code"
                        @focus="focus1"
                        @keyup.enter="登录()"
                        placeholder="请输入验证码"
                    />
                </span>
            </div>
            <span v-if="isphone">
                <input class="inp4" v-model="user.sms" type="password" placeholder="短信验证码" />
                <b class="login_sms" @click="getSms()">{{时间>0 ? 时间+'s' : '获取短信'}}</b>
            </span>
            <span class="spn3">
                <button @click="登录()">登录</button>
            </span>
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
</script >

<style  scoped>
.login_sms {
    position: relative;
    right: 64px;
}
.验证码地址 img {
    position: relative;
    float: right;
    top: 25px;
    width: 55px;
    right: 115px;
}
.验证码地址 i {
    left: 80px;
}
.login_logo {
    margin-left: 90px;
    margin-top: 10px;
}
.bg {
    width: 100%;
    height: 811px;
    background: linear-gradient(#7a7a7a, #080808);
}
/* 适配苹果 8*/
@media screen and (min-width: 414px) {
    .login_inp {
        margin: 0 27px auto;
    }
    .login_logo {
    margin-left: 115px;
    }
}
.login_inp .inp1 {
    width: 231px;
    height: 40px;
    border-radius: 10px;
    margin-top: 30px;
    margin-left: 54px;
    padding-left: 40px;
    margin-bottom: 0px;
}
.login_inp .inp2 {
    width: 231px;
    height: 40px;
    margin-top: 20px;
    margin-left: 69px;
    border-radius: 10px;
    padding-left: 40px;
    margin-bottom: 0px;
}
.login_inp .inp3 {
    width: 231px;
    height: 40px;
    margin-top: 20px;
    margin-left: 55px;
    border-radius: 10px;
    padding-left: 35px;
    margin-bottom: 0px;
}
.login_inp .inp4 {
    width: 231px;
    height: 40px;
    margin-top: 20px;
    margin-left: 69px;
    border-radius: 10px;
    padding-left: 18px;
}
.login_inp .spn1 i {
    left: 80px;
}
.login_inp .spn2 i {
    top: 62px;
    left: -218px;
}
.login_inp .spn3 button {
    width: 230px;
    height: 40px;
    background: rgb(63, 63, 63);
    border-radius: 10px;
    text-align: center;
    color: white;
    font-size: 14px;
    margin-top: 20px;
    margin-left: 68px;
    border: #000;
}
.van-nav-bar .van-icon {
    color: white;
}
.van-nav-bar__text {
    color: white;
}
.van-nav-bar {
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
</style>