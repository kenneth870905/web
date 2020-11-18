<template>
<div class="nav" :class="{active:isopen}">
    <div class="log">
        <!-- <img src="static/images/logo.png" alt="" srcset=""> -->
    </div>
    <ul ref="ul">
        <li @click="go('/')">
            HOME 首页
        </li>
        <li @click="go('/Kitten')">
            Kitten 幼猫
        </li>
        <li @click="go('/CatCafe')">
            CatCafe 猫咖
        </li>
        <li @click="go('/SafeGuard')">
            SafeGuard 保障
        </li>
        <li @click="go('/shop')">
            Shop 体验馆
        </li>
        <li @click="go('/about')">
            About 关于
        </li>
        <li @click="go('/news')">
            Baike 百科
        </li>
    </ul>

    <div class="三横" @click="open()" :class="{active:isopen}">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    name: "",
    data() {
        return {
            isopen: false
        }
    },
    methods: {
        open() {
            this.isopen = !this.isopen
            if (this.isopen) {
                $(this.$refs.ul).slideDown(300);
            } else {
                $(this.$refs.ul).slideUp(300)

            }
        },
        go(url){
            this.$router.push(url)
            $(this.$refs.ul).slideUp(300)
            this.isopen = false
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.nav {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    // background: rgba(206, 166, 104, 0.6);
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    // position: relative;
    z-index: 2;
    box-sizing: border-box;

    transition: all 0.3s;
    &.active{
        // background: rgba(206, 166, 104, 0.8);
        background: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid #ccc;
    }

    ul {
        box-shadow: 0px 2px 3px 0px #000;
        display: none;
        position: absolute;
        width: 100%;
        // background: rgba(206, 166, 104, 0.8);
        background: rgba(255, 255, 255, 0.9);
        left: 0px;
        top: 55px;
        padding: 5px 15px 0 15px;

        li {
            width: 100%;
            color: #231508;
            font-size: 12px;
            line-height: 49px;
            letter-spacing: 1px;
            border-bottom: dashed 1px #333;
        }
    }

    .三横 {
        position: relative;
        width: 24px;
        height: 20px;

        span {
            position: absolute;
            height: 2px;
            background: #231508;
            transition: all 0.3s;
        }

        span:nth-child(1) {
            width: 100%;
        }

        span:nth-child(2) {
            width: 80%;
            top: 50%;
            right: 0px;
        }

        span:nth-child(3) {
            width: 100%;
            bottom: 0px;
        }

        &.active {
            span:nth-child(1) {
                top: 9px;
                transform: rotate(45deg + 180deg);
                // transform: rotate(45deg + 180px);
            }

            span:nth-child(2) {
                opacity: 0;
                transform: rotate(180deg);
            }

            span:nth-child(3) {
                transform: rotate(-45deg - 180deg);
                bottom: 9px;
            }
        }
    }
}
</style>
