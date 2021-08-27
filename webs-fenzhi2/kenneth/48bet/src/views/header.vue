<template>
    <div class="头部">
        <div class="w1200">
            <div class="top1">
                <router-link tag="div" to="/" class="logo">
                    <img v-if="config.showlog" :src="config.logo" />
                </router-link>
                <!-- <div class="logo" @click="$router.push('/')">
                </div> -->
                <div class="登录注册">
                    <div class="登录框" v-if="!userinfo.UserId">
                        <el-input ref="uid" @keyup.native.enter="登录()" size="mini" v-model="user.uid" placeholder="手机号或账号"></el-input>
                        <el-input type="password" ref="pwd" @keyup.native.enter="登录()" v-if="!isphone" size="mini" v-model="user.pwd" placeholder="密码"></el-input>
                        <el-input ref="code" @keyup.native.enter="登录()" v-if="!isphone" @focus="focus1()" size="mini" v-model="user.code" placeholder="验证码"></el-input>
                        <el-input ref="msm" @keyup.native.enter="登录()" v-if="isphone" size="mini" v-model="user.sms" placeholder="短信验证"></el-input>
                        <div class="验证码_1" v-if="验证码地址 && !isphone">
                            <img @click="改变验证码()" :src="验证码地址" alt="" srcset="" />
                        </div>
                        <!-- <el-button size="mini" type="success">获取短信验证</el-button> -->
                        <el-button v-if="isphone" @click="getSms()" size="mini" type="warning">{{ 时间 > 0 ? 时间 + "s" : "获取短信" }}</el-button>
                        <el-button @click="登录()" size="mini" type="info">登录</el-button>
                    </div>
                    <div class="已登录" v-if="userinfo.UserId">
                        <span>欢迎您,{{ userinfo.UserId }}</span>
                        <span>余额：￥{{ userinfo.Money }}</span>
                        <span>
                            [<router-link to="/iframe/person" class="黄色">会员中心</router-link>]
                        </span>
                        <span v-if="!试玩">
                            [<router-link to="/iframe/deposit" class="红色">在线存款</router-link>]
                        </span>
                        <span v-if="!试玩">
                            [<router-link to="/iframe/withdrawal">在线取款</router-link>]
                        </span>
                        <span @click="退出()">
                            [<a class="黄色" href="javascript:;">退出</a>]
                        </span>
                    </div>
                    <div class="btn_2">
                        <img src="static/image/shizhong.png" alt="" srcset="" />
                        <span class="time"> {{ 当前时间 }} (GMT +08:00) </span>
                        <button>
                            <a :href="config.online_chat" target="_blank">
                                <i class="icon iconfont icon-zhongguohangtiantubiaoheji-weizhuanlunkuo-"></i>
                                在线客服
                            </a>
                        </button>
                        <button @click="免费试玩()" v-if="!userinfo.UserId">
                            免费试玩
                        </button>
                        <button :class="{红色字体:红色字体}" @click="$router.push('/register')" v-if="!userinfo.UserId">
                            免费注册
                        </button>
                        <button @click="忘记密码()">忘记密码</button>
                    </div>
                </div>
            </div>

            <div class="导航">
                <ul class="top2">
                    <li v-for="(item, index) in config.navigation_list" :key="index" v-if="item.url != '/phone' || (item.url == '/phone' && 站点配置.appUrl)">
                        <div @click="跳转(item)" :class="{ active: item.url == path }" class="title_1">
                            {{ item.name }}
                        </div>
                        <ul class="children" v-if="item.children.length > 0">
                            <li @click="进入游戏(item1)" v-for="(item1, index1) in item.children" :key="index1">
                                {{ item1.name }}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {
    api_退出登录,
    api_密码登录,
    api_获取短息验证码,
    api_短息登录,
    api_登录试玩
} from "@/api/登录接口.js";
import JSEncrypt from "jsencrypt";

