<template>
    <div id="app" class="app">

      

        <router-view name="底部" class="底部"></router-view>
        <!-- <footrNav  class="底部"></footrNav> -->
        <router-view class="router"/>
        
        <!-- <div class="A加载中" v-show="加载">
            <div>
                <van-loading color="white" size="50px" />
            </div>
        </div> -->

    </div>
</template>
<script>
const footrNav = () => import('@/components/底部导航/底部导航.vue') //进入游戏组件
export default {
    data() {
        return {
        }
    },
    components: { footrNav },// 注册组件
    computed: {
      
    },
    methods: {
       
    },
    created() {
    },
    watch: {
        
    },
}
</script>
<style lang="scss">
.A加载中 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    > div {
        background: rgba(0, 0, 0, 0.3);
        padding: 10px;
    }
}

html,
body {
    // height: 100%;
    padding: 0px;
    margin: 0px;
    transform: none;
    background: #F3F3F4;
}
.fred {
    color: red;
}
.fgreen {
    color: green;
}
// .内容{
//     padding:_vw(50) 0px 0px 0px;
// }
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}


// 顶部位置
.van-nav-bar__arrow{
    font-size: _vw(24) !important;
}
.van-nav-bar__left{
    left: _vw(10) !important;
}
.van-nav-bar{
    height: _vw(46) !important;
    line-height: _vw(46) !important;
    border-bottom: 1px solid #cccccc;
}


.底部 + .router{
    padding-bottom: _vw(50);
}
</style>
