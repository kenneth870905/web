<template>
    <div class="login">
        <van-nav-bar title="登录" left-arrow @click-left="$back()"></van-nav-bar>
        <van-form @submit="onSubmit" :show-error="false" class="form">
            <van-field class="input-box" placeholder="请输入用户名" v-model="user.userName" :rules="rules.userName"/>
            <van-field class="input-box" type="password" placeholder="请输入密码" v-model="user.password" :rules="rules.password"/>
            <div style="margin: 16px;">
                <van-button round block type="warning" native-type="submit">提交</van-button>
            </div>
            <div class="t1">
                <span @click="$router.push('/register')">注册新用户</span>
            </div>
        </van-form>

    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            user:{
                userName:"",
                password:""
            },
            rules:{
                userName:[
                    { required: true, message: '请填写用户名1'}
                ],
                password:[
                    { required: true, message: '请填写密码'}
                ]
            }
        }
    },
    methods: {
        ...mapMutations({
            setValue:"setValue"
        }),
        onSubmit(values){
            console.log('登录',this.user)
            this.$toast.loading({ message: '加载中...', forbidClick: true,duration:0});
            this.$axios.post('/user/login',this.user).then(res => {
                if(res.code==1){
                    this.setValue(['token',res.data.token])
                    this.setValue(['userInfo',res.data.user])
                    if(this.$route.query.url){
                        this.$router.push('/'+this.$route.query.url)
                    }else if(this.$route.query.r){
                        history.back()
                    }else{
                        this.$router.push('/')
                    }
                    this.$toast.clear();
                }else{
                    this.$toast(res.message)
                }
                this.$toast.clear();
            }).catch(err => {
                this.$toast('系统错误，稍后再试')

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
    margin: 150px auto 0px;
    
    .input-box{
        margin: 0px 0px 20px;
        height: 68px;
        font-size: 20px;
    }
    /deep/ .van-cell::after{
        display: none;
    }
    /deep/ .van-field__body{
        border-bottom: 1px solid #eee;
    }
    .t1{
        text-align: right;
        margin: 30px 16px 0px;
        span{
            color: #f57224;
            font-size: 14px;
        }
    }
}
</style>