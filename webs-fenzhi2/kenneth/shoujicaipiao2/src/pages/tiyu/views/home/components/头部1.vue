<template>
    <header class="mui-bar mui-bar-nav">
        <div class="logo">
            <img :src="config.img_url+'static/pages/tiyu/image/hg-4-1-1.png'" alt="">
        </div>
        <!-- <h1 class="mui-title"> -->
        <!-- </h1> -->
        <div class="btn_list"> 
            <div class="btn_1" @click="$router.push('/login')" v-show="!userinfo.UserId">
                登录
                <div></div>
                注册
            </div>
            <ul class="btn_2" @click="open()">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <!-- <span class="mui-pull-left" v-if="!userinfo.UserId" @tap="$router.push('/login')">登录</span> -->
        <!-- <span class="mui-pull-right"  v-if="!userinfo.UserId" @tap="$router.push('/register')">注册</span> -->
    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    inject:['打开侧导航'],
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
    methods: {
        open(){
            this.打开侧导航()
            // this.$parent.打开侧导航()
        }
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
    .logo{
        height: 100%;
        img{
            height: 100%;
        }
    }
    span{
        line-height: 44px;
        color: #ffffff;
        font-size: 14px;
    }
    .mui-title{
        img{
            height: 44px;
        }
    }
}
.btn_list{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    .btn_1{
        font-size: _vw(12);
        background: #ff9900;
        padding: 0px 8px;
    }
    .btn_2{
        margin: 0px 10px 0px 10px;
        width: _vw(22);
        height: _vw(30);
        position: relative;
        li{
            display: block;
            position: absolute;
            left: 0px;
            width: 100%;
            height: 2px;
            background-color: #fff;
        }
        li:nth-child(1){
            top: 25%;
        }
        li:nth-child(2){
            top: 50%;
        }
        li:nth-child(3){
            top: 75%;
        }
    }
}
</style>


