<template>
    <div class="login">
        <el-form :model="user" class="form">
            <img class="img-1" src="./avatar.png" alt="" srcset="">
            <el-form-item label="">
                <el-input v-model="user.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="user.passwoord" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="$router.push('/')" type="success" style="width:100%">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    setup(props) {
        
        let user=reactive({
            username:"",
            passwoord:""
        })

        


        return{
            user
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    height: 100vh;
    display: flex;
    background-image: url(./loginbg.jpg);
    background-size:cover ;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form{
    width: 400px;
    background: rgba(255,255,255, 0.2);
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    padding: 20px;
}
.img-1{
    width: 100px;
    height: 100px;
    margin: 10px auto 20px;
    display: block;
    border-radius: 50%;
}
</style>