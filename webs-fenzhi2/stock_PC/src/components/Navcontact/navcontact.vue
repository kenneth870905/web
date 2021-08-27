<template>
    <div class="navcontact">
        <el-menu class="about_detail" background-color="#BB9767" unique-opened active-text-color="#ff670" :default-active="this.$route.path" router collapse-transition>
            <!-- 导航一 -->
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-user"></i>&nbsp;&nbsp;关于我们</template>
                <el-menu-item index="/about">公司简介</el-menu-item>
                <el-menu-item index="/about/contact">联系我们</el-menu-item>
                <!-- <el-menu-item index="/about/contact">注册协议</el-menu-item> -->
            </el-submenu>
            <!-- 导航er -->
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-thumb"></i>&nbsp;&nbsp;新手指引</template>
                <el-menu-item index="/about/fundSecurity">资金安全</el-menu-item>
                <el-menu-item index="/about/stockOperation">操盘细则</el-menu-item>
            </el-submenu>
            <!-- 导航三-->
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-chat-dot-round"></i>&nbsp;&nbsp;帮助中心</template>
                <el-menu-item index="/about/HelpTitle">帮助中心</el-menu-item>
            </el-submenu>
            <!-- 导航四-->
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-loading"></i>&nbsp;&nbsp;资讯中心</template>
                <el-menu-item index="/about/messageDetails">资讯中心</el-menu-item>
            </el-submenu>
            <!-- 导航五 -->
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-view"></i>&nbsp;&nbsp;新闻报道</template>
                <el-menu-item index="/about/news">新闻报道</el-menu-item>
            </el-submenu>
            <!-- 导航六 -->
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-download"></i>&nbsp;&nbsp;软件下载</template>
                <el-menu-item index="/software">软件下载</el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>
<script>
export default {};
</script>

<style lang="less">
// .navcontact{
//   /deep/ .is-active{
//     color: red !important;
//   }
// }
.sidebar-container {
    transition: none !important;
}

.is-active {
    color: #ff6700 !important;
}

.el-menu {
    margin-bottom: 30px;
    border: none;
    i {
        color: #fff;
        font-size: 30px !important;
        line-height: 20px;
        font-weight: 1000;
    }
    .el-submenu {
        // margin-bottom:5px;
        background-color: #fff;
        .el-submenu__title {
            color: #fff;
            font-size: 22px;
            line-height: 60px;
            height: 60px;
        }
    }
    li {
        .el-menu-item {
            color: #fff;
            font-size: 19px;
        }
    }
}
</style>


