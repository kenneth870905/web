<template>
    <div>
        <el-page-header @back="goBack" :content="id ? '管理员详情' : '添加管理员' "></el-page-header>

        <el-form :model="admin" class="form" :rules="rules" ref="ruleForm" label-width="100px">
            <div class="title-1">
                管理员信息
            </div>
            <el-form-item label="管理权限" prop="roles">
                <el-checkbox-group v-model="admin.roles">
                    <el-checkbox label="Admin">拥有所有权限</el-checkbox>
                    <el-checkbox label="ProductRead">商品读取</el-checkbox>
                    <el-checkbox label="ProductWrite">商品添加/更改</el-checkbox>
                    <el-checkbox label="UserRead">用户读取</el-checkbox>
                    <el-checkbox label="UserWrite">用户添加/更改</el-checkbox>
                    <el-checkbox label="OrderRead">订单读取</el-checkbox>
                    <el-checkbox label="OrderWrite">订单修改</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="登录账号" prop="name">
                <el-input @keyup.enter.native="提交()" :disabled="admin.id ? true : false" v-model="admin.name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input @keyup.enter.native="提交()" type="password" auto-complete="new-password" v-model="admin.password" placeholder="" show-password clearable></el-input>
                <input type="password"  style="display: none">
            </el-form-item>
            <el-form-item label="确认密码" prop="password1">
                <el-input @keyup.enter.native="提交()" type="password" v-model="admin.password1" placeholder="" show-password clearable></el-input>
            </el-form-item>
            <div>
                <el-button class="bnt-1" @click="提交()" type="warning">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            id: "",
            admin: {
                id:"",
                name:"",
                password:"",
                roles: []
            },
            rules:{
                roles:[
                    { 
                        required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if (value.length==0) {
                                callback(new Error('请选择权限'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                name:[
                    { 
                        required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if (value.match(/^\s*$/)) {
                                callback(new Error('请输入账号'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                password: [
                    { 
                        required: true, trigger: 'blur' ,
                        validator:(rule, value, callback) => {
                            if (!value) {
                                if(!this.admin.id){
                                    callback(new Error('请输入密码'));
                                }else if(this.admin.password1){
                                    callback(new Error('请输入密码'));
                                }else{
                                    callback();
                                }
                            } else if (value.match(/^\s*$/)) {
                                callback(new Error('密码不能全为空格'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                password1:[{
                    required: true, trigger: 'blur' ,
                    validator:(rule, value, callback) => {
                        if (!value) {
                            if(!this.admin.id){
                                callback(new Error('请确认密码'));
                            }else if(!this.admin.password){
                                callback();
                            }
                        } else if (value!=this.admin.password) {
                            callback(new Error('两次密码不一致'));
                        } else {
                            callback();
                        }
                    }
                }]
            }
        }
    },
    methods: {
        goBack() {
            history.back()
        },
        提交(){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    if(this.admin.id){
                        this.修改()
                    }else{
                        this.添加()
                    }
                }else{
                    return false
                }
            })
        },
        修改(){
            delete this.admin.createdAt
            delete this.admin.deletedAt
            delete this.admin.updatedAt
            if(!this.admin.password){
                delete this.admin.password
            }
            this.$axios.put(`/api/admin/${this.id}`,this.admin)
            .then(res => {
                if(res.code===0){
                    this.正确('修改成功')
                    // history.back()
                }else{
                    this.错误(res.message)
                }
            })
            .catch(err => {
                this.错误('修改失败，请联系管理员')
            })
        },
        添加(){
            delete this.admin.id
            this.$axios.post('/api/admin',this.admin)
            .then(res => {
                if(res.code===0){
                    this.正确('添加成功')
                    history.back()
                }else{
                    this.错误(res.message)
                }
            })
            .catch(err => {
                console.log(err)
                this.错误('添加失败，请联系管理员')
            })
        },
        获取管理员(){
            this.$axios.get(`/api/admin/${this.id}`,'')
            .then(res => {
                if(res.code===0)
                this.admin = res.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.id = this.$route.query.id ? this.$route.query.id : ''
        if(this.id){
            this.获取管理员()
            this.rules.password[0].required = false
            this.rules.password1[0].required = false
        }
    },
}
</script>

<style lang="scss" scoped>
.form{
    width: 400px;
    margin: 10px auto;
    border: 1px solid #d2d2d2;
    padding: 10px;
    border-radius: 10px;
    .title-1{
        line-height: 38px;
        border-bottom: 1px solid #d2d2d2;
        text-align: center;
    }
    /deep/ .el-checkbox{
        width: 40%;
    } 
    .bnt-1{
        width: 100%;
    }
    /deep/ .el-input.is-disabled .el-input__inner{
        color: #000;
    }
}
</style>
