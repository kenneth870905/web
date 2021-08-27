<template>
    <header class="appHeader">
        <div class="logo">
            <img class="img-1" src="static/logo_lg.png" alt />
            <!-- <span class="date">{{时间}}</span> -->
            <a :href="baseURL" class="guanggao" target="target">
                <img class="img-2" v-if="guangGaoImg" :src="guangGaoImg" alt="">
            </a>
        </div>
        <div class="line"></div>
        <ul>
            <li @click="go('/')" :class="{active:path=='/'}">首頁</li>
            <li @click="go('/DrawHistory')" :class="{active:path=='/DrawHistory'}">開獎公告</li>
            <li @click="go('/video')" :class="{active:path=='/video'}">開獎視頻</li>
            <li @click="go('/fqa')" :class="{active:path=='/fqa'}">FAQ</li>
            <li @click="go('/about')" :class="{active:path=='/about'}">關於我們</li>
            <li @click="go('/contact')" :class="{active:path=='/contact'}">聯繫我們</li>
        </ul>
    </header>
    <router-view />

    <footer>
        版權所有 不得轉載 © 2020 澳門六合彩
    </footer>
    <div class="app下载" v-if="显示app下载">
        <img src="static/close.png" alt="" srcset="" @click="显示app下载=false">
        <a :href="appdownload" target="view_window" class="a1">澳门六合彩开奖直播APP上线啦</a>
        <a :href="appdownload" target="view_window" class="a2">点击下载</a>
    </div>

    <!-- https://amlhckjjg.oss-cn-hongkong.aliyuncs.com/video/2021116.mp4 -->
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import moment from 'moment';
export default {
    name: '',
    components: {

    },
    setup(props, ctx) {
        
        if(window.innerWidth<=750){
            location.href = '/h5'
        }

        // 获取当前路由信息
        const route = useRoute();
        // 全局路由的实例
        const router = useRouter();
        let 显示app下载=ref(true)

        moment.updateLocale('en', {
            weekdays: [
                "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
                // "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ]
        });

        var 时间 = ref(moment().format('YYYY-MM-DD h:mm:ss dddd'));
        setInterval(() => {
            时间.value = moment().format('YYYY-MM-DD h:mm:ss dddd')
        }, 1000);

        // console.log(route)
        const go = (path) => {
            router.push(path)
        }
        let path = computed({
            get() {
                return route.path
            }
        })
        return {
            guangGaoImg:guangGaoImg,
            时间,
            go,
            path,
            appdownload,
            显示app下载,
            baseURL:baseURL
        };
    },
    // computed:{},
    //     methods:{
    //     },
    //     mounted() {
    //         // this.$axios.post('/Lottery/Bet/GetBetResults',{lotteryCode:70002,state:0} ).then(res => {
    //         //     console.log(res)
    //         // }).catch(err => {
    //         //     console.error(err); 
    //         // })
    //     },
}
</script>
<style lang="scss">
html,body,#app{
    height: 100%;
    margin: 0px;
}
*{
    box-sizing: border-box;
}
.w1170 {
    width: 1170px;
    margin: 0px auto;
}
ul,
li {
    margin: 0px;
    padding: 0px;
    list-style: none;
}
.appHeader {
    .line {
        border-top: 1px solid #dadada;
    }
    ul {
        margin: 0 auto;
        width: 1170px;
        border-bottom: 5px solid #eee222;
        display: flex;
        line-height: 38px;
        font-size: 15px;
        color: #fff;
        text-align: center;
        li {
            flex: 1;
            cursor: pointer;
        }
        .active {
            color: #fff100;
        }
        li:nth-child(1) {
            background: #d90011;
        }
        li:nth-child(2) {
            background: #00a0ea;
        }
        li:nth-child(3) {
            background: #17c001;
        }
        li:nth-child(4) {
            background: #d9a400;
        }
        li:nth-child(5) {
            background: #692cc5;
        }
        li:nth-child(6) {
            background: #c42cb5;
        }
    }
}

.logo {
    width: 1170px;
    height: 140px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img-1 {
        height: 96px;
        flex-shrink: 0;
    }
    .date {
        font-size: 18px;
        color: #a4a4a4;
    }
    a{
        width: 0;
        height: 100%;
        flex-grow: 1;
        margin: 0px 0px 0px 50px;
        img{
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
}
footer{
    margin: 0px auto;
    width: 1170px;
    border-top: 5px solid #eee222;
    text-align: center;
    color: #848484;
    font-size: 14px;
    line-height: 40px;
}
.app下载{
    background: rgba(0,0,0,.8);
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    a{
        color: #fff;
        text-decoration: none;
    }
    .a1:hover{
        background: red;
        font-size: 15px;
        border-radius: 5px;
    }
    .a2{
        height: 40px;
        line-height: 40px;
        width: 70px;
        margin: 0px 0px 0px 10px;
        background: red;
        text-align: center;
        border-radius: 5px;
    }
    img{
        position: absolute;
        left: 15px;
        top: 20px;
        cursor: pointer;
    }
}
</style>
