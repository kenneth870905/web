<template>
    <div class="login">
        <van-nav-bar title="新用户注册" left-arrow @click-left="$back()"></van-nav-bar>
        <van-form @submit="onSubmit" :show-error="false" class="form">
            <van-field class="input-box phone" placeholder="请输入手机号" v-model="user.userName" :rules="rules.userName"/>
            <!-- <van-field class="input-box" placeholder="邮箱（可不填写）" v-model="user.email" :rules="rules.email"/> -->
            <van-field class="input-box" type="password" placeholder="请输入登录密码" v-model="user.password" :rules="rules.password"/>
            <van-field class="input-box" type="password" placeholder="请确认密码" v-model="user.password2" :rules="rules.password2"/>
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
                email:"",
                password2:""
            },
            rules:{
                userName:[
                    {   required: true, message: '请输入9开头10位菲律宾手机号码',
                        validator:(val)=>{
                            return /^9[0-9].{8}$/.test(val)
                        }
                    }
                ],
                password:[
                    { required: true, message: '请输入登录密码'}
                ],
                password2:[
                    {   required: true, message: ()=>{
                            if(!this.user.password2){
                                return '请确认密码'
                            }else{
                                return '两次密码不一致'
                            }
                        },
                        validator:(val)=>{
                            if(this.user.password != this.user.password2){
                                return false
                            }else{
                                return true
                            }
                        }
                    }
                ]
            }
        }
    },
    methods: {
        onSubmit(values){
            // console.log('登录',this.user)
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
    .phone{
        /deep/ .van-field__body{
            position: relative;
            &::before{
                content: '+63';
                margin: 0px 10px 0px 0px;
                color: rgba($color: #000000, $alpha: 0.6);
            }
        }
    }
    /deep/ .van-cell::after{
        display: none;
    }
    /deep/ .van-field__body{
        border-bottom: 1px solid #eee;
    }
}
</style>