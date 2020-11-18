<template>
    <div class="header">
        <u1 />
        <van-sticky>
            <ul class="u2">
                <router-link to="/" tag="li">要闻</router-link>
                <router-link to="/recommend" tag="li">推荐</router-link>
                <!-- <router-link to="/video" tag="li">视频</router-link> -->
            </ul>
        </van-sticky>
    </div>
</template>

<script>
import u1 from './header_2.vue'
export default {
    name:"",
    components:{
        u1
    },
    data() {
        return {

        }
    },
    computed: {
        
        path(){
            return this.$route
        }
    },
}
</script>

<style lang="scss" scoped>
.header{
    background: #5187fe;
    height: _vw(150);
    margin-bottom: _vw(-55);
}

.u2{
    height: _vw(44);
    display: grid;
    grid-template-columns:1fr 1fr;
    align-items: center;
    text-align: center;
    color: #ffffff;
    background: #5187fe;
    li{
        position: relative;
    }
    .router-link-exact-active::after{
        width: _vw(18);
        height: _vw(3);
        background: #67f5ff;
        content: "";
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: -5px;
        margin: auto;
    }

}
</style>
