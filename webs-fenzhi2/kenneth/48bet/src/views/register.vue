<template>
    <div>
        <div class="box_1">
            <div class="bg_1">
                <img src="static/image/register/1.png" alt="" srcset="" />
            </div>
            <div class="bg_2">
                <div class="bg_3">
                    <img src="static/image/register/2.png" alt="" srcset="" />
                </div>
                <div>立即加入</div>
            </div>
        </div>

        <div class="box_2">
            <div class="title_1">个人信息</div>
            <el-form label-position="right" label-width="80px" :model="user" ref="user" :rules="rules" :validate-on-rule-change="false">
                <el-form-item label="用户名" ref="uid" prop="uid" :rules="[
            { required: true, message: '请输入手机号或用户名', trigger: 'blur' }
          ]">
                    <el-input @keyup.native.enter="验证()" v-model="user.uid" placeholder="请输入手机号或用户名"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" v-if="!isphone" prop="pwd">
                    <el-input type="password" :show-password="true" @keyup.native.enter="验证()" v-model="user.pwd" ref="pwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" ref="pwd1" v-if="!isphone" prop="pwd1">
                    <el-input type="password" :show-password="true" @keyup.native.enter="验证()" v-model="user.pwd1" placeholder="请输入确认密码"></el-input>
                </el-form-item>
                <el-form-item label="推荐人ID">
                    <el-input @keyup.native.enter="验证()" v-model="user.type" placeholder="请输入推荐人ID（选填）"></el-input>
                </el-form-item>
                <el-form-item label="验证码" v-if="!isphone" prop="code">
                    <div class="验证码">
                        <el-input @keyup.native.enter="验证()" @focus="focus1()" ref="code" v-model="user.code" placeholder="请输入验证码"></el-input>
                        <div class="img_1">
                            <img @click="改变验证码()" :src="验证码地址" />
                        </div>
                    </div>
                </el-form-item>

                <el-form-item label="短信验证" v-if="isphone" prop="sms">
                    <div class="短信验证">
                        <el-input @keyup.native.enter="验证()" ref="sms" v-model="user.sms" placeholder="请输入验证码">
                            <el-button @click="getSms()" slot="append" type="info">{{
                时间 > 0 ? 时间 + "s" : "获取短信"
              }}</el-button>
                        </el-input>
                        <!-- <div class="img_1">
                            <img @click="改变验证码()" :src="验证码地址">
                        </div> -->
                    </div>
                </el-form-item>

                <div class="提示1">
                    <el-checkbox v-model="同意协议" siez="medium">我已届满合法博彩年龄﹐且同意各项开户条约。
                    </el-checkbox>
                    <a href="javascript:;">“开户协议”</a>
                </div>
                <div class="btn_1">
                    <el-button type="" size="small" @click="验证()">立即加入</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {
    api_获取短息验证码,
    api_登录试玩,
    api_短信注册接口,
    api_普通注册接口
} from "@/api/登录接口.js";
import { mapState, mapActions, mapMutations } from "vuex";
import JSEncrypt from "jsencrypt";
export default {
    name: "",
    data() {
        return {
            同意协议: true,
            验证码地址: "",
            publicKey:
                "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            user: {
                uid: "", //用户名
                pwd: "", //密码
                pwd1: "", //重复密码
                code: "", //验证码
                ruid: "", //推荐人ID
                type: "",
                sms: "" //短信验证
            },
            定时器: "",
            时间: 0
        };
    },
    computed: {
        ...mapState({
            config: "config"
        }),
        rules() {
            if (this.isphone) {
                var obj = {
                    uid: [
                        { required: true, message: "请输入手机号码或密码", trigger: "blur" }
                    ],
                    pwd: [],
                    pwd1: [],
                    code: [],
                    sms: [{ required: true, message: "请输入短信验证", trigger: "blur" }]
                };
            } else {
                var obj = {
                    uid: [
                        { required: true, message: "请输入手机号码或密码", trigger: "blur" }
                    ],
                    pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
                    pwd1: [{ required: true, message: "请确认密码", trigger: "blur" }],
                    code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                    sms: []
                };
            }
            return obj;
        },
        isphone() {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid);
        }
    },
    methods: {
        ...mapActions({
            加载中: "加载中",
            错误提示: "错误提示",
            成功提示: "成功提示",
            getUserInfo: "user/getUserInfo"
        }),
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
                        this.$message({
                            showClose: true,
                            message: "短信已发送，请注意查收",
                            type: "success"
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: x.data.msg,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    this.$message({
                        showClose: true,
                        message: "系统错误稍后再试",
                        type: "error"
                    });
                });
        },
        验证() {
            this.$refs["user"].validate(valid => {
                if (valid) {
                    this.注册();
                } else {
                    return false;
                }
            });
        },
        注册() {
            if (this.isphone) {
                if (!this.user.sms) {
                    this.$refs.sms.focus();
                    this.错误提示("请输入验证码");
                    return;
                } else if (!this.同意协议) {
                    this.错误提示("请同意用户协议");
                    return;
                }
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms,
                    ruid: this.user.ruid ? this.user.ruid : ''
                };
                this.加载中(true);
                api_短信注册接口(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            this.成功提示("注册成功");
                            this.getUserInfo().then(() => {
                                this.$router.push("/");
                            });
                        } else {
                            this.错误提示(x.data.msg);
                        }
                        this.加载中(false);
                    })
                    .catch(err => {
                        this.加载中(false);
                        this.错误提示("系统错误稍后再试");
                    });
            } else {
                if (!this.user.uid) {
                    this.$refs.uid.focus();
                    this.错误提示("请输入手机号码或用户名");
                    return;
                } else if (!this.user.pwd) {
                    this.$refs.pwd.focus();
                    this.错误提示("请输入密码");
                    return;
                } else if (!this.user.pwd1) {
                    this.$refs.pwd1.focus();
                    this.错误提示("请确认密码");
                    return;
                } else if (this.user.pwd != this.user.pwd1) {
                    this.错误提示("两次密码不一致");
                    return;
                } else if (!this.user.code) {
                    this.$refs.code.focus();
                    this.错误提示("请输入验证码");
                    return;
                } else if (!this.同意协议) {
                    this.错误提示("请同意用户开会协议");
                    return;
                }
                //加密
                var app = "";
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
                };

                this.加载中(true);
                api_普通注册接口(obj)
                    .then(x => {
                        if (x.data.code == 0) {
                            this.成功提示("注册成功");
                            this.getUserInfo().then(() => {
                                this.$router.push("/");
                            });
                        } else {
                            this.改变验证码();
                            this.错误提示(x.data.msg);
                        }
                        this.加载中(false);
                    })
                    .catch(err => {
                        this.加载中(false);
                        this.改变验证码();
                        this.错误提示("网络异常稍后再试");
                    });
            }
        }
    },
    mounted() {
        // this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
    },
    watch: {
        isphone() {
            this.$refs["user"].clearValidate();
        }
    }
};
</script>

