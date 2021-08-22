<template>
    <div class="login">
        <el-form :model="user" class="form">
            <img class="img-1" src="./avatar.png" alt="" srcset="">
            <el-form-item label="">
                <el-input v-model="user.name" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="user.password" placeholder="密码" @keydown.native.enter="登录()" show-password></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="success" style="width:100%" @click="登录()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { reactive, ref } from '@vue/reactivity'
import { useStore  } from "vuex";
import { useRouter,useRoute } from 'vue-router'
export default {
    setup(props) {

        const { proxy } = getCurrentInstance()
        const store = useStore();
        let Router = useRouter()

        let user=reactive({
            name:"",
            password:""
        })

        


        let 登录=()=>{
            if(!user.name || !user.password){
                proxy.$message({message: '请输入账号密码',type: 'error'});
                return
            }
            proxy.$axios.post('/auth/login',user).then(res => {
                if(res.code==0){
                    if(res.data.roles=="ADMIN"){
                        store.commit('setItem',['loginInfo',res.data])
                        Router.push('/dingdanList')
                    }else{
                        proxy.$message({message: '权限不足',type: 'error'});
                    }
                }else{
                    proxy.$message({message: '账号密码错误，请重新输入',type: 'error'});
                }
            }).catch(err => {
                console.error(err); 
                proxy.$message({message: '网络异常，请稍后再试',type: 'error'});
            })
        }



        return{
            user,
            登录,
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