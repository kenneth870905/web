    <template>
    <div class="login" :style="{ 'background-image': 'url(static/image/login-bg.jpg)'}">
        <!-- 控制路由的title -->
        
        <!-- 登录表单容器 -->
        <div class="container">
            <div class="login-wrapper">
                <!-- 登录标题 -->
                <h1 class="title">登录中心</h1>
                <!-- 登录表单 -->
                <el-form :model="user" status-icon :rules="rules" ref="user" label-width="60px" class="表单 demo-ruleForm">
                    <!-- 账号 -->
                    <el-form-item label="账号" prop="account" class="font_c">
                        <el-input type="text" v-model="user.account" autocomplete="off" placeholder="登陆时用的手机号"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="user.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <div class="text_1 表单">
                    <div>
                        <span>没有账号？</span>
                        <span class="红色字体">立即注册</span>
                    </div>
                    <div>
                        忘记密码
                    </div>
                </div>
                <div class="btn_1">
                     <el-button @click="submitForm()" type="danger">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { api_登录接口 } from "@/api/登录注册.js";
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            // 登录表单的数据
            user: {
                account: "",
                password: "",
            },
            rules: {
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            }
        };
    },
    methods: {
        ...mapActions({
            加载中:"加载中",
            成功提示:"成功提示",
            错误提示:"错误提示",
            保存token:'保存token'
        }),
        submitForm() {
            this.$refs['user'].validate(valid => {
                // 如果所有验证通过 valid就是true
                if (valid) {
                    this.登录()
                } else {
                    return false;
                }
            });
        },
        async 登录(){
            this.加载中(true)
            try {
                var r = await api_登录接口(this.user);
            } catch (error) {
                this.错误提示('系统错误，稍后再试')
                this.加载中(false)
                return
            }
            if(r.data.code==200){
                this.成功提示('登录成功');
                this.保存token(r.data.data);
            }else{
                this.错误提示(r.data.msg)
            }
            this.加载中(false)
            
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    height: 600px;
    width: 100%;
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
}

.text_1{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin: 30px 0px 10px;
}
.红色字体{
    color: red;
    cursor: pointer;
}
.btn_1{
    padding: 20px 50px 50px;
    button{
        width: 100%;
    }
}

.login_nav {
    margin-left: 40px;
}
.login_btn {
    background: red;
    color: #fff;
    border: none;
}
</style>
