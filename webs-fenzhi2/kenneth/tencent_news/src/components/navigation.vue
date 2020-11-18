<template>
    <div>
        <van-tabbar route :z-index="2">
            <van-tabbar-item to="/" icon="icon iconfont icon-xinwen">要闻</van-tabbar-item>
            <van-tabbar-item to="/video" icon="icon iconfont icon-shipinbofangyingpian2">视频</van-tabbar-item>
            <van-tabbar-item to="/retui" icon="icon iconfont icon-tuijian2">推荐</van-tabbar-item>
            <van-tabbar-item to="/my" icon="icon iconfont icon-wodedangxuan">我的</van-tabbar-item>
        </van-tabbar>
        <van-number-keyboard safe-area-inset-bottom />
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:2
        }
    }
}
</script>

<style lang="scss" scoped>

</style>