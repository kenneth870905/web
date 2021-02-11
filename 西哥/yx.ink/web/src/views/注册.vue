<template>
    <div>
        <div class="header-1">
            <div class="w1280">
                <img src="static/img/logo.png" alt srcset />
                <div class="t1">欢迎注册</div>
                <div class="r">
                    已有账号？
                    <span @click="$router.push('/login')">现在去登录</span>
                </div>
            </div>
        </div>
        <div class="steps">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="填写账号信息"></el-step>
                <el-step title="验证账号"></el-step>
                <el-step title="注册成功"></el-step>
            </el-steps>

            <div class="form">
                <el-form ref="user" :model="user" :rules="rules">
                    <el-form-item label prop="userName">
                        <div class="input-box">
                            <span>用户名</span>
                            <el-input placeholder="用于登录" v-model="user.userName"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label>
                        <div class="input-box">
                            <span>电子邮箱</span>
                            <el-input v-model="user.email" placeholder="请输入电子邮箱"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label>
                        <div class="input-box">
                            <span>登录密码</span>
                            <el-input show-password v-model="user.password" placeholder="请输入登录密码"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label>
                        <el-button v-if="!验证.show" type="plain" style="width: 100%;height:54px;" @click="展开验证码()">
                            <span v-if="验证.type==0" >点击获取验证码</span>
                            <span v-else>验证成功</span>
                        </el-button>
                        <slide-verify v-if="验证.show" :l="42" :r="10" :w="400" :h="155" slider-text="向右滑动进行验证" @success="onSuccess"></slide-verify>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button type="primary" style="width: 100%;height:54px;" @click="提交()">提交注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            active: 1,
            验证:{
                type:0,     //0没有验证或者没有验证通过
                show:false
            },
            user: {
                userName:"",
                password:"",
                email:""
            },
            rules:{
                userName:[
                    { required: true, message: '请输入用户名', trigger: 'blur' ,}
                ]
            }
        }
    },
    methods: {
        展开验证码(){
            if(this.验证.type==0){
                this.验证.show = true
            }
        },
        onSuccess(){
            this.验证.type=1
            this.验证.show = false
        },
        提交(){
            this.$refs.user.validate((valid) => {
                if (valid) {
                    this.注册()
                } else {
                    return false;
                }
            });
        },
        注册(){
            if(this.验证.type==0){
                this.错误('请点击验证码')
                return
            }
            this.$Loading(1)
            this.$axios.post('/User/register',this.user).then(res => {
                if(res.code==1){
                    this.正确('注册成功')
                    this.$router.push('/login')
                }else{
                    this.错误(res.message)
                }
                this.$Loading()
            }).catch(err => {
                this.错误('系统错误，稍后再试')
                this.$Loading()
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    box-shadow: 0px 0px 5px 0px #000;
    .w1280 {
        display: flex;
        align-items: flex-end;
        padding: 25px 0px;
    }
    img {
        height: 50px;
        margin: 0px 15px 0px 0px;
    }
    .t1 {
        font-size: 24px;
    }
    .r {
        flex: 1;
        text-align: right;
        color: rgba($color: #000000, $alpha: 0.7);
        span {
            color: #ff4400;
            cursor: pointer;
        }
    }
}

.steps {
    width: 400px;
    margin: 80px auto 0px;
}
.form{
    margin: 50px 0px 100px;
    .input-box{
        position: relative;
        span{
            width: 80px;
            padding: 0px 0px 0px 20px;
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 1;
            text-align: justify;
            text-align-last: justify; 
            line-height: 54px;
        }
        /deep/ input{
            padding-left: 100px;
            height: 54px;
        }
    }
}
</style>