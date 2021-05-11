<template>
    <el-container>
        <el-aside width="200px">
            <div class="header1">{{loginInfo.name}}</div>
            <el-menu :default-active="defaultActive" router class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/index/orderList" v-if="roles.Admin || roles.OrderRead || roles.OrderWrite">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="/index/userList" v-if="roles.Admin || roles.UserRead || roles.UserWrite">
                    <i class="el-icon-user"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-submenu index="/商品" v-if="roles.Admin || roles.ProductRead || roles.ProductWrite">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="/index/productCategory">商品类型</el-menu-item>
                    <el-menu-item index="/index/productList">普通商品</el-menu-item>
                    <!-- <el-menu-item index="/index/miaosha">秒杀商品</el-menu-item> -->
                </el-submenu>

                 <el-submenu index="/文章">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item index="/index/articleCategory">文章类型</el-menu-item>
                    <el-menu-item index="/index/article">文章</el-menu-item>
                </el-submenu>
                <el-menu-item index="/index/school">
                    <i class="el-icon-menu"></i>
                    <span slot="title">学校设置</span>
                </el-menu-item>
                <el-menu-item index="/index/classList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">班级设置</span>
                </el-menu-item>

                <!-- <el-menu-item index="/index/article">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章管理</span>
                </el-menu-item> -->

                <el-submenu index="/index">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>基础设置</span>
                    </template>
                    <el-menu-item index="/index/basicInfo">基本信息</el-menu-item>
                    <el-menu-item index="/index/lunbo">首页轮播</el-menu-item>
                </el-submenu>

                <el-menu-item index="/index/fankui">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户反馈</span>
                </el-menu-item>
                <el-menu-item index="/index/adminList">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理员设置</span>
                </el-menu-item>
                <el-menu-item index="/index/operating">
                    <i class="el-icon-menu"></i>
                    <span slot="title">操作记录</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="Header">
                <el-button @click="密码弹框=true" type="warning" size="small">修改登录密码</el-button>
                <el-button @click="退出()" type="warning" size="small">退出</el-button>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>

        <el-dialog title="修改登录密码" class="密码弹框" :visible.sync="密码弹框" :close-on-click-modal="false" width="350px">
            <div>
                <el-form :rules="rulesUser" :model="user" ref="user">
                    <el-form-item label="新密码" prop="password1">
                        <el-input type="password" v-model="user.password1" show-password clearable></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" @keyup.enter.native="确定()" v-model="user.password2" show-password clearable></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-1" type="primary" @click="确定()">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
    name: "",
    data() {
        return {
            密码弹框: false,
            user: {
                password1:"",
                password2:""
            },
            rulesUser:{
                password1: [
                    { 
                        required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入密码'));
                            } else if (value.match(/^\s*$/)) {
                                callback(new Error('密码不能全为空格'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                password2:{
                    required: true, trigger: 'blur' ,
                    validator:(rule, value, callback) => {
                        if (!value) {
                            callback(new Error('请确认密码'));
                        } else if (value!=this.user.password1) {
                            callback(new Error('两次密码不一致'));
                        } else {
                            callback();
                        }
                    }
                }
            }
        }
    },
    computed: {
        defaultActive() {
            let path = this.$route.path
            let urlList = {
                '/index/productList': ['/index/productList', '/index/product'],
                '/index/userList': ['/index/userList'],
                '/index/orderList': ['/index/orderList','/index/orderSp'],
                '/index/basicInfo': ['/index/basicInfo'],
                '/index/operating': ['/index/operating'],
                '/index/lunbo': ['/index/lunbo'],
                '/index/productCategory': ['/index/productCategory'],
                '/index/miaosha': ['/index/miaosha', '/index/miaoshaXQ'],
                '/index/fankui': ['/index/fankui'],
                '/index/adminList':['/index/adminList','/index/admin'],
                '/index/article':['/index/article'],
                '/index/classList':['/index/classList'],
                '/index/school':['/index/school']
            }
            let i = ''
            for (const key in urlList) {
                if (urlList[key].includes(path)) {
                    i = key
                }
            }
            return i
        },
        ...mapState({
            loginInfo: 'loginInfo'
        }),
        ...mapGetters({
            roles:'roles' 
        })
    },
    methods: {
        ...mapMutations({
            setItem: "setItem",
            setRoles:"setRoles"
        }),
        退出() {
            this.setItem(['loginInfo', {}])
            this.$router.push('/login')
        },
        确定(){
            this.$refs.user.validate((valid) => {
                if(valid){
                    this.修改密码()
                }else{
                    return false
                }
            })
        },
        修改密码(){
            this.$axios.put(`/api/auth/password`,{password:this.user.password1}).then(res => {
                if (res.code === 0) {
                    this.正确('修改成功')
                    this.密码弹框 = false
                }else{
                    this.错误(x.message)
                }
            }).catch(err => {
                this.错误('修改失败，请联系管理员')
            })
        },
        获取个人信息(){
            this.$axios.get(`/api/admin/${this.loginInfo.id}`).then(res=>{
                if(res.code===0 && res.data){
                    this.setRoles(res.data.roles)
                }
            }).catch(err=>{
            })
        }
    },
    mounted() {
        // console.log(this.$route.path)
        this.获取个人信息()
    },
}
</script>


<style lang="scss" scoped>
.el-container {
    height: 100%;
}
.el-aside {
    background: #545c64;
    .header1 {
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background: #33363a;
    }
}
.el-menu {
    // border-right: solid 1px #7b7b7b;
    border-right: none;
}
.Header {
    background: #545c64;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.el-footer {
    background: #545c64;
}


.密码弹框{
    /deep/ .el-dialog__body{
        padding: 0px 20px;
    }
    .btn-1{
        width: 100%;
    }
}
</style>