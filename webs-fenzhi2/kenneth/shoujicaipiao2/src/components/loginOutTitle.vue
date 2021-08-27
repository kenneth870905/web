<template>
    <div class="my_title">
        <div class="shezhi_a_div"> <span @click="go('/my/personage')" class="iconfont icon-shezhi shezhi_A"></span></div>
        <div class="title_a">
            <p>云来网</p>
        </div>
        <div class="login_out">
            <div @click="go('/login')">登录</div>
            <div @click="go('/')">注册</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {

        }
    },
    methods: {
        go(url) {
            this.$router.push(url)
        }
    }
}
</script>

<style lang="scss" scoped>
//头部样式
.my_title {
    height: _vw(144);
    width: 100%;
    background: red;
    position: relative;
    //登录注册头样式开始
    .shezhi_a_div {
        padding-top: _vw(10);
        height: _vw(30);
        .shezhi_A {
            width: _vw(30);
            margin-top: _vw(60);
            margin-left: 88%;
            font-size: _vw(26);
            color: #ffffff;
        }
    }
    .title_a {
        text-align: center;
        padding-top: _vw(10);
        p {
            color: #ffffff;
            font-size: _vw(22);
            font-weight: 500;
        }
    }
    .login_out {
        width: _vw(140);
        height: _vw(33);
        border-radius: _vw(35);
        border: _vw(2) solid #ffffff;
        background: red;
        margin: 0px auto;
        display: flex;
        color: #ffffff;
        div {
            width: 50%;
            text-align: center;
            line-height: _vw(30);
        }
        div:nth-child(1) {
            border-right: _vw(2) solid #ffffff;
        }
    }
}
</style>