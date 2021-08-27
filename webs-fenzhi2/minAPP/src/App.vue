<template>
    <div id="app" class="app">
        <router-view name="底部" class="底部"></router-view>
        <!-- <keep-alive >
            <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
        </keep-alive>
        <router-view class="router" v-if="!$route.meta.keepAlive"></router-view> -->
        <router-view class="router" ></router-view>
    </div>
</template>
<script> 
   import { Toast } from 'vant';

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
        document.title=config.title
        var x = document.cookie;
        console.log( x )
    },
    watch: {
    },
}
</script>
<style lang="scss">
// ======是否跳转到登陆页 弹出框 start=============
    .tanchukuang{
    // background: #ec304c;
    .van-dialog__header{
        font-size: _vw(14);
        line-height: _vw(30);
    }
    .van-button__text{
        font-size:_vw(12);
    }
    .van-button--large{
        height: _vw(44);
        line-height: _vw(44)
    }
    .van-dialog__header{
        color:#ec304c;
    }
    .van-dialog__message{
        font-size: _vw(14);
    }
    }
// ======是否跳转到登陆页 弹出框 out=============

// ======Toast 轻提示 start =============
 .van-toast{
     font-size: _vw(18) !important;
 }
 .van-toast--text{
  padding:_vw(10) !important;
 }
// ======out 轻提示 =============


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
    padding: 0px;
    margin: 0px;
    transform: none;
    background: #F3F3F4;
     -webkit-overflow-scrolling: touch !important;

}
.fred {
    color: #ec304c;
}
.fac{
    color:#acacac;
}
.fgr{
  color:green
}
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

