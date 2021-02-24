<template>
    <div class="login">
        <img class="bg-1" src="static/img/login.jpg" alt="" srcset="">
        <div class="w1280 login-box">
            <div class="from">
                <span class="title-1">密码登录</span>
                <el-form :model="user" :rules="rules" ref="user">
                    <el-form-item label="" prop="userName">
                        <el-input class="phone" @keyup.enter.native="登录()" v-model="user.userName" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input @keyup.enter.native="登录()" show-password v-model="user.password" prefix-icon="el-icon-lock" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button style="width: 100%;background:#ff4400;" type="danger" @click="登录()">登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="f">
                    <router-link to="/register" tag="span">免费注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            user:{
                userName:"",
                password:""
            },
            rules:{
                userName:[
                    { required: true, message: '请输入9开头菲律宾手机号码', trigger: 'blur' ,
                        validator:(rule, value, callback)=>{
                            if(/^9[0-9].{8}$/.test(value)){
                                callback();
                            }else{
                                callback(new Error('请输入9开头菲律宾手机号码'));
                            }
                        }
                    }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' ,}
                ]
            }
        }
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        登录(){
            this.$refs.user.validate((valid) => {
                if (valid) {
                    this.$Loading(1)
                    this.$axios.post('/User/login',this.user).then(res => {
                        if(res.code==1){
                            this.正确('登录成功')
                            this.setValue(['token',res.data.token])
                            this.setValue(['userInfo',res.data.user])
                            this.$router.push('/')
                        }else{
                            this.错误(res.message)
                        }
                        this.$Loading()
                    }).catch(err => {
                        console.log(err)
                        this.错误('系统错误，稍后再试')
                        this.$Loading()
                    })
                } else {
                    return false;
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.login{
    height: 600px;
    position: relative;
}
.bg-1{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0px;
    left: 0px;
}
.login-box{
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
}

.from{
    width: 350px;
    background: #e9e9f1;
    padding: 25px;
    margin-right: 100px;
    .title-1{
        color: #3c3c3c;
        display: inline-block;
        border-bottom: 4px solid #3c3c3c;
        font-weight: 700;
        font-size: 20px;
        padding: 0px 0px 5px;
        margin: 0px 0px 30px 0px;
    }
    .f{
        text-align: right;
        span{
            cursor: pointer;
            font-size: 14px;
        }
    }
    .phone{
        position: relative;
        &::before{
            position: absolute;
            left: 0px;
            content: '+63';
            margin: 0px 10px 0px 0px;
            color: rgba($color: #000000, $alpha: 0.6);
            width: 40px;
            text-align: center;
            font-size: 12px;
        }
        /deep/ input{
            padding-left: 40px;
        }
    }
}

</style>