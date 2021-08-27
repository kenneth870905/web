<template>
    <div class="login">
            <van-nav-bar class="title" title="登录" left-arrow :fixed="true" @click-left="onClickLeft"/>
         
        <!-- <div class="title_zhuc">
            <h4>注册</h4>
        </div> -->

        <!-- 登录表单 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
            <!-- 账号 -->
            <el-form-item label="" prop="username" class="font_c">
                <el-input placeholder="请输账号" autocomplete="off" v-model="loginForm.username" clearable>
                    <i slot="prefix" class="iconfont iconicon"></i>
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" class="font_c">
                <el-input placeholder="请输入密码" autocomplete="off" v-model="loginForm.password" clearable show-password>
                    <i slot="prefix" class="iconfont iconmima"></i>
                </el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="checkPwd" class="font_c">
                <el-input placeholder="请确认密码" autocomplete="off" v-model="loginForm.checkPwd" clearable show-password>
                    <i slot="prefix" class="iconfont iconmima1"></i>
                </el-input>
            </el-form-item>

            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="font_c">
                <el-button type="danger" class="login_btn">注册</el-button><br>
            </el-form-item>
          </el-form>

        <div class="bottom_nav">
            <div class="bottom_nav_a">
                <span class="login_nav">已有账号? </span>
                <router-link to="/login" style="color:red">立即登录</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      

        // 包含特殊字符的函数
        const checkSpecificKey = str => {
            var specialKey = "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
            for (var i = 0; i < str.length; i++) {
                if (specialKey.indexOf(str.substr(i, 1)) != -1) {
                    return false;
                }
            }
            return true;
        };

        // 验证密码的函数
        const pass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 4 || value.length > 12) {
                callback(new Error("密码长度 4 - 12位"));
            } else if (!checkSpecificKey(value)) {
                callback(new Error("密码不能包含特殊字符"));
            } else {
                if (this.loginForm.checkPwd !== "") {
                    // 如果确认密码不为空
                    this.$refs.loginForm.validateField("checkPwd"); // 调用确认密码的验证（一致性验证）
                }
                // 成功的回调
                callback();
            }
        };

        // 确认密码的验证函数
        const checkPass = (rule, value, callback) => {
            // rule是传入的验证规则  value是用户输入的值 callback是一个回调函数
            if (value === "") {
                // 如果等于空
                callback(new Error("请再次输入密码")); // 输出提示
            } else if (value !== this.loginForm.password) {
                // 如果确认密码 和 密码不同
                callback(new Error("两次输入密码不一致"));
            }
            // 如果直接调用 不传入任何错误信息 就是成功 绿色的勾勾
            callback();
        };

        return {
            时间: 0,
            // 登录表单的数据
            loginForm: {
                username: "",//注册账号
                password: "",//密码
                checkPwd: "",//确认密码
                phoneCode: "",//手机验证码
            },

            rules: {
                // 验证用户名
                username: [
                    // 非空验证
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { min: 4, max: 12, message: "账号长度在 4 - 12 位", trigger: "blur" }
                ],
                // 验证密码
                password: [
                    { required: true, validator: pass, trigger: "blur" }
                ],
                // 验证确认密码
                checkPwd: [
                    { required: true, validator: checkPass, trigger: "blur" }
                ],
              
                phoneCode: [
                    { required: true, message: '请输入验证码', trigger: "blur" }
                ]
                /* 
                验证规则字段说明：
                    { required: true/false 必填,   message: "错误的提示信息", trigger: "触发验证的方式" }
                    { min: 最小长度, max: 最大长度, message: "错误的提示信息", trigger: "触发验证的方式" }
                    { validator： 自定义验证规则函数名，  trigger: 'blur'}
                */

            }
        };
    },
    methods: {
     
       onClickLeft() {//头部
            history.back()
         },
    }
}
</script>

<style lang="scss" scoped>
form{
    margin-top:_vw(140);
   
}
.bottom_nav {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    font-size: _vw(14);
}
/deep/.iconfont {
    font-size: _vw(24);
    margin-left: _vw(3);
}
.图片验证码外框 {
    display: block;
    width: _vw(100);
    height: _vw(36);
    margin-top: _vw(4);
    margin-right: _vw(10);
    img {
        width: 100%;
        height: 100%;
    }
}
.发送验证码 {
    display: block;
    margin-right: _vw(10);
    border-left: 1px solid #ccc;
    color: red;
    width: _vw(100);
    text-align: center;
}

/deep/.radioK {
    width: _vw(260) !important;
    height: _vw(30);
    text-align: center;
}
.login {
    padding-bottom: _vw(50);
}
.login_btn {
    width: 100%;
    border-radius: _vw(35);
    margin: 0px auto;
}
.title_zhuc {
    margin-bottom: _vw(20);

    height: _vw(50);
    border-bottom: 1px solid #ccc;
    h4 {
        text-align: center;
        margin: 0px;
        line-height: _vw(50);
    }
}
/deep/.el-form-item__label {
    width: 0px;
}
.font_c {
    width: 90%;
    margin: 0px auto;
    margin-bottom: _vw(20);

    /deep/ .el-input__inner {
        width: 100%;
        border-radius: _vw(35);
        margin: 0px auto;
        padding-left: _vw(36);
    }
}
</style>
