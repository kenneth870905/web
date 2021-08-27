<template>
    <div
        style="background-image:url('image/index/bg.jpg'); 
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 850px;
                background-color: #fff;
                overflow: hidden;"
            >
        <van-nav-bar title="客服中心" left-arrow @click-left="onClickLeft" />

        <a :href="config.online_chat">
            <van-cell title="在线客服" icon="van-icon van-icon-phone" is-link value="点击进入" />
        </a>

        <van-cell
            title="68383668"
            icon="van-icon van-icon-manager"
            value="点击复制"
            @click="复制(config.qq)"
        />
        <van-cell
            title="kefu0698@gmail.com"
            icon="van-icon van-icon-invition"
            value="点击复制"
            @click="复制(config.mail)"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            config: config
        };
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        复制(text) {
            this.$copyText(text).then(
                e => {
                    this.$toast("复制成功");
                },
                e => {
                    this.$toast("复制失败，请手动复制");
                }
            );
        }
    }
};
</script>

<style scoped>
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
/* .van-cell{
    background: #eee;
} */
</style>