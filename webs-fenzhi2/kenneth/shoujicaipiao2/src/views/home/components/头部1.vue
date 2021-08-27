<template>
    <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">
            <!-- <img :src="config.img_url+'static/image/hg-4-1-1.png'" alt=""> -->
            {{config.title}}
        </h1>
        <span class="mui-pull-left" v-if="!userinfo.UserId" @tap="$router.push('/login')">登录</span>
        <span class="mui-pull-right"  v-if="!userinfo.UserId" @tap="$router.push('/register')">注册</span>
    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config",
            userinfo:x=>x.user.userinfo
        })
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-nav{
    position: relative;
    // position: absolute;
    position: sticky;
    top: -1px;
    z-index: 3;
    span{
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;
    }

    // background: #373737;
    // .mui-title{
    //     img{
    //         height: 44px;
    //     }
    // }
}
</style>


