<template>
    <el-container>
        
        <el-aside width="250px">
            <h5>放一个log图</h5>
            <el-menu default-active="2" :default-active="$route.path" router class="el-menu-vertical-demo" background-color="#588af9" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/home">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="/asset/deposit" :default-openeds="['/asset/deposit','/asset/drawMoney','/asset/transform']">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>资产管理</span>
                    </template>
                    <el-menu-item index="/asset/deposit">存款</el-menu-item>
                    <el-menu-item index="/asset/drawMoney">取款</el-menu-item>
                    <el-menu-item index="/asset/transform">取款转换</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header class="header1">
                <el-dropdown>
                    <span class="el-dropdown-link">
                        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            
            
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: "",
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.$route.path)
    },
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
}
.el-aside {
    height: 100%;
    background: #588af9;
    i {
        color: #fff;
    }
    /deep/ .el-submenu__title i {
        color: #fff;
    }
}
.el-menu{
    border-right:none;
}
.header1{
    border-bottom: 1px solid #d8d8d8;
}
</style>