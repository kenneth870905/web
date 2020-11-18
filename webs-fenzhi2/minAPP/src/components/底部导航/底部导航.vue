<template>
    <div class="foor_nav" v-if="!$route.meta.隐藏尾部导航">
        <ul class="foor_nav_ul">
            <li :class="{activecls:selectLab =='/'}" @click="go('/')">
                <div class="icon_box"><span class="iconfont iconshouye"></span></div>
                <div class="icon_title">首页</div>
            </li>

            <li :class="{activecls:selectLab =='/vip'}" @click="go('/vip')">
                <div class="icon_box"><span class="iconfont iconvip"></span></div>
                <div class="icon_title">VIP</div>
            </li>
            <li :class="{activecls:selectLab =='/generalize'}" @click="go('/generalize')">
                <div class="icon_box"><span class="iconfont iconfenxiang-copy"></span></div>
                <div class="icon_title">发现</div>
            </li>
            
             <li v-if="!取出当前数据"  :class="{activecls:selectLab =='/login'}" @click="go('/login')">
                <div class="icon_box"><span class="iconfont iconfenxiang-copy"></span></div>
                <div class="icon_title">登陆</div>
            </li>

            <li  v-if="取出当前数据" :class="{activecls:selectLab =='/my'}" @click="go('/my')" >
                <div class="icon_box"><span class="iconfont iconwode"></span></div>
                <div class="icon_title">我的</div>
            </li>
        </ul>
    </div>
</template>
<script>
import {  mapState } from 'vuex' 
import { Toast } from 'vant';

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
       ...mapState({
                    取出当前数据:"是否登录",
                }),
      selectLab(){
            return this.$route.path
        }
        
    },
    methods: {
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
    }
}
</script>

<style lang="scss" scoped>
.activecls {
    color: rgb(73, 154, 246) !important;
}
.foor_nav {
    background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
    box-shadow: 2px 2px 10px #909090;
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 10;
    border-top: 1px solid #f3f3f4;
    background: #ffffff;
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
             color: #ffffff;
            .icon_title {
                font-size: _vw(14);
              font-weight: 600;
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