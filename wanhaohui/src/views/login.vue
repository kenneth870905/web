<template>
    <div class="login">
        <div class="box1">
            <img class="bg1" src="@/assets/images/firstBg.svg" alt="" srcset="">
            <img class="bg2" src="@/assets/images/logo.svg" alt="" srcset="">
            <el-form class="from" :model="form" ref="form" >
                <el-form-item>
                    <el-input placeholder="用户名或手机" v-model="form.name"></el-input>
                    <el-button class="btn1" type="text">验证码</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" placeholder="密码或验证码" show-password v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="login()" class="btn2" type="primary">登录</el-button>
                </el-form-item>
                <div class="login-footer">
                    <el-button @click="$router.push({ name: 'complaintAdvice' })" type="text">忘记密码</el-button>
                    <span>
                        还没有账号？
                        <el-button @click="$router.push({ name: 'register' })" type="text">注册</el-button>

                        <router-link to="/register">注册</router-link>
                        <router-link :to="{name:'register的name'}">注册</router-link>

                    </span>
                </div>
            </el-form>
        </div>
        <div class="complaintAdvice">
            联系我们
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            form:{
                name:"",
                pwd:""
            }
        }
    },
    methods:{
        login(){
            this.$router.push({ name: 'home'})
        }
    }
}
</script>


<style lang="scss" scoped>
.login{
    overflow: auto;
    height: 100%;
    background: linear-gradient(-45deg,#3c21ff,#6bd0ff);
    display: flex;
    justify-content: center;
    align-items: baseline;
}
.box1{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 900px;
    position: relative;
    padding: 420px 0px 0px;
    margin: 20px 0px 0px;
    .bg1{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }
    .bg2{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
    }
}
.from{
    width: 416px;
    background: #fff;
    padding: 40px 60px;
    border-radius: 5px;
    .btn1{
        position: absolute;
        right: 15px;
    }
    .btn2{
        width: 100%;
    }
    .login-footer{
        display: flex;
        justify-content: space-between;
    }
}
.complaintAdvice{
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: #fff;
    border: 1px solid #fff;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 33px;
}
</style>

