<template>
    <div class="导航栏">
        <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar> -->
        <el-menu :router="true" :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item route="/dashboard" index="/dashboard">
                <i class="el-icon-menu"></i>
                <span slot="title">上下班打卡</span>
            </el-menu-item>
            <el-menu-item index="/personal">
                <i class="el-icon-menu"></i>
                <span slot="title">个人资料</span>
            </el-menu-item>
            
            <el-menu-item @click="跳转助手()" index="">
                <i class="el-icon-menu"></i>
                <span slot="title">助手</span>
            </el-menu-item>
            <el-menu-item @click="跳转助手2()" v-if="zhushou2" index="">
                <i class="el-icon-menu"></i>
                <span slot="title">助手2</span>
            </el-menu-item>
            <el-menu-item @click="跳转助手3()" v-if="zhushou3" index="">
                <i class="el-icon-menu"></i>
                <span slot="title">助手3</span>
            </el-menu-item>
            <el-menu-item @click="跳转助手4()" v-if="zhushou4" index="">
                <i class="el-icon-menu"></i>
                <span slot="title">助手4</span>
            </el-menu-item>

            <el-menu-item index="/duizhang">
                <i class="el-icon-menu"></i>
                <span slot="title">对账系统</span>
            </el-menu-item>
            <el-menu-item index="/userlist" v-if="user.type==1">
                <i class="el-icon-menu"></i>
                <span slot="title">人员管理</span>
            </el-menu-item>
            <el-menu-item index="/kaoqinjilv" v-if="user.type==1">
                <i class="el-icon-menu"></i>
                <span slot="title">考勤记录</span>
            </el-menu-item>
            
            <el-menu-item index="/zhangmuhuizong" v-if="user.type==1">
                <i class="el-icon-menu"></i>
                <span slot="title">账目汇总</span>
            </el-menu-item>
            <el-menu-item index="/VipList">
                <i class="el-icon-menu"></i>
                <span slot="title">vip管理</span>
            </el-menu-item>
            
            <!-- <el-submenu v-if="user.type==1" index='1'>
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>账目汇总</span>
                </template>
                <el-menu-item index="/zhangmu/bibi">b币</el-menu-item>
                <el-menu-item index="/zhangmu/fabi">法币</el-menu-item>
            </el-submenu> -->
        </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            defaultActive:"",
            zhushou2:zhushou2,
            zhushou3:zhushou3,
            zhushou4:zhushou4
        };
    },
    components: {
    },
    computed: {
        ...mapState({
            user:x=>x.user2.user,
            token:x=>x.user2.token
        }),
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        跳转助手(){
            window.open(zhushou+'?token='+this.token,'huobi')
        },
        跳转助手2(){
            window.open(zhushou2+'?token='+this.token,'huobi1')
        },
        跳转助手3(){
            window.open(zhushou3+'?token='+this.token,'huobi2')
        },
        跳转助手4(){
            window.open(zhushou4+'?token='+this.token,'huobi3')
        }
    },
    mounted() { 
        this.defaultActive = this.$route.path
    }
};
</script>

<style lang="scss" scoped>
.导航栏 .el-menu{
    overflow: auto;
}
</style>