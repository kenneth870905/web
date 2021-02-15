<template>
    <div id="app">
        <router-view class="tabber" name="tabber"></router-view>
        
        <router-view class="router-view"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        // 移动端操作
        }else{
            location.href='/index/'
        }
        // this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
        // this.$toast.clear();
    },
}
</script>

<style lang="scss">
html{
    height: 100%;
}
body{
    height: 100%;
    overflow: auto;
    // background: #eee;
    background: #e7e8ec;
}
#app{
    height: 100%;
    overflow: auto;
}

*{
    box-sizing: border-box;
}
.tabber+.router-view{
    padding-bottom: 60px;
}


</style>
