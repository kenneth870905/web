<template>
    <el-container>
        <el-aside width="200px">
            <div class="header1">
                管理系统
            </div>
            <el-menu :default-active="defaultActive" router class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/index/userList">
                    <i class="el-icon-user"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-menu-item index="/index/productList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/index/orderList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-submenu index="/index">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>基础设置</span>
                    </template>
                    <el-menu-item index="/index/basicInfo">基本信息</el-menu-item>
                    <el-menu-item index="/index/lunbo">首页轮播</el-menu-item>
                </el-submenu>
                <el-menu-item index="/index/operating">
                    <i class="el-icon-menu"></i>
                    <span slot="title">操作记录</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <el-button @click="退出()" type="warning" size="small">退出</el-button>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        defaultActive(){
            let path = this.$route.path
            let urlList = {
                '/index/productList':['/index/productList','/index/product'],
                '/index/userList':['/index/userList'],
                '/index/orderList':['/index/orderList'],
                '/index/basicInfo':['/index/basicInfo'],
                '/index/operating':['/index/operating'],
                '/index/lunbo':['/index/lunbo']
            }
            let i = ''
            for (const key in urlList) {
                if(urlList[key].includes(path)){
                    i = key
                }
            }
            return i
        }
    },
    methods: {
        ...mapMutations({   
            setItem:"setItem"
        }),
        退出(){
            this.setItem(['loginInfo',{}])
            this.$router.push('/login')
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
.el-aside{
    background: #545c64;
    .header1{
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background: #33363a;
    }
}
.el-menu{
    // border-right: solid 1px #7b7b7b;
    border-right: none;
}
.el-header{
    background: #545c64;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.el-footer{
    background: #545c64;
}
</style>