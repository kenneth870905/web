<template>

    <div class="container">

        <div class="mui-content ">
            <h1><i class="iconfont icon-zhuce"></i>&nbsp;会员注册</h1>

            <ul class="输入框">
                <li class="item_baba">
                    <div class="name_box"><span class="fred">*</span>&nbsp;账户名:</div>
                    <div class="item">
                        <input ref="账号" v-model="user.uid" type="text" placeholder="请输入手机号码或用户名" @keyup.enter="注册()" />
                        <!-- <i v-if="user.uid" @click="user.uid=''" class="icon iconfont icon-guanbi1"></i> -->
                    </div>
                </li>

                <li class="item_baba" v-if="!isphone">
                    <div class="name_box"><span class="fred">*</span>&nbsp;密码:</div>
                    <div class="item">
                        <input ref="密码" v-model="user.pwd" @keyup.enter="注册()" :type="查看密码 ? 'text' : 'password'" placeholder="请输入密码" />
                        <!-- <div class="眼睛"> -->
                        <!-- <i @click="查看密码=!查看密码" class="van-icon" :class="查看密码 ? 'van-icon-eye-o' : 'van-icon-closed-eye'"></i> -->
                        <!-- </div> -->
                        <i v-if="user.pwd" @click="user.pwd=''" class="icon iconfont icon-guanbi1"></i>
                    </div>
                </li>

                <li class="item_baba" v-if="!isphone">
                    <div class="name_box"><span class="fred">*</span>&nbsp;确认密码:</div>
                    <div class="item">
                        <input v-model="user.pwd1" ref="确认密码" @keyup.enter="注册()" :type="查看密码1 ? 'text' : 'password'" placeholder="请输入确认密码" />
                        <!-- <div class="眼睛">
                              <i @click="查看密码1=!查看密码1" class="van-icon" :class="查看密码1 ? 'van-icon-eye-o' : 'van-icon-closed-eye'"></i>
                          </div> -->
                        <i v-if="user.pwd1" @click="user.pwd1=''" class="icon iconfont icon-guanbi1"></i>
                    </div>
                </li>

                <li class="item_baba" v-if="!isphone && 显示推荐人">
                    <div class="name_box"><span class="fred">&nbsp;</span>&nbsp;推荐人ID</div>
                    <div class="item">
                        <input type="text" :class="{只读:推荐人只读}" :readonly="推荐人只读" v-model="user.ruid" ref="推荐人ID" @keyup.enter="注册()" placeholder="请输入邀请码（选填）">
                    </div>
                </li>

                <li class="item_baba" v-if="!isphone">
                    <div class="name_box"><span class="fred">*</span>&nbsp;验证码</div>

                    <div class="item imgCode">
                        <input type="text" v-model="user.code" ref="验证码" @focus="focus1" @keyup.enter="注册()" placeholder="请输入验证码">
                    </div>

                    <div @click="改变验证码()" class="验证码地址">
                        <img :src="验证码地址" v-if="showImg">
                    </div>
                    <span class="huan" @click="改变验证码()" v-if="showImg">换一批</span>
                </li>

                <li class="item_baba" v-if="isphone">
                    <div class="name_box"><span class="fred">*</span>&nbsp;短信验证:</div>
                    <div class="item imgCode">
                        <input type="text" @keyup.enter="注册()" ref="短信验证码" v-model="user.sms" placeholder="请输入验证码">
                    </div>
                    <div class="btn_1" @click="getSms()">
                        {{时间>0 ? 时间+'s' : '获取短信'}}
                    </div>
                </li>

                <li class="item_baba">
                    <div class="同意协议">
                        <el-checkbox v-model="同意协议"><span class="yi">我已届满合法博彩年龄﹐且同意各项开户条约。 “开户协议”</span></el-checkbox>
                    </div>
                </li>

                <li class="item_baba">
                    <div class="btn">
                        <button class="btn_2 mui-btn mui-btn-danger" @click="注册()">立即注册</button>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>