import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: "",
    data() {
        return {
            查看密码: false,
            验证码地址: "",
            publicKey:
                "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            user: {
                uid: "",
                pwd: "",
                code: "", //文字验证嘛
                sms: "" //短息验证码
            },
            定时器: "",
            时间: 0,
            当前时间: "",
            红色字体:true
        };
    },
    computed: {
        ...mapState({
            config: "config",
            userinfo: x => x.user.userinfo
        }),
        ...mapGetters({
            站点配置: "站点配置",
            试玩:'user/试玩'
        }),
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid);
        },
        path() {
            return this.$route.path;
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: "user/getUserInfo",
            错误提示: "错误提示",
            成功提示: "成功提示",
            加载中: "加载中",
            设置进入游戏: "待入游戏/设置进入游戏"
        }),
        忘记密码() {
            this.$alert(
                "尊敬的客户您好，如果您的密码忘记或丢失!<br/>请联系我们的客服，谢谢！",
                "系统消息",
                {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: action => { }
                }
            );
        },
        跳转(item) {
            if (item.url_type == 0 && item.url) {
                this.$router.push(item.url);
            }
        },
        focus1(e) {
            if (!this.验证码地址) {
                this.验证码地址 =
                    this.config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
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
                        this.成功提示("短信发送，请注意查收");
                    } else {
                        this.错误提示(x.data.msg);
                    }
                })
                .catch(err => {
                    this.错误提示("系统错误，稍后再试");
                });
        },
        登录() {
            if (this.isphone) {
                var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!phoneTest.test(this.user.uid)) {
                    this.错误提示("请输入电话号码");
                    this.$refs.uid.focus();
                    return;
                } else if (!this.user.sms) {
                    this.$refs.msm.focus();
                    this.错误提示("请输入验证码");
                    return;
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                };

                this.加载中(true);
                api_短息登录(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            this.getUserInfo().then(() => {
                                this.成功提示("登录成功");
                                this.加载中(false);
                                this.user = {
                                    uid: "",
                                    pwd: "",
                                    code: "", //文字验证嘛
                                    sms: "" //短息验证码
                                };
                            });
                        } else {
                            this.错误提示(x.data.msg);
                            this.加载中(false);
                        }
                    })
                    .catch(err => {
                        this.加载中(false);
                        this.改变验证码();
                        this.错误提示("网络异常稍后再试");
                    });
            } else {
                if (!this.user.uid) {
                    this.$refs.uid.focus();
                    this.错误提示("请输入用户名");
                    return;
                } else if (!this.user.pwd) {
                    this.$refs.pwd.focus();
                    this.错误提示("请输入密码");
                    return;
                } else if (!this.user.code) {
                    this.$refs.code.focus();
                    this.错误提示("请输入验证码");
                    return;
                }
                //加密
                var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj = {
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code
                };
                this.加载中(true);
                api_密码登录(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            this.getUserInfo().then(() => {
                                this.成功提示("登录成功");
                                // this.$router.push('/my')
                                this.加载中(false);
                                this.user = {
                                    uid: "",
                                    pwd: "",
                                    code: "", //文字验证嘛
                                    sms: "" //短息验证码
                                };
                            });
                        } else {
                            this.改变验证码();
                            this.错误提示(x.data.msg);
                            this.加载中(false);
                        }
                    })
                    .catch(err => {
                        this.加载中(false);
                        this.改变验证码();
                        this.错误提示("网络异常稍后再试");
                    });
            }
        },
        退出() {
            api_退出登录()
                .then(x => {
                    if (x.data.code == 0) {
                        this.getUserInfo();
                        this.成功提示("退出成功");
                    } else {
                        this.错误提示(x.data.msg);
                    }
                })
                .catch(err => {
                    this.错误提示("系统错误稍后再试");
                });
        },
        async 免费试玩() {
            this.加载中(true);
            try {
                var r = await api_登录试玩();
                if (r.data.code == 0) {
                    this.成功提示("登录成功");
                } else {
                    this.错误提示(r.data.msg);
                }
            } catch (error) {
                this.错误提示("系统错误，稍后再试");
            }
            this.加载中(false);
            this.getUserInfo();
        },
        进入游戏(item) {
            console.log(item);
            var obj = {
                name: item.name,
                type: item.type,
                gid: item.gid
            };
            this.设置进入游戏(obj);
        }
    },
    mounted() {
        setInterval(() => {
            var date = new Date();
            this.当前时间 = (date.getHours().toString().length == 1 ? "0" : "") + date.getHours() + ":" + (date.getMinutes().toString().length == 1 ? "0" : "") + date.getMinutes() + ":" +(date.getSeconds().toString().length == 1 ? "0" : "") + date.getSeconds();
        }, 1000);
        
        setInterval(() => {
            this.红色字体=!this.红色字体            
        }, 1000);

    }
};
</script>

