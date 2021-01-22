<template>
    <div>
        <div class="header-1">
            <el-button type size="small" @click="添加()">添加</el-button>
        </div>
        <el-table :data="list" border size="mini">
            <el-table-column label="id" width="50" prop="id" align="center"></el-table-column>
            <el-table-column label="setId" prop="setId"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="描述" prop="description"></el-table-column>
            <el-table-column label="价格">
                <template slot-scope="s">{{s.row.price | jiage}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="s">
                    <el-button type size="mini" @click="修改(s.row)">修改</el-button>
                    <el-button type="warning" size="mini" @click="删除(s.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="add ? '添加分类' : '修改分类'" :visible.sync="dialogVisible" width="400px">
            <el-form :model="devicetype" ref="devicetype" :rules="rules" size="small" label-width="80px">
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="devicetype.name" placeholder="请输入设备名称"></el-input>
                </el-form-item>
                <el-form-item label="setId" prop="setId">
                    <el-input type="number" v-model.number="devicetype.setId" placeholder="请输入setId"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="devicetype.description" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price2">
                    <!-- <el-input type="number" step="0.01" min="0" v-model.number="devicetype.price" placeholder="请输入描述"></el-input> -->
                    <div class="el-input el-input--small">
                        <input type="number" v-model.number="devicetype.price2" class="el-input__inner" placeholder="最多保留2位小数点" />
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
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
            dialogVisible: false,
            devicetype: { "name": "", "setId": 0, "description": "", "price": 0, price2: 0 },
            rules: {
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' },
                ],
                setId: [
                    { required: true, message: '请输入setId', trigger: 'blur' },
                ],
                price2: [
                    {
                        required: true, trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入价格'));
                            } else if (value < 0.01) {
                                callback(new Error('最低价格不能小于0.01'));
                            } else {
                                callback();
                            }
                        }
                    },
                ]
            },
            add: true
        }
    },
    filters: {
        jiage(num) {
            return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(num / 100)
        }
    },
    
    methods: {
        getList() {
            this.$axios.get(`/api/devicetype/`, '').then(res => {
                if (res.code === 0) {
                    this.list = res.data
                }
            }).catch(err => {
            })
        },
        添加() {
            this.add = true
            this.devicetype = { "name": "", "setId": 0, "description": "", "price": 0, price2: 0 }
            this.dialogVisible = true
        },
        修改(item) {
            this.add = false
            this.devicetype = {
                id: item.id,
                name: item.name,
                setId: item.setId,
                description: item.description,
                price: item.price,
                price2: item.price / 100
            }
            // this.devicetype.price2 = item.price/100
            this.dialogVisible = true
        },
        保存() {
            this.$refs.devicetype.validate((valid) => {
                if (valid) {
                    this.dialogVisible = false
                    if (this.add) {
                        this.添加接口()
                    } else {
                        this.修改接口()
                    }
                } else {
                    return false;
                }
            });
        },
        添加接口() {
            this.$axios.post('/api/devicetype/', this.devicetype).then(res => {
                console.log(res)
                if (res.code === 0) {
                    this.正确('添加成功')
                    this.getList()
                } else {
                    this.错误(res.message)
                }
            }).catch(err => {
                console.error(err);
                this.错误('系统错误，稍后再试')
            })
        },
        修改接口() {
            this.$loading()
            this.$axios.put(`/api/devicetype/${this.devicetype.id}`, this.devicetype).then(res => {
                if (res.code === 0) {
                    this.正确('修改成功')
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
        },
        async 删除(item) {
            await new Promise((resolve, reject) => {
                this.$confirm('确定删除此设备分类?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    resolve()
                }).catch(() => {});
            });
            this.$loading()
            this.$axios.delete(`/api/devicetype/${item.id}`,'').then(res => {
                if(res.code===0){
                    this.正确('删除成功')
                    this.getList()
                }else{
                    this.错误(res.message)
                }
                this.$loading().close()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$loading().close()
            })
        }
    },
    mounted() {
        this.getList()
    },
    watch: {
        'devicetype.price2'(newVal, oldVal) {
            if (newVal) {
                console.log(newVal)
                // let price2 = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(newVal)
                let price2 = parseFloat(Math.floor(newVal * 100)) / 100
                console.log(price2)
                this.devicetype.price2 = parseFloat(price2)
                this.devicetype.price = parseInt(this.devicetype.price2 * 100)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header-1 {
    text-align: right;
    margin: 0px 0px 10px;
}
// .pagination {
//     margin: 10px;
//     text-align: right;
// }

/deep/ .el-dialog__body {
    padding: 10px 20px;
}
</style>

