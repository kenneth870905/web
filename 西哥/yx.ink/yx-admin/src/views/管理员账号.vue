<template>
    <div class="app-container">
        <div class="header-1">
            <el-button type size="small" @click="添加账号()">添加账号</el-button>
        </div>

        <el-table :data="list" size="mini" border>
            <el-table-column label="账号" prop="userName"></el-table-column>
            <el-table-column label="昵称" prop="nickName"></el-table-column>
            <el-table-column label="创建时间" prop="creationTime"></el-table-column>
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="s">
                    <div v-if="s.row.userName!='admin'">
                        <el-button type size="mini" @click="修改(s.row)">修改</el-button>
                        <el-button type="warning" size="mini" @click="删除(s.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="分页" :total="total" :page-size="query.size" :current-page="query.page" @current-change="fenye" background layout="prev, pager, next"></el-pagination>

        <el-dialog title="管理员信息" :visible.sync="显示详情" width="30%">
            <el-form size="small">
                <el-form-item label="账号">
                    <el-input v-model="admin.userName" :readonly="admin.id" placeholder></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="admin.nickName" placeholder></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password v-model="admin.password" :placeholder="admin.id ? '不修改可不填写' : '' "></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input show-password v-model="admin.password2" placeholder></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="显示详情 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="保存()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            query: {
                page: 1,
                size: 10,
                type: 1
            },
            total: 0,
            admin: {
                userName: "",
                nickName: "",
                password: "",
                password2: "",
                type: 1
            },
            显示详情: false
        }
    },
    methods: {
        删除(item) {
            this.$confirm(`此操作将删除 ${item.userName} 账号 , 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/User/del',item).then(res => {
                    console.log(res)
                    if(res.code==1){
                        this.正确('删除成功')
                        this.查询账号()
                    }else{
                        this.错误('删除失败')
                    }
                })
                .catch(err => {
                    this.错误('系统错误，稍后再试')
                })
            }).catch(() => {
            });
        },
        添加账号() {
            this.admin = {
                userName: "",
                nickName: "",
                password: "",
                password2: "",
                type: 1
            }
            this.显示详情 = true
        },
        修改(item) {
            this.admin = Object.assign({}, item)
            this.admin.password = ''
            this.admin.password2 = ''
            this.显示详情 = true
        },
        保存() {
            var kong = /^\s*$/g;
            if (kong.test(this.admin.userName)) {
                this.错误('请输入账号')
            } else if (!this.admin.id && kong.test(this.admin.password)) {
                this.错误('请输入密码')
            } else if (this.admin.password != this.admin.password2) {
                this.错误('两次密码不一致')
            } else {
                if (!this.admin.id) {
                    this.$Loadading(1)
                    this.$axios.post('/User/register', this.admin).then(res => {
                        if (res.code == 1) {
                            this.正确("添加成功")
                            this.显示详情 = false
                            this.查询账号()
                        } else {
                            this.错误(res.message)
                        }
                        this.$Loadading()
                    })
                        .catch(err => {
                            this.$Loadading()
                            this.错误('系统错误，稍后再试')
                        })
                } else {
                    this.$Loadading(1)
                    this.$axios.post('/User/modify', this.admin).then(res => {
                        if (res.code == 1) {
                            this.正确('修改成功')
                            this.显示详情 = false
                            this.查询账号()
                        } else {
                            this.错误(res.message)
                        }
                        this.$Loadading()
                    })
                        .catch(err => {
                            this.$Loadading()
                            this.错误('系统错误，稍后再试')
                        })
                }
            }
        },
        fenye(i) {
            this.query.page = i
        },
        查询账号() {
            this.$Loadading(1)
            this.$axios.post('/User/userList', this.query)
                .then(res => {
                    this.$Loadading()
                    this.list = res.data
                    this.total = res.total
                })
                .catch(err => {
                    this.$Loadading()
                })
        }
    },
    mounted() {
        this.查询账号()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    display: flex;
    justify-content: space-between;
    margin: 0px 0px 10px;
}
</style>