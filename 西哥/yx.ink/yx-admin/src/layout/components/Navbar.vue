<template>
    <div class="navbar">
        <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <img src="static/image/touxiang.gif" class="user-avatar" />
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <el-dropdown-item @click.native="点击修改()">
                        <span style="display:block;">修改密码</span>
                    </el-dropdown-item>
                    <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a> -->
                    <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                        <el-dropdown-item>Docs</el-dropdown-item>
                    </a> -->
                    <el-dropdown-item @click.native="logout">
                        <span style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="修改登录密码" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false">
            <el-form>
                <el-form-item label="新密码">
                    <el-input v-model="newUser.password" show-password placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="newUser.password2" show-password placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="保存()" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
    components: {
        Breadcrumb,
        Hamburger
    },
    data() {
        return {
            newUser:{},
            dialogVisible:false
        }
    },
    computed: {
        ...mapState({
            user:x=>x.user.user
        }),
        ...mapGetters([
            'sidebar',
            'avatar'
        ])
    },
    methods: {
        ...mapMutations({
            setToken:"user/setToken"
        }),
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            this.setToken('')
            // await this.$store.dispatch('user/logout')
            this.$router.push(`/login`)
        },
        点击修改(){
            this.dialogVisible=true
        },
        保存(){
            if(!this.newUser.password){
                this.错误('请输入新密码')
            }else if(this.newUser.password!=this.newUser.password2){
                this.错误('两次密码不一致')
            }else{
                this.$Loadading(1)
                this.dialogVisible=false
                this.$axios.post('/User/modify',this.newUser)
                .then(res => {
                    this.$Loadading()
                    if(res.code==1){
                        this.正确('修改成功')
                    }else{
                        this.错误('修改失败')
                    }
                })
                .catch(err => {
                    this.$Loadading()
                    this.错误('系统错误，稍后再试')
                })
            }
        }
    },
    mounted() {
        this.newUser=JSON.parse(JSON.stringify(this.user)) 
    },
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