<style lang="scss" scoped>
.红色字体{
    color:red !important;
}
.头部 {
    border-bottom: 2px solid #ff9200;
}
.top1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    height: 80px;
    img {
        max-height: 80px;
    }
}
.登录注册 {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .btn_2 {
        display: flex;
        align-items: center;
        margin: 2px 0px 0px;
        img {
            width: 20px;
        }
        .time {
            margin: 0px 30px 0px 0px;
            font-size: 13px;
        }
        button {
            height: 28px;
            border-radius: 4px;
            background: linear-gradient(0deg, #383838, #636363, #484847);
            border: 1px solid #161616;
            color: #ffffff;
            margin: 0px 0px 0px 5px;
            font-size: 13px;
            min-width: 90px;
            cursor: pointer;
            transition: all 0.3s;
            i {
                font-size: 14px;
            }
            &:hover {
                background: linear-gradient(0deg, #484848, #7d7d7d, #6f6f6f);
            }
            a {
                color: #ffffff;
                text-decoration: none;
            }
        }
    }
}
.登录框 {
    display: flex;
    background: #777;
    padding: 4px;
    border-radius: 3px;
    .el-input {
        width: 140px;
        margin: 0px 5px 0px 0px;
    }
    /deep/ .el-input__inner{
        background: #e2e2e2;
        color: #000000;
        transition: all 0.3s;
        &::-webkit-input-placeholder { /* WebKit browsers */
            color:#616161;
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:#616161;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#616161;
        }
        &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color:#616161;
        }
        &:focus{
            background: #ffffff;
        }
    }
    .el-button + .el-button {
        margin-left: 5px;
    }
    .验证码_1 {
        height: 28px;
        margin-right: 5px;
        img {
            height: 100%;
        }
    }
}
.已登录 {
    font-size: 13px;
    line-height: 36px;
    span {
        margin: 0px 5px;
    }
    a {
        color: #ffffff;
        &.黄色 {
            color: #ffc810;
        }
        &.红色 {
            color: #ff0000;
        }
    }
}

.导航 {
    display: flex;
}
.top2 {
    width: 100%;
    display: flex;
    text-align: center;
    border-top: 2px solid #747474;
    background: linear-gradient(0deg, #3b3b3b, #636363, #606060);
    position: relative;
    > li {
        min-width: 100px;
        &:hover {
            .children {
                display: flex;
            }
        }
    }
    .title_1 {
        line-height: 36px;
        font-size: 13px;
        cursor: pointer;
        font-weight: bold;
        &.active {
            background: #ff9600;
        }
        &:hover {
            background: #ff9600;
        }
    }
    .children {
        min-width: 100%;
        display: none;
        white-space: nowrap;
        position: absolute;
        z-index: 2;
        top: 36px;
        left: 0px;
        background: linear-gradient(0deg, #232323, #444444, #3a3a3a);
        font-size: 12px;
        color: #ffffe4;
        line-height: 36px;
        border-top: 2px solid #747474;
        li {
            cursor: pointer;
            padding: 0px 10px;
            &:hover {
                color: #f2e1b0;
            }
        }
    }
}
</style>
