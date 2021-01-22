<template>
    <el-container>
        <el-aside width="200px">
            <div class="title-1">手机云控</div>
            <el-menu :default-active="$route.meta.menuPath" router class="el-menu-vertical-demo" background-color="#304156" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="/">
                    <i class="el-icon-s-check"></i>
                    <span slot="title">充值审核</span>
                </el-menu-item>
                <el-menu-item index="/userList">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="/deviceType">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">设备类型</span>
                </el-menu-item>
                <el-menu-item index="/DepositCard">
                    <i class="el-icon-s-finance"></i>
                    <span slot="title">入款账户管理</span>
                </el-menu-item>

                <!-- <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>备用</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
            </el-menu>
            <div class="tuichu" @click="退出()">
                <i class="el-icon-switch-button"></i>
                安全退出
            </div>
        </el-aside>

        <el-container>
            <el-header height="50px">
                <div class="l">
                    <el-breadcrumb>
                        <el-breadcrumb-item v-for="item in breadcrumb" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="r">
                    <el-dropdown @command="caozuo">
                        <div>
                            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar" />
                            <i class="el-icon-caret-bottom"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">修改密码</el-dropdown-item>
                            <el-dropdown-item command="2">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>

        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
            <el-form :model="密码" label-width="80px" :rules="ruleValidate" ref="formValidate">
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="密码.password" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password"  v-model="密码.password2" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="确定修改密码()">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
// import left from "@/components/左侧.vue"
// import header2 from "@/components/header.vue"
// import azyy from '@/components/安装应用.vue'
// import cz from '@/components/充值弹框.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
    name: 'Home',
    provide() {
        return {
            获取设备列表: () => {
                if (this.$route.path == '/device') {
                    this.$refs.routerView.获取设备()
                }
            },
            安装应用: (setName) => {
                this.$refs.azyy.init(setName)
            },
            显示充值: (type) => {
                console.log(type)
                this.$refs.cz.充值弹框 = type
            }
        }
    },
    computed: {
        breadcrumb() {
            return this.$route.meta.breadcrumb
        }
    },
    data() {
        return {
            dialogVisible:false,
            密码:{
                password:"",
                password2:""
            },
            ruleValidate:{
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                password2:[
                    { required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if(!value){
                                return callback(new Error('请确认密码'));
                            }else if(value!=this.密码.password){
                                return callback(new Error('两次密码不一致'));
                            }else{
                                callback();
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        ...mapMutations({
            setItem:'setItem'
        }),
        确定修改密码(){
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/auth/password',{"password": this.密码.password}).then(res => {
                        if(res.code===0){
                            this.正确('修改成功')
                            this.修改密码 = false
                        }else{
                            this.错误(res.message)
                        }
                    }).catch(err => {
                        this.错误('系统错误，稍后再试')
                    })
                } 
            })
        },
        caozuo(e){
            if(e==1){
                this.dialogVisible=true
            }else{
                this.退出()
            }
        },
        退出(){
            this.setItem(['userInfo',{}])
            this.$router.push('/login')
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;
}
.el-aside {
    background: #304156;
    display: flex;
    flex-direction: column;
    .title-1 {
        line-height: 50px;
        text-align: center;
        color: #fff;
        border-bottom: 1px solid #536984;
        flex-shrink: 0;
    }
    .el-menu {
        flex: 1;
        border: none;
    }
    .tuichu {
        flex-shrink: 0;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.3);
        i {
            margin: 0px 5px 0px 0px;
        }
    }
}

.el-header {
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;
    .l {
        flex: 1;
    }
    .user-avatar {
        height: 40px;
        border-radius: 5px;
    }
}
</style>
