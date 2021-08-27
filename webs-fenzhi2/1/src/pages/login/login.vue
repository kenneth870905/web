<template>
    <div class="bg">
        <van-nav-bar
            left-text="返回"
            right-text="注册"
            left-arrow
        />
        <div class="login_inp">
            <span class="spn1">
                <i class="van-icon van-icon-manager"></i>
                <input class="inp1" type="text" placeholder="用户名" />
            </span>
            <span class="spn2">
                <i class="van-icon van-icon-lock"></i>
                <input class="inp2" type="password" placeholder="密码" />
            </span>
            <span class="spn3">
                <button>登录</button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            methods: {
               
            },
        }
    }
};
</script>
<style>
.bg {
    width: 100%;
    height: 668px;
    background: linear-gradient(#7a7a7a, #080808);
}
.login_inp .inp1 {
    width: 200px;
    height: 40px;
    margin-top: 130px;
    margin-left: 54px;
    border-radius: 10px;
    padding-left: 40px;
}
.login_inp .inp2 {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    margin-left: 69px;
    border-radius: 10px;
    padding-left: 40px;
}
.login_inp .spn1 i {
    left: 80px;
}
.login_inp .spn2 i {
    top: 62px;
    left: -229px;
}
.login_inp .spn3 button {
    width: 240px;
    height: 40px;
    background: rgb(63, 63, 63);
    border-radius: 10px;
    text-align: center;
    color: white;
    font-size: 14px;
    margin-top: 20px;
    margin-left: 68px;
}
.van-nav-bar .van-icon {
    color: white;
}
.van-nav-bar__text{
    color: white;
}
.van-nav-bar{
    background: #767676;
}
</style>