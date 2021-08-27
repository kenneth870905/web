<template>
    <div class="login">
        <img src="static/loginbg.png" class="bg" alt srcset />
        <el-form ref="from1" :model="user" :rules="rules" class="login-form" autocomplete="on" label-position="left">
            <h3 class="title">视频管理</h3>
            <el-form-item prop="username">
                <el-input v-model="user.username" @keyup.enter.native="submitForm" placeholder></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="user.password" @keyup.enter.native="submitForm"  placeholder show-password></el-input>
            </el-form-item>
            <el-form-item label>
                <el-button type="primary" style="width:100%" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, onMounted, getCurrentInstance, toRefs, ref, unref } from 'vue'
import axios from 'axios';

export default {

    setup() {
        //引用全局变量
        const { proxy  } = getCurrentInstance();

        const from1 = ref(null);
        const user = reactive({
            username: "",
            password: ""
        })
        const rules = {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
        const submitForm = () => {
            let form = unref(from1);
            form.validate((valid) => {
                if (valid) {
                    console.log(user)
                    proxy.$axios.post('login', user).then(res => {
                        console.log(res)
                        if (res.code == 1) {
                            proxy.$message({ showClose: true,  message: '登录成功', type: 'success' });
                            localStorage.videoUpdate = res.token
                            proxy.$router.push('/')
                        } else {
                            proxy.$message({ showClose: true,  message: '登录失败',  type: "error" });
                        }
                    }).catch(err => {
                        proxy.$message({ showClose: true, message: '连接异常，请稍后再试', type: "error" });
                        console.error(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }

        onMounted(() => {
        })
        return {
            user,
            rules,
            from1,
            submitForm
        }
    },
}
</script>

<style lang="scss" scoped>
.login {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0px;
    left: 0px;
}
.login-form {
    position: relative;
    z-index: 1;
    width: 400px;
    background: rgba(#002646, 0.9);
    padding: 1px 10px;
    border-radius: 5px;
    .title {
        color: #fff;
    }
}
</style>
