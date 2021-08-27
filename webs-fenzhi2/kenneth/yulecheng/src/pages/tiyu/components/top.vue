<template>
    <div class="top">
        <div class="container nav_text">
            <div>
                <span class="el-icon-phone"></span>
                客服电话:
                <span>{{this.站点配置.kefu_phone ? this.站点配置.kefu_phone : this.config.kefu_phone}}</span>
            </div>
            <div class="nav_rigent">
                <span class="el-icon-guide"></span>
                <router-link to="/About" class="guide">新手引导&nbsp;&nbsp;</router-link>|&nbsp;&nbsp;
                <span>你好，请先登陆</span>
                <!-- <router-link to="/login">你好，请先登陆&nbsp;&nbsp;</router-link> -->
                <!-- <router-link> -->
                <el-button @click="login()" class="login_btn" size="mini" round>用户登陆</el-button>
                <!-- </router-link> -->
                &nbsp;
                <router-link to="/register">
                    <el-button class="register_btn" size="mini" round>免费开户</el-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// mapGetters
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            config: 'config'
        }),
        ...mapGetters({
            站点配置: '站点配置'
        })
    },
    methods: {
        ...mapActions({
            statusBar: '更新登陆信息',
            设置是否显示登录框: '设置是否显示登录框'
        }),
        login() {
            // localStorage.login = "登录了";
            // this.statusBar();
            this.设置是否显示登录框(true)
        }
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
    border-bottom: 1px solid #272727;
    .nav_text {
        color: #969696;
        font-size: 12px;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        .nav_rigent {
            .guide:hover {
                color: red;
            }
            span {
                font-size: 14px !important;
                color: #969696;
            }
            .register_btn {
                background: rgb(155, 11, 11);
                color: #fff;
                border: none;
            }
            .login_btn {
                background: rgb(1, 146, 118);
                color: #fff;
                border: none;
            }
            a {
                color: #959696;
            }
            span {
                font-size: 18px;
                margin-right: 7px;
            }
        }
    }
}
</style>
