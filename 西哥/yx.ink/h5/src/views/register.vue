<template>
    <div class="login">
        <van-nav-bar title="新用户注册" left-arrow @click-left="$back()"></van-nav-bar>
        <van-form @submit="onSubmit" :show-error="false" class="form">
            <van-field class="input-box" placeholder="请输入用户名" v-model="user.userName" :rules="rules.userName"/>
            <van-field class="input-box" placeholder="请输入邮箱" v-model="user.email" :rules="rules.email"/>
            <van-field class="input-box" type="password" placeholder="请输入密码" v-model="user.password" :rules="rules.password"/>
            <div style="margin: 16px;">
                <van-button round block type="warning" native-type="submit">注册</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{
                userName:"",
                password:"",
                email:""
            },
            rules:{
                userName:[
                    { required: true, message: '请填写用户名'}
                ],
                email:[
                    { required: true, message: '请输入邮箱'}
                ],
                password:[
                    { required: true, message: '请填写密码'}
                ]
            }
        }
    },
    methods: {
        onSubmit(values){
            console.log('登录',this.user)
            this.user.haha = '哈哈'
            this.$axios.post('/user/register',this.user).then(res => {
                console.log(res)
                if(res.code==1){
                    this.$toast('注册成功');
                    this.$router.push('/login')
                }else{
                    this.$toast(res.message);
                }
            })
            .catch(err => {
                this.$toast('系统错误，稍后再试');
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.login{
    height: 100%;
    background: #fff;
}
.form{
    width: 90vw;
    margin: 100px auto 0px;
    
    .input-box{
        margin: 0px 0px 0px;
        height: 68px;
        font-size: 20px;
    }
    /deep/ .van-cell::after{
        display: none;
    }
    /deep/ .van-field__body{
        border-bottom: 1px solid #eee;
    }
}
</style>