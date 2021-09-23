<template>
    <div class="header-1">
        <el-button size="small" @click="openUserDialog()" type="warning">添加用户</el-button>
        <el-button size="small" @click="getList()">刷新</el-button>
    </div>

    <el-table :data="list" border size="mini">
        <el-table-column label="id" prop="id" width="50px" align="center"></el-table-column>
        <el-table-column label="登录账号" prop="name"></el-table-column>
        <el-table-column label="备注" prop="description"></el-table-column>
        <el-table-column label="权限" width="100px" align="center">
            <template #default="scope">
                {{scope.row.roles=='ADMIN' ? '管理员' : "普通人员"}}
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
            <template #default="scope">
                <el-button v-if="scope.row.name!='admin'" type size="mini" @click="openUserDialog(scope.row)">修改</el-button>
                <el-button v-if="scope.row.name!='admin'" type="warning" size="mini" @click="deleteUser(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background :total="total" @current-change="changePage" :page-size="query.size" class="fenye" layout="prev, pager, next"></el-pagination>

    <el-dialog :title="type==0 ? '添加账号' : '修改账号'" v-model="userDialog" width="450px" custom-class="usertankuang">
        <el-form>
            <el-form-item label="登录账号">
                <el-input v-model="user.name" placeholder="登录账号"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input v-model="user.password" placeholder="登录密码"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="user.roles" placeholder style="width: 100%;">
                    <el-option value="USER" label="普通用户" key="ADMIN"></el-option>
                    <el-option value="ADMIN" label="管理员" key="ADMIN"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="user.description" placeholder="备注：如张三"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="userDialog = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>

import { reactive, ref, toRef , getCurrentInstance } from 'vue'
export default {
    name: "",
    setup(props) {
        const { proxy } = getCurrentInstance()


        let list = reactive([])
        let total = ref(0)
        let user = reactive({
            name: "",
            password: "",
            roles: "USER",
            description: "",  //备注
            status: 0
        })
        let userDialog = ref(false)
        let type = ref(0)   //0表示添加 1表示修改
        let query = reactive({
            page: 1,
            size: 10
        })

        let getList = () => {
            axios.get('/user', { params: query }).then(res => {
                if (res.code == 0) {
                    list.length = 0
                    list.push(...res.data)
                    total.value = res.total
                }
            })
        }

        let addUser = () => {
            if (!user.name) {
                proxy.$message({ showClose: true, message: '请输账号', type: 'error', offset: 100 });
                return
            }
            if (type.value == 0) {
                if (!user.password) {
                    proxy.$message({ showClose: true, message: '请输入密码', type: 'error', offset: 100 });
                    return
                }
                axios.post('/user', user).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        proxy.$message({ showClose: true, message: '添加成功', type: 'success', offset: 100 });
                        userDialog.value = false
                        getList()
                    } else {
                        proxy.$message({ showClose: true, message: res.message, type: 'error', offset: 100 });
                    }
                }).catch(err => {
                    console.log(err)
                    proxy.$message({ showClose: true, message: '连接异常，请稍后再试', type: 'error', offset: 100 });
                })
            } else {
                axios.put('/user/' + user.id, user).then(res => {
                    console.log(res)
                    if (res.code == 0) {
                        proxy.$message({ showClose: true, message: '修改成功', type: 'success', offset: 100 });
                        userDialog.value = false
                        getList()
                    } else {
                        proxy.$message({ showClose: true, message: res.message, type: 'error', offset: 100 });
                    }
                }).catch(err => {
                    console.log(err)
                    proxy.$message({ showClose: true, message: '连接异常，请稍后再试', type: 'error', offset: 100 });
                })
            }
        }

        let deleteUser =async (item) => {
            let r = await proxy.$confirm('此操作将删除用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => true).catch(() => false);
            if(!r) return
            axios.delete(`/user/${item.id}`).then(res => {
                console.log(res)
                if(res.code==0){
                    proxy.$message({message:'删除成功',type:'success'})
                    getList()
                }else{
                    proxy.$message({message:res.message,type:'error'})
                }
            }).catch(err => {
                console.error(err); 
                proxy.$message({message:'连接异常，请稍后再试'})
            })
        }

        let changePage = (i) => {
            query.page = i
            getList()
        }
        let openUserDialog = (item) => {
            console.log(item)
            if (item) {
                type.value = 1
                Object.assign(user, item)
                user.password = ''
                delete user.createdAt
                delete user.deletedAt
                delete user.updatedAt
            } else {
                type.value = 0
                let u = {
                    name: "",
                    password: "",
                    roles: "USER",
                    description: "",  //备注
                    status: 0,
                }
                Object.assign(user, u)
                delete user.id
            }
            userDialog.value = true
        }

        getList()

        return {
            total,
            list,
            query,
            user,
            type,
            userDialog,
            addUser,
            changePage,
            openUserDialog,
            deleteUser,
            getList
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: flex-end;
    margin: 0px 0px 10px;
}
.usertankuang {
    .el-form-item {
        display: block;
    }
}
</style>