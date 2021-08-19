<template>
    <div class="header-1">
        <el-button size="small">添加用户</el-button>
    </div>

    <el-table :data="list" border>
        <el-table-column label="id" width="50px" align="center"></el-table-column>
        <el-table-column label="登录账号"></el-table-column>
        <el-table-column label="备注"></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button type="" size="mini">修改</el-button>
                <el-button type="warning" size="mini">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="账号详情" v-model="userDialog" width="450px" custom-class="usertankuang">
        <el-form>
            <el-form-item label="登录账号" >
                <el-input v-model="user.userName" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input v-model="user.password" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="user.remarks" placeholder="备注：如张三"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="userDialog = false">取 消</el-button>
                <el-button type="primary" @click="userDialog = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    name:"",
    setup(props) {
        
        let list = reactive([1,2,3,4,5])
        let user = reactive({
            userName:"",
            password:"",
            remark:""
        })
        let userDialog = ref(false)

        return {
            list,
            user,
            userDialog
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1{
    display: flex;
    justify-content: flex-end;
    margin: 0px 0px 10px;
}
.usertankuang{
    .el-form-item{
        display: block;
    }
}
</style>