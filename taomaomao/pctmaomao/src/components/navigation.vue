<template>
    <nav>
        <section class="w1200">
            <div>
                <img src="http://tmmkf.com/template/default/images/logo.png">
            </div>
            <ul>
                <router-link to="/" tag="li" :class="{active:path=='/'}">
                    <div>首页</div>
                    <div>首页</div>
                </router-link>
                <router-link to="/kitten" tag="li"  :class="{active:path=='/kitten'}">
                    <div>幼猫</div>
                    <div>幼猫</div>
                </router-link>
                <router-link to="/CatCafe" tag="li"  :class="{active:path=='/CatCafe'}">
                    <div>猫咖</div>
                    <div>猫咖</div>
                </router-link>
                <router-link to="/SafeGuard" tag="li" :class="{active:path=='/SafeGuard'}">
                    <div>保障</div>
                    <div>保障</div>
                </router-link>
                <router-link to="/shop" tag="li" :class="{active:path=='/shop'}">
                    <div>体验馆</div>
                    <div>体验馆</div>
                </router-link>
                <router-link to="/about" tag="li" :class="{active:path=='/about'}">
                    <div>关于</div>
                    <div>关于</div>
                </router-link>
                <router-link to="/news" tag="li" :class="{active:path=='/news'}">
                    <div>百科</div>
                    <div>百科</div>
                </router-link>
            </ul>
        </section>
    </nav>
</template>

<script>
export default {
    name: "",
    data() {
        return {

        }
    },
    computed:{
        path(){
            return this.$route.path
        }
    }
}
</script>

<style lang="scss" scoped>
nav {
    height: 66px;
    background: rgba(206, 166, 104, 0.6);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 2;
}
section {
    width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
    // overflow: hidden;
    justify-content: space-between;
    ul{
        display: flex;
        color: #231508;
        font-size: 20px;
        line-height: 66px;
    }
    li{
        overflow: hidden;
        cursor: pointer;
        height: 66px;
        margin: 0 31px;
        position: relative;
        &::after{
            position: absolute;
            left: 0px;
            bottom: 0px;
            height: 2px;
            width: 0px;
            content:"";
            transition: all 0.3s;
            background: #231508;
        }
        div{
            transition: all 0.3s;
        }
        &:hover{
            div:nth-child(1){
                margin-top: -66px;
            }
            &::after{
                width: 100%;
            }
        }
    }
    li.active{
        div:nth-child(1){
            margin-top: -66px;
        }
        &::after{
            width: 100%;
        }
    }
}

</style>