<style lang="scss" scoped>
.box_1 {
    position: relative;
    margin: 10px 0px 0px;
    .bg_2 {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #f8e678;
        .bg_3 {
            font-size: 0px;
            margin: 0px 10px 0px 0px;
        }
    }
    .bg_1 {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 10px;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.box_2 {
    border-radius: 15px;
    border: 2px solid #9b836f;
    position: relative;
    padding: 50px 0px 20px;
    margin: 30px 30px;
    .title_1 {
        color: #ff0;
        position: absolute;
        top: -10px;
        left: 20px;
        font-size: 14px;
        background: #3a3a3a;
        padding: 0px 5px;
    }
    .el-form {
        width: 500px;
        margin: 0px auto;
    }
    /deep/ .el-form-item__label {
        color: #ffffff;
    }
    // /deep/ input{
    //     &::-webkit-input-placeholder {
    //         color:    #606266;
    //     }
    //     &:-moz-placeholder {
    //         color:    #606266;
    //     }
    //     &::-moz-placeholder {
    //         color:    #606266;
    //     }
    //     &::-ms-input-placeholder {
    //         color:    #606266;
    //     }
    // }
    .提示1 {
        text-align: center;
        .el-checkbox {
            color: #f8e678;
        }
        /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #f8e678;
        }
        a {
            font-size: 14px;
            color: #ffffff;
            text-decoration: none;
        }
    }
    .btn_1 {
        margin: 30px 0px 0px;
        text-align: center;
        button {
            width: 50%;
        }
    }
    .验证码 {
        display: flex;
        .img_1 {
            height: 40px;
            margin: 0px 0px 0px 10px;
            flex-shrink: 0;
            width: 96px;
            background: #ffffff;
            border-radius: 3px;
            img {
                height: 100%;
                border-radius: 3px;
            }
        }
    }
}
</style>
