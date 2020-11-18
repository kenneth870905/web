<template>
    <div class="foor_nav" v-if="!$route.meta.隐藏尾部导航">
        <ul class="foor_nav_ul">
            <li :class="{activecls:selectLab =='/'}" @click="go('/')">
                <div class="icon_box"><span class="iconfont iconshouye"></span></div>
                <div class="icon_title">主页</div>
            </li>

            <li :class="{activecls:selectLab =='/open'}" @click="go('/open')">
                <div class="icon_box"><span class="iconfont iconshipin"></span></div>
                <div class="icon_title">开奖</div>
            </li>
            <li :class="{activecls:selectLab =='/buy'}" @click="go('/buy')">
                <div class="icon_box"><span class="iconfont icondongman"></span></div>
                <div class="icon_title">购彩</div>
            </li>
            <li :class="{activecls:selectLab =='/documentary'}" @click="go('/documentary')">
                <div class="icon_box"><span class="iconfont iconshu"></span></div>
                <div class="icon_title">跟单</div>
            </li>

            <li :class="{activecls:selectLab =='/my'}" @click="go('/my')">
                <div class="icon_box"><span class="iconfont iconwode"></span></div>
                <div class="icon_title">我的</div>
            </li>
        </ul>
    </div>

</template>
<script>
export default {
    data() {
        return {
        }
    },
    components: { // 注册组件

    },
    created() {
        // path
    },
    computed: {
        selectLab(){
            return this.$route.path
        }
    },
    methods: {
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        }
    }
}


</script>




<style lang="scss" scoped>
.activecls {
    color: red !important;
}
.foor_nav {
    box-shadow: 2px 2px 10px #909090;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 10;
    border-top: 1px solid #f3f3f4;
    background: #ffffff;
    // background:gold;
    height: _vw(50);
    display: flex;
    align-items: center;

    width: 100%;
    .foor_nav_ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        li {
            text-align: center;
            color: #8d8ba4;
           
            .icon_title {
                font-size: _vw(12);
            }
            div {
              
                .iconfont{
                    text-align: center;
                 font-size: _vw(20);
                }
                .iconshipin{
                    font-size: _vw(22)
                }
            }
        }
    }
}
</style>