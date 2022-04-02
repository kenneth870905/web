<template>
    <a-form :model="user" class="form" ref="form">
        <h3>密码修改</h3>
        <a-form-item label="新密码" name="password" :rules="rules.password">
            <a-input-password placeholder="请输入密码" v-model:value="user.password"></a-input-password>
        </a-form-item>
        <a-form-item label="密码确认" name="password2" :rules="rules.password2">
            <a-input-password placeholder="请确认密码" v-model:value="user.password2"></a-input-password>
        </a-form-item>
        <a-form-item>
            <div class="btn">
                <a-button type="" danger @click="提交()">确认修改</a-button>
            </div>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from "vue";
import { changePassword } from "@/api/api.js";

    const { proxy } = getCurrentInstance()

    let user = reactive({
        password:"",
        password2:""
    })
    let rules={
        password:[
            { required: true, message: '请输如密码' }
        ],
        password2:[
            { required:true, validator:(rule, value, callback)=>{
                    if(!user.password2){
                        return Promise.reject('请确认密码')
                    }else if(user.password!=user.password2){
                        return Promise.reject('两次密码不一致')
                    }else{
                        return Promise.resolve()
                    }
                }
            },

        ]
    }
    let form = ref()
    let 提交 = async ()=>{
        await form.value.validate()
        let o = {
            password:user.password
        }
        changePassword(o).then(res=>{
            proxy.$message.success('修改成功')
            user.password = ''
            user.password2 = ''
        })
    }

</script>

<style lang="scss" scoped>
.form{
    width: 600px;
    background: #fff;
    margin: 10px auto;
    padding: 20px;
    ::v-deep .ant-form-item-label{
        width: 100%;
        text-align: left;
    }
}
.btn{
    text-align: right;
}
</style>
