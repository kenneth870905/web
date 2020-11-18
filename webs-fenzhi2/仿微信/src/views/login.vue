


    <template>
    <div class="login">

   
        <!-- 登录表单 -->
        <div class="demo-ruleForm">

            <div class="title">
             <span class=" iconfont el-icon-menu"></span>&nbsp;
              <span>登录中心</span>
           </div>

        <el-form :model="loginForm"  :rules="rules" ref="loginForm" label-width="0px" >

            <!-- 账号 -->
            <el-form-item label="" prop="username" class="font_c">
                <el-input placeholder="请输账号" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.username" >
                    <span slot="prefix" class="iconfont iconzhanghao"></span>
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" class="font_c">
                <el-input placeholder="请输入密码" autocomplete="off" @keyup.enter.native="submitForm('loginForm')" show-password v-model="loginForm.password" >
                    <span slot="prefix" class="iconfont iconmima"></span>
                </el-input>
            </el-form-item>

            <!-- 登录按钮&重置按钮 -->
            <el-form-item class="font_c">
                <el-button @click="submitForm('loginForm')" class="login_btn">登录</el-button><br>
            </el-form-item>

        </el-form>

            

         </div>
   
    </div>
</template>
<script>
import { 登录接口 } from "@/api/api.js";

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
            } else if (value.length < 2 || value.length > 6) {
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
                username: "test1",//注册账号
                password: "test1",//密码
                // graph:"",//图形验证码
            },
            rules: {
                // 验证用户名
                username: [
                    // 非空验证
                    { required: true, message: "请输入账号", trigger: "blur" },
                    { min: 4, max: 12, message: "账号长度在 2 - 6 位", trigger: "blur" }
                ],
                // 验证密码
                password: [
                    { required: true, validator: pass, trigger: "blur" }
                ],
            }
        };
    },
  
    methods: {
            go(){
                this.$router.history.push("/home");
             } ,  
        // 点击登录按钮 触发这个函数
        submitForm(formName) {
            // 获取表单组件 调用验证方法
            this.$refs[formName].validate(valid => {
                // 如果所有验证通过 valid就是true
                        
                        var obj={
                            user:this.loginForm.username,
                            pwd:this.loginForm.password
                        }
                     登录接口(obj).then(x=>{
                        if(x.status==200){
                            if(x.data.result==false){
                            this.$message.success(x.data.msg);                                 
                            }else{
                               this.$message.success(x.data.msg);
                               var user= obj.user
                                  window.localStorage.setItem('username', user);                                 
                                 var token = x.data.token
                                  window.localStorage.setItem('token', token);
                                 this.go()                                   
                            }
                        }else{
                            this.$message.success('服务器错误');
                        }


                        // 把token存在浏览器的本地存储中
                        // window.localStorage.setItem('token', token);
                        // 把当前登录用户的角色存入本地存储
                        // window.localStorage.setItem('roles', JSON.stringify(roles));
                        // 把用户名存入本地存储
                        // window.localStorage.setItem('username', username);
                        //   const token = window.localStorage.getItem('token');获取token
                        //  this.go()                               

                   }).catch(err=>{
                      console.log(err)
                     })
               
            });
        },

           onClickLeft() {//头部
            history.back()
         },
       
    },
      
}
</script>

<style lang="scss" scoped>
/deep/.el-button--danger{
    background: #ec304c
}
 /deep/.van-nav-bar{       
            border-bottom:0px !important;
        }
         /deep/.van-hairline--bottom::after{
            border-bottom-width: 0px !important;
        }
   /deep/.el-icon-view{
        font-size:22px !important;
        margin-right:4px
       }
.login{
       background: url("../assets/img/beij2.jpg") no-repeat;
   background-size: 100% 100%;
 position: absolute;
 width: 100%;
 height: 100%;



.demo-ruleForm{
    box-shadow: 2px 2px 10px #909090;
    background: rgba(0,0,0,0.3);
    //    background: #ffffff;
        border:1px solid #ccc;
        width: 800px;
        margin:0px auto;
       margin-top:140px;
        padding-top:60px;
        border-radius: 6px;
        height: 500px;
        box-sizing: border-box;

         .title{
        margin-bottom: 30px;
       font-size: 40px;
       font-weight: 1000;
       color:rgb(11, 105, 245);
       line-height: 60px;
       text-align: center;
       
    }


/deep/.iconfont {
    font-size:40px;
    margin-left:3px;
    line-height: 60px;
}


/deep/.radioK {
    width:260px !important;
    height:30px;
    text-align: center;
}

.login_btn {
    width: 100%;
    height: 60px;
    font-size: 26px;
         background:rgb(6, 95, 228);
    margin: 0px auto;
    color:#ffffff;
}

/deep/.el-form-item__label {
    width: 0px;
}
.font_c {
    width:340px;
    margin: 0px auto;
    margin-bottom:60px;

    /deep/ .el-input__inner {
        position: relative;
        width: 100%;
        height: 60px;
        font-size: 22px;
        border:1px solid #ccc;
        margin: 0px auto;
        padding-left:50px;
    }
}


}

}

</style>
