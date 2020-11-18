<template>
    <div class="foor_nav" v-if="!$route.meta.隐藏尾部导航">
        <ul class="foor_nav_ul">
            <li :class="{activecls:selectLab =='/'}" @click="go('/')">
                <div class="icon_box"><span class="iconfont iconshouye"></span></div>
                <div class="icon_title">主页</div>
            </li>

            <li :class="{activecls:selectLab =='/expert'}" @click="handleExpert()">
                <div class="icon_box"><span class="iconfont iconzhuanjiarenzheng"></span></div>
                <div class="icon_title">专家</div>
            </li>
            <li :class="{activecls:selectLab =='/Competition'}" @click="handleCompetition()">
                <div class="icon_box"><span class="iconfont iconsaishi"></span></div>
                <div class="icon_title">赛事</div>
            </li>
             
             <!-- <li :class="{activecls:selectLab =='/message'}" @click="go('/message')">
                    <div class="icon_box"><span class="iconfont kk iconPCbofangye_tuwenzixun"></span></div>
                    <div class="icon_title">资讯</div>
                  </li> -->

            <li  :class="{activecls:selectLab =='/my'}" @click="go('/my')">
                <div class="icon_box"><span class="iconfont iconwode"></span></div>
                <div class="icon_title">我的</div>
            </li>
            <!-- <li   v-if="是否登录==false" :class="{activecls:selectLab =='/login'}" @click="go('/login')">
                <div class="icon_box"><span class="iconfont iconwode"></span></div>
                <div class="icon_title">登陆/注册</div>
            </li> -->

        </ul>
    </div>

</template>
<script>
  import {  mapState } from 'vuex' 

export default {
    data() {
        return {
        }
    },
    components: { // 注册组件

    },
    created() {
    },
     computed:{
        ...mapState({
                    是否登录:"是否登录",
                     SSinde:"SSinde",
           }),
            selectLab(){
                return this.$route.path
            }
        },
    methods: {
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
        handleExpert () {
            this.$store.commit('更改专家足球maxinde', 1)
            this.$store.commit('更改专家足球mininde', 2)
            this.$router.push('/expert')
        },
        handleCompetition() {
            this.SSinde.maxindex=1
            this.SSinde.minindex=1
            this.$router.push('/Competition')

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
    z-index: 1000;
    border-top: 1px solid #f3f3f4;
    background: #ffffff;
    padding-top:_vw(4);
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
                line-height: _vw(20)
            }
            .icon_box {
              
                .iconfont{
                    text-align: center;
                   font-size: _vw(20);
                   line-height: _vw(25)
                }
                  .kk{
                    font-size: _vw(24);
                    line-height: _vw(25)
                }
                .iconzhuanjiarenzheng{
                  font-size: _vw(24);
                  font-weight: 500;
                }
            }
        }
    }
}
</style>