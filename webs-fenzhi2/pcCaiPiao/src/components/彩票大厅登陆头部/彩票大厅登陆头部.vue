<template>
    <div class="shouLogin">
        <div class="NOcontainer">
            <div class="shouLogin_img_box"><img :src="dataconfig.api_urlData+'image/cpindex/img/logo.png'"> </div>
            <!-- <div class="shouLogin_input_box">  -->
            <el-form :model="user" ref="user" class="shouLogin_input_box">
                <div class="form_box">
                    <el-form-item prop="uid" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
                        <el-input placeholder="请输入账号" v-model="user.uid" :clearable="true" @keyup.enter.native="submitForm()">
                            <i slot="prefix" class="iconfont icon-zhanghu"></i>
                        </el-input>
                    </el-form-item>
                </div>

                <div class="form_box">
                    <el-form-item prop="pwd" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                        <el-input placeholder="请输入密码" v-model="user.pwd" :clearable="true" @keyup.enter.native="submitForm()">
                            <i slot="prefix" class="iconfont icon-mima"></i>
                        </el-input>
                    </el-form-item>
                </div>

                <div class="yzm_input form_box">
                    <el-form-item prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
                        <el-input placeholder="验证码" v-model="user.code" :clearable="true" @focus="codeFocus()" @keyup.enter.native="submitForm()">
                            <img class="code_img" slot="prefix" @click="changeCode()" :src="codeUrl"></img>
                        </el-input>
                    </el-form-item>
                </div>
                <!-- @click="login()" -->
                <div class="form_box">
                    <el-button size="medium" type="danger" @click="submitForm()">登陆</el-button>
                </div>
                <div class="form_box">
                    <router-link to="/register">
                        <el-button size="medium" type="danger">注册</el-button>
                    </router-link>
                </div>
                <div class="form_box">
                    <router-link to="/register">
                        <el-button size="medium" type="danger">免费试玩</el-button>
                    </router-link>
                </div>
                <div class="form_box">
                    <div class="zxkf_box"><span class="zxkf">在线客服</span></div>
                </div>
            </el-form>
            <!-- </div> -->
        </div>

    </div>
</template>

<script>
import { api_请求登录, } from "@/api/请求登录的接口.js";
import JSEncrypt from 'jsencrypt'
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            dataconfig: {
                api_urlData: config.api_url//api_url
            },
            config: config,
            codeUrl: "",//页面一刷新不获取 为空
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOfM4Ikzr/973NIm6ZgkhzPdJjMgTzwwh2h8aZcubSF5IT0UBZPfNtF9IpZi59dUHwe/4W2mP6aShQqlzteII+BNGxDUIIYMH0WLHTO3W3u7No0PD3eJ8cfpd+xCYTpYEgL0Qh08b5WrOUFXnKzyd1Hjmur3LYR0106s67Ce7k2wIDAQAB",
            定时器: "",
            时间: 0,
            user: {
                uid: "",
                pwd: "",
                code: "",   //文字验证嘛
            },
            rules: {
                uid: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],

            }
        }
    },
    computed: {
        isPhone: function () {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return phoneTest.test(this.user.uid)
        },
    },
    methods: {
        ...mapActions({
            'getUserInfo': 'getUserInfo'
        }),
        //提交
        submitForm() {
            this.$refs['user'].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        codeFocus() {
            if (!this.codeUrl) {
                this.codeUrl = this.config.api_url + "/Home/Verify?v=" + Math.random();
            }
        },
        //跟换验证码
        changeCode() {
            this.codeUrl = this.config.api_url + "/Home/Verify?v=" + Math.random();
        },
        login() {
            // console.log(this.isPhone);
            if (this.isPhone) {
                var obj = {
                    uid: this.user.uid,
                    sms: this.user.sms
                }
                this.$message.success('登录成功');
                api_短息登录(obj).then(x => {
                    this.$message.success('登录成功');
                }).catch(err => { })
            } else {
                //加密
                var layout_encrypt = new JSEncrypt();
                layout_encrypt.setPublicKey(this.publicKey);
                var pwd = layout_encrypt.encrypt(this.user.pwd);
                var obj = {
                    uid: this.user.uid,
                    pwd: pwd,
                    code: this.user.code
                }
                api_请求登录(obj).then(x => {
                    this.getUserInfo();
                    if (x.data.code == 200) {
                        this.getUserInfo()
                        this.$message.success('登录成功');
                    } else {
                        this.changeCode()
                        this.$message(x.data.msg);
                    }
                }).catch(err => {
                    this.changeCode()
                })
            }
        },

    },
    mounted() {
    },
    watch: {
        isPhone() {
            //移除
            this.$refs['user'].clearValidate();
        }
    },
}
</script>
  <style lang="scss" scoped>
.shouLogin {
    .NOcontainer {
        display: flex;
        .shouLogin_img_box {
            margin-left: 20px;
            margin-right: 20px;
            width: 142px;
            // height: 42px;
            img {
                width: 100%;
            }
        }

        .shouLogin_input_box {
            margin-top: 4px;
            display: flex;
            justify-content: flex-end;
            height: 30px;
            /deep/.el-input__inner {
                padding-left: 24px;
                height: 30px !important;
            }
            .yzm_input {
                width: 150px;
                // height: 28px;
                height: 30px;

                /deep/.el-input__inner {
                    padding-left: 76px !important;
                    height: 30px !important;
                }
                .el-input__prefix .el-input__suffix {
                    position: relative;
                    width: 30px;
                    height: 30px !important;
                }
            }

            /deep/ .form_box {
                outline: none !important;
                margin-right: 20px;
                .iconfont {
                    line-height: 40px;
                    font-size: 18px;
                    color: red;
                    // background: red;
                    height: 100%;
                }
                /deep/ .el-input--prefix .el-input__inner {
                    width: 150px !important;
                    outline: none !important;
                    //  border:none !important;
                }
                .el-input.is-active .el-input__inner,
                .el-input__inner:focus {
                    border-color: red !important;
                }
            }
        }
    }
}

/deep/ .code_img {
    position: absolute !important;
    z-index: 3 !important;
    top: 6px;
    left: -3px;
    height: 27px;
}
/deep/.el-button,
.zxkf_box {
    width: 75px;
    height: 30px;
    margin-top: 6px;
    padding: 0px;
    .zxkf {
        line-height: 30px;
    }
}
</style>
  