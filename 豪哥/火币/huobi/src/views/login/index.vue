<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">管理系统登录</h3>
            </div>

            <el-form-item prop="account">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input ref="username" v-model="loginForm.account" placeholder="账号" type="text" tabindex="1" auto-complete="on" />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
            </el-form-item>
            
            <el-form-item prop="GoogleCode">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input v-model="loginForm.GoogleCode" placeholder="Google 身份验证码"  @keyup.enter.native="handleLogin" />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
            <div>
                <el-button :loading="loading" style="width:100%;margin-bottom:30px;" @click.native="$router.push('/zhuce')">注册</el-button>        
            </div>

            <div class="tips">
                <span style="margin-right:20px;">提示: 忘记密码请联系客服</span>
            </div>
        </el-form>
    </div>
</template>

<script>
// import { validUsername } from "@/utils/validate";
 import { mapMutations ,mapState } from "vuex";
export default {
    name: "Login",
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
        return {
            loginForm: {
                account: "",   //admin
                password: "",       //111111
                GoogleCode:""
            },
            loginRules: {
                account: [
                    {
                        required: true,
                        trigger: "blur",
                        validator: validateUsername
                    }
                ],
                password: [
                    { required: true, trigger: "blur", validator: validatePassword }
                ],
                GoogleCode:[
                    { required: true, trigger: "blur", message:"请输入 Google 身份验证码"}
                ]
            },
            loading: false,
            passwordType: "password",
            redirect: undefined
        };
    },
    computed:{
        ...mapState({
            user:x=>x.user2
        })
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect;
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations({
            设置state:"user2/设置state"
        }),
        showPwd() {
            if (this.passwordType === "password") {
                this.passwordType = "";
            } else {
                this.passwordType = "password";
            }
            this.$nextTick(() => {
                this.$refs.password.focus();
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$axios.post('/huobi/public/index.php/user/login',this.loginForm).then(x=>{
                        console.log(x)
                        if(x.data.code==1){
                            this.$message({ showClose: true, message: '登录成功', type: 'success' });
                            this.设置state(['token',x.data.token])
                            this.设置state(['user',x.data.user])
                            this.$router.push('/')
                        }else{
                            this.$message({ showClose: true, message: x.data.message, type: 'error' });
                        }
                    }).catch(err=>{
                        this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
                    })
                    // this.loading = true;
                    // this.$store.dispatch("user/login", this.loginForm).then(() => {
                    //     this.$router.push({ path: this.redirect || "/" });
                    //     this.loading = false;
                    // }).catch(() => {
                    //     this.loading = false;
                    // });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    /deep/ .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
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
            margin: 0px auto 40px auto;
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
</style>
