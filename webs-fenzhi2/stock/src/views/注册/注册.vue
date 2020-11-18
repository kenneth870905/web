<template>
    <div class="login">

        <div class="title_zhuc">
            <h4>注册</h4>
        </div>

        <!-- 登录表单 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
            <!-- 账号 -->
            <el-form-item label="" prop="username" class="font_c">
                <el-input placeholder="请输账号" autocomplete="off" v-model="loginForm.username" clearable>
                    <i slot="prefix" class="iconfont icon-xingming"></i>
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" class="font_c">
                <el-input placeholder="请输入密码" autocomplete="off" v-model="loginForm.password" clearable show-password>
                    <i slot="prefix" class="iconfont icon-iconmima"></i>
                </el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="checkPwd" class="font_c">
                <el-input placeholder="请确认密码" autocomplete="off" v-model="loginForm.checkPwd" clearable show-password>
                    <i slot="prefix" class="iconfont icon-iconmima"></i>
                </el-input>
            </el-form-item>

            <!-- 真实姓名 -->
            <el-form-item class="font_c">
                <el-input placeholder="请输入真实姓名" autocomplete="off" v-model="loginForm.realName" clearable>
                    <i slot="prefix" class=" iconfont icon-wodedangxuan"></i>
                </el-input>
            </el-form-item>

            <!-- 推荐人 -->
            <el-form-item class="font_c">
                <el-input placeholder="没有可不填" autocomplete="off" v-model="loginForm.referrer" clearable>
                    <i slot="prefix" class=" iconfont icon-wodedangxuan"></i>
                </el-input>
            </el-form-item>
            <!-- 电话号码 -->
            <!-- <el-form-item prop="phone" class="font_c">
                <el-input placeholder="请输入电话话号码" autocomplete="off" v-model="loginForm.phone">
                    <i slot="prefix" class=" iconfont icon-shouji"></i>
                </el-input>
            </el-form-item> -->

            <el-form-item prop="phone" class="font_c">
                <el-input placeholder="请输入电话号码" autocomplete="off" v-model="loginForm.phone" clearable>
                    <i slot="prefix" class="iconfont icon-iconmima"></i>
                </el-input>
            </el-form-item>
            <!-- 电话验证码 -->
            <el-form-item prop="phoneCode" class="font_c icon-shouji2 phoneCode">
                <el-input placeholder="手机验证码" autocomplete="off" v-model="loginForm.phoneCode">
                    <i slot="suffix" class="发送验证码 i " @click="getSms()">
                        <!-- 发送时间 -->
                        {{时间>0 ? 时间+'s' : '获取短信'}}
                    </i>
                </el-input>
            </el-form-item>

            <!-- 图形验证码 -->
            <!-- <el-form-item  prop="graph" class="font_c">
                       <el-input  placeholder="图片验证码"   autocomplete="off" v-model="loginForm.graph">
                        <i slot="suffix" class="图片验证码外框"><img src="../../assets/css/phoneCode.jpg" alt=""></i>
                    </el-input>
                </el-form-item> -->

            <el-form-item prop="radio" class="font_c radioK">
                <el-checkbox class="radioK" v-model="loginForm.radio" autocomplete="off"><span class="yi">我已阅读并同意<span class="fred">《服务条款》</span></span></el-checkbox>
            </el-form-item>

            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="font_c">
                <el-button type="danger" @click="submitForm('loginForm')" class="login_btn">注册</el-button><br>
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
import { api_获取短息验证码, api_注册接口, } from "@/api/请求登录的接口.js";
export default {
    data() {
        // 验证手机号码的格式
        const phone = (rule, value, callback) => {
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            if (!phoneTest.test(value)) {
                callback(new Error('请输入正确电话号码'));
            } else {
                callback();
            }
        }

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
                realName: "",//真实姓名
                referrer: "",//推荐人
                phone: "",//电话号码
                phoneCode: "",//手机验证码
                // graph:"",//图形验证码
                radio: true,
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
                //  电话号码
                phone: [
                    { required: true, validator: phone, trigger: "blur" }
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
        // ...mapMutations({
        //         设置用户信息:'设置用户信息',
        //     }),
        getSms() {//点击获取短信触发的函数
            var phoneTest = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            if (!phoneTest.test(this.loginForm.phone)) {
                this.$toast('请输入正确电话号码')
                return
            } else if (this.时间 != 0) {
                return
            }
            this.时间 = 60;
            this.定时器 = setInterval(() => {
                this.时间--;
                if (this.时间 <= 0) {
                    clearInterval(this.定时器);
                }
            }, 1000);
            api_获取短息验证码(this.loginForm.phone).then(x => {
                if (x.data.code == 200) {
                this.$toast("短信已发送，请注意查收")
                } else {
                this.$toast(x.data.msg)
                }
            }).catch(err => { })
        },

        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate(valid => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    console.log("前端验证成功 可以提交给后端！");
                    // 1.收集账号和密码  2.发送请求 3.弹登录成功的提示
                    var obj = {
                        realName: this.loginForm.realName,//真实姓名
                        account: this.loginForm.username,//账户
                        password: this.loginForm.password,//密码
                        confirmPassword: this.loginForm.checkPwd,//确认密码
                        refAccount: this.loginForm.referrer,//推荐人
                        smsCode: this.loginForm.phoneCode,//手机验号码 
                        mobile: this.loginForm.phone,//手机号
                        // mobile:this.loginForm.phoneCode,//手机验证码
                    }
                    api_注册接口(obj).then(x => {
                        if (x.data.code == 200) {
                            this.$message.success(x.data.msg);
                            var access_token = x.data.data.access_token
                            // window.localStorage.setItem('access_token', access_token);  //把登录后的token放在本地存储中 
                            // var refresh_token=x.data.data.refresh_token
                            //    window.localStorage.setItem('refresh_token', refresh_token);   
                            this.$router.history.push("/");
                        } else {
                            this.$message.success(x.data.msg);
                        }
                    }).catch(err => {
                        console.log(err)
                        thsi.$toast('系统错误稍后再试')
                    })
                } else {
                    return false;
                }
            });
        },

    }
}
</script>

<style lang="scss" scoped>
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
    // line-height: vw(40)
}

/deep/.radioK {
    width: _vw(260) !important;
    //  background: green !important;
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
        //  margin-bottom:
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
