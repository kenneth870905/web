<template>
    <div  style="background-image:url('image/index/bg.jpg'); 
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 850px;
                background-color: #fff;
                overflow: hidden;">
        <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
        <van-cell title="昵称" is-link  @click="$router.push('/xgnicheng')" value="喀秋莎" />
        <van-cell title="QQ" is-link to=""  value="8888888"/>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    }
};
</script>

<style>
.van-nav-bar {
    background: #c1c1c1;
}
.van-nav-bar__title {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
.van-nav-bar .van-icon {
    color: white;
}
</style>