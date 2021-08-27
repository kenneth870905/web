<template>
    <div>
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
    background: #2d2d2d;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
</style>