import { api_获取短息验证码, api_登录试玩, api_短信注册接口, api_普通注册接口 } from "@/api/请求登录的接口.js";

// import btn from '@/components/btn.vue';
// import can from '@/components/半圆.vue'
import { mapState, mapActions } from "vuex";
import JSEncrypt from 'jsencrypt'

export default {

    name: "",
    components: {
        // btn,
        // can
    },
    data() {
        return {
            showImg: true,
            同意协议: true,
            查看密码: false,
            查看密码1: false,
            验证码地址: "",
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            user: {
                uid: "",
                pwd: "",
                code: "",   //文字验证嘛
                sms: "",      //短息验证码
                ruid: "", //推荐人id
            },

            定时器: "",
            时间: 0
        }
    },

    computed: {
        ...mapState({
            config: 'config'
        }),
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid)
        },
        显示推荐人() {
            if (this.config.ruidHidden) {
                if (this.$route.query.code) {
                    return true
                }
            } else {
                return true
            }
        },
        推荐人只读() {
            return this.$route.query.code ? true : false
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: "getUserInfo"
        }),
        getSms() {
            if (this.时间 != 0) {
                return
            }
            this.时间 = 60;
            this.定时器 = setInterval(() => {
                this.时间--;
                if (this.时间 <= 0) {
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_获取短息验证码({ 'uid': this.user.uid }).then(x => {
                if (x.data.code == 0) {
                    this.$message.success("短信已发送，请注意查收");

                } else {
                    this.$message({
                        showClose: true,
                        message: x.data.msg,
                        type: 'error'
                    });

                }
            }).catch(err => { })
        },
        focus1() {
            this.showImg = true

            if (!this.验证码地址) {
                this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        改变验证码() {
            this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
        },
        注册() {
            if (this.isphone) {
                var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                if (!phoneTest.test(this.user.uid)) {
                    this.$message.success("请输入电话号码");
                    return
                } else if (!this.user.sms) {
                    this.$message({
                        showClose: true,
                        message: '请输入验证码',
                        type: 'error'
                    });
                    this.$refs.短信验证码.focus()
                    return
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms,
                    ruid: this.user.ruid ? this.user.ruid : ''
                }
                api_短信注册接口(obj).then(x => {
                    if (x.data.code == 0) {
                        this.$message.success("注册成功");
                        this.getUserInfo().then(() => {
                            this.$router.push('/')
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: x.data.msg,
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                    this.$message({
                        showClose: true,
                        message: '网络异常稍后再试',
                        type: 'error'
                    });
                })
            } else {
                if (!this.user.uid) {
                    this.$message({
                        showClose: true,
                        message: '请输入用户名',
                        type: 'error'
                    });
                    this.$refs.账号.focus()
                    return
                } else if (!this.user.pwd) {
                    this.$refs.密码.focus()
                    this.$refs.确认密码.focus()
                    this.$message({
                        showClose: true,
                        message: '请输入密码',
                        type: 'error'
                    });
                    return
                } else if (this.user.pwd != this.user.pwd1) {
                    this.$refs.确认密码.focus()
                    this.$message({
                        showClose: true,
                        message: '两次密码不一致',
                        type: 'error'
                    });
                    return;
                }

                else if (!this.user.code) {
                    this.$refs.验证码.focus()
                    this.$message({
                        showClose: true,
                        message: '请输入验证码',
                        type: 'error'
                    });
                    return;
                } else if (this.user.sms) {
                    this.$refs.短信验证码.focus()
                    return;
                }
                //加密
                var app = '';
                if (window.plus) {
                    app = plus.os.name;
                }
                var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj = {
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code,
                    ruid: this.user.ruid,
                    app: app
                }

                api_普通注册接口(obj).then(x => {
                    if (x.data.code == 0) {
                        this.$message.success("注册成功");
                        this.getUserInfo().then(() => {
                            this.$router.push('/')
                        })
                    } else {
                        this.改变验证码();
                        this.$message.success(x.data.msg);
                    }
                }).catch(err => {
                    this.改变验证码()

                })
            }
        },

    },
    mounted() {
        this.user.ruid = this.$route.query.code
        this.getUserInfo();
        if (this.验证码地址 == "") {
            this.showImg = false
        }
        this.$nextTick(function () {
            this.$refs.账号.focus()
        })
    },
}
</script>

<style lang="scss" scoped>
.container {
    border: 2px solid #dc3545;
    margin-top: 30px;
    .mui-bar-nav {
        box-shadow: none;
        color: #000;
    }
    .mui-content {
        h1 {
            text-align: center;
            color: #e94335;
            .icon-zhuce {
                font-size: 28px;
            }
        }
        width: 600px;
        min-height: 550px;
        margin: 0px auto;
        // background: gold;
        padding-top: 30px;
        margin: 0px auto;
    }

    .输入框 {
        position: relative;
        z-index: 1;
        width: 500px;
        margin: 0px auto;
        border-radius: 10px;
        padding: 20px 10px 0px 10px;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 60px;

        .item_baba {
            width: 400px;
            position: relative;
            height: 50px;
            margin-bottom: 20px !important;
            display: flex;
            .huan {
                cursor: pointer;
                color: rgb(23, 101, 245);
            }
            .yi {
                color: #a8a7a7;
                font-size: 16px;
            }
            .btn {
                width: 60px;
                height: 40px;
            }
            /deep/.name_box {
                position: absolute;
                top: 0px;
                left: -10px;
                z-index: 30;
                line-height: 50px;
                font-size: 17px;
                width: 100px;
                height: 50px;
            }
            .item {
                width: 280px;
                display: flex;
                align-items: center;
                height: 50px;
                margin: 0px 0px 20px;
                border: 1px solid #cccccc;
                margin-left: 80px;
                overflow: hidden;
                position: relative;
                /deep/input {
                    height: 50px;
                    width: 280px;
                }
            }
            .imgCode {
                width: 160px;
                margin-right: 10px;
            }
        }
        input {
            margin: 0px;
            padding: 0px 10px;
            border: none;
            height: 100%;
            background: none;
            &.只读{
                background: #efefef;
                outline: none;
                cursor: no-drop;
            }
        }

        .提示 {
            white-space: nowrap;
            margin: 0px 0px 0px 10px;
        }
        .btn_1 {
            background: #dc3545;
            white-space: nowrap;
            min-width: 85px;
            text-align: center;

            border-radius: 4px;
            line-height: 36px;
            height: 36px;
            color: #ffffff;
            margin-top: 10px;
        }
        .btn_2 {
            outline: none;
            cursor: pointer;
            margin-left: 150px;
            width: 110px;
            height: 40px;
            border-radius: 4px;
            margin-bottom: 20px;
            background: #dc3545;
            border: none;
            color: #ffffff;
            font-size: 18px;
        }
        .icon-guanbi1 {
            position: absolute;
            top: 14px;
            left: 240px;
            color: #dc3545;
            font-size: 20px;
            margin: 0px 10px 0px 0px;
        }
        .验证码地址 {
            cursor: pointer;
            width: 90px;
            height: 50px;
            margin: 0px 10px 0px 0px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .fblue {
            cursor: pointer;
        }
        .同意协议 {
            display: flex;
            height: 30px;
            align-items: center;
            margin: 0px 0px 10px 0px;
        }
        .item2 {
            display: flex;
            font-size: 13px;
            color: #666;
            span:nth-child(2) {
                flex-grow: 1;
                margin: 0px 0px 0px 5px;
                padding: 0px 0px 0px 5px;
                border-left: 1px solid #666;
            }
        }
    }
}
</style>
