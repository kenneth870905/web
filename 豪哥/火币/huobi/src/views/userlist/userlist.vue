<template>
    <div class="员工管理">
        <div class="header">
            <el-button @click="显示添加框()" size="mini" type="primary">添加人员</el-button>
            <div class="input_1">
                <el-input placeholder="请输入账号" v-model="query.account" class="input-with-select">
                    <el-button @click="查询()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <el-table class="table" border :data="tableData" size="mini" style="width: 100%">
            <el-table-column align="center" prop="account" label="账号" width="180">
            </el-table-column>
            <el-table-column align="center" prop="nickname" label="昵称" width="180">
            </el-table-column>
            <el-table-column align="center" prop="creationTime" label="创建时间">
            </el-table-column>
            <el-table-column align="center" prop="telephone" label="电话">
            </el-table-column>
            <el-table-column align="center" prop="GooglePassword" label="Google密码">
            </el-table-column>
            <el-table-column align="center" label="类型">
                <template slot-scope="scope">
                    {{ scope.row.type == 1 ? '管理员':"普通人员"}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.type == 0" @click="删除(scope.row)" type="danger" size="mini" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="fenye">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="query.pageSize" @current-change="fenye">
            </el-pagination>
        </div>

        <el-dialog title="添加人员" :close-on-click-modal="false" :visible.sync="dialogVisible" width="500px">
            <el-form size="small" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="formLabelAlign.account"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formLabelAlign.nickname"></el-input>
                </el-form-item>
                <el-form-item label="人员类型">
                    <el-select class="选择人员" v-model="formLabelAlign.type" placeholder="请选择活动区域">
                        <el-option label="普通人员" :value="0"></el-option>
                        <el-option label="管理员" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password1">
                    <el-input v-model="formLabelAlign.password1"></el-input>
                </el-form-item>
                <el-form-item label="Google">
                    <el-input :disabled="true" v-model="formLabelAlign.GooglePassword"></el-input>
                </el-form-item>
                <div class="二维码">
                    <img :src="erweima" alt="">
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="tijiao()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            tableData: [],
            query: {
                page: 1,
                pageSize: 20,
                account: ""
            },
            total: 0,
            dialogVisible: false,
            formLabelAlign: {
                account: "",
                nickname: "",
                type: 0,
                password: "",
                password1: "",
                GooglePassword:""
            },
            rules: {
                account: [
                    // {required:true, validator: validatePass, trigger: 'blur' }
                    { required: true, trigger: "blur", message: "请输入账号" }
                ],
                password: [
                    { required: true, trigger: "blur", message: "请输入密码" }
                ],
                password1: [
                    {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error("请确认密码"));
                            }
                            if (value != this.formLabelAlign.password) {
                                callback(new Error("两次密码不一致"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        erweima(){
            if(this.formLabelAlign.account && this.formLabelAlign.GooglePassword){
                return `https://api.qrserver.com/v1/create-qr-code/?data=otpauth%3A%2F%2Ftotp%2F${this.formLabelAlign.account}%3Fsecret%3D${this.formLabelAlign.GooglePassword}&size=200x200&ecc=M`
            }else{
                return ''
            }
        }
    },
    methods: {
        显示添加框(){
            this.dialogVisible=true;
            this.$Loading(true);
            this.$axios.post('/huobi/public/index.php/google/getSecret').then(x=>{
                this.formLabelAlign.GooglePassword=x.data.secret
                this.$Loading(false)
            }).catch(err=>{
                this.$Loading(false)
            })
        },
        删除(item) {
            console.log(item);
            this.$confirm("此操作将删除改用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$Loading(true)
                this.$axios.post('/huobi/public/index.php/user/deleteUser', { id: item.id }).then(x => {
                    console.log(x)
                    if (x.data.code == 1) {
                        this.$message({ showClose: true, message: "删除成功！", type: "success" });
                    } else {
                        this.$message({ showClose: true, message: x.data.message, type: "error" });
                    }
                    this.g1()
                }).catch(err => {
                    this.$Loading(false)
                    this.$message({ showClose: true, message: '系统错误稍后再试', type: "error" });
                })
            }).catch(() => { });
        },
        tijiao() {
            this.$refs["formLabelAlign"].validate(valid => {
                if (valid) {
                    this.zhuce();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        zhuce() {
            this.$Loading(true);
            this.$axios.post("/huobi/public/index.php/user/zhuce2", this.formLabelAlign).then(x => {
                console.log(x);
                if (x.data.code == 1) {
                    this.$message({
                        showClose: true,
                        message: "恭喜你，注册成功！",
                        type: "success"
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: x.data.message,
                        type: "error"
                    });
                }
                this.g1();
                this.dialogVisible = false;
                this.$Loading(false);
            }).catch(error => {
                this.dialogVisible = false;
                this.$Loading(false);
                this.$message({
                    showClose: true,
                    message: "系统错误，稍后再试！",
                    type: "error"
                });
            });
        },
        fenye(index) {
            console.log(index);
            this.query.page = index;
            this.g1();
        },
        查询(){
            this.query.page = 1;
            this.g1();
        },
        g1() {
            this.$Loading(true);
            this.$axios
                .post("/huobi/public/index.php/user/getList", this.query)
                .then(x => {
                    console.log(x);
                    this.tableData = x.data.data;
                    this.total = x.data.total;
                    this.$Loading(false);
                })
                .catch(err => {
                    this.$Loading(false);
                    console.log(err);
                });
        },
        tianjia() { }
    },
    mounted() {
        this.g1();
    }
};
</script>

<style lang="scss" scoped>
.员工管理 {
    padding: 20px;
}
.table {
    min-height: 500px;
}
.fenye {
    text-align: center;
    margin: 20px 0px 0px;
}
.header {
    margin: 0px 0px 20px;
    display: flex;
    justify-content: space-between;
    .input_1{
        width: 300px;
    }
}
.选择人员 {
    width: 100%;
}
.二维码{
    width: 60px;
    margin: 0px auto;
    img{
        width: 100%;
    }
}
</style>