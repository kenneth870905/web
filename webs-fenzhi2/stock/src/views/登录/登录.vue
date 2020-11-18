


    <template>
    <div class="login">

        <div class="title_zhuc">
            <h4>登录</h4>
        </div>

        <!-- 登录表单 -->
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">

            <!-- 账号 -->
            <el-form-item label="" prop="username" class="font_c">
                <el-input placeholder="请输账号" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.username" >
                    <span slot="prefix" class="iconfont icon-xingming"></span>
                </el-input>
                <!-- <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="登陆时用的手机号"></el-input> -->
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" class="font_c">
                <el-input placeholder="请输入密码" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" show-password v-model="loginForm.password" >
                    <span slot="prefix" class="iconfont icon-iconmima"></span>
                    <!-- <span class="眼睛">眼睛</span> -->
                </el-input>
                <!-- <el-input type="text" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input> -->
            </el-form-item>

            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="font_c">
                <el-button type="danger" @click="submitForm('loginForm')" class="login_btn">登录</el-button><br>
            </el-form-item>

        </el-form>

        <div class="footer_nav">
            <div>
                <router-link to="/" style="color:red">忘记密码</router-link>
            </div>
            <div>
                <span class="login_nav">还没账号? </span>
                <router-link to="/register" style="color:red">立即注册</router-link>
            </div>

        </div>

    </div>
</template>
<script>
import { api_登录接口, } from "@/api/请求登录的接口.js";
import { mapActions } from "vuex";
import { mapGetters,} from 'vuex' 
export default {

    data() {
        // 包含特殊字符的函数
        const checkSpecificKey = str => {
            var specialKey =
                "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
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
        return {
            // 登录表单的数据
            loginForm: {
                username: "lixunhuan",//注册账号
                password: "123456",//密码
                // graph:"",//图形验证码
            },
            rules: {
                // 验证用户名
                username: [
                    // 非空验证
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { min: 4, max: 12, message: "账号长度在 6 - 12 位", trigger: "blur" }
                ],
                // 验证密码
                password: [
                    { required: true, validator: pass, trigger: "blur" }
                ],
            }
        };
    },
    //  computed: {
    //     账户数据: '账户数据',
    //  },
    methods: {
        ...mapActions({
            保存token:'保存token',
            加载中:"加载中"
        }),
        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate(valid => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    console.log("前端验证成功 可以提交给后端！");
                    // 1.收集账号和密码  2.发送请求 3.弹登录成功的提示
                    var obj = {
                        account: this.loginForm.username,
                        password: this.loginForm.password
                    }
                    this.加载中(true);
                    api_登录接口(obj).then(x => {
                        if (x.data.code == 200) {
                            this.$message.success(x.data.msg);
                            var access_token = x.data.data.access_token
                            var token=x.data.data;
                                token.有效=true;
                            this.保存token(token)
                            // window.localStorage.setItem('access_token', access_token);  //把登录后的token放在本地存储中 
                            // window.localStorage.setItem('refresh_token', x.data.data.refresh_token);  //把登录后的token放在本地存储中 
                            this.$router.push("/");
                        }else{
                            this.$toast(x.data.msg)
                        };
                        this.加载中(false);
                    }).catch(err => {
                        console.log(err);
                        this.$toast('系统错误稍后再试')
                        this.加载中(false);
                    })
                } else {
                    // 否则就是false
                    alert("前端验证失败 不能提交给后端！");
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.footer_nav {
    margin: 0px auto;
    width: 88%;
    display: flex;
    font-size: _vw(14);
    justify-content: space-between;
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
    height: _vw(50);
    margin-bottom: _vw(50);
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
        position: relative;
        width: 100%;
        border-radius: _vw(35);
        margin: 0px auto;
        padding-left: _vw(36);
        .眼睛 {
            color: red;
            position: absolute;
            top: 0px;
            right: 0px;
        }
    }
}
</style>
