<template>
    <el-container>
        <el-aside width="200px">
            <div class="title-1">九皇仙府</div>
            <el-menu default-active="2" :router="true" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff">
                <el-menu-item index="/userList">
                    <i class="el-icon-setting"></i>
                    <template #title>用户管理</template>
                </el-menu-item>
                <el-menu-item index="/yuanquList">
                    <i class="el-icon-setting"></i>
                    <template #title>园区管理</template>
                </el-menu-item>
                <el-menu-item index="/danyuanList">
                    <i class="el-icon-setting"></i>
                    <template #title>单元管理</template>
                </el-menu-item>
                <el-menu-item index="/dingdanList">
                    <i class="el-icon-setting"></i>
                    <template #title>订单管理</template>
                </el-menu-item>
            </el-menu>
            <div class="goOut">退出账号</div>
        </el-aside>
        <el-container>
            <el-header>
                <div class="shezhi">
                    <el-dropdown @command="dropdownClick">
                        <span class="el-dropdown-link title">
                            设置
                            <i class="el-icon-s-tools"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="1">修改登录密码</el-dropdown-item>
                                <el-dropdown-item command="2">退出账号</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

    <el-dialog title="修改密码" v-model="passwoordDialog" width="30%" >
        <el-form label-width="80px">
            <el-form-item label="新密码" >
                <el-input v-model="user.password" placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="user.password1" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="passwoordDialog = false">取 消</el-button>
                <el-button type="primary" @click="passwoordDialog = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    setup(props) {

        let dropdownClick = (e) => {
            console.log(e)
            if(e==1){
                passwoordDialog.value=true
            }
        }
        let passwoordDialog = ref(false)
        let user=reactive({
            password:"",
            password2:""
        })

        return {
            dropdownClick,
            passwoordDialog,
            user
        }
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
}
.el-aside {
    background: #545c64;
    display: flex;
    flex-direction: column;
}
.el-menu {
    border: none;
    flex-grow: 1;
}
.title-1 {
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #fff;
    border-bottom: 1px solid rgba($color: #fff, $alpha: 0.3);
}
.goOut {
    line-height: 44px;
    color: #fff;
    border-top: 1px solid #fff;
    text-align: center;
    cursor: pointer;
    &:hover {
        color: red;
    }
}
.shezhi {
    float: right;
    .title {
        color: #fff;
        line-height: 60px;
        cursor: pointer;
    }
}

.el-header {
    background: #545c64;
}
</style>
