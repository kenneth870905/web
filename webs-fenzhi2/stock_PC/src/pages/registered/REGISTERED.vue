
<template>
    <div class="login" :style="{ 'background-image': 'url(static/image/login-bg.jpg)'}">
        <!-- <div class="Obscuration" v-show="showObscuration">
            <div class="textObscuration">
                <div class="close" @click="showObscuration=false">关闭图标</div>
                <div>
                    <h1>新包配资服务条款</h1>
                    重要内容具体内容<br>
                    重要内容具体内容<br>
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>重要内容具体内容
                    <br>
                    <el-button type="danger" @click="showObscuration=false">关闭图标</el-button>
                </div>
            </div>
        </div> -->

        <!-- 登录表单容器 -->
        <div class="container">

            <div class="login-wrapper">
                <!-- 登录标题 -->
                <h1 class="title">
                    注册中心
                </h1>

                <!-- 登录表单 -->
                <el-form class="表单 demo-ruleForm" :model="user" status-icon :rules="rules" ref="user" label-width="100px">
                    <!-- 账号 -->
                    <el-form-item label="登录账号" prop="account" class="font_c">
                        <el-input type="text" v-model="user.account" autocomplete="off" placeholder="登陆时用的手机号"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="登录密码" prop="password">
                        <el-input type="password" v-model="user.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input type="password" v-model="user.confirmPassword" autocomplete="off" placeholder="请确认密码"></el-input>
                    </el-form-item>
                    <!-- 真实姓名 -->
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input type="text" v-model="user.realName" autocomplete="off" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <!-- 推荐人 -->
                    <el-form-item label="推荐人">
                        <el-input type="text" v-model="user.refAccount" autocomplete="off" placeholder="推荐人（选填）"></el-input>
                    </el-form-item>
                    <!-- 电话号码 -->
                    <el-form-item label="电话号码" prop="mobile">
                        <el-input type="text" v-model="user.mobile" autocomplete="off" placeholder="请输入电话话号码"></el-input>
                    </el-form-item>
                    <!-- 电话验证码 -->
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="短信验证" prop="smsCode">
                                <el-input type="text" v-model="user.smsCode" autocomplete="off" placeholder="手机验证码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-button @click="发送验证()" style="margin-left:46px" type="danger">发送验证码</el-button>
                        </el-col>
                    </el-row>
                    <!-- 图形验证码 -->
                    <!-- <el-row>
                        <el-col :span="12">
                            <el-form-item label="图形验证码" prop="graph">
                                <el-input type="text" v-model="loginForm.graph" autocomplete="off" placeholder="图片验证码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <img style="margin:2px 0px 0px 46px; width:160px;height:38px " src="../../assets/imgs/phoneCode.jpg" alt="">
                        </el-col>
                    </el-row> -->
                    <!-- 单选按钮 -->
                    <!-- <input type="radio"> -->
                </el-form>
                <div class="text_1 表单">
                    <div>
                        <el-checkbox v-model="同意协议"></el-checkbox>
                        <a href="javascript:;">同意《注册服务协议》</a>
                    </div>
                    <div>
                        <span>已有账号</span>
                        <span @click="$router.push('/login')" class="红色字体">[立即登录]</span>
                    </div>
                </div>
                <div class="btn_1">
                     <el-button @click="submitForm()" type="danger">同意协议并注册</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_发送手机验证码 , api_注册 } from "@/api/登录注册.js";
import { mapActions } from 'vuex';
export default {
    components: {  // 注册组件

    },
    data() {
        const testphone=(rule,value,callback)=>{
            var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
            if(!phoneTest.test(value)){
                callback(new Error("手机号码格式"));
            }else{
                callback();
            }
        }

        const testpass=(rule , value , callback )=>{
            if(!this.user.confirmPassword){
                callback(new Error('请确认密码'))
            }else if(this.user.confirmPassword!=this.user.password){
                callback(new Error('两次密码不正确'))
            }else{
                callback();
            }
        }

        return {
            user:{
                "account": "",      //用户名
                "password": "",     //密码 
                "confirmPassword": "",  //确认密码
                "mobile": "",       //手机
                "smsCode": "",      //手机验证码
                "realName": "",     //真实姓名
                "refAccount": ""    //推荐人
            },
            同意协议:true,
            // 验证的规则（一份数据）
            rules: {
                // 验证用户名
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                ],
                // 验证密码
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                confirmPassword:[
                    { required: true, validator: testpass, trigger: "blur" }
                    // { required: true, message: "请确认密码", trigger: "blur" }
                ],
                mobile:[
                    { required: true, validator:testphone, trigger: "blur" }
                ],
                smsCode: [
                    { required: true, message: "请输入短信验证", trigger: "blur" }
                ],
                realName:[
                    { required: true, message: "请输入真实姓名", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        ...mapActions({
            加载中:'加载中',
            错误提示:"错误提示",
            错误提示:"错误提示",
        }),
        发送验证(){
            api_发送手机验证码(this.user.mobile)
        },
        //   点击我已阅读同意触发的蒙尘 
        consent() {
            this.showObscuration = true;
        },
        submitForm() {
            this.$refs['user'].validate(valid => {
                if (valid) {
                    this.注册()
                } else {
                    return false;
                }
            });
        },
        async 注册(){
            this.加载中(true)
            try {
                var r= await api_注册(this.user);            
            } catch (error) {
                this.错误提示('系统错误，稍后再试');
                return
            }
            if(r.data.code==200){
                this.成功提示('注册成功')
            }else{
                this.错误提示(r.data.msg)
            }
            this.加载中(false)
        },
    }
};
</script>

<style lang="scss" scoped>

a {
    color: black;
}
.login {
    height: 800px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .container {
        position: relative;
        padding: 1px ;
        .login-wrapper {
            width: 660px;
            border-radius: 8px;
            background-color: rgba(0, 0, 0, 0.2);
            // position: absolute;
            // top: 50px;
            background: #ffffff;
            right: 240px;
            margin: 50px auto;
            .title {
                font-size: 22px;
                padding: 0px 0px 0px 20px;
                line-height: 60px;
                color: red;
                border-bottom: 1px solid #e5e5e5;
            }
        }
    }
    .表单{
        padding: 0px 50px 0 50px;
    }
    ::v-deep .el-checkbox{
        margin-right: 5px;
    }
}

.text_1{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}
.红色字体{
    color: red;
    cursor: pointer;
}
.btn_1{
    padding: 20px 50px;
    button{
        width: 100%;
    }
}

.login_nav {
    margin-left: 126px;
}
.login_btn {
    background: red;
    color: #fff;
    border: none;
}
// 蒙层样式
.Obscuration {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 3;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // 提示框样式
    .textObscuration {
        width: 600px;
        height: 450px;
        background: #fff;
        position: relative;
        // 关闭
        .close {
            position: absolute;
            top: -30px;
            right: 0px;
            background: red;
            width: 76px;
            height: 30px;
            color: #fff;
        }
    }
}
// 蒙层样式结束
</style>