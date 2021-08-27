<template>
    <div id="app" class="app">
        <router-view name="底部" class="底部"></router-view>
        
        <router-view class="router"/>
    </div>
</template>
<script>
const footrNav = () => import('@/components/底部导航/底部导航.vue') //进入游戏组件
import { mapActions } from "vuex";
export default {
    data() {
        return {
        }
    },
    components: { footrNav },// 注册组件
    computed: {
      
    },
    methods: {
       ...mapActions({
           检测登陆:"检测登陆"
       })
    },
    created() {
        this.检测登陆()
    },
    watch: {
        
    },
}
</script>
<style lang="scss">
body {
    padding: 0px;
    margin: 0px;
     -webkit-overflow-scrolling: touch !important;

}

// ================加载中 。。转圈图标 start==================
     .van-loading__spinner--circular{
       width:_vw(40) !important;
    height: _vw(40) !important;

    }

// ================加载中 。。转圈图标 out==================

.van-list__placeholder{
     font-size: _vw(15) !important;
       line-height: _vw(40) !important;



}
.van-list__finished-text{
     font-size: _vw(15) !important;
       line-height: _vw(40) !important;
}
// ======Toast 轻提示 start =============
 .van-toast{
     font-size: _vw(16) !important;
 }
 .van-toast--text{
  padding:_vw(10) !important;
 }
// ======out 轻提示 =============
// ==========tab title============================
//   .van-tabs__line
    .van-tabs--line .van-tabs__wrap{
        height: _vw(40) !important;
    }
    .van-tab{
        line-height: _vw(40) !important;
        font-size: _vw(16) !important;
    }
 
// .van-tabs__nav{
//      padding-right: _vw(34);
// }
.van-tabs__nav--line{
    // padding-bottom: _vw(17) !important;
       
}
.van-tabs__line{
         transform: translateX(0px) translateX(-50%);
   
}
 .van-tabs__line{
     height:_vw(3) !important;
 }
 .van-tabs--line{
    padding-top:_vw(40) !important;
}
// ==========tab title============================

html,
body {
    padding: 0px;
    margin: 0px;
    // transform: none;
    background: #F3F3F4;
}
.fred {
    color: red;
}
.fgreen {
    color: green;
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



@font-face {
    font-family: alternategothicno2bt;//艺术字体的关键样式
    src: url('/fontys/alternategothicno2bt.ttf')
  }

  #shot {
    display: inline-block;
    line-height: 1;
    vertical-align: top;
    font-family: alternategothicno2bt;
    font-size: 40px;
    color: #e86b5c;
  }



</style>
