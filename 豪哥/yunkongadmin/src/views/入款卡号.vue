<template>
    <div>
        <div class="header-1">
            <el-button type size="small" @click="showModel=true">添加</el-button>
        </div>
        <el-table :data="list" size="mini" border>
            <el-table-column label="id" width="50" align="center" prop="id"></el-table-column>
            <el-table-column label="账号" prop="cardNo"></el-table-column>
            <el-table-column label="所属" prop="bankName"></el-table-column>
            <el-table-column label="用户姓名" prop="ownerName"></el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="s">
                    <el-button type="warning" @click="删除(s.row)" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加收款账户" :visible.sync="showModel" width="400px">
            <el-form :model="form" ref="form" :rules="rules" size="small" label-width="80px">
                <el-form-item label="所属">
                    <el-input v-model="form.bankName" placeholder="如：中国银行，支付宝，微信"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                    <el-input v-model="form.ownerName" placeholder="如：张某某"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="cardNo">
                    <el-input v-model="form.cardNo" placeholder="请输入账号"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="showModel = false">取 消</el-button>
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
            showModel: false,
            form: {
                cardNo: "",
                bankName: "",
                ownerName: ""
            },
            rules: {
                cardNo: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        保存() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.showModel = false
                    this.$loading()
                    this.$axios.post('/api/card', this.form).then(res => {
                        console.log(res)
                        if (res.code === 0) {
                            this.正确('添加成功')
                            this.getList()
                        } else {
                            this.错误(res.message)
                        }
                        this.$loading().close()
                    }).catch(err => {
                        console.error(err);
                        this.错误('系统错误，稍后再试')
                        this.$loading().close()
                    })
                } else {
                    return false;
                }
            });
        },
        getList() {
            this.$axios.get('/api/card', { page: 1, size: 100 }).then(res => {
                console.log(res)
                if (res.code === 0)
                    this.list = res.data
            })
                .catch(err => {
                })
        },
        删除(item) {
            this.$confirm('确定删除入款账户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete(`/api/card/${item.id}`,'').then(res => {
                    if(res.code===0){
                        this.正确('删除成功')
                        this.getList()
                    }else{
                        this.错误(res.message)
                    }
                }).catch(err => {
                    this.错误('系统错误，稍后再试')
                })
            }).catch(() => {
            });
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    text-align: right;
    margin: 0px 0px 10px;
}
.pagination {
    margin: 10px;
    text-align: right;
}

/deep/ .el-dialog__body {
    padding: 10px 20px;
}
</style>