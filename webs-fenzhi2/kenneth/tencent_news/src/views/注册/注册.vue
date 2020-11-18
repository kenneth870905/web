<template>
    <div>
        <van-nav-bar left-text="账号信息填写" left-arrow @click-left="$back" />
        <div class="content">
            <div class="form">
                <van-field v-model="user.userName" @focus="focusType=0" @blur="focusType=''" :class="{active:focusType=='0'}" placeholder="请输入用户名" clearable />
                <div class="tishi">5-25字符，可用于登录或找回密码，不含除下划线以外的其他特殊字符</div>
                <van-field v-model="user.phone" placeholder="手机号码" clearable @focus="focusType=1" @blur="focusType=''" :class="{active:focusType==1}"/>
                <div class="tishi">手机号可作为您的登录凭证</div>
                <van-field v-model="user.password" type="password" placeholder="请输入密码" clearable @focus="focusType=2" @blur="focusType=''" :class="{active:focusType=='2'}"/>
                <div class="tishi">最少6位字符，至少包含英文字母，数字，符号中的两种组成</div>
                <van-field v-model="user.password_1" type="password" placeholder="请输入密码" clearable @focus="focusType=3" @blur="focusType=''" :class="{active:focusType=='3'}"/>
                <div class="tishi">再次输入确保密码正确</div>
            </div>
            <div class="btn-1">
                <van-button round type="warning" size="large" @click="注册()">登录</van-button>
            </div>
        </div>

        
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            focusType:'',
            user:{
                userName:"",
                password:"",
                password_1:"",
                phone:""
            }
        }
    },
    methods: {
        async 注册(){
            if(!this.user.userName){
                this.$toast('请输入用户名');
            }else if(!this.user.password){
                this.$toast('请输入密码')
            }else if(this.user.password!=this.user.password_1){
                this.$toast('两次密码不一致')
            }else{
                try {
                    var r =await this.$axios.post('/register',this.user);                
                } catch (error) {
                    this.$toast('系统错误稍后再试')
                    return
                }
                if(r.data.code==1){
                    this.$toast('注册成功')
                    history.back();
                }else{
                    this.$toast(r.data.message)
                }
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>
.form{
    .tishi{
        color: rgba(0,0,0,0.4);
        font-size: _vw(12);
        padding: 0px 16px;
    }
    .van-field{
        margin: 20px 0px 0px;
        font-size: _vw(16);
        &::after{
            border-bottom: 1px solid #a2a2a2;
            right: 15px;
        }
        &.active{
            &::before{
                left:15px;
                right: 15px;
            } 
        }
        &::before{
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            // right: 15px;
            right: 50%;
            bottom: 0;
            // left: 16px;
            left: 50%;
            border-bottom: 2px solid #ff5000;
            z-index: 1;
            transition: all 0.3s;
        }
    }

}
.btn-1{
    margin: 50px 0px;
    padding: 0px 10px;
}
</style>
