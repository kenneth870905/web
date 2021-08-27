<template>
<div class="top-nav" style="background: #f5f5ee;">
    <div class="logo">
        <div class="logoimg">

        </div>
    </div>
    <transition name="fade">
        <loading v-if="isLoading"></loading>
    </transition>
    <!-- <header class="top-bar no-title">
        <a class="btn-top back">[返回]</a>

        <h1 class="top-title">#top_title#</h1>
        <div class="logo">
            <img src="images/logo.jpg" alt="">
        </div>

        <div class="padding"></div>
        <a class="btn-top search" href="javascript:;" @click="$router.push('/search')">[搜索]</a>
        <a class="btn-top menu" @click="显示导航()">[菜单]</a>
    </header> -->
    <div class="导航" v-show="isShow">
        <div v-for="(item,index) in nav" :key="index" class="单个导航">
            <router-link :to="item.jump">
                <div class="首页图标"><img :src="item.imgs" alt=""></div>
                <div>{{item.name}}</div>
            </router-link>
        </div>
        <div class="我的" @click="$router.push('/')">
            <img src="images/wo.png" alt="">
        </div>
    </div>
    <!-- 轮播 -->
    <div class="bannerbox">
        <van-swipe :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="(item,index) in 轮播" :key="index" class="轮播">
                <img :src="item" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
    <div>
        <ul class="menu-list">
            <li class="item" @click="$router.push('/category')">
                <a class="link" href="javascript:;" data-name="category">
                    <!-- <i class="icon category"></i> -->
                    <img src="images/fenlei.png" alt="">
                    <span class="name">分类</span>
                </a>
            </li>
            <li class="item" @click="$router.push('/ranking')">
                <a class="link" href="javascript:;" data-name="rank">
                    <img src="images/paihang.png" alt="">
                    <span class="name">排行</span>
                </a>
            </li>
            <li class="item" @click="$router.push('/bookshelf/?id=1')">
                <a class="link" href="javascript:;" data-name="bookshelf">
                    <img src="images/shoucang.png" alt="">
                    <span class="name">推荐</span>
                </a>
            </li>
            <li class="item" @click="$router.push('/bookshelf/?id=2')">
                <a class="link" href="javascript:;" data-name="history">
                    <img src="images/time.png" alt="">
                    <span class="name">经典</span>
                </a>
            </li>
            <li class="item" @click="$router.push('/hot')">
                <a class="link" href="javascript:;" data-name="history">
                    <img src="images/remen.png" alt="">
                    <span class="name">热门</span>
                </a>
            </li>
        </ul>
    </div>
    <div class="推荐">
        <div class="txt">新作上线</div>
    </div>
    <div class="推荐书单">
        <div v-if="网络连接" class="网络连接">
            <div class="网络失败">
                <div class="提示语">
                    网络连接失败，请检查网络设置
                </div>
                <div class="按钮">
                    <div class="取消" @click="取消()">取消</div>
                    <div class="重试" @click="重试()">重试</div>
                </div>
            </div>
        </div>
        <router-link class="书单" v-for="(item,index) in 新作" :key="index" tag="div" :to="{path:'/details',query:{id:item.id}}">
            <img :src="item.cover" alt="">
            <p>{{item.name}}</p>
            <p>{{item.biaoQian}}</p>
        </router-link>
    </div>

    <!-- <div class="bottombg">
        <i class="npc-3"> </i>
    </div> -->
</div>
</template>

<script>
import Loading from '@/components/loading'
import {
    api_分类漫画
} from "@/api/api.js"
export default {
    data() {
        return {
            isShow: false,
            轮播: ["images/0.jpg", "images/1.jpg", "images/3.jpg", "images/4.png", ],
            nav: [{
                    id: "1",
                    jump: "/",
                    imgs: "images/home.png",
                    name: "首页"
                },
                {
                    id: "2",
                    jump: "/bookshelf/?id=1",
                    imgs: "images/shoucang.png",
                    name: "推荐"
                },
                {
                    id: "3",
                    jump: "/bookshelf/?id=2",
                    imgs: "images/time.png",
                    name: "经典"
                },
                {
                    id: "4",
                    jump: "/category",
                    imgs: "images/fenlei.png",
                    name: "分类"
                },
                {
                    id: "5",
                    jump: "/ranking",
                    imgs: "images/paihang.png",
                    name: "排行"
                },
            ],
            推荐: [],
            精品: [],
            新作: [],
            isLoading: true,
            网络连接: false
        }
    },
    components: {
        Loading
    },
    methods: {
        取消() {
            console.log(123)
            this.网络连接 = false;
        },
        重试() {
            location.reload()
        },
        显示导航() {
            this.isShow = !this.isShow
        },
        企鹅推荐() {
            var obj = {
                leiBieId: 2,
                pageIndex: 3,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.推荐 = x.data.data.slice(0, 9);
                // console.log(this.推荐)
            })
        },
        完结精品() {
            var obj = {
                leiBieId: 2,
                pageIndex: 2,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.精品 = x.data.data.slice(0, 9);
                // console.log(this.精品)
            })
        },
        新作上线() {
            var obj = {
                leiBieId: 2,
                pageIndex: 1,
                pageSize: 10
            }
            api_分类漫画(obj).then(x => {
                this.isLoading = false
                this.新作 = x.data.data.slice(0, 9);
                // console.log(this.新作)
            }).catch(
                err => {
                    console.log(111)
                    this.isLoading = false
                    this.网络连接 = true
                }
            )
        }
    },
    mounted() {
        this.企鹅推荐();
        this.完结精品();
        this.新作上线();
    },
    created() {

    },
}
</script>

