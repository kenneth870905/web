<template>
    <el-container>
        <el-aside :width="isCollapse ? '64px' : '210px'">
            <div class="title-1">
                <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt srcset />
                <div :style="{width:isCollapse ? '0px' : '64px'}">管理系统</div>
            </div>
            <el-menu router :default-active="activeMenu" class="导航" :collapse="isCollapse">
                <template v-for="(item, index) in routes" v-if="!item.hidden">
                    <el-submenu :index="item.path" v-if="item.children && item.children.length>1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.meta.title}}</span>
                        </template>
                        <el-menu-item :index="getFullPath(item,item2) " v-for="(item2,index2) in item.children">{{item2.meta.title}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="item.path" v-else>
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header height="auto">
                <div class="header-1">
                    <i @click="isCollapse=!isCollapse" class="zhankai" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                    <el-breadcrumb class="breadcrumb">
                        <el-breadcrumb-item v-for="item in breadcrumb">{{item.meta.title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="站位"></div>
                    <el-dropdown class="avatar-container" trigger="click">
                        <div class="avatar-wrapper">
                            <img src="static/touxiang.gif" class="user-avatar" />
                            <i class="el-icon-caret-bottom" />
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="logout">
                                <span>修改密码</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">
                                <span>Log Out</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!-- <div class="header-2">
                    <el-tag size="small" closable effect="dark">超小标签</el-tag>
                    <el-tag size="small" closable v-for="(item, index) in 30" :key="index" effect="plain">超小标签</el-tag>
                </div> -->
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: false,
        }
    },
    computed: {
        route() {
            return this.$router
        },
        routes() {
            return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        breadcrumb() {
            return this.$route.matched
        }
    },
    methods: {
        getFullPath(item, item2) {
            return item.path + '/' + item2.path
        },
        // getBreadcrumb() {
        //     // only show routes with meta.title
        //     console.log(this.$route.matched)
        //     let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
        //     this.breadcrumb = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        // },
    },
    mounted() {
        // this.getBreadcrumb()
    },
    watch: {
        // $route(route) {
        //     this.getBreadcrumb()
        // }
    },
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.el-container {
    height: 100%;
}

.title-1 {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fff;
    background: #2b2f3a;
    img {
        width: 32px;
        margin: 0px 10px 0px 0px;
    }
    div {
        white-space: nowrap;
        overflow: hidden;
        transition: all 0.3s;
    }
}
//顶部
.el-header{
    padding: 0px;
}
.header-1 {
    height: 50px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .站位 {
        flex: 1;
    }
    .zhankai {
        font-size: 20px;
        cursor: pointer;
    }
    .breadcrumb {
        margin: 0px 0px 0px 20px;
    }
}
.header-2{
    padding: 5px 20px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background: #fff;
    white-space: nowrap;
    overflow: auto;
    .el-tag{
        margin: 0px 5px 0px 0px;
        cursor: pointer;
    }
}

// 左侧导航栏
/deep/ .el-menu {
    // background: #304156;
    background: #1f2d3d;
    border-right: none;
}
/deep/ .el-menu-item {
    &:focus,
    &:hover {
        background: #263445;
        // background: #001528;
    }
}
/deep/ .el-submenu {
    .el-menu-item {
        &:focus,
        &:hover {
            background: #001528;
        }
    }
    &.is-active {
        .el-submenu__title {
            color: #fff;
        }
    }
}
/deep/ .el-submenu__title {
    color: rgb(191, 203, 217);
    &:hover {
        background: #263445;
    }
    i {
        color: inherit;
    }
}
.导航 {
    height: calc(100% - 50px);
    overflow-x: hidden;
    background: #304156;
    &::-webkit-scrollbar {
        width: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #4d596a;
    }
    .el-menu-item {
        color: rgb(191, 203, 217);
        &.is-active {
            color: rgb(64, 158, 255);
        }
        i {
            color: inherit;
        }
    }
    .el-submenu__title {
        color: rgb(191, 203, 217);
    }
}

.avatar-container{
    .avatar-wrapper{
        cursor: pointer;
    }
    .user-avatar{
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
}
</style>