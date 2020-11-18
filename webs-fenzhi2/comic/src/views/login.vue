<template>
<div>
    <headerTop title="登录" />
    <div class="login">
        <div class="login-img"></div>
        <div class="login-inp"><input type="text" placeholder="请输入账号"></div>
        <div class="login-inp"> <input type="text" placeholder="请输入密码"></div>
        <div class="登录">登录</div>
    </div>
    <langhua/>
</div>
</template>

<script>
import headerTop from '@/components/header.vue'
import langhua from '@/components/bottom.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        headerTop,
        langhua
    }
}
</script>

<style scoped>
.login {
    display: flex;
    flex-wrap: wrap;
}

.login .login-img {
    width: 50%;
    height: 150px;
    background: url("/images/login.png") no-repeat no-repeat;
    background-size: cover;
    margin: 0 auto;
    margin-top: 2.2rem;
}

.login-inp {
    width: 100%;
    text-align: center;
}

.login-inp input {
    width: 65%;
    height: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding-left: 20px;
    box-sizing:content-box;
    font-size: 15px;
}

.login-inp input:first-child {
    margin-bottom: 10px;
}

.登录 {
    width: 71%;
    height: 1.6rem;
    background: #ff9a6a;
    border-radius: 4px;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    color: white;
    line-height: 1.6rem;
}

input::placeholder {
    font-size: 0.6733rem;
}

</style>
