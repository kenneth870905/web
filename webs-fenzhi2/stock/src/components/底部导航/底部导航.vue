<template>
    <div class="foor_nav" v-if="!$route.meta.隐藏尾部导航">
        <ul class="foor_nav_ul">
            <li :class="{activecls:selectLab =='/'}" @click="go('/')">
                <div class="icon_box"><span class="iconfont icon-shouye"></span></div>
                <div class="icon_title">首页</div>
            </li>

            <li :class="{activecls:selectLab =='/information'}" @click="go('/information')">
                <div class="icon_box"><span class="iconfont icon-piliangfenpeiziyuan"></span></div>
                <div class="icon_title">配资</div>
            </li>
            <li :class="{activecls:selectLab =='/gp'}" @click="go('/gp')">
                <div class="icon_box"><span class="iconfont icon-gupiao"></span></div>
                <div class="icon_title">股市</div>
            </li>
            <li :class="{activecls:selectLab =='/service'}" @click="go('/service')">
                <div class="icon_box"><span class="iconfont icon-kefu2"></span></div>
                <div class="icon_title">客服</div>
            </li>

            <li :class="{activecls:selectLab =='/my'}" @click="go('/my')">
                <div class="icon_box"><span class="iconfont icon-wodedangxuan"></span></div>
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
            color: #8d8ba4;
            .iconfont {
                font-size: _vw(20);
            }
            .icon_title {
                font-size: _vw(12);
            }
            div {
                text-align: center;
            }
        }
    }
}
</style>