<style scoped>
.网络连接 {
    width: 100%;
    margin-top: 40px;
    border-radius: 10px;
}

.网络失败 {
    width: 95%;
    height: 150px;
    background: #25252a;
    text-align: center;
    color: white;
    margin: 0 auto;
}

.提示语 {
    height: 100px;
    line-height: 100px;
    background: #25252a !important;
}

.按钮 {
    width: 100%;
    display: flex;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;

}

.按钮 div {
    height: 50px;
    width: 50%;
    background: #25252a !important;
}

.按钮 .重试 {
    color: red;
}

.logo {
    display: flex;
    text-align: center;
}

.logoimg {
    margin: 0;
    padding: 0;
    background: url('/images/logo.png') no-repeat;
    width: 160px;
    height: 65px;
    background-size: contain;
    margin: auto;
}

.logo img {
    width: 100%;
    height: 2.6667rem;
}

.导航 {
    width: 100%;
    height: 8.6667rem;
    background: #f5f5ee;
    position: absolute;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 5px solid #ffa378;
    animation: donghua 0.8s;
    z-index: 10;
}

@keyframes donghua {
    0% {
        top: -214px;
        opacity: 0;
    }

    100% {
        top: 60px;
        opacity: 1;
    }
}

.导航 .单个导航 {
    width: 33.3%;
    text-align: center;
    color: #969696;
    font-size: 0.6rem;
}

.首页图标 img {
    width: 40px;
    height: 40px;
}

.我的 img {
    width: 325px;
    height: 50px;
}

.top-nav {
    width: 100%;
    background: #ffffff;
    height: 1.4667rem;
}

.top-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 149;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    background-color: #FFFFFF;
}

.top-bar.no-title .top-logo {
    display: block;
}

.top-bar.no-title .top-title,
.top-bar.no-title .btn-top.back {
    display: none;
}

.top-bar .top-logo {
    display: none;
    width: 6rem;
    height: 2.5rem;
    background: url("/images/sc_img_default.png") no-repeat 0rem -2.55rem;
    background-size: 14.8rem 7rem;
    width: 6rem;
    height: 2.5rem;
    background-repeat: no-repeat;
    text-indent: -2500rem;
    font-size: 0;
}

.top-bar .top-title {
    display: block;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: 0.9rem;
    color: #535252;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.top-bar .padding {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.top-bar .btn-top {
    display: block;
    text-indent: -2500rem;
    font-size: 0;
}

.top-bar .btn-top.back {
    padding: 0.375rem;
}

.top-bar .btn-top.back::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -3.9rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    background-repeat: no-repeat;
}

.top-bar .btn-top.back:active {
    background-color: #DCDCD6;
}

.top-bar .btn-top.search {
    padding: 0.375rem;
    background: white;
}

.top-bar .btn-top.search::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -7.1rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    background-repeat: no-repeat;
}

.top-bar .btn-top.search:active {
    background-color: #DCDCD6;
}

.top-bar .btn-top.menu {
    padding: 0.375rem;
    margin-right: 0.125rem;
    background: white;
}

.top-bar .btn-top.menu::after {
    content: "";
    display: block;
    width: 1.35rem;
    height: 1.35rem;
    background: url("/images/sc_img_default.png") no-repeat -5.5rem -5.3rem;
    background-size: 14.8rem 7rem;
    width: 1.35rem;
    height: 1.35rem;
    ;

    background-repeat: no-repeat;
}

.top-bar .btn-top.menu:active {
    background-color: #DCDCD6;
}

.轮播 img {
    width: 100%;
    height: 100%;
}

.四个导航 {
    display: flex;
}

