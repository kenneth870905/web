<template>
    <div id="app">
        <router-view class="tabber" name="tabber"></router-view>
        
        <router-view class="router-view"/>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        ...mapActions({
            获取基础信息:'获取基础信息'
        })
    },
    mounted() {
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        // 移动端操作
        }else{
            location.href='/index/'
        }
        this.获取基础信息()
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

.van-nav-bar{
    border-bottom: 1px solid #dedede;
}

</style>
