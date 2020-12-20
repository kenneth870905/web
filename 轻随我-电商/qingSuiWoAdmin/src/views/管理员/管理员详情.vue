<template>
    <div>
        <el-page-header @back="goBack" :content="id ? '管理员详情' : '添加管理员' "></el-page-header>

        <el-form :model="admin" class="form" :rules="rules" ref="ruleForm" label-width="100px">
            <div class="title-1">
                管理员信息
            </div>
            <el-form-item label="管理员权限" prop="type">
                <el-checkbox-group v-model="admin.type">
                    <el-checkbox label="A">商品管理发布修改删除等权限</el-checkbox>
                    <el-checkbox label="B">浏览权限</el-checkbox>
                    <el-checkbox label="C">修改积分、会员等级、权限</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="登录账号" prop="name">
                <el-input v-model="admin.name" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input type="password" v-model="admin.password" placeholder="" show-password clearable></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password1">
                <el-input type="password" v-model="admin.password1" placeholder="" show-password clearable></el-input>
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
                type: []
            },
            rules:{
                type:[
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
                                callback(new Error('请输入密码'));
                            } else if (value.match(/^\s*$/)) {
                                callback(new Error('密码不能全为空格'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                password1:{
                    required: true, trigger: 'blur' ,
                    validator:(rule, value, callback) => {
                        if (!value) {
                            callback(new Error('请确认密码'));
                        } else if (value!=this.admin.password) {
                            callback(new Error('两次密码不一致'));
                        } else {
                            callback();
                        }
                    }
                }
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
                    console.log('可以提交')
                }else{
                    return false
                }
            })
        }
    },
    mounted() {

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
        width: 100%;
    } 
    .bnt-1{
        width: 100%;
    }
}
</style>
