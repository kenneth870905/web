<template>
<div>
    <header class="top-bar no-title">
        <a class="btn-top back"> [返回]</a>

        <h1 class="top-title">#top_title#</h1>

        <div class="返回" @click="$router.back()">
            <i class="van-icon van-icon-arrow-left"></i>
            <span>{{title}}</span>
        </div>

        <div class="padding"></div>
        <!-- <a class="btn-top search" href="javascript:;" @click="$router.push('/search')">[搜索]</a> -->
        <a class="btn-top menu" @click="显示导航()">[菜单]</a>
    </header>

    <!-- <transition name="fade"> -->

    <div class="导航" v-show="isShow">

        <div v-for="(item,index) in nav" :key="index" class="单个导航">
            <router-link :to="item.jump">
                <div class="首页图标"><img :src="item.imgs" alt=""></div>
                <div>{{item.name}}</div>
            </router-link>

        </div>
        <!-- <div class="我的" @click="$router.push('/')">
            <img src="images/wo.png" alt="">
        </div> -->

    </div>
    <!-- </transition> -->
</div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            Xdonghua: "",
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
               
            ]
        }
    },
    props: {
        title: String
    },
    methods: {
        显示导航() {
            this.isShow = !this.isShow
        }
    },
}
</script>

<style scoped>
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
    ;

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
    ;

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

.返回 {
    background: white;
}

.返回 i {
    background: white;
    padding: 0.2667rem 0.2667rem;
    top: 0.1333rem;
    color: #ffa378;
}

.返回 span {
    height: 100%;
    background: white;
    color: #535252;
}

.导航 {
    width: 100%;
    height: 6.6667rem;
    background: #f5f5ee;
    position: absolute;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-bottom: 5px solid #ffa378;
    animation: donghua 0.5s;
    z-index: 10;
}

@keyframes donghua {
    0% {

        top: 60px;
        opacity: 1;
    }

    100% {
        top: -214px;
        opacity: 0;
    }
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

.fade-enter-active {
    animation: xiala 0.5s;
}

.fade-leave-to {
    animation: yincang 0.5s;
}

@keyframes yincang {
    0% {
        height: 6.6667rem;
    }

    100% {
        height: 0rem;
    }
}

.导航 ul li {
    float: left;
    width: 33.3%;
    height: 1.3333rem;
    text-align: center;
    font-size: 0.6rem;
    color: #969696;
}

.首页图标 img {
    width: 40px;
    height: 40px;
}

.我的 img {
    width: 325px;
    height: 50px;
}

.遮罩 {
    width: 100%;
    height: 100%;
    background: #999999;
    opacity: 0.5;
}
</style>
