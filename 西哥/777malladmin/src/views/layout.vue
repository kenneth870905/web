<template>
    <el-container>
        <el-aside :width="isCollapse ? '64px' : '210px'">
            <div class="title-1">
                <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt srcset />
                <div :style="{width:isCollapse ? '0px' : '64px'}">管理系统</div>
            </div>
            <el-menu router :default-active="activeMenu" class="导航" :collapse="isCollapse">
                <el-menu-item>
                    <span slot="title">已开发</span>
                </el-menu-item>

                <template v-for="(item, index) in navList" v-if="!item.hidden">
                    <el-submenu index="/" v-if="item.children && item.children.length>1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.meta.title}}</span>
                        </template>
                        <el-menu-item :index="item2.path" v-for="(item2,index2) in item.children">{{item2.meta.title}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="item.path" v-else>
                        <i class="el-icon-s-grid"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </el-menu-item>
                </template>

                <el-menu-item>
                    <span slot="title">开发中</span>
                </el-menu-item>
                <template v-for="(item, index) in navList2" v-if="!item.hidden">
                    <el-submenu :index="'/a'+index" v-if="item.children && item.children.length>1">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{item.meta.title}}</span>
                        </template>
                        <el-menu-item :index="item2.path" v-for="(item2,index2) in item.children">{{item2.meta.title}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="item.path" v-else>
                        <i class="el-icon-s-grid"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header height="auto">
                <div class="header-1">
                    <i @click="isCollapse=!isCollapse" class="zhankai" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                    <!-- <el-breadcrumb class="breadcrumb">
                        <el-breadcrumb-item v-for="item in breadcrumb">{{item.meta.title}}</el-breadcrumb-item>
                    </el-breadcrumb>-->
                    <div class="text">在线会员：0/0</div>
                    <div class="text">首存：0</div>
                    <div class="text">注册：0</div>
                    <div class="text">服务器：0.0.0.0</div>
                    <el-button type="text" class="text">存款审核：0</el-button>
                    <el-button type="text" class>取款审核：0</el-button>
                    <div class="站位"></div>

                    <el-switch style="margin-right:40px" v-model="BjTime.show" active-text="显示北京时间"></el-switch>

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
                                <span>退出</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="header-2">
                    <!-- <el-tag size="small" closable effect="dark">超小标签</el-tag> -->
                    <el-tag size="small" @close="deleteTag(index)" @click="$router.push(item.fullPath)" :closable="$route.path!=item.path" :effect="$route.path==item.path ? 'dark' : 'plain'" v-for="(item, index) in tag" :key="index">{{item.meta.title}}</el-tag>
                </div>
            </el-header>

            <el-main>
                <!-- <transition name="fade"> -->
                    <tk v-if="showTk" :type="tkType" :userId="userId"/>
                <!-- </transition> -->

                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import tk from '@/components/弹框.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    components: {
        tk
    },
    provide() {
        return {
            showTk: (type,userId) => {
                console.log('showTk')
                this.userId = userId
                this.tkType=type
                this.showTk=true
            },
            closeTk: () => {
                this.showTk=false
                console.log('关闭弹框')
            }
        }
    },
    data() {
        return {
            isCollapse: false,
            showTk:false,
            tkType:"",
            userId:''
        }
    },
    computed: {
        ...mapState({
            navList: "navList",
            navList2: "navList2",
            BjTime: "BjTime",
            tag: "tag"
        }),
        // route() {
        //     return this.$router
        // },
        // routes() {
        //     return this.$router.options.routes
        // },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        // breadcrumb() {
        //     return this.$route.matched
        // }
    },
    methods: {
        ...mapMutations({
            deleteTag: "deleteTag",
            storeInit: "init"
        }),
        getFullPath(item, item2) {
            return item.path + '/' + item2.path
        },
        logout() {
            this.storeInit()
            this.$router.push('/login')
            location.reload()
        },
    },
    mounted() {
        // console.log(this.$route)
    },
    watch: {

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
.el-header {
    padding: 0px;
    z-index: 5;
}
.header-1 {
    height: 50px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #eee;
    .站位 {
        flex: 1;
    }
    .zhankai {
        font-size: 20px;
        cursor: pointer;
    }
    // .breadcrumb {
    //     margin: 0px 0px 0px 20px;
    // }
    .text {
        margin: 0px;
        border-right: 1px solid #eee;
        padding: 0px 10px;
        font-size: 14px;
    }
}
.header-2 {
    padding: 5px 20px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background: #fff;
    .el-tag {
        margin: 3px 5px 3px 0px;
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

.avatar-container {
    .avatar-wrapper {
        cursor: pointer;
    }
    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }
}
</style>