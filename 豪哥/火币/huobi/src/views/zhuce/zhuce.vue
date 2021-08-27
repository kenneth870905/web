<template>
    <div class="login-container">
        <el-form ref="loginForm" size="mini" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">会员注册</h3>
            </div>
            <el-form-item label="登录账号" prop="account">
                <el-input  size="small" v-model="loginForm.account" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="昵称" >
                <el-input  size="small" v-model="loginForm.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input  size="small" v-model="loginForm.password" placeholder="请输入密码" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="password1">
                <el-input size="small" v-model="loginForm.password1" placeholder="请确认密码" type="password"/>
            </el-form-item>
            <el-alert title="警告：请记住下方 Google 认证密码" type="error"> </el-alert>
            <el-form-item label="Google 身份认证密码" class="google密码">
                <el-input size="small" :disabled="true" :value="loginForm.GooglePassword" placeholder="正在获取Google 身份认证密码" />
            </el-form-item>
            <div class="google二维码">
                <img :src="erweima" alt="" srcset="">
            </div>

            <el-button size="small" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">注册</el-button>
            <div>
                <el-button size="small" :loading="loading" style="width:100%;margin-bottom:30px;" @click.native="$router.push('/login')">已有账号</el-button>        
            </div>
        </el-form>
    </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
// import $ from 'jquery'
import { mapMutations } from 'vuex'
export default {
    name: "",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入账号"));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (!value) {
                callback(
                    new Error("请输入密码")
                );
            } else {
                callback();
            }
        };
        var test_password1 = (rule, value, callback)=>{
            if (!value) {
                callback(
                    new Error("请再次输入密码")
                );
            } if(this.loginForm.password!=value){
                callback(
                    new Error("两次密码不一致")
                );
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                account: "",
                nickname:"",
                password: "",
                password1: "",
                GooglePassword:""
            },
            loginRules: {
                account: [
                    { required: true,trigger: "blur",validator: validateUsername}
                ],
                password: [
                    {
                        required: true,
                        validator: validatePassword
                    }
                ],
                password1: [
                    {
                        required: true,
                        validator:test_password1
                    }
                ]
            },
            loading: false,

        };
    },
    computed:{
        erweima(){
            return `https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2F${this.loginForm.account}%3Fsecret%3D${this.loginForm.GooglePassword}&size=200x200&ecc=M`
        }
    },
    watch: {
        
    },
    methods: {
        ...mapMutations({
            设置state:"user2/设置state"
        }),
        handleLogin() {
            this.$axios.post('/huobi/public/index.php/user/zhuce',this.loginForm).then(x=>{
                console.log(x)
                if(x.data.code==1){
                    this.$message({ showClose: true, message: '恭喜你，注册成功！', type: 'success' });
                    this.设置state(['token',x.data.token])
                    this.设置state(['user',x.data.user])
                    this.$router.push('/')
                }else{
                    this.$message({ showClose: true, message: x.data.message, type: 'error' });
                }
            }).catch(error=>{
                // console.log(error.response,'-------');
                this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
            })
        }
    },
    mounted() {
        this.$axios.post('/huobi/public/index.php/google/getSecret').then(x=>{
            this.loginForm.GooglePassword=x.data.secret
        }).catch(err=>{})
    },
};
</script>

<style lang="scss" scoped>

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    /deep/ .el-form-item__label{
        color: #fff;
    }
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
        background: rgba(255,255,255,0.1);
        border-radius: 5px;
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 20px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 10px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
.google密码 {
    /deep/ .el-input.is-disabled .el-input__inner{
        color: #000;
        text-align: center;
    }
}
.google二维码{
    width: 100px;
    height: 100px;
    margin: 0px auto 20px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>