.波浪导航 {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 4.7rem;
    margin-top: -1.75rem;
    background: transparent url(/images/bolang.png) no-repeat scroll 0 100%;
    background-size: 100% 4.5rem;
    font-size: 0;
    text-align: center;
}

.menu-list {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 4.5rem;
    margin-top: -1.75rem;
    background: transparent url("/images/bolang.png") no-repeat scroll 0 100%;
    background-size: 100% 4.5rem;
    font-size: 0;
    text-align: center;
}

.menu-list .item {
    display: inline-block;
    width: 20%;
    margin-top: 1.5rem;
    text-align: center;
}

.menu-list .item img {
    width: 40px;
    height: 40px;
    background: white;
}

.menu-list .link {
    display: inline-block;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    padding-bottom: 0.2rem;
}

.menu-list .link:active {
    background-color: #DCDCD6;
}

.menu-list .icon {
    display: block;
    margin: 0 auto;
}

.menu-list .icon.category {
    background: url(/images/sc_img_default.png) no-repeat -25px -88px;
    background-size: 8.925rem 5.275rem;
    width: 1.3rem;
    height: 1.7rem;
    background-repeat: no-repeat;
}

.menu-list .icon.rank {
    background: url(/images/sc_img_default.png) no-repeat 3px -88px;
    background-size: 8.925rem 5.275rem;
    width: 1.3rem;
    height: 1.7rem;
    background-repeat: no-repeat;
}

.menu-list .icon.collect {
    background: url(/images/sc_img_default.png) no-repeat -170px -45px;
    background-size: 8.925rem 5.275rem;
    width: 1.3rem;
    height: 1.3rem;
    background-repeat: no-repeat;
}

.menu-list .icon.history {
    background: url(/images/sc_img_default.png) no-repeat -88px -46px;
    background-size: 8.925rem 5.275rem;
    width: 1.3rem;
    height: 1.3rem;
    background-repeat: no-repeat;
}

.menu-list .name {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.6rem;
    color: #969696;
}

.history-popup {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: absolute;
    z-index: 3;
    right: 0.8rem;
    bottom: 3.5rem;
    max-width: 90%;
    height: 1.8rem;
    margin-left: -0.1rem;
    padding-right: 0.5rem;
    background-color: #FFFFFF;
    border: 2px solid #797878;
    border-radius: 1.8rem;
    font-size: 0.75rem;
    color: #535252;
    -webkit-transition: opacity 300ms ease, visibility 300ms ease, -webkit-transform 300ms ease;
    transition: opacity 300ms ease, visibility 300ms ease, -webkit-transform 300ms ease;
    transition: opacity 300ms ease, visibility 300ms ease, transform 300ms ease;
    transition: opacity 300ms ease, visibility 300ms ease, transform 300ms ease, -webkit-transform 300ms ease;
    opacity: 1;
    visibility: visible;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.menu-list li {
    background: white;
}

.menu-list li a {
    background: white;
}

.menu-list li span {
    background: white;
}

.txt {
    font-size: 0.6933rem;
    margin: 10px;
    font-weight: 600;
    float: left;
}

.广告图片 {
    margin-right: 0.4rem;
    margin-left: 0.4rem;
}

.广告图片 img {
    width: 100%;
}

.推荐 .更多 {
    float: right;
    font-size: 0.6933rem;
    margin: 10px;
    font-weight: 600;
    margin-left: 0.2667rem;
}

.书单 {
    width: 28%;
    height: 100%;
    margin-bottom: 10px;
}

.书单 p {
    font-size: 0.6133rem;
    text-align: center;
    background: white;
    margin-top: -5px;
    position: relative;
    overflow: hidden;
    line-height: 1rem;
    height: 1rem;
}

.书单 p:after {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 5px;
    background-color: #fff;
}

.书单 img {
    width: 100%;
    height: 85%;
    border-radius: 5px 5px 0 0;
}

.sub-title {
    width: 100%;
}

.推荐书单 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.日漫经典 {
    margin-right: 0.4rem;
    margin-left: 0.4rem;
}

.日漫经典 img {
    width: 100%;
}

.日漫经典 span {
    width: 100%;
    font-size: 0.5333rem;
}

.bottombg {
    position: relative;
    width: 100%;
    background-image: url("/images/bottomBg.png");
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center bottom;
}

.npc-3 {
    display: inline-block;
    text-indent: -2500rem;
    font-size: 0;
    width: 3.75rem;
    height: 3.325rem;
    background: url("/images/sc_img_index.png") no-repeat 0rem 0rem;
    background-size: 8.925rem 5.275rem;
    width: 3.75rem;
    height: 3.325rem;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
    left: 2.75rem;
    vertical-align: bottom;
}

.van-swipe__indicators {
    background: none !important;
}
</style>
