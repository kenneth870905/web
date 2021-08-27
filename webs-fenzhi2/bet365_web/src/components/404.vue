<template>
    <div>
        <van-nav-bar title="您要访问的页面不见了" left-arrow @click-left="onClickLeft" />
        <div class="img_box">
            <img src="image/404gif.gif" alt srcset />
        </div>
    </div>
</template>

<script>
export default {
    name: "",
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
<style scoped>
.img_box {
    height: 100%;
    display: flex;
    background: #ffffff;
    align-items: center;
    justify-content: center;
}
.img_box img {
    width: 100%;
}
.van-nav-bar{
    color:#fe4e0a;
}
.van-nav-bar {
    background:#fe4e0a;
}
.van-nav-bar__title {
    color: white;
}
.van-nav-bar .van-icon {
    color: white;
}
</style>
