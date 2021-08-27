<template>
    <div class="top">
        <div class="container nav_text">
            <div>
                <span class="el-icon-phone"></span>
                客服电话:
                <span>{{this.站点配置.kefu_phone ? this.站点配置.kefu_phone : this.config.kefu_phone}}</span>
            </div>
            <div class="nav_rigent">
                <ul>
                    <li>欢迎您!<span>{{userInfo.UserId}}</span></li>
                    <li class="余额">
                        <span>余额</span>
                        <span>{{this.showXS ? userInfo.Money : "***"}}</span>
                        <i @click="getUserInfo()" v-show="showXS" class="el-icon-refresh"></i>
                        <span @click="showXS=!showXS">{{showXS ? '显示' : '隐藏'}}</span>
                    </li>|
                    <li>
                        <router-link to="/iframe/person">会员中心</router-link>
                    </li>|
                    <li v-if="!试玩">
                        <router-link to="/iframe/deposit" class="active_nav">存款</router-link>
                    </li>
                    <span v-if="!试玩">|</span>
                    <li v-if="!试玩">
                        <router-link to="/iframe/withdrawal">取款</router-link>
                    </li>
                    <span v-if="!试玩">|</span>
                    <li>
                        <router-link to="/iframe/orders">投注记录</router-link>
                    </li>|
                    <li @click="logout()">
                        退出
                        <!-- <router-link to="/login">退出</router-link> -->
                    </li>
                </ul>

                <!-- <span class="el-icon-guide"></span><router-link to="/About" class="guide">新手引导&nbsp;&nbsp;</router-link>|&nbsp;&nbsp;
        <span>你好，请先登陆</span>
            <router-link to="/login">你好，请先登陆&nbsp;&nbsp;</router-link> -->
                <!-- <router-link to="/login"><el-button @click="login()" class="login_btn" size="mini" round>用户登陆</el-button></router-link>&nbsp;
         <router-link to="/register"><el-button class="register_btn" size="mini" round>免费开户</el-button></router-link> - -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      showXS: true,
      text: '****'
      // hidden:"隐藏"
    }
  },
  computed: {
    ...mapState({
      config: 'config'
    }),
    ...mapGetters({
      userInfo: 'userInfo',
      试玩: '试玩',
      站点配置: '站点配置'
    })
  },
  methods: {
    ...mapActions({
      statusBar: '更新登陆信息',
      getUserInfo: 'getUserInfo',
      退出登录: '退出登录'
    }),
    logout () {
      // localStorage.removeItem('login');
      // this.statusBar()
      this.退出登录()
      if (this.$route.meta.需要登录) {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.statusBar()
  }
}
</script>

<style lang="scss" scoped>
.top {
    position: relative;
    // z-index: 11;
    width: 100% !important;
    height: 45px;
    background: #363636;
    border-bottom: 1px solid #000;
    .nav_text {
        color: #969696;
        font-size: 12px;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        .nav_rigent {
            ul {
                display: flex;
                justify-content: flex-end;
                .active_nav {
                    color: rgb(238, 255, 0);
                }
                li {
                    cursor: pointer;
                    height: 45px;
                    line-height: 45px;
                    margin: 0px 8px 0px 8px;
                    //  color:#969696 !important;
                    a {
                        color: #969696;
                    }
                }
            }
        }
    }
}
.余额{
    span{
        margin: 0px 0px 0px 5px;
    }
    i{
        cursor: pointer;
        font-size: 14px;
    }
}
</style>
