<template>
    <header>
        <img class="logo" src="static/logo.png" alt="" srcset="">
        <a :href="baseURL" target="_blank" v-if="guangGaoImg" class="guanggao">
            <img :src="guangGaoImg" alt="" srcset="">
        </a>
    </header>
    <router-view />

    <div class="appdownload" v-if="showDownload">
        <img src="static/close.png" alt="" srcset="" @click="showDownload=false">
        <a target="_blank" :href="appdownload">澳门六合彩开奖直播APP上线啦</a>
        <a target="_blank" :href="appdownload" class="btn">点击下载</a>
    </div>
    
    <footer>
        <div @click="$router.push('/')" :class="{active:path=='/'}">
            <img src="static/tabber-1.png" alt="" srcset="">
            <div>首 頁</div>
        </div>
        <div @click="$router.push('/DrawHistory')" :class="{active:path=='/DrawHistory'}">
            <img src="static/tabber-2.png" alt="" srcset="">
            <div>開獎公告</div>
        </div>
        <a :href="baseURL" target="_blank">
            <img src="static/goucai.png" alt="" srcset="">
            <div>購&nbsp;彩</div>
        </a>
        <div @click="$router.push('/video')" :class="{active:path=='/video'}">
            <img src="static/tabber-3.png" alt="" srcset="">
            <div>開獎視頻</div>
        </div>
        <!-- <div @click="$router.push('/faq')" :class="{active:path=='/faq'}">
            <img src="static/tabber-4.png" alt="" srcset="">
            <div>FAQ</div>
        </div> -->
        <div @click="$router.push('/about')" :class="{active:path=='/about'}">
            <img src="static/tabber-5.png" alt="" srcset="">
            <div>關於我們</div>
        </div>
    </footer>
</template>

<script>
import { computed, reactive, ref , getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup(props) {
        // 获取当前路由信息
        const route = useRoute();
        // 全局路由的实例
        const router = useRouter();
        let path = computed(()=>{
            return route.path
        })
        let showDownload = ref(true)

        if(window.innerWidth>750){
            location.href = '/index/index.html'
        }


        const { proxy } = getCurrentInstance(); 

        console.log('asdfsad')
        return {
            path,
            appdownload,
            showDownload,
            baseURL,
            guangGaoImg:guangGaoImg
        }
    }
}
</script>

<style lang="scss">
html,
body {
    height: 100%;
    margin: 0px;
    // overflow: auto;
}
*{
    box-sizing: border-box;
}
#app{
    // height: 100%;
    padding-bottom: 60px;
    // overflow: auto;
}
ul,li{
    margin: 0px;
    padding: 0px;
    list-style: none;
}
</style>

<style lang="scss" scoped>
header{
    background: #fff;
    height: 80px;
    padding: 10px;
    position: sticky;
    top: 0px;
    border-bottom: 1px solid #eee;
    z-index: 10;
    display: flex;
    .logo{
        height: 100%;
        flex: 0;
    }
    .guanggao{
        flex-grow: 1;
        margin: 0px 0px 0px 30px;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
footer{
    display: flex;
    height: 60px;
    font-size: 13px;
    color:#fff;
    position: fixed;
    width: 100%;
    left: 0px;
    bottom: 0px;
    >a,
    >div{
        flex: 1;
        height: 100%;
        background: #0068b7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        text-decoration: none;
        border-left: 1px solid #fff;
        &.active{
            background: #d80011;
        }
    }
    >div:nth-child(1){
        border-left: none;
    }
    img{
        width: 27.5px;
    }
}
.appdownload{
    background: rgba($color: #000000, $alpha: 0.8);
    position: fixed;
    left: 0px;
    bottom: 60px;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    img{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 13px;
        margin: auto;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
    .btn{
        width: 70px;
        line-height: 38px;
        text-align: center;
        border-radius: 5px;
        background: #ec0909;
        margin: 0px 0px 0px 5px;
    }
}
</style>
