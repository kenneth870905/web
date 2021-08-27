    <template>
    <div class="login" :style="{ 'background': 'url(' + require('../../assets/imgs/'+bgDef) + ') no-repeat center center', 'background-size': '100% 100%'}">
     <!-- 控制路由的title -->
         <div v-wechat-title="$route.meta.title=pwdTitle"></div>
        <!-- 登录表单容器 -->
        <div class="container">
        <div class="login-wrapper">
            <!-- 登录标题 -->
            <h1 class="title">
                   <h1>找回密码</h1>
            </h1>

            <!-- 登录表单 -->
            <el-form :model="passwordModifyForm" status-icon :rules="rules" ref="passwordModifyForm" label-width="100px" class="demo-ruleForm">
                <!-- 登陆账号 -->
                <el-form-item label="登陆账号" prop="username"  class="font_c">
                    <el-input type="text" v-model="passwordModifyForm.username" autocomplete="off" placeholder="登陆时用的手机号"></el-input>
                </el-form-item>
                <!-- 手机号码 -->
                 <el-form-item label="电话号码" prop="phone">
                    <el-input type="text" v-model="passwordModifyForm.phone " autocomplete="off"  placeholder="请输入电话话号码"></el-input>
                </el-form-item>
                <!-- 验证码-->
                <el-row>
                <el-col :span="12">
                        <el-form-item label="手机验证码" prop="phoneCode"><el-input type="text" v-model="passwordModifyForm.phoneCode" autocomplete="off" placeholder="手机验证码" ></el-input></el-form-item>                     
                </el-col>
                <el-col :span="12">
                        <el-button style="margin-left:46px" type="danger">发送验证码</el-button>
                </el-col>
                </el-row>
               <!-- 新的密码 -->
                    <el-form-item label="新的密码" prop="newPassword">
                        <el-input type="text" v-model="passwordModifyForm.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                <!-- 确认新密码 -->
                    <el-form-item label="确认新密码" prop="checkNewPwd">
                        <el-input type="text" v-model="passwordModifyForm.checkNewPwd" autocomplete="off"></el-input>
                    </el-form-item>

                <el-form-item>
                    <el-button type="danger" @click="submitForm('passwordModifyForm')" class="login_btn" >登录</el-button>
                    <el-button @click="resetForm('passwordModifyForm')"  style="color:red">重置</el-button>
                </el-form-item>
               
            </el-form>
        </div>
            </div>
    </div>
</template>
<script>
export default {
     data() {
      // 手机验证码的函数
      const checkPhone=(rule, value, callback)=>{
         if(value===this.passwordModifyForm.code){
            callback();
         }
      };
    // 自定义密码的验证
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("长度在 3 - 6 位"));
      } else {
        if (this.passwordModifyForm.checkNewPwd !== "") {
          this.$refs.passwordModifyForm.validateField("checkNewPwd");
        }
        callback();
      }
    };
    // 自定义确认新密码的验证
    const checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 登录表单的数据
       passwordModifyForm: {
        username:"",//用户名
        phone: "",//电话号码
        newPassword: "",//新密码
        checkNewPwd: "",//确认新密码
        phoneCode:"", //d电话验证码
        code:456,//后端返回的手机验证码
      },
      pwdTitle: " 新宝配资修改密码",
       bgDef:"login-bg-12.jpg",//背景图片
      // 验证的规则（一份数据）
      rules: {
        // 验证用户名
        username: [
          // 非空验证
          { required: true, message: "请输入登陆账号", trigger: "blur" },
          { min: 3, max: 5, message: "账号长度在 3 - 5 位", trigger: "blur" }
        ],
          // 新密码验证
        newPassword: [{ required: true, validator: pass, trigger: "blur" }],

        // 确认新密码
        checkNewPwd: [{ required: true, validator: checkPass, trigger: "blur" }],
        
         // 手机验证码的函数
        phoneCode: [{ required: true, validator: checkPhone, trigger: "blur" }]
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
    // 点击登录按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) { 
           alert("前端验证成功 可以提交给后端！");

             // 1.收集账号和密码  2.发送请求 3.弹登录成功的提示
          // let params = {
          //   username: this.loginForm.username,
          //   password: this.loginForm.password
          // };

          // 发送请求 把参数发给后端（把用户名和密码发给后端 验证是否存在这个账号）
          // this.req.post('/login/checklogin', params)
          //   .then(response => {
          //     // 接收后端返回的数据
          //     let {error_code, reason, token, username, roles} = response;
          //     // 判断
          //     if (error_code === 0) {
          //       // 把token存在浏览器的本地存储中
          //       window.localStorage.setItem('token', token);
          //       // 把当前登录用户的角色存入本地存储
          //       window.localStorage.setItem('roles', JSON.stringify(roles));
          //       // 把用户名存入本地存储
          //       window.localStorage.setItem('username', username);

          //       // 弹成功提示
          //       this.$message({
          //         type: 'success',
          //         message: reason
          //       })
          //       // 跳转到后端首页
          //       this.$router.push('/');
          //     } else {
          //       // 弹失败提示
          //       this.$message.error(reason);
          //     }

          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })



        } else {
          // 否则就是false
          alert("前端验证失败 不能提交给后端！");
          return false;
        }
      });
    },
    // 点击重置按钮 触发这个函数
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
// html,body,ul,li{
//   padding:0px;
//   margin:0px;
// }

// a {
//   text-decoration: none;
// }
.font_c{
    color:#fff;
    
}


.login {
  height: 780px;
  width: 100%;
 .container {
  //版心
  width: 1200px;
  margin: 0 auto;
    position: relative;
    color:#fff;

  .login-wrapper {
    width: 500px;
    height: 560px;
    border-radius: 8px;
    // background:#fff;
    background-color: rgba(0, 0, 0, 0.2);
    // color: #ffffff;
    position: absolute;
    top:100px;
    right:0px;
    // margin-left:300px;
    padding: 10px 50px 0 10px;
    .title {
      font-size: 20px;
      margin-left: 60px;
      margin-bottom: 20px;
      h1{
          color:#fff;
      }
    }
    .el-form {
      .el-form-item {
             margin-bottom:40px;
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
  }
  }
}
.login_nav{
    margin-left:40px;
  
}
.login_btn{
    background: red;
    color:#fff;
    border:none;
}
</style>
