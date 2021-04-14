<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="username">
                <el-input prefix-icon="el-icon-user-solid" @keyup.enter.native="handleLogin" v-model="loginForm.username" placeholder="Username" tabindex="1" autocomplete="on" />
            </el-form-item>

            <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock" show-password v-model="loginForm.password"  placeholder="Password" tabindex="2" autocomplete="on" @keyup.enter.native="handleLogin" />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

        </el-form>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: '',  // admin xiaomeng
                password: '123456'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
        }
    },
    computed:{
        ...mapState({
            nav:"nav" 
        })
    },
    methods: {
        ...mapActions({
            getNav:"getNav"
        }),
        ...mapMutations({
            setToken:'setToken'
        }),
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.Login()
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        Login(){
            this.loading = true
            this.$axios.get('Login',{params:this.loginForm}).then(res => {
                console.log(res)
                if(res.result){
                    this.正确('login successful')
                    this.setToken(res.token)
                    this.getNav()
                    // this.$router.push('/')
                }else{
                    this.错误(res.msg)
                }
                this.loading=false
            }).catch(err => {
                this.loading=false
                this.错误('System error, try again later')
            })
        },
        // getNav(){
        //     this.$axios.post('Nav','').then(res => {
        //         console.log(res)
        //     }).catch(err => {
        //         console.error(err); 
        //     })
        // }
    },
    mounted() {
        // this.getNav()
    },
}
</script>

<style lang="scss">

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;


/* reset element-ui css */
.login-container {
    .el-input {

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            color: $light_gray;
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
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

